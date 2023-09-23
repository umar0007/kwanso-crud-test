import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TasksRepository } from './tasks.repository' 


@Injectable()
export class TasksService {
  constructor(
    private readonly tasksRepository: TasksRepository,
  ) {}

  async createTask( name: object ): Promise<{ task: any }> {
    return await this.tasksRepository.createTask(name);
  }

  async listTasks(): Promise<object> {
    return await this.tasksRepository.fetchTask();
  }
}
