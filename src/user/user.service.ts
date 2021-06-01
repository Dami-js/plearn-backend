import { Injectable } from '@nestjs/common';
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

export interface QuestionnaireBody {
  answers: Array<string>;
  user: {
    id: string;
    studentNumber: string;
  };
}

@Injectable()
export class UserService {
  constructor(
    @InjectModel(Material.name) private materialModel: Model<MaterialDocument>,
    @InjectModel(Student.name) private studentModel: Model<StudentDocument>,
    @InjectModel(Tutor.name) private tutorModel: Model<TutorDocument>,
  ) {}

  async findOne(username: string): Promise<StudentDocument | undefined> {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const isEmail = emailPattern.test(username);
    let user = null;
    if (isEmail) {
      user = await this.tutorModel.findOne({ email: username }).exec();
    } else {
      user = await this.studentModel
        .findOne({ studentNumber: username })
        .exec();
    }
    return user;
  }

  async profile({ id, isStudent }: { id: string; isStudent: boolean }) {
    try {
      let user = null;
      if (!isStudent) {
        user = await this.tutorModel.findById(id);
      } else {
        user = await this.studentModel.findById(id);
      }
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async createStudent(body: UserDetails): Promise<any> {
    const user = body;
    try {
      user.password = await hashPassword(user.password);
      const existingUserByEmail = await this.studentModel
        .findOne({ email: user.email })
        .exec();
      if (existingUserByEmail) {
        throw new Error(`A user with this email (${user.email}) exist`);
      }
      const existingUserByStudentNumber = await this.studentModel
        .findOne({ studentNumber: user.studentNumber })
        .exec();
      if (existingUserByStudentNumber) {
        throw new Error(
          `A user with this number (${user.studentNumber}) exist`,
        );
      }

      const newUser = new this.studentModel(user);
      const savedUser = await newUser.save();
      // const { password, ...u } = newUser;
      return savedUser;
    } catch (error) {
      throw new Error(error);
    }
  }

  async createTutor(body: UserDetails): Promise<any> {
    const user = body;
    try {
      user.password = await hashPassword(user.password);
      const existingUserByEmail = await this.tutorModel
        .findOne({ email: user.email })
        .exec();
      if (existingUserByEmail) {
        throw new Error(`A user with this email (${user.email}) exist`);
      }
      const newUser = new this.tutorModel(user);
      const savedUser = await newUser.save();
      // const { password, ...u } = newUser;
      return savedUser;
    } catch (error) {
      throw new Error(error);
    }
  }

  async uploadFile(body) {
    const newFile = new this.materialModel(body);
    return newFile;
  }

  async determine(body: QuestionnaireBody) {
    const { answers, user } = body;

    const learningStyle = [];

    const formattedAnswers = answers.map((i) => Number(i));
    const activistAnswers = formattedAnswers.slice(0, 8);
    const pragmatistAnswers = formattedAnswers.slice(9, 17);
    const reflectorAnswers = formattedAnswers.slice(18, 26);
    const theoristAnswers = formattedAnswers.slice(27, 35);

    const getSum = (ans: number[]) =>
      ans.reduce((prev, current) => prev + current);

    const activistSum = getSum(activistAnswers);

    const pragmatistSum = getSum(pragmatistAnswers);

    const reflectorSum = getSum(reflectorAnswers);

    const theoristSum = getSum(theoristAnswers);

    const _r = [activistSum, pragmatistSum, reflectorSum, theoristSum];
    const learningStyles = ['activist', 'pragmatist', 'reflector', 'theorist'];

    if (_r[0] > _r[1] && _r[0] > _r[2] && _r[0] > _r[3]) {
      learningStyle.push('activist');
    } else if (_r[1] > _r[0] && _r[1] > _r[2] && _r[1] > _r[3]) {
      learningStyle.push('pragmatist');
    } else if (_r[2] > _r[0] && _r[2] > _r[1] && _r[2] > _r[3]) {
      learningStyle.push('reflector');
    } else if (_r[3] > _r[0] && _r[3] > _r[1] && _r[3] > _r[2]) {
      learningStyle.push('theorist');
    } else {
      _r.forEach((i, index) => {
        if (_r[index] == _r[index + 1]) {
          learningStyle.push(learningStyles[index], learningStyles[index + 1]);
        }
        return;
      });
    }

    await this.studentModel.updateOne({ _id: user.id }, { learningStyle });
    return await this.studentModel.findOne({ _id: user.id }).exec();
  }
}
