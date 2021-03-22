import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Url } from './models/url.model';
import { UrlController } from './url/url.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      // @ts-ignore
      type    : process.env.TYPEORM_CONNECTION,
      host    : process.env.TYPEORM_HOST,
      port    : parseInt(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [Url],
    }),
    TypeOrmModule.forFeature([ Url ])
  ],
  controllers: [AppController, UrlController],
  providers: [],
})
export class AppModule {}
