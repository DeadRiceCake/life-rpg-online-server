import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

import { STRATEGY_GOOGLE } from '../constants/strategy.constant'

@Injectable()
export class GoogleAuthGuard extends AuthGuard(STRATEGY_GOOGLE) {}
