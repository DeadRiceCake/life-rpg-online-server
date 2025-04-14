import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';

import { AppLogger } from '../../shared/logger/logger.service';
import { UserService } from '../../user/services/user.service';
import { STRATEGY_GOOGLE } from '../constants/strategy.constant';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, STRATEGY_GOOGLE) {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly logger: AppLogger,
  ) {
    super({
      clientID: configService.get<string>('google.clientId'),
      clientSecret: configService.get<string>('google.clientSecret'),
      callbackURL: configService.get<string>('google.callbackUrl'),
      scope: ['email', 'profile'],
    });
    this.logger.setContext(GoogleStrategy.name);
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    const { id, emails } = profile;
    const email = emails![0].value;

    const user = await this.userService.getUserByEmailOrSave(email, id);

    done(null, user);
  }
}
