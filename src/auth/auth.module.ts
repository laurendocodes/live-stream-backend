import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  providers: [AuthService

    // {
    //   provide: APP_GUARD,
    //   useClass: JwtGuard,
    // }
  ],
})
export class AuthModule {}
