import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@Schema()
@ObjectType()
export class Book {
    @Field(() => ID)
    _id: Types.ObjectId;

    @Prop({ required: true })
    @Field()
    title: string;

    @Prop({ required: true })
    @Field()
    author: string;

    @Prop()
    @Field({ nullable: true })
    description?: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);