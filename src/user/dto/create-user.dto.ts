import { Author, Learner, User } from 'user/interfaces/user.interface';

export interface CreateUserDto extends User {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface CreateStudentDto extends Learner {}

export interface CreateTutorDto extends Author {}

export type UserDetails = Learner & Author;
