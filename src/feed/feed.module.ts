import { Module } from '@nestjs/common';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';
import { Feed, FeedSchema } from './schemas/feed.schema';

const models: ModelDefinition[] = [
  {
    name: Feed.name,
    schema: FeedSchema,
  },
];

@Module({
  imports: [MongooseModule.forFeature(models)],
  controllers: [FeedController],
  providers: [FeedService],
  exports: [],
})
export class FeedModule {}
