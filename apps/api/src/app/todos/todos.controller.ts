/** @format */

import { Controller, Get, Post, Body } from '@nestjs/common';

// App Models
import { TodosMap, Todo } from '@todo/shared-models';

// App Services
import { TodosService } from './todos.service';

@Controller()
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get('v1/todos')
  async getTodos(): Promise<TodosMap> {
    const todos = await this.todosService.getTodos();

    return todos;
  }

  @Post('v1/todos')
  async createTodo(@Body() todo: Todo): Promise<Todo> {
    const newTodo = await this.todosService.addTodo(todo);

    return newTodo;
  }
}
