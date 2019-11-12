/** @format */

import { Injectable } from '@nestjs/common';

// Third Parties
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as uuid from 'uuid';

// App Entities
import { TodosTodoEntity } from './todos-todo.entity';

// App Libraries
import { TodosMap, Todo } from '@todo/shared-models';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(TodosTodoEntity)
    private readonly todosTodoRepository: Repository<TodosTodoEntity>
  ) {}

  async addTodo(todo: Todo): Promise<Todo> {
    const created = await this.todosTodoRepository.save({ ...todo, id: this.getNewTodoId() });

    return created;
  }

  async getTodos(): Promise<TodosMap> {
    const todos = await this.todosTodoRepository.find();

    return todos.reduce(
      (accumulator, current) => {
        accumulator[current.id] = current;

        return accumulator;
      },
      {} as TodosMap
    );
  }

  private getNewTodoId(): string {
    return uuid();
  }
}
