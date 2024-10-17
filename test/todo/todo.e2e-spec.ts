import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { initializeTransactionalContext } from 'typeorm-transactional';

import { setNestApp } from '../../set-nest-app';
import { AppModule } from '../../src/app.module';
import { AuthTokenOutput } from '../../src/auth/dtos/auth-token-output.dto';
import {
  closeDBAfterTest,
  createDBEntities,
  resetDBBeforeTest,
  seedAdminUser,
} from '../test-utils';

describe('TodoController (e2e)', () => {
  let app: INestApplication;
  let authTokenForAdmin: AuthTokenOutput;

  initializeTransactionalContext();

  beforeAll(async () => {
    await resetDBBeforeTest();
    await createDBEntities();

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    setNestApp(app);
    await app.init();

    ({ authTokenForAdmin } = await seedAdminUser(app));
  });

  describe('[POST] /daily 데일리 투두 생성', () => {
    const createDailyTodoRequest = {
      name: '알람 끄고 다시 자기',
      description: '알람은 꺼줘야 제맛이지',
    };
    
    it('정상작동', async () => {
      const expectedResponse = {
        name: createDailyTodoRequest.name,
        description: createDailyTodoRequest.description,
        displayOrder: 0,
        isDone: false,
      };
      
      return request(app.getHttpServer())
        .post('/v1/todos/daily')
        .set('Authorization', 'Bearer ' + authTokenForAdmin.accessToken)
        .send(createDailyTodoRequest)
        .expect(HttpStatus.CREATED)
        .expect((res) => {
          expect(res.body.data).toEqual(expect.objectContaining(expectedResponse));
        });
    });
  });

  describe('[GET] /daily 데일리 투두 조회', () => {
    it('정상작동', async () => {
      return request(app.getHttpServer())
        .get('/v1/todos/daily')
        .set('Authorization', 'Bearer ' + authTokenForAdmin.accessToken)
        .expect(HttpStatus.OK)
        .expect((res) => {
          expect(res.body.data).toEqual([
            {
              id: 1,
              name: '알람 끄고 다시 자기',
              description: '알람은 꺼줘야 제맛이지',
              displayOrder: 0,
              isDone: false,
              createdAt: expect.any(String),
            }
          ]);
        });
    });
  });

  afterAll(async () => {
    await app.close();
    await closeDBAfterTest();
  });
});
