/** @format */

import { Controller, Get, Post, Body, Delete, Param, Put } from '@nestjs/common';

// Third Parties
import { DeleteResult } from 'typeorm';

// App Models
import { TodosMap, Todo } from '@todo/shared-models';

// App Services
import { TodosService } from './todos.service';

@Controller('v1/todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  async getTodos(): Promise<TodosMap> {
    const todos = await this.todosService.getTodos();

    return todos;
  }

  @Post()
  async createTodo(@Body() todo: Todo): Promise<Todo> {
    const newTodo = await this.todosService.addTodo(todo);

    return newTodo;
  }

  @Delete(':id')
  async deleteTodo(@Param('id') id: string): Promise<DeleteResult> {
    const result = await this.todosService.deleteTodo(id);

    return result;
  }

  @Put(':id')
  async updateTodo(@Param('id') id: string, @Body() todo: Todo): Promise<Todo> {
    const updated = await this.todosService.updateTodo(id, todo);

    return updated;
  }

  @Post('rpc/toggle-all')
  async toggleAll(): Promise<TodosMap> {
    const todos = await this.todosService.toggleAll();

    return todos;
  }

  @Post('rpc/delete-all')
  async deleteAll(): Promise<void> {
    const deleted = await this.todosService.deleteAll();

    return deleted;
  }
}
