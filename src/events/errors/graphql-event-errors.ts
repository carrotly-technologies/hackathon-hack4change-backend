import { GraphQLError } from 'graphql';

export class EventNameNotUniqueError extends GraphQLError {
  constructor() {
    super('Event name must be unique', {
      extensions: {
        code: 'BAD_USER_INPUT',
      },
    });
  }
}

export class EventNotFoundError extends GraphQLError {
  constructor() {
    super('Event not found', {
      extensions: {
        code: 'NOT_FOUND',
      },
    });
  }
}