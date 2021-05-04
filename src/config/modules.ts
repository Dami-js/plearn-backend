import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { FeedModule } from 'feed/feed.module';
import { MongooseConfigService } from './configuration';
import { CONFIG_MODULE_OPTIONS } from './constants';

const modules: any[] = [
  ConfigModule.forRoot(CONFIG_MODULE_OPTIONS),
  MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useClass: MongooseConfigService,
  }),
  FeedModule,
];
export default modules;
