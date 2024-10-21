import { DomainEvent } from './domain-event';
import { DomainEventSubscriber } from './domain-event-subscriber';

export interface DomainEventSubscribers {
  from(container: any): DomainEventSubscribers;
  items: Array<DomainEventSubscriber<DomainEvent>>;
}
