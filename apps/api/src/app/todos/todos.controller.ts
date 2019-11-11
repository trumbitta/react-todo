/** @format */

import { Controller, Get } from '@nestjs/common';

// App Models
import { TodosMap } from '@todo/shared-models';

// App Services
import { TodosService } from './todos.service';

@Controller()
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get('v1/todos')
  getData(): TodosMap {
    return this.todosService.getTodos();
  }
}
