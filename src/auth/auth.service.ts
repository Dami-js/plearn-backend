import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { validatePassword } from 'shared/hashing';
import { Learner } from 'user/interfaces/user.interface';
import { Student } from 'user/schemas/student.schema';
import { UserService } from 'user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.userService.findOne(username);
    const pwdMatch = await validatePassword(pass, user?.password);
    if (user && pwdMatch) {
      const u = {
        _id: user._id,
        email: user.email,
        isStudent: user.isStudent,
        studentNumber: user.studentNumber,
        learningStyle: user.learningStyle,
      };
      return u;
    }
    return null;
  }

  async login(user) {
    const payload = { id: user._id, studentNumber: user.studentNumber };

    return {
      access_token: this.jwtService.sign(payload),
      user: { ...user },
    };
  }
}
