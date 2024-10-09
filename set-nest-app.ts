import { ClassSerializerInterceptor, INestApplication, ValidationPipe } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import { VALIDATION_PIPE_OPTIONS } from "./src/shared/constants";
import { RequestIdMiddleware } from "./src/shared/middlewares/request-id/request-id.middleware";

export function setNestApp<T extends INestApplication>(app: T): void {
  app.setGlobalPrefix('v1');
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(
    new ValidationPipe(VALIDATION_PIPE_OPTIONS),
  );
  app.use(RequestIdMiddleware);
  app.enableCors({ 
    origin: '*',
    credentials: true,
  });
}
