import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { validatePassword } from 'shared/hashing';
import { UserService } from 'user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.userService.findOne(username);
    if (user) {
      const pwdMatch = await validatePassword(pass, user?.password);
      if (pwdMatch) {
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
    return null;
  }

  async login(user) {
    const payload = { id: user._id, isStudent: user.isStudent };

    return {
      access_token: this.jwtService.sign(payload),
      user: { ...user },
    };
  }
}
