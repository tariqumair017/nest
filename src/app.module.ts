import { Module } from '@nestjs/common'; 
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module'; 
import { WatchModule } from './watch/watch.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MynameController } from './myname/myname.controller';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}), UserModule, PrismaModule, AuthModule, WatchModule],
  controllers: [AppController, MynameController],
  providers: [AppService],
})
export class AppModule {}
