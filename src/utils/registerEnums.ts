import { registerEnumType } from "@nestjs/graphql";
import { GqlCommonErrors } from "../common/errors/graphql-common-errors";

import { Environment } from "../config/env.variables";
import { Sort } from "../common/enum/sort.enum";
import { GqlExampleErrors } from "@app/example-module/errors/graphql-example-errors";
import { ExampleColor } from "@app/example-module/enum/example-color.enum";
import { ActivityType } from "@app/activity/enum/activity-type.enum";

export const Errors = {
  ...GqlCommonErrors,
  ...GqlExampleErrors,
};

export const registerEnums = () => {
  registerEnumType(Errors, { name: "Error" });
  registerEnumType(Environment, { name: "Environment" });
  registerEnumType(Sort, { name: "Sort" });

  registerEnumType(ExampleColor, { name: "ExampleColor" });
  registerEnumType(ActivityType, { name: "ActivityType" });
};
