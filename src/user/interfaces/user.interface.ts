import { Course } from 'feed/interfaces/feed.interface';

export interface User {
  _id?: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  isStudent: boolean;
}

export interface Author extends User {
  title: string;
  coursesCreated?: Array<Course>;
}

export interface Learner extends User {
  level: string;
  studentNumber: string;
  learningStyle?: Array<string>;
}
