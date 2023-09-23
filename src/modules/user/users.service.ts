import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Users } from '../auth/schema/users.schema';
import { UsersRepository } from './users.repository';


// import {hasOwnProperty} from "mongoose-sequence";

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository
  ) {}


  async createUser(user: any): Promise<Users> {
  
    return await this.usersRepository.createUser(user);
    
  }

  async findUserByEmail(email: string): Promise<Users | null> {
    return await this.usersRepository.findUserByEmail(email);
  }
 
}
