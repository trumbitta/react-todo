/** @format */

import { Module } from '@nestjs/common';

// App Modules
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [TodosModule]
})
export class AppModule {}
