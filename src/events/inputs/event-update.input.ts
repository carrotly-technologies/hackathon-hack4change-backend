import { Field, InputType } from "@nestjs/graphql";
import { EventType } from "../enums/event-type.enum";
import { LocalizationInput } from "./localization.input";

@InputType()
export class EventUpdateInput {
  @Field(() => String)
  id: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => LocalizationInput, { nullable: true })
  localization?: LocalizationInput;

  @Field(() => String, { nullable: true })
  time?: string;

  @Field(() => String, { nullable: true })
  imageIcon?: string;

  @Field(() => String, { nullable: true })
  link?: string;

  @Field(() => EventType, { nullable: true })
  eventType?: EventType;

  @Field(() => [String], { nullable: true })
  userIds?: string[];
}
