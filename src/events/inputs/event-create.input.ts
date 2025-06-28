import { Field, InputType } from "@nestjs/graphql";
import { LocalizationInput } from "./localization.input";
import { EventType } from "../enums/event-type.enum";

@InputType()
export class EventCreateInput {
  @Field(() => String)
  name: string;

  @Field(() => LocalizationInput)
  localization: LocalizationInput;

  @Field(() => String)
  time: string;

  @Field(() => String)
  imageUrl = "https://picsum.photos/64/64";

  @Field(() => String, { nullable: true })
  link?: string;

  @Field(() => EventType)
  eventType: EventType;

  @Field(() => [String])
  userIds: string[];
}
