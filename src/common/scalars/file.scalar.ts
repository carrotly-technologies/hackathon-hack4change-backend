import { ASTNode, GraphQLError } from 'graphql';
import { CustomScalar, Scalar } from '@nestjs/graphql';

@Scalar('File')
export class GraphQLFile implements CustomScalar<unknown, unknown> {
  description: 'A file upload as multipart request as specified in https://github.com/jaydenseric/graphql-multipart-request-spec';
  specifiedByUrl: 'https://github.com/jaydenseric/graphql-multipart-request-spec';

  serialize(_: unknown) {
    throw new GraphQLError('Uploads can only be used as input types');
  }

  parseValue(value: unknown) {
    return value as File;
  }

  parseLiteral(_: ASTNode) {
    throw new GraphQLError('Uploads can only be used as input types');
  }
}