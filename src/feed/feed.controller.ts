import { Controller, Delete, Get } from '@nestjs/common';
import { FeedService } from './feed.service';
import { IFeedController } from './interfaces/feed-controller.interface';

@Controller('/feeds')
export class FeedController implements IFeedController {
  constructor(private readonly feedService: FeedService) {}

  @Get()
  async getFeeds(): Promise<any> {
    const feeds = await this.feedService.fetchFeeds();
    return feeds;
  }

  @Get()
  async getFeed() {
    return 'get single feed route';
  }

  @Delete()
  async deleteFeed() {
    return true;
  }
}
