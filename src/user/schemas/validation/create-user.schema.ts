import * as Joi from 'joi';
import { CreateStudentDto } from 'user/dto/create-user.dto';

export const createUserSchema = Joi.object<CreateStudentDto>().keys({
  email: Joi.string().email().required(),
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  level: Joi.string().required(),
  password: Joi.string().min(6).required(),
  learningStyle: Joi.string(),
  isStudent: Joi.boolean().required(),
  studentNumber: Joi.string().required(),
});
