import { registerEnumType } from "@nestjs/graphql";

export enum EventType {
  ECOLOGICAL = "ECOLOGICAL",
  SOCIAL = "SOCIAL",
}

registerEnumType(EventType, {
  name: "EventType",
  description: "Type of the event, can be ECOLOGICAL or SOCIAL",
});
