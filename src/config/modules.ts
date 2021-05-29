import { HttpModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from 'auth/auth.module';
import { FeedModule } from 'feed/feed.module';
import { UserModule } from 'user/user.module';
import { MongooseConfigService, MulterConfigService } from './configuration';
import { CONFIG_MODULE_OPTIONS } from './constants';
import { mongooseModelFactories } from './mongooseModelFactories';

const modules: any[] = [
  ConfigModule.forRoot(CONFIG_MODULE_OPTIONS),
  MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useClass: MongooseConfigService,
  }),
  MongooseModule.forFeatureAsync(mongooseModelFactories),
  MulterModule.registerAsync({
    imports: [ConfigModule],
    useClass: MulterConfigService,
  }),
  FeedModule,
  AuthModule,
  UserModule,
  HttpModule,
];
export default modules;
