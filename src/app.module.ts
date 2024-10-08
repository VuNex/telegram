import { Module } from '@nestjs/common';
import { AppUpdate } from './app.update';
import { AppService } from './app.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as LocalSession from 'telegraf-session-local';
import { TG_TOKEN } from './settings';
import { UserEntity } from './User/user.entity';
import { UserController } from './User/user.controller';
import { UserService } from './User/user.service';

const session = new LocalSession({ database: 'session-db.json' });

@Module({
  imports: [
    TelegrafModule.forRoot({
      middlewares: [session.middleware()],
      token: TG_TOKEN,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'nestjsu',
      password: 'Gfhjkm1307@',
      database: 'nestjsdb',
      synchronize: true,
      logging: true,
      entities: ['dist/**/*.entity{.ts,.js}'],
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [UserController],
  providers: [AppService, AppUpdate, UserService],
})
export class AppModule {}
