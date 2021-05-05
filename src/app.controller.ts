import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthService } from 'auth/auth.service';
import { JwtAuthGuard } from 'auth/jwt-auth.guard';
import { LocalAuthGuard } from 'auth/local-auth.guard';
import { User } from 'decotators/user.decorator';
import { AppService } from './app.service';
import { Express } from 'express';
import { UserService } from 'user/user.service';
import { CreateMaterialDto } from 'user/schemas/files.schema';
import { diskStorage } from 'multer';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Get()
  getHello(@Request() req): string {
    console.log(req.user);
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@Body() body, @UploadedFile() file: Express.Multer.File) {
    console.log(file, body);
    // const body: CreateMaterialDto = {

    // }
    // const result = this.userService.uploadFile()

    return 'upload file';
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@User() user) {
    return user;
  }

  @Get('todos')
  async getTodos() {
    const result = this.appService.getTodos();
    const todos = await result.toPromise();
    return { data: todos.data };
  }
}
