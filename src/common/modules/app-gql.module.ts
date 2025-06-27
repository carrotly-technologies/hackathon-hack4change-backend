import * as path from "node:path";
import { ServerConfig } from "@app/config/server.config";
import { GraphiQLOptions } from "graphql-yoga";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { costLimitPlugin } from "@escape.tech/graphql-armor-cost-limit";
import { maxAliasesPlugin } from "@escape.tech/graphql-armor-max-aliases";
import { maxDepthPlugin } from "@escape.tech/graphql-armor-max-depth";
import { maxDirectivesPlugin } from "@escape.tech/graphql-armor-max-directives";
import { maxTokensPlugin } from "@escape.tech/graphql-armor-max-tokens";
import { YogaDriver, YogaDriverConfig } from "@graphql-yoga/nestjs";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { Environment } from "@app/config/env.variables";
import { GraphQLFile } from "@app/common/scalars/file.scalar";

@Module({
  imports: [
    GraphQLModule.forRootAsync<YogaDriverConfig>({
      driver: YogaDriver,
      inject: [ServerConfig],
      useFactory: (serverConfig: ServerConfig) => ({
        debug: true,
        graphiql: true,
        renderGraphiQL: AppGqlModule.playground(),
        plugins: AppGqlModule.plugins(serverConfig),
        sortSchema: true,
        autoSchemaFile: {
          path: path.join(process.cwd(), "graphql", "schema.graphql"),
        },
      }),
    }),
  ],
  providers: [GraphQLFile],
})
export class AppGqlModule {
  static plugins(serverConfig: ServerConfig) {
    const plugins = [
      costLimitPlugin({
        maxCost: 5000,
        depthCostFactor: 1.5,
        ignoreIntrospection: true,
      }),
      maxTokensPlugin({ n: 5000 }),
      maxDepthPlugin({ n: 10 }),
      maxDirectivesPlugin({ n: 50 }),
      maxAliasesPlugin({ n: 50 }),
    ];

    if (serverConfig.getEnv() === Environment.Production) {
      /** @todo: Add cache to the plugins, for the production environment */
      plugins.push();
    }

    return plugins;
  }

  static playground(): YogaDriverConfig["renderGraphiQL"] {
    return async (_?: GraphiQLOptions): Promise<string> => {
      const apollo = ApolloServerPluginLandingPageLocalDefault();
      if (apollo.serverWillStart === undefined) return "";

      const render = await apollo.serverWillStart(
        {} as Parameters<typeof apollo.serverWillStart>[0],
      );
      if (!render || render.renderLandingPage === undefined) return "";

      const landingPage = await render.renderLandingPage();
      if (!landingPage) return "";

      return typeof landingPage.html === "function"
        ? await landingPage.html()
        : landingPage.html;
    };
  }
}
