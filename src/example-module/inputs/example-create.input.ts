import { ExampleColor } from '@app/example-module/enum/example-color.enum';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ExampleCreateInput {
  @Field(() => String)
  name: string;

  @Field(() => ExampleColor)
  color: ExampleColor;
}
