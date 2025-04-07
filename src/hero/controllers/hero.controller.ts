import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { BaseApiResponse, SwaggerBaseApiResponse } from '../../shared/dtos/base-api-response.dto';
import { SuccessResponse } from '../../shared/dtos/success-response.dto';
import { AppLogger } from '../../shared/logger/logger.service';
import { ReqContext } from '../../shared/request-context/req-context.decorator';
import { RequestContext } from '../../shared/request-context/request-context.dto';
import { CreateHeroDto } from '../dto/create-hero.dto';
import { HeroResponse } from '../dto/hero-response.dto';
import { HeroService } from '../services/hero.service';

@ApiTags('heroes')
@Controller('heroes')
export class HeroController {
  constructor(
    private readonly heroService: HeroService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(HeroController.name);
  }
  
  @Post('/')
  @ApiOperation({
    summary: '영웅 생성',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: SwaggerBaseApiResponse(SuccessResponse),
  })
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  async createHero(
    @ReqContext() ctx: RequestContext,
    @Body() createHeroDto: CreateHeroDto,
  ): Promise<BaseApiResponse<SuccessResponse>> {
    this.logger.log(ctx, `${this.createHero.name} was called`);

    await this.heroService.createHero(ctx, createHeroDto);
    return { data: { message: 'success with create hero' }, meta: {} };
  }

  @Get('/me')
  @ApiOperation({
    summary: '자신의 영웅 조회',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(HeroResponse),
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async getMyHero(
    @ReqContext() ctx: RequestContext,
  ): Promise<BaseApiResponse<HeroResponse>> {
    this.logger.log(ctx, `${this.getMyHero.name} was called`);

    const hero = await this.heroService.getHeroByUserId(ctx, ctx.user!.id, {
      dailyTodos: true,
      weeklyTodos: true,
      deadlineTodos: true,
    });

    return { 
      data: new HeroResponse(hero),
      meta: {} 
    };
  }
}
