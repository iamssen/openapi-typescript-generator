import { TypeSerializer } from '@rocket-scripts/openapi';

import { DataTypesModel } from './DataTypes';

export * from './DataTypes';

export const typeSerializer = new TypeSerializer({
  DataTypes: DataTypesModel,
});
