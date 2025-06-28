import { InputType, Field } from "@nestjs/graphql";
import { GraphQLObjectID } from "graphql-scalars";

@InputType()
export class ActivityAddPathPointInput {
  @Field(() => GraphQLObjectID)
  activityId: string;

  @Field(() => String)
  lat: string;

  @Field(() => String)
  lon: string;
}
