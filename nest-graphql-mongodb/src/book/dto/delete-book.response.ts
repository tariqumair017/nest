// dto/delete-book.response.ts
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class DeleteBookResponse {
  @Field()
  message: string;
}
