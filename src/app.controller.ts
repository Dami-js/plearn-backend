import {
  Controller,
  Get,
  Post,
  Render,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'auth/auth.service';
import { LocalAuthGuard } from 'auth/local-auth.guard';
import { AppService } from './app.service';
import { UserService } from 'user/user.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Get()
  @Render('index')
  getHello() {
    return { message: 'Hello world!' };
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('todos')
  async getTodos() {
    const result = this.appService.getTodos();
    const todos = await result.toPromise();
    return { data: todos.data };
  }
}
