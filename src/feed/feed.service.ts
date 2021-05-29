import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginateModel } from 'providers/PaginateModel.provider';
import { IFeedService } from './interfaces/feed-service.interface';
import { Feed, FeedDocument } from './schemas/feed.schema';

@Injectable()
export class FeedService {
  paginate: PaginateModel<FeedDocument>;
  constructor(
    @InjectModel(Feed.name) private feedModel: Model<FeedDocument>,
    private paginateModel: PaginateModel<FeedDocument>,
  ) {
    this.paginate = this.paginateModel;
  }

  async fetchFeeds() {
    try {
      return await this.paginateModel.paginate(this.feedModel, {}, {});
    } catch (error) {
      console.log(error);
    }
  }
}
