/** @format */

import { Module } from '@nestjs/common';

// Third Parties
import { TypeOrmModule } from '@nestjs/typeorm';

// App Configurations
import { ormConfig } from './config/orm.config';

// App Modules
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [TodosModule, TypeOrmModule.forRoot(ormConfig)],
})
export class AppModule {}
