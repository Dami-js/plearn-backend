import * as Joi from 'joi';
import { CreateStudentDto, CreateTutorDto } from 'user/dto/create-user.dto';

export const createUserSchema = Joi.object<
  CreateStudentDto | CreateTutorDto
>().keys({
  email: Joi.string().email().required(),
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  level: Joi.string().required(),
  password: Joi.string().min(6).required(),
  learningStyle: Joi.string().allow(''),
  isStudent: Joi.boolean().required(),
  coursesCreated: Joi.array().allow([]),
  title: Joi.string().allow(''),
  studentNumber: Joi.string().required(),
});
