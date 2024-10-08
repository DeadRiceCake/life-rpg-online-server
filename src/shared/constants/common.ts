import { ValidationPipeOptions } from "@nestjs/common";

export const REQUEST_ID_TOKEN_HEADER = 'x-request-id';

export const FORWARDED_FOR_TOKEN_HEADER = 'x-forwarded-for';

export const VALIDATION_PIPE_OPTIONS: ValidationPipeOptions = { 
  transform: true, 
  transformOptions: { 
    exposeDefaultValues: true,
  },
};
