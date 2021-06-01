import * as Joi from 'joi';
import { CreateStudentDto, CreateTutorDto } from 'user/dto/create-user.dto';

export const createStudentSchema = Joi.object<CreateStudentDto>().keys({
  email: Joi.string().email().required(),
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  level: Joi.string().required(),
  password: Joi.string().min(6).required(),
  learningStyle: Joi.string().allow(''),
  isStudent: Joi.boolean().required(),
  studentNumber: Joi.string().required(),
});

export const createTutorSchema = Joi.object<CreateTutorDto>().keys({
  email: Joi.string().email().required(),
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  password: Joi.string().min(6).required(),
  isStudent: Joi.boolean().required().only().allow(false),
  coursesCreated: Joi.array().allow(null),
  title: Joi.string().required(),
});
