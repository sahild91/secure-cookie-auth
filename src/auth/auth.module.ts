import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { EncryptionService } from 'src/middleware/encryption.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserModule } from '../user/user.module';
import { ProfileModule } from '../profile/profile.module';
import { ActivityModule } from '../activity/activity.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { cfg } from 'src/utils/env';

@Module({
  imports: [
    UserModule,
    ProfileModule,
    ActivityModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: cfg.jwt.secret,
        signOptions: { expiresIn: cfg.jwt.expiresIn },
      }),
    }),
  ],
  providers: [AuthService, EncryptionService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
