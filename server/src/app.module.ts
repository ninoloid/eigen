import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from 'config/database';
import { internalRoutes } from './routes/default.route';
import { MembersModule } from './infrastructure/members/modules/members.module';
import { BooksModule } from './infrastructure/books/modules/books.module';

const imports = [
  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
  }),
  TypeOrmModule.forRootAsync({
    useClass: TypeOrmConfigService,
  }),
  RouterModule.register(internalRoutes),
  MembersModule,
  BooksModule,
];

@Module({
  imports,
  providers: [],
})
export class AppModule {}
