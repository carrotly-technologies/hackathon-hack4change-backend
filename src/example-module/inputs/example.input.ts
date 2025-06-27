import { Field, InputType } from '@nestjs/graphql';
import { GraphQLObjectID } from 'graphql-scalars';

@InputType()
export class ExampleInput {
  @Field(() => GraphQLObjectID)
  id: string;
}
