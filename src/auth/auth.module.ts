import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcctController } from 'src/acct/acct.controller';
import { AcctRepository } from 'src/acct/acct.repository';
import { AcctService } from '../acct/acct.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './security/passport.jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([AcctRepository]),
    JwtModule.register({
      secret: 'SECERT_KEY',
      signOptions: { expiresIn: '300s' },
    }),
    PassportModule,
  ],
  exports: [TypeOrmModule],
  controllers: [AuthController, AcctController],
  providers: [AuthService, AcctService, JwtStrategy],
})
export class AuthModule {}
