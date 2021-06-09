import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import handleFileStorage from 'shared/handleFileStorage';
import { JoiValidationPipe } from 'shared/joiValidation.pipe';
import { CreateFeedDTO } from './dto/create-feed.dto';
import { FeedService } from './feed.service';
import { IFeedController } from './interfaces/feed-controller.interface';
import { createFeedSchema } from './schemas/validation/create-feed.schema';

@Controller('/feeds')
export class FeedController implements IFeedController {
  constructor(
    private readonly feedService: FeedService,
    private configService: ConfigService,
  ) {}

  @Get()
  async getFeeds(
    @Query() queries: { q: string; learningStyle: string; page: string },
  ): Promise<any> {
    const query = queries?.q?.replace(/-/g, ' ');
    const ls = queries?.learningStyle?.replace(/-/g, ' ');
    if (queries && queries.q) {
      const feeds = await this.feedService.fetchFeedsByQuery({
        query,
        page: parseInt(queries.page),
      });
      return feeds;
    }
    if (queries && queries.learningStyle) {
      const feeds = await this.feedService.fetchFeedsByLearningStyle({
        learningStyle: ls,
        page: parseInt(queries.page),
      });
      return feeds;
    }
    const feeds = await this.feedService.fetchFeeds({
      page: parseInt(queries.page),
    });
    return feeds;
  }

  @Get(':title')
  async getFeed(@Param() params: { title: string }) {
    const { title } = params;
    const q = title.replace(/-/g, ' ');
    const feed = await this.feedService.fetchFeedsByTitle(q);
    return { feed };
  }

  @Post()
  @UsePipes(new JoiValidationPipe(createFeedSchema))
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'thumbnail', maxCount: 1 },
        { name: 'material', maxCount: 1 },
      ],
      {
        storage: handleFileStorage.storage(),
      },
    ),
  )
  async newFeed(
    @Body() body: CreateFeedDTO,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    try {
      const getFileName = (fieldName: string) => {
        if (!files || !files[fieldName]) {
          throw new BadRequestException(
            `Please upload a file for ${fieldName}`,
          );
        }
        const file = files[fieldName][0];
        return file.filename;
      };
      const fileNames = {
        thumbnail: getFileName('thumbnail'),
        material: getFileName('material'),
      };

      const data = {
        ...body,
        ...fileNames,
      };

      const result = await this.feedService.createFeed(data);

      return { result };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete(':id')
  async removeFeed(@Param() params) {
    try {
      const result = await this.feedService.deleteFeed(params.id);
      return { success: true, result };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
