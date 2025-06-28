import { ForbiddenError } from "@app/common/errors/business.error";

export const ACTIVITY_ALREADY_STARTED_CODE = "ACTIVITY_ALREADY_STARTED";

export class ActivityAlreadyStartedError extends ForbiddenError {
  constructor() {
    super("User already has an active activity", ACTIVITY_ALREADY_STARTED_CODE);
  }
}
