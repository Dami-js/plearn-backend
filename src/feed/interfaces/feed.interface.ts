import { Author } from 'user/interfaces/user.interface';

export interface Feed {
  title: string;
  image: string;
  author: Author;
  learningStyle: string;
}

export interface Course {
  id: string;
  title: string;
  thumbnail: string;
  intro: string;
  description: string;
  learningStyle: string;
  createdBy: Author | string;
  createdAt: string;
  objectives: string;
  requirements: string;
  files: any;
}
