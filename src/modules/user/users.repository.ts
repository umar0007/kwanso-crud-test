import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users, UsersDocument } from '../auth/schema/users.schema';
import { log } from 'console';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(Users.name) private usersModel: Model<UsersDocument>,
  ) {}

  async createUser(user): Promise<any> {
    return await this.usersModel.create(user.userData);
  }

  async findUserByEmail(email: string): Promise<any> {
    let user = await this.usersModel.findOne({
      email
    });
    return user;
  }
}
