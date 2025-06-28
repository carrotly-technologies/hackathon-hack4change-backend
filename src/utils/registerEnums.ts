import { registerEnumType } from "@nestjs/graphql";
import { GqlCommonErrors } from "../common/errors/graphql-common-errors";

import { Environment } from "../config/env.variables";
import { Sort } from "../common/enum/sort.enum";
import { GqlExampleErrors } from "@app/example-module/errors/graphql-example-errors";
import { ExampleColor } from "@app/example-module/enum/example-color.enum";
import { ActivityType } from "@app/activity/enum/activity-type.enum";
import { GraphqlActivityErrors } from "@app/activity/errors/graphql-activity-errors";
import { GraphqlMarketplaceErrors } from "@app/marketplace/errors/graphql-marketplace-errors";
import { ChallengeType } from "@app/challenges/enum/challenge-type.enum";
import { EventType } from "@app/events/enums/event-type.enum";

export const Errors = {
  ...GqlCommonErrors,
  ...GqlExampleErrors,
  ...GraphqlActivityErrors,
  ...GraphqlMarketplaceErrors,
};

export const registerEnums = () => {
  registerEnumType(Errors, { name: "Error" });
  registerEnumType(Environment, { name: "Environment" });
  registerEnumType(Sort, { name: "Sort" });

  registerEnumType(ExampleColor, { name: "ExampleColor" });
  registerEnumType(EventType, { name: "EventType" });
  registerEnumType(ActivityType, { name: "ActivityType" });
  registerEnumType(ChallengeType, { name: "ChallengeType" });
};
