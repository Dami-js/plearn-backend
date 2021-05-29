import { Module } from '@nestjs/common';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { Material, MaterialSchema } from './schemas/files.schema';
import { Student, StudentSchema } from './schemas/student.schema';
import { Tutor, TutorSchema } from './schemas/tutor.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

const models: ModelDefinition[] = [
  {
    name: Material.name,
    schema: MaterialSchema,
  },
  {
    name: Student.name,
    schema: StudentSchema,
  },
];

@Module({
  imports: [MongooseModule.forFeature(models)],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
