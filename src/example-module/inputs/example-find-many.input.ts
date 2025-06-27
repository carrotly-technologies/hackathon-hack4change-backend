import { ExampleColor } from '@app/example-module/enum/example-color.enum';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ExampleFindManyInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => [ExampleColor], { nullable: true })
  color?: ExampleColor[];
}
