import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Course } from 'feed/interfaces/feed.interface';
import { Document } from 'mongoose';

export type FeedDocument = Feed & Document;

@Schema()
export class Feed implements Course {
  @Prop()
  title: string;

  @Prop()
  courseCode: string;

  @Prop()
  course: string;

  @Prop()
  level: string;

  @Prop()
  unit: string;

  @Prop()
  content: string;

  @Prop()
  learningStyle: string;

  @Prop()
  thumbnail: string;

  @Prop()
  material: string;

  @Prop()
  createdBy: string;

  @Prop({ type: Date, default: Date.now() })
  createdAt: Date;
}

export const FeedSchema = SchemaFactory.createForClass(Feed);
