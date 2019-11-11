/** @format */

import { Injectable } from '@nestjs/common';

import * as uuid from 'uuid';

// App Libraries
import { TodosMap } from '@todo/shared-models';

@Injectable()
export class TodosService {
  getTodos(): TodosMap {
    const allIds: string[] = [
      this.getNewTodoId(),
      this.getNewTodoId(),
      this.getNewTodoId(),
      this.getNewTodoId(),
    ];

    return {
      [allIds[0]]: {
        id: allIds[0],
        isDone: false,
        text: 'Add foobarsss',
      },
      [allIds[1]]: {
        id: allIds[1],
        isDone: false,
        text: 'Call bar',
      },
      [allIds[2]]: {
        id: allIds[2],
        isDone: false,
        text: 'Drink baz',
      },
      [allIds[3]]: {
        id: allIds[3],
        isDone: false,
        text: 'Stuff foo into bar',
      },
    };
  }

  private getNewTodoId(): string {
    return uuid();
  }
}
