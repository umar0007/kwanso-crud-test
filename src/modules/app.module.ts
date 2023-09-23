import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../modules/auth/auth.module';
import { TasksModule } from '../modules/tasks/tasks.module';
import UsersModule  from '../modules/user/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://umarkhattab152:GpvCsf7z4LebOgFl@cluster0.dhdxlhd.mongodb.net/' || process.env.MONGO_URI),
    AuthModule,
    TasksModule,
    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
