import { HttpService, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

export interface Todo {
  UserId: number;
  Id: number;
  Title: string;
  Completed: boolean;
}

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}
  getHello(): string {
    return 'Hello World!';
  }

  getTodos(): Observable<AxiosResponse<Todo[]>> {
    return this.httpService.get('https://jsonplaceholder.typicode.com/todos');
  }
}
