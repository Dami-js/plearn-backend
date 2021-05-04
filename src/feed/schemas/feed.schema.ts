import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Course } from 'feed/interfaces/feed.interface';
import { Document } from 'mongoose';

export type FeedDocument = Feed & Document;

@Schema()
export class Feed implements Course {
  @Prop()
  id: string;

  @Prop()
  title: string;

  @Prop()
  thumbnail: string;

  @Prop()
  intro: string;

  @Prop()
  description: string;

  @Prop()
  learningStyle: string;

  @Prop()
  createdBy: string;

  @Prop()
  createdAt: string;

  @Prop()
  objectives: string;

  @Prop()
  requirements: string;

  @Prop()
  files: string;
}

export const FeedSchema = SchemaFactory.createForClass(Feed);
