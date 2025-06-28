import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { EventService } from "@app/events/services/event.service";
import { EventCreateInput } from "@app/events/inputs/event-create.input";
import { EventUpdateInput } from "@app/events/inputs/event-update.input";
import { EventInput } from "@app/events/inputs/event.input";
import { EventObject } from "@app/events/objects/event.object";
import { EventPaginationResponse } from "@app/events/responses/event-pagination.response";
import { EventFindManyInput } from "@app/events/inputs/event-find-many.input";
import { EventFindManySortInput } from "@app/events/inputs/event-find-many-sort.input";
import { PaginationInput } from "@app/common/inputs/pagination.input";
import {
  INPUT_KEY,
  INPUT_SORT,
  INPUT_PAGINATION,
} from "@app/common/common.constraints";

@Resolver(() => EventObject)
export class EventResolver {
  constructor(private readonly eventService: EventService) {}

  @Query(() => EventObject, { nullable: true })
  async event(@Args(INPUT_KEY) input: EventInput): Promise<EventObject | null> {
    return this.eventService.findOneById(input.id);
  }

  @Query(() => EventPaginationResponse)
  async events(
    @Args(INPUT_KEY) input: EventFindManyInput,
    @Args(INPUT_SORT) sort: EventFindManySortInput,
    @Args(INPUT_PAGINATION) pagination: PaginationInput,
  ) {
    return this.eventService.findAll(input, sort, pagination);
  }

  @Mutation(() => EventObject)
  async eventCreate(
    @Args(INPUT_KEY) input: EventCreateInput,
  ): Promise<EventObject> {
    return this.eventService.create(input);
  }

  @Mutation(() => EventObject, { nullable: true })
  async eventUpdate(
    @Args(INPUT_KEY) input: EventUpdateInput,
  ): Promise<EventObject | null> {
    return this.eventService.updateOneById(input);
  }

  @Mutation(() => EventObject, { nullable: true })
  async eventDelete(
    @Args(INPUT_KEY) input: EventInput,
  ): Promise<EventObject | null> {
    return this.eventService.deleteOneById(input.id);
  }
}
