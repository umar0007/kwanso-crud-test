import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'bson';

export type UsersDocument = Users & Document;

@Schema({collection: 'users',
timestamps: true})
export class Users{
    @ApiProperty()
    @Prop({
        type: ObjectId,
        default: () => {
            return new ObjectId()
        }
    })
    _id: ObjectId;

    @Prop({type: String, index:true})
    email: String;


    @Prop({type: String})
    password: String;

};


export const UsersSchema = SchemaFactory.createForClass(Users);