import { NotFoundError } from '@app/common/errors/business.error';

export const EVENT_NOT_FOUND_CODE = 'EVENT_NOT_FOUND_CODE';

export class EventNotFoundError extends NotFoundError {
  constructor() {
    super('Event not found', EVENT_NOT_FOUND_CODE);
  }
}