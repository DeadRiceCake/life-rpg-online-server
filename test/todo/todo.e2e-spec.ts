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
  
  describe('[PUT] /daily 데일리 투두 수정', () => {
    const updateDailyTodoRequest = {
      name: '알람 듣자마자 일어나기',
      description: '알람을 끄고 다시 잔다는 것은 무척 게이스러운 일이다.',
    };

    it('존재하지 않는 데일리 투두 수정 시 404 에러', async () => {
      return request(app.getHttpServer())
        .put('/v1/todos/daily/999')
        .set('Authorization', 'Bearer ' + authTokenForAdmin.accessToken)
        .send(updateDailyTodoRequest)
        .expect(HttpStatus.NOT_FOUND);
    });
    
    it('일부 요청 페이로드만 줄 경우 해당 페이로드만 변경돼야함', async () => {
      const expectedResponse = {
        name: updateDailyTodoRequest.name,
        description: '알람은 꺼줘야 제맛이지',
        displayOrder: 0,
        isDone: false,
      };
      
      return request(app.getHttpServer())
        .put('/v1/todos/daily/1')
        .set('Authorization', 'Bearer ' + authTokenForAdmin.accessToken)
        .send({ name: updateDailyTodoRequest.name })
        .expect(HttpStatus.OK)
        .expect((res) => {
          expect(res.body.data).toEqual({
            id: 1,
            ...expectedResponse,
            createdAt: expect.any(String),
          });
        });
    });

    it('전체 요청 페이로드를 줄 경우 해당 페이로드로 변경돼야함', async () => {
      const expectedResponse = {
        name: updateDailyTodoRequest.name,
        description: updateDailyTodoRequest.description,
        displayOrder: 0,
        isDone: false,
      };
      
      return request(app.getHttpServer())
        .put('/v1/todos/daily/1')
        .set('Authorization', 'Bearer ' + authTokenForAdmin.accessToken)
        .send(updateDailyTodoRequest)
        .expect(HttpStatus.OK)
        .expect((res) => {
          expect(res.body.data).toEqual({
            id: 1,
            ...expectedResponse,
            createdAt: expect.any(String),
          });
        });
    });
  });

  describe('[PATCH] /daily 데일리 투두 완료처리', () => {
    it('존재하지 않는 데일리 투두 완료처리 시도 시 404 에러', async () => {
      return request(app.getHttpServer())
        .patch('/v1/todos/daily/999')
        .set('Authorization', 'Bearer ' + authTokenForAdmin.accessToken)
        .expect(HttpStatus.NOT_FOUND);
    });
    
    it('정상작동', async () => {
      return request(app.getHttpServer())
        .patch('/v1/todos/daily/1')
        .set('Authorization', 'Bearer ' + authTokenForAdmin.accessToken)
        .expect(HttpStatus.OK)
        .expect((res) => {
          expect(res.body.data).toEqual(
            {
              id: 1,
              name: '알람 듣자마자 일어나기',
              description: '알람을 끄고 다시 잔다는 것은 무척 게이스러운 일이다.',
              displayOrder: 0,
              isDone: true,
              createdAt: expect.any(String),
            }
          );
        });
    });

    it('이미 완료된 데일리 투두 완료처리 시 400 에러', async () => {
      return request(app.getHttpServer())
        .patch('/v1/todos/daily/1')
        .set('Authorization', 'Bearer ' + authTokenForAdmin.accessToken)
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  afterAll(async () => {
    await app.close();
    await closeDBAfterTest();
  });
});
