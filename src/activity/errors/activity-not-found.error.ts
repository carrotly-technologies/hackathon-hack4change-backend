import { NotFoundError } from "@app/common/errors/business.error";

export const ACTIVITY_NOT_FOUND_CODE = "ACTIVITY_NOT_FOUND";

export class ActivityNotFoundError extends NotFoundError {
  constructor() {
    super("Activity not found", ACTIVITY_NOT_FOUND_CODE);
  }
}
