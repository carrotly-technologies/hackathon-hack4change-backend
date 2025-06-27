import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLObjectID } from 'graphql-scalars';
import { AwardDocument } from '@app/awards/schemas/award.schema';

@ObjectType()
export class AwardObject {
  @Field(() => GraphQLObjectID)
  id: string;

  @Field(() => String)
  iconUrl: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  constructor(input: AwardDocument | AwardObject) {
    Object.assign(this, {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      ...((input as any)._doc
        ? (input as AwardDocument).toObject({ virtuals: true })
        : input),
    });
  }
} 