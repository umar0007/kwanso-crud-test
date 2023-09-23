import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tasks, TasksDocument } from './schema/tasks.schema';
import { log } from 'console';

@Injectable()
export class TasksRepository {
  constructor(
    @InjectModel(Tasks.name) private tasksModel: Model<TasksDocument>,
  ) {}

  async createTask(taskName: object): Promise<any> {
    log(taskName)
    return await this.tasksModel.create(taskName);
  }

  async fetchTask(): Promise<any> {
    return this.tasksModel.find();
  }
}