import { GraphQLError, GraphQLFormattedError } from 'graphql';

export const formatError = (error: GraphQLError) => {
  const graphQLFormattedError: GraphQLFormattedError = {
    message: error?.message,
    path: error?.path,
    extensions: {
      code: error?.extensions?.code,
      type: error?.extensions?.type,
      details: error?.extensions?.details,
      stacktrace: error?.extensions?.stacktrace,
    },
  };
  return graphQLFormattedError;
};
