import { ExampleColor } from '@app/example-module/enum/example-color.enum';
import { ExampleDocument } from '@app/example-module/schemas/example.schema';
import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLObjectID } from 'graphql-scalars';

@ObjectType()
export class ExampleObject {
  @Field(() => GraphQLObjectID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => ExampleColor)
  color: ExampleColor;

  constructor(input: ExampleDocument | ExampleObject) {
    Object.assign(this, {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      ...((input as any)._doc
        ? (input as ExampleDocument).toObject({ virtuals: true })
        : input),
    });
  }
}
