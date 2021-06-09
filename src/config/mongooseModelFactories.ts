import { AsyncModelFactory } from '@nestjs/mongoose';
import { Student, StudentSchema } from 'user/schemas/student.schema';

export const mongooseModelFactories: AsyncModelFactory[] = [
  {
    name: Student.name,
    useFactory: () => {
      const schema = StudentSchema;
      schema.plugin(require('mongoose-beautiful-unique-validation'));
      return schema;
    },
  },
];
