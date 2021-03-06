import { Author } from 'user/interfaces/user.interface';

export interface Feed {
  title: string;
  image: string;
  author: Author;
  learningStyle: string;
}

export interface Course {
  title: string;
  course: string;
  courseCode: string;
  level: string;
  unit: string;
  content: string;
  learningStyle: string;
  thumbnail: string;
  material: string;
  createdBy: string;
  createdAt: Date;
}
