import { ExampleColor } from '@app/example-module/enum/example-color.enum';
import { Field, InputType } from '@nestjs/graphql';
import { GraphQLObjectID } from 'graphql-scalars';

@InputType()
export class ExampleUpdateInput {
  @Field(() => GraphQLObjectID)
  id: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => ExampleColor, { nullable: true })
  color?: ExampleColor;
}
