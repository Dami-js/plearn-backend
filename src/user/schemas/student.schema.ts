import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Learner } from 'user/interfaces/user.interface';

export type StudentDocument = Student & Document;

@Schema()
export class Student implements Learner {
  @Prop()
  firstname: string;

  @Prop()
  lastname: string;

  @Prop()
  level: string;

  @Prop({ unique: true })
  email: string;

  @Prop({ unique: true })
  studentNumber: string;

  @Prop([String])
  learningStyle: Array<string>;

  @Prop()
  isStudent: boolean;

  @Prop()
  password: string;
}

const StudentSchema = SchemaFactory.createForClass(Student);

StudentSchema.virtual('fullName').get(function () {
  return `${this.firstname} ${this.surname} ${this.othernames}`;
});

export { StudentSchema };
