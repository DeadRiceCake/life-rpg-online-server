import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppearanceModule } from './appearance/appearance.module';
import { AuthModule } from './auth/auth.module';
import { EquipmentModule } from './equipment/equipment.module';
import { HeroModule } from './hero/hero.module';
import { SharedModule } from './shared/shared.module';
import { TodoModule } from './todo/todo.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [SharedModule, UserModule, AuthModule, HeroModule, TodoModule, AppearanceModule, EquipmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
