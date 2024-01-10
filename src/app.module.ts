import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfig } from './config/typeorm.config';
import { UserModule } from './app/user/user.module';
import { AuthModule } from './auth/auth.module';
import { CodeModule } from './app/code/code.module';
import { DeviceModule } from './app/device/device.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.dev.env',
      isGlobal: true,
    }),
    TypeOrmConfig(),
    UserModule,
    AuthModule,
    CodeModule,
    DeviceModule,
    EventEmitterModule.forRoot(),
    EmailModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
