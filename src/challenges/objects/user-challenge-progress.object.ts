import { ObjectType, Field, Int } from "@nestjs/graphql";
import { GraphQLObjectID } from "graphql-scalars";
import {
  UserChallengeProgressDocument,
  ChallengeStatus,
} from "@app/challenges/schemas/user-challenge-progress.schema";

@ObjectType()
export class UserChallengeProgressObject {
  @Field(() => GraphQLObjectID)
  id: string;

  @Field(() => GraphQLObjectID)
  userId: string;

  @Field(() => GraphQLObjectID)
  challengeId: string;

  @Field(() => Int)
  progress: number;

  @Field(() => String)
  status: ChallengeStatus;

  @Field(() => Date)
  startedAt: Date;

  @Field(() => Date, { nullable: true })
  completedAt?: Date;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  constructor(
    input: UserChallengeProgressDocument | UserChallengeProgressObject,
  ) {
    Object.assign(this, {
      ...(this.isDocument(input) ? input.toObject({ virtuals: true }) : input),
    });
  }

  private isDocument(
    input: UserChallengeProgressDocument | UserChallengeProgressObject,
  ): input is UserChallengeProgressDocument {
    return (input as UserChallengeProgressDocument).toObject !== undefined;
  }
}
