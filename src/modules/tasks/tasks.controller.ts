import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {CreateTaskDto} from './dto/tasks.dto'
import {
  ApiBearerAuth
} from '@nestjs/swagger';
import { log } from 'console';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('create-task')
  async createTask(@Body() body: CreateTaskDto) {
    return await this.tasksService.createTask(body);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('list-tasks')
  async listTasks(@Request() req) {
    return await this.tasksService.listTasks();
  }
}
