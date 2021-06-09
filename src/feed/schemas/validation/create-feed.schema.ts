import { Course } from 'feed/interfaces/feed.interface';
import * as Joi from 'joi';

export const createFeedSchema = Joi.object<Course>().keys({
  title: Joi.string().required(),
  course: Joi.string().required(),
  courseCode: Joi.string().required(),
  level: Joi.string().required(),
  unit: Joi.string().required(),
  content: Joi.string().required(),
  learningStyle: Joi.string().required(),
  createdBy: Joi.string().required(),
});
