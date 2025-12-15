import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'; 
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(private readonly config: ConfigService) {
    const db_url = config.get<string>('DATABASE_URL');  
    super({
      datasources: {
        db: {
          url: db_url,
        },
      },
    });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      console.log('Database connection success!');
    } catch (error) {
      console.error('Error connecting to the database:', error);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('Disconnected from the database');
  }
}
