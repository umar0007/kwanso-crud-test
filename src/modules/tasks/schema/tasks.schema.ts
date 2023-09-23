import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'bson';

export type TasksDocument = Tasks & Document;

@Schema({collection: 'tasks',
timestamps: true})
export class Tasks{
    @ApiProperty()
    @Prop({
        type: ObjectId,
        default: () => {
            return new ObjectId()
        }
    })
    _id: ObjectId;

    @Prop({type: String})
    name: String;

};


export const TasksSchema = SchemaFactory.createForClass(Tasks);