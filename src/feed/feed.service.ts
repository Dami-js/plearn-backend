import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IFeedService } from './interfaces/feed-service.interface';
import { Feed, FeedDocument } from './schemas/feed.schema';

@Injectable()
export class FeedService implements Partial<IFeedService> {
  constructor(@InjectModel(Feed.name) private feedModel: Model<FeedDocument>) {}

  async fetchFeeds() {
    return this.feedModel.find();
  }
}
