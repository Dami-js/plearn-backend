import { HttpModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AuthModule } from 'auth/auth.module';
import { FeedModule } from 'feed/feed.module';
import { join } from 'path';
import { UserModule } from 'user/user.module';
import { MongooseConfigService, MulterConfigService } from './configuration';
import { CONFIG_MODULE_OPTIONS } from './constants';

const modules: any[] = [
  ConfigModule.forRoot(CONFIG_MODULE_OPTIONS),
  MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useClass: MongooseConfigService,
  }),
  MulterModule.registerAsync({
    imports: [ConfigModule],
    useClass: MulterConfigService,
  }),
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '../..', 'public'),
  }),
  FeedModule,
  AuthModule,
  UserModule,
  HttpModule,
];
export default modules;
