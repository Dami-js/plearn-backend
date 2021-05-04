import { Course } from 'feed/interfaces/feed.interface';

export interface User {
  _id?: string;
  surname: string;
  firstname: string;
  othernames: string;
  email: string;
}

export interface Author extends User {
  title: string;
  coursesCreated: Array<Course>;
}

export interface Learner extends User {
  studentNumber: string;
  learningStyle: string;
}
