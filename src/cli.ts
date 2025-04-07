import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { ROLE } from './auth/constants/role.constant';
import { Hero } from './hero/entities/hero.entity';
import { RequestContext } from './shared/request-context/request-context.dto';
import { User } from './user/entities/user.entity';
import { UserService } from './user/services/user.service';
import { UserJoinType } from './user/types/user-join.type';
import { UserStatus } from './user/types/user-status.type';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const configService = app.get(ConfigService);
  const defaultAdminUserPassword = configService.get<string>(
    'defaultAdminUserPassword',
  )!;

  const userService = app.get(UserService);

  const defaultAdmin: User = {
    id: "id",
    joinBy: UserJoinType.LOCAL,
    password: defaultAdminUserPassword,
    roles: [ROLE.ADMIN],
    email: 'default-admin@example.com',
    status: UserStatus.NORMAL,
    lastLoginAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    hero: new Hero(),
  };

  const ctx = new RequestContext();

  // Create the default admin user if it doesn't already exist.
  const user = await userService.findByEmail(ctx, defaultAdmin.email);
  if (!user) {
    await userService.createUser(ctx, defaultAdmin);
  }

  await app.close();
}
bootstrap();
