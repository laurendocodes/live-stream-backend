import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './lib/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { StreamModule } from './stream/stream.module';
import { JwtGuard } from './auth/common/guard/jwt.guard';
import { GatewayModule } from './gateway/gateway.module';
  

@Module({
  imports: [
    PrismaModule,
    UserModule,
    AuthModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    StreamModule,
    GatewayModule,
  ],
  controllers: [AppController],
  providers: [AppService,
     {
      provide: 'APP_GUARD',
    useClass: JwtGuard,
  }
  
  ],
})
export class AppModule {}
