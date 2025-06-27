import { NotFoundError } from '@app/common/errors/business.error';

export const EXAMPLE_NAME_NOT_UNIQUE_CODE = 'EXAMPLE_NAME_NOT_UNIQUE_CODE';

export class ExampleNameNotUniqueError extends NotFoundError {
  constructor() {
    super('Example name is not unique', EXAMPLE_NAME_NOT_UNIQUE_CODE);
  }
}
