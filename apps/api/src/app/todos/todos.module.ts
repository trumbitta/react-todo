/** @format */

import { Module } from '@nestjs/common';

// App Controllers
import { TodosController } from './todos.controller';

// App Services
import { TodosService } from './todos.service';

@Module({
  controllers: [TodosController],
  providers: [TodosService]
})
export class TodosModule {}
