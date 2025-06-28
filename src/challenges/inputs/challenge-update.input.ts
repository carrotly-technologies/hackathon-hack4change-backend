import { Field, InputType } from "@nestjs/graphql";
import { GraphQLObjectID } from "graphql-scalars";
import { ChallengeType } from "@app/challenges/enum/challenge-type.enum";

@InputType()
export class ChallengeUpdateInput {
  @Field(() => GraphQLObjectID)
  id: string;

  @Field(() => String, { nullable: true })
  topic?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Number, { nullable: true })
  points?: number;

  @Field(() => String, { nullable: true })
  iconUrl?: string;

  @Field(() => ChallengeType, { nullable: true })
  type?: ChallengeType;
}
