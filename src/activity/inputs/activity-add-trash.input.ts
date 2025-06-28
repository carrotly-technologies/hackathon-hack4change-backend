import { InputType, Field } from "@nestjs/graphql";
import { GraphQLObjectID } from "graphql-scalars";

@InputType()
export class ActivityAddTrashInput {
  @Field(() => GraphQLObjectID)
  activityId: string;

  @Field(() => String)
  lat: string;

  @Field(() => String)
  lon: string;
}
