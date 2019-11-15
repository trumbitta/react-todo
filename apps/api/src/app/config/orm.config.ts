/** @format */

import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// App Entities
import { TodosTodoEntity } from '../todos/todos-todo.entity';

export const ormConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'apps/api/db.sqlite3',
  entities: [TodosTodoEntity],
  synchronize: true,
};
