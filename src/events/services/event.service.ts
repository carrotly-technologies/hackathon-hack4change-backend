import { Injectable } from "@nestjs/common";
import { EventRepository } from "../repositories/event.repository";
import { EventCreateInput } from "../inputs/event-create.input";
import { EventUpdateInput } from "../inputs/event-update.input";
import { EventNameNotUniqueError } from "@app/events/errors/event-name-not-unique.error";
import { EventFindManySortInput } from "@app/events/inputs/event-find-many-sort.input";
import { EventFindManyInput } from "@app/events/inputs/event-find-many.input";
import { PaginationInput } from "@app/common/inputs/pagination.input";
import { EventObject } from "@app/events/objects/event.object";
import { EventPaginationResponse } from "@app/events/responses/event-pagination.response";

@Injectable()
export class EventService {
  constructor(private readonly eventRepository: EventRepository) { }

  async create(input: EventCreateInput): Promise<EventObject> {
    const existingEvent = await this.eventRepository.findOneByName(input.name);
    if (existingEvent) {
      throw new EventNameNotUniqueError();
    }
    const event = await this.eventRepository.create(input);
    return new EventObject(event);
  }

  async findOneById(id: string): Promise<EventObject | null> {
    const event = await this.eventRepository.findOneById(id);
    return event ? new EventObject(event) : null;
  }

  async findAll(
    input: EventFindManyInput,
    sort: EventFindManySortInput,
    pagination: PaginationInput,
  ): Promise<InstanceType<typeof EventPaginationResponse>> {
    return this.eventRepository.findAll(input, sort, pagination);
  }

  async updateOneById(input: EventUpdateInput): Promise<EventObject | null> {
    const event = await this.eventRepository.updateOneById(input.id, input);
    return event ? new EventObject(event) : null;
  }

  async deleteOneById(id: string): Promise<EventObject | null> {
    const event = await this.eventRepository.deleteOneById(id);
    return event ? new EventObject(event) : null;
  }
}
