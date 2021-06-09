import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginateModel } from 'providers/PaginateModel.provider';
import { CreateFeedDTO } from './dto/create-feed.dto';
import { Feed, FeedDocument } from './schemas/feed.schema';

interface FetchArg {
  query?: string;
  learningStyle?: string;
  page?: number;
}

@Injectable()
export class FeedService {
  paginate: PaginateModel<FeedDocument>;
  constructor(
    @InjectModel(Feed.name) private feedModel: Model<FeedDocument>,
    private paginateModel: PaginateModel<FeedDocument>,
  ) {
    this.paginate = this.paginateModel;
  }

  async fetchFeeds(arg: FetchArg) {
    try {
      return await this.paginateModel.paginate({
        model: this.feedModel,
        options: { page: arg.page },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async fetchFeedsByQuery(arg: FetchArg) {
    try {
      const re = new RegExp(arg.query, 'i');
      return await this.paginateModel.paginate({
        model: this.feedModel,
        query: {
          $or: [
            { learningStyle: { $regex: re } },
            { title: { $regex: re } },
            { course: { $regex: re } },
            { level: { $regex: re } },
            { unit: { $regex: re } },
            { content: { $regex: re } },
          ],
        },
        options: { page: arg.page },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async fetchFeedsByLearningStyle(arg: FetchArg) {
    try {
      return await this.paginateModel.paginate({
        model: this.feedModel,
        query: { learningStyle: arg.learningStyle },
        options: { page: arg.page },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async fetchFeedsByTitle(title: string) {
    try {
      return await this.feedModel.findOne({ title });
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  async createFeed(body: CreateFeedDTO) {
    try {
      let response: any = null;
      const title = body.title.toLowerCase();
      const feedExist = await this.feedModel.findOne({ title });
      if (feedExist) {
        throw new Error('A feed with this title exists');
      }
      const newFeed = new this.feedModel({ ...body, title });
      const savedFeed = await newFeed.save();
      response = savedFeed;
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteFeed(id: string) {
    try {
      const deletedFeed = await this.feedModel.findByIdAndRemove(id);
      if (!deletedFeed) {
        throw new Error(`Unable to delete. Document not found`);
      }
      return deletedFeed;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
