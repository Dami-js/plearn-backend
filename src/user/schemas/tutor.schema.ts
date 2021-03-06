import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Course } from 'feed/interfaces/feed.interface';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Author } from 'user/interfaces/user.interface';

export type TutorDocument = Tutor & Document;

@Schema()
export class Tutor implements Author {
  @Prop()
  firstname: string;

  @Prop()
  lastname: string;

  @Prop()
  password: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  title: string;

  @Prop()
  isStudent: boolean;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }] })
  coursesCreated: Array<Course>;
}

export const TutorSchema = SchemaFactory.createForClass(Tutor);
