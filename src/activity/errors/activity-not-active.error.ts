import { ForbiddenError } from "@app/common/errors/business.error";

export const ACTIVITY_NOT_ACTIVE_CODE = "ACTIVITY_NOT_ACTIVE";

export class ActivityNotActiveError extends ForbiddenError {
  constructor() {
    super("Activity is not active", ACTIVITY_NOT_ACTIVE_CODE);
  }
}
