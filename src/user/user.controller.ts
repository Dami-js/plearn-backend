import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotAcceptableException,
  NotFoundException,
  Param,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { JoiValidationPipe } from 'shared/joiValidation.pipe';
import { UserDetails } from './dto/create-user.dto';
import { createUserSchema } from './schemas/validation/create-user.schema';
import { UserService } from './user.service';
import MongooseError from 'mongoose/lib/error';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';
import { User } from 'decotators/user.decorator';
import { StudentDocument } from './schemas/student.schema';
import { TutorDocument } from './schemas/tutor.schema';

function formatUserResponseData(data: any): Omit<UserDetails, 'password'> {
  const user: Omit<UserDetails, 'password'> = {
    firstname: data.firstname,
    _id: data._id,
    lastname: data.lastname,
    email: data.email,
    isStudent: data.isStudent,
    title: data.title,
    coursesCreated: data.coursesCreated,
    level: data.level,
    studentNumber: data.studentNumber,
    learningStyle: data.learningStyle,
  };

  return user;
}

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@User() user) {
    try {
      const u = await this.userService.profile(user.id);
      return { success: true, data: { ...formatUserResponseData(u) } };
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  @Post('register')
  @UsePipes(new JoiValidationPipe(createUserSchema))
  async register(@Body() body: UserDetails) {
    try {
      const createdUser = await this.userService.createUser(body);
      return {
        success: true,
        data: { ...formatUserResponseData(createdUser) },
      };
    } catch (error) {
      console.log(error.keyValue);
      throw new BadRequestException(error);
    }
  }
}
