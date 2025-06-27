import { NotFoundError } from '@app/common/errors/business.error';

export const EXAMPLE_NOT_FOUND_CODE = 'EXAMPLE_NOT_FOUND_CODE';

export class ExampleNotFoundError extends NotFoundError {
  constructor() {
    super('Example not found', EXAMPLE_NOT_FOUND_CODE);
  }
}
