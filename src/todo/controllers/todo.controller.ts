import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { BaseApiResponse, SwaggerBaseApiResponse } from '../../shared/dtos/base-api-response.dto';
import { AppLogger } from '../../shared/logger/logger.service';
import { ReqContext } from '../../shared/request-context/req-context.decorator';
import { RequestContext } from '../../shared/request-context/request-context.dto';
import { CreateDailyTodoRequest } from '../dtos/create-daily-todo.dto';
import { DailyTodoResponse } from '../dtos/daily-todo-response.dto';
import { DailyTodoService } from '../services/daily-todo.service';

@ApiTags('todos')
@Controller('todos')
export class TodoController {
  constructor(
    private readonly dailyTodoService: DailyTodoService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(TodoController.name);
  }

  @Post('/daily')
  @ApiOperation({
    summary: '일일 할 일 생성',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: SwaggerBaseApiResponse(DailyTodoResponse),
  })
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  async createDailyTodo(
    @ReqContext() ctx: RequestContext,
    @Body() createDailyTodoRequest: CreateDailyTodoRequest,
  ): Promise<BaseApiResponse<DailyTodoResponse>> {
    this.logger.log(ctx, `${this.createDailyTodo.name} was called`);

    const dailyTodo = await this.dailyTodoService.createDailyTodo(ctx, createDailyTodoRequest);
    return { data: new DailyTodoResponse(dailyTodo), meta: {} };
  }
}
