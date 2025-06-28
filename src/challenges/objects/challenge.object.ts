import { Field, ObjectType } from "@nestjs/graphql";
import { GraphQLObjectID } from "graphql-scalars";
import { ChallengeDocument } from "@app/challenges/schemas/challenge.schema";
import { ChallengeType } from "@app/challenges/enum/challenge-type.enum";

@ObjectType()
export class ChallengeObject {
  @Field(() => GraphQLObjectID)
  id: string;

  @Field(() => String)
  topic: string;

  @Field(() => String)
  description: string;

  @Field(() => Number)
  points: number;

  @Field(() => Number)
  coin: number;

  @Field(() => String)
  iconUrl: string;

  @Field(() => ChallengeType)
  type: ChallengeType;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  constructor(input: ChallengeDocument | ChallengeObject) {
    Object.assign(this, {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      ...((input as any)._doc
        ? (input as ChallengeDocument).toObject({ virtuals: true })
        : input),
    });
  }
}
