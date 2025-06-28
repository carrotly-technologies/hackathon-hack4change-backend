import { InputType, Field } from "@nestjs/graphql";
import { GraphQLObjectID } from "graphql-scalars";

@InputType()
export class ActivityEndInput {
  @Field(() => GraphQLObjectID)
  activityId: string;

  @Field(() => Number)
  distance: number;

  @Field(() => [String])
  imageUrls: string[];

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  name?: string;
}
