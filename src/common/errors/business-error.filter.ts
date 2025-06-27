import { Catch, ExceptionFilter } from '@nestjs/common';
import { GraphQLError } from 'graphql';

import { BusinessError } from './business.error';

@Catch(BusinessError)
export class BusinessErrorFilter implements ExceptionFilter {
  catch(error: BusinessError) {
    return new GraphQLError(error.message, {
      extensions: {
        code: error.code,
        type: error.type,
        details: error.details,
      },
    });
  }
}
