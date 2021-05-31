import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hashPassword } from 'shared/hashing';
import { UserDetails } from './dto/create-user.dto';
import { Material, MaterialDocument } from './schemas/files.schema';
import { Student, StudentDocument } from './schemas/student.schema';
import { Tutor, TutorDocument } from './schemas/tutor.schema';

export type User = {
  userId: number;
  username: string;
  password: string;
};

@Injectable()
export class UserService {
  constructor(
    @InjectModel(Material.name) private materialModel: Model<MaterialDocument>,
    @InjectModel(Student.name) private studentModel: Model<StudentDocument>,
    @InjectModel(Tutor.name) private tutorModel: Model<TutorDocument>,
  ) {}

  async findOne(username: string): Promise<StudentDocument | undefined> {
    const user = await this.studentModel
      .findOne({ studentNumber: username })
      .exec();

    return user;
  }

  async profile(id: string) {
    try {
      const user = await this.studentModel.findById(id);
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async createUser(body: UserDetails): Promise<any> {
    const user = body;
    user.password = await hashPassword(user.password);
    const newUser = user.isStudent
      ? new this.studentModel(user)
      : new this.tutorModel(user);
    const savedUser = await newUser.save();
    // const { password, ...u } = newUser;
    return savedUser;
  }

  async uploadFile(body) {
    const newFile = new this.materialModel(body);
    return newFile;
  }
}
