import { Controller, Get, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { BaseApiResponse, SwaggerBaseApiResponse } from '../../shared/dtos/base-api-response.dto';
import { AppLogger } from '../../shared/logger/logger.service';
import { ReqContext } from '../../shared/request-context/req-context.decorator';
import { RequestContext } from '../../shared/request-context/request-context.dto';
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
