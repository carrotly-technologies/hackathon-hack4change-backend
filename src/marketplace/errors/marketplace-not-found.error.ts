import { NotFoundError } from "@app/common/errors/business.error";

export const MARKETPLACE_NOT_FOUND_CODE = "MARKETPLACE_NOT_FOUND";

export class MarketplaceNotFoundError extends NotFoundError {
  constructor() {
    super("Marketplace item not found", MARKETPLACE_NOT_FOUND_CODE);
  }
}
