import { Module } from '@nestjs/common';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from './schemas/student.schema';
import { Tutor, TutorSchema } from './schemas/tutor.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

const models: ModelDefinition[] = [
  {
    name: Student.name,
    schema: StudentSchema,
  },
  {
    name: Tutor.name,
    schema: TutorSchema,
  },
];

@Module({
  imports: [MongooseModule.forFeature(models)],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
