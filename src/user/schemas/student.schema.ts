import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Learner } from 'user/interfaces/user.interface';

export type StudentDocument = Student & Document;

@Schema()
export class Student implements Learner {
  @Prop()
  surname: string;

  @Prop()
  firstname: string;

  @Prop()
  othernames: string;

  @Prop()
  email: string;

  @Prop()
  studentNumber: string;

  @Prop()
  learningStyle: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
