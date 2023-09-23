import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Tasks ,TasksSchema } from './schema/tasks.schema';
import { AuthModule } from '../auth/auth.module';
import { TasksRepository } from './tasks.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tasks.name, schema: TasksSchema }]),
    AuthModule,
  ],
  controllers: [TasksController],
  providers: [TasksService, TasksRepository],
})
export class TasksModule {}
