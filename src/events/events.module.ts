import { Module } from '@nestjs/common';
import { EventRepository } from './repositories/event.repository';
import { EventService } from './services/event.service';
import { EventResolver } from './resolvers/event.resolver';

@Module({
  providers: [EventResolver, EventService, EventRepository],
})
export class EventsModule {}