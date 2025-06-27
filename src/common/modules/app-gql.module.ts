import { Module } from '@nestjs/common';
import { ApolloServerPlugin } from '@apollo/server';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { GraphQLArmorConfig } from '@escape.tech/graphql-armor-types';
import { ApolloArmor } from '@escape.tech/graphql-armor';
import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { formatError } from '@app/utils/formatError';
import { ServerConfig } from '@app/config/server.config';
import { AppConfigModule } from '@app/config/config.module';

@Module({
  imports: [
    AppConfigModule,
    GraphQLModule.forRootAsync({
      imports: [AppConfigModule],
      driver: ApolloDriver,
      useFactory: (serverConfig: ServerConfig) => {
        const apolloArmorConfig: GraphQLArmorConfig = {
          // CWE-400 https://cwe.mitre.org/data/definitions/400.html
          maxAliases: { n: 25, allowList: [] },
          maxDepth: { n: 20 },
          costLimit: { depthCostFactor: 1.2, maxCost: 6000 },
        };

        // reference: https://escape.tech/graphql-armor/docs/getting-started
        const protection = new ApolloArmor(apolloArmorConfig).protect();
        const plugins = [
          ...protection.plugins,
          serverConfig.getEnablePlayground()
            ? ApolloServerPluginLandingPageLocalDefault()
            : ApolloServerPluginLandingPageDisabled(),
        ] as ApolloServerPlugin[];

        return {
          autoSchemaFile: 'schema.gql',
          formatError,
          introspection: serverConfig.getEnableIntrospection(),
          playground: false,
          plugins,
        };
      },
      inject: [ServerConfig],
    }),
  ],
})
export class AppGqlModule {}
