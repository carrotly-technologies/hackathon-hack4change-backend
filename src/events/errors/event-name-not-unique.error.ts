import { ValidationError } from "@app/common/errors/business.error";

export const EVENT_NAME_NOT_UNIQUE_CODE = "EVENT_NAME_NOT_UNIQUE_CODE";

export class EventNameNotUniqueError extends ValidationError {
  constructor() {
    super("Event name must be unique", EVENT_NAME_NOT_UNIQUE_CODE);
  }
}
