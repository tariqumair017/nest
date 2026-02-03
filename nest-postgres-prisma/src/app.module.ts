import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'; 
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module'; 
import { WatchModule } from './watch/watch.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MynameController } from './myname/myname.controller'; 
import { LoggerMiddleware } from './auth/middleware/logger.middleware';
import { seconds, ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          name: 'default',
          ttl: seconds(60),
          limit: 3,
        }
      ],
      errorMessage: 'Too many requests, please try again later.', 
    }),
    ConfigModule.forRoot({isGlobal: true}), UserModule, PrismaModule, AuthModule, WatchModule],
  controllers: [AppController, MynameController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
