/** @format */

import { Module } from '@nestjs/common';

// App Controllers
import { TodosController } from './todos.controller';

// App Entities
import { TodosTodoEntity } from './todos-todo.entity';

// App Services
import { TodosService } from './todos.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [TodosController],
  providers: [TodosService],
  imports: [TypeOrmModule.forFeature([TodosTodoEntity])],
})
export class TodosModule {}
