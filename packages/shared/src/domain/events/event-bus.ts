import { DomainEvent } from './domain-event';
import { IntegrationEvent } from './integration-event';

export interface EventBus {
  publish(events: Array<DomainEvent | IntegrationEvent>): Promise<void>;
}
