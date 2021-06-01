import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  UnauthorizedException,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { JoiValidationPipe } from 'shared/joiValidation.pipe';
import { UserDetails } from './dto/create-user.dto';
import {
  createTutorSchema,
  createStudentSchema,
} from './schemas/validation/create-user.schema';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';
import { User } from 'decotators/user.decorator';
// import { RolesGaurd } from 'guards/roles.guard';

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
      const u = await this.userService.profile(user);
      return { success: true, data: { ...formatUserResponseData(u) } };
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  @Post('register/student')
  @UsePipes(new JoiValidationPipe(createStudentSchema))
  async registerStudent(@Body() body: UserDetails) {
    try {
      const createdUser = await this.userService.createStudent(body);
      return {
        success: true,
        data: { ...formatUserResponseData(createdUser) },
      };
    } catch (error) {
      console.log(error.keyValue);
      throw new BadRequestException(error.message);
    }
  }

  @Post('register/tutor')
  @UsePipes(new JoiValidationPipe(createTutorSchema))
  async registerTutor(@Body() body: UserDetails) {
    try {
      const createdUser = await this.userService.createTutor(body);
      return {
        success: true,
        data: { ...formatUserResponseData(createdUser) },
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('learning-style')
  async determineLearningStyle(@Body() body, @User() user) {
    try {
      if (!user.isStudent) {
        throw new UnauthorizedException('Only student are allowed');
      }
      const updatedUser = await this.userService.determine({
        answers: body.answers,
        user,
      });
      return {
        success: true,
        data: { ...formatUserResponseData(updatedUser) },
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
