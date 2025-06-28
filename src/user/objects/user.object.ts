import { Field, ObjectType } from "@nestjs/graphql";
import { GraphQLObjectID } from "graphql-scalars";
import { UserDocument } from "@app/user/schemas/user.schema";

@ObjectType()
export class UserObject {
  @Field(() => GraphQLObjectID)
  id: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  firstname: string;

  @Field(() => String)
  lastname: string;

  @Field(() => String, { nullable: true })
  avatarUrl?: string;

  @Field(() => [GraphQLObjectID])
  awardIds: string[];

  @Field(() => [GraphQLObjectID])
  challengeIds: string[];

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  constructor(input: UserDocument | UserObject) {
    Object.assign(this, {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      ...((input as any)._doc
        ? (input as UserDocument).toObject({ virtuals: true })
        : input),
    });
  }
}
