import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { BaseApiResponse, SwaggerBaseApiResponse } from '../../shared/dtos/base-api-response.dto';
import { AppLogger } from '../../shared/logger/logger.service';
import { ReqContext } from '../../shared/request-context/req-context.decorator';
import { RequestContext } from '../../shared/request-context/request-context.dto';
import { CreateDailyTodoRequest } from '../dtos/create-daily-todo.dto';
import { CreateWeeklyTodoRequest } from '../dtos/create-weekly-todo.dto';
import { DailyTodoResponse } from '../dtos/daily-todo-response.dto';
import { UpdateDailyTodoRequest } from '../dtos/update-daily-todo.dto';
import { UpdateWeeklyTodoRequest } from '../dtos/update-weekly-todo.dto';
import { WeeklyTodoResponse } from '../dtos/weekly-todo-response.dto';
import { DailyTodoService } from '../services/daily-todo.service';
import { WeeklyTodoService } from '../services/weekly-todo.service';

@ApiTags('todos')
@Controller('todos')
export class TodoController {
  constructor(
    private readonly dailyTodoService: DailyTodoService,
    private readonly weeklyTodoService: WeeklyTodoService,
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

  @Get('/daily')
  @ApiOperation({
    summary: '일일 할 일 조회',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse([DailyTodoResponse]),
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async getDailyTodos(
    @ReqContext() ctx: RequestContext,
  ): Promise<BaseApiResponse<DailyTodoResponse[]>> {
    this.logger.log(ctx, `${this.getDailyTodos.name} was called`);

    const dailyTodos = await this.dailyTodoService.getDailyTodos(ctx);
    return { 
      data: dailyTodos.map((dailyTodo) => new DailyTodoResponse(dailyTodo)),
      meta: {} 
    };
  }

  @Put('/daily/:dailyTodoId')
  @ApiOperation({
    summary: '일일 할 일 수정',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(DailyTodoResponse),
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async updateDailyTodo(
    @ReqContext() ctx: RequestContext,
    @Param('dailyTodoId') dailyTodoId: number,
    @Body() updateDailyTodoRequest: UpdateDailyTodoRequest,
  ): Promise<BaseApiResponse<DailyTodoResponse>> {
    this.logger.log(ctx, `${this.updateDailyTodo.name} was called`);

    const dailyTodo = await this.dailyTodoService.updateDailyTodo(ctx, dailyTodoId, updateDailyTodoRequest);
    return { 
      data: new DailyTodoResponse(dailyTodo),
      meta: {} 
    };
  }

  @Patch('/daily/:dailyTodoId')
  @ApiOperation({
    summary: '일일 할 일 완료~',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(DailyTodoResponse),
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async finishDailyTodo(
    @ReqContext() ctx: RequestContext,
    @Param('dailyTodoId') dailyTodoId: number,
  ): Promise<BaseApiResponse<DailyTodoResponse>> {
    this.logger.log(ctx, `${this.finishDailyTodo.name} was called`);

    const dailyTodo = await this.dailyTodoService.finishDailyTodo(ctx, dailyTodoId);
    return { 
      data: new DailyTodoResponse(dailyTodo),
      meta: {} 
    };
  }

  @Delete('/daily/:dailyTodoId')
  @ApiOperation({
    summary: '일일 할 일 삭제',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(String),
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async deleteDailyTodo(
    @ReqContext() ctx: RequestContext,
    @Param('dailyTodoId') dailyTodoId: number,
  ): Promise<BaseApiResponse<string>> {
    this.logger.log(ctx, `${this.deleteDailyTodo.name} was called`);

    await this.dailyTodoService.deleteDailyTodo(ctx, dailyTodoId);

    return { 
      data: '일일 할 일 삭제 완료',
      meta: {} 
    };
  }

  @Post('/weekly')
  @ApiOperation({
    summary: '주간 할 일 생성',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: SwaggerBaseApiResponse(WeeklyTodoResponse),
  })
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  async createWeeklyTodo(
    @ReqContext() ctx: RequestContext,
    @Body() createWeeklyTodoRequest: CreateWeeklyTodoRequest,
  ): Promise<BaseApiResponse<WeeklyTodoResponse>> {
    this.logger.log(ctx, `${this.createWeeklyTodo.name} was called`);

    const weeklyTodo = await this.weeklyTodoService.createWeeklyTodo(ctx, createWeeklyTodoRequest);
    return { data: new WeeklyTodoResponse(weeklyTodo), meta: {} };
  }
  
  @Get('/weekly')
  @ApiOperation({
    summary: '주간 할 일 조회',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse([WeeklyTodoResponse]),
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async getWeeklyTodos(
    @ReqContext() ctx: RequestContext,
  ): Promise<BaseApiResponse<WeeklyTodoResponse[]>> {
    this.logger.log(ctx, `${this.getWeeklyTodos.name} was called`);

    const weeklyTodos = await this.weeklyTodoService.getWeeklyTodos(ctx);

    return { 
      data: weeklyTodos.map((weeklyTodo) => new WeeklyTodoResponse(weeklyTodo)),
      meta: {} 
    };
  }
  
  @Put('/weekly/:weeklyTodoId')
  @ApiOperation({
    summary: '주간 할 일 수정',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(WeeklyTodoResponse),
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async updateWeeklyTodo(
    @ReqContext() ctx: RequestContext,
    @Param('weeklyTodoId') weeklyTodoId: number,
    @Body() updateWeeklyTodoRequest: UpdateWeeklyTodoRequest,
  ): Promise<BaseApiResponse<WeeklyTodoResponse>> {
    this.logger.log(ctx, `${this.updateDailyTodo.name} was called`);

    const weeklyTodo = await this.weeklyTodoService.updateWeeklyTodo(ctx, weeklyTodoId, updateWeeklyTodoRequest);

    return { 
      data: new WeeklyTodoResponse(weeklyTodo),
      meta: {} 
    };
  }
}
