import { ValidationError } from "@app/common/errors/business.error";

export const MARKETPLACE_INSUFFICIENT_COINS_CODE =
  "MARKETPLACE_INSUFFICIENT_COINS";

export class MarketplaceInsufficientCoinsError extends ValidationError {
  constructor() {
    super(
      "Insufficient coins to purchase this item",
      MARKETPLACE_INSUFFICIENT_COINS_CODE,
    );
  }
}
