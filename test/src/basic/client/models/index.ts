import { TypeSerializer } from '@rocket-scripts/openapi';

import { InlineResponse200Model } from './InlineResponse200';

export * from './InlineResponse200';

export const typeSerializer = new TypeSerializer({
  InlineResponse200: InlineResponse200Model,
});
