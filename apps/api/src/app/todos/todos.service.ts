/** @format */

import { Injectable } from '@nestjs/common';

// Third Parties
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';

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
    const created = await this.todosTodoRepository.create(todo);

    const newTodo = await this.todosTodoRepository.save({
      ...created,
      isDone: false,
    });

    return newTodo;
  }

  async getTodos(): Promise<TodosMap> {
    const todos = await this.todosTodoRepository.find();

    return this.toTodosMap(todos);
  }

  async deleteTodo(id: string): Promise<DeleteResult> {
    const result = await this.todosTodoRepository.delete(id);

    return result;
  }

  async updateTodo(id: string, todo: Todo): Promise<Todo> {
    const toUpdate = await this.todosTodoRepository.findOne(id);

    this.todosTodoRepository.merge(toUpdate, todo);

    const updated = await this.todosTodoRepository.save(todo);

    return updated;
  }

  async toggleAll(): Promise<TodosMap> {
    const todos = await this.todosTodoRepository.find();
    const updatedTodos = await this.todosTodoRepository.save(
      todos.map(todo => ({ ...todo, isDone: !todo.isDone }))
    );

    return this.toTodosMap(updatedTodos);
  }

  private toTodosMap(todos: TodosTodoEntity[]): TodosMap | PromiseLike<TodosMap> {
    return todos.reduce(
      (accumulator, current) => {
        accumulator[current.id] = current;
        return accumulator;
      },
      {} as TodosMap
    );
  }
}
