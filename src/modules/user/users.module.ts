import {forwardRef, Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {Users, UsersSchema} from '../auth/schema/users.schema';
import {UsersRepository} from './users.repository';
import {UsersService} from './users.service';
@Module({
    imports: [
        MongooseModule.forFeature([{name: Users.name, schema: UsersSchema}]),
    ],
    controllers: [],
    providers: [UsersService, UsersRepository],
    exports: [UsersService, UsersRepository],
})
export default class UsersModule {
}
