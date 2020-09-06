/* eslint-disable @typescript-eslint/no-explicit-any */

import { APISerializeError } from '../errors/APISerializeError';

export interface Property {
  name: string;
  baseName: string;
  datatype: string;
  required: boolean;
  /**
   * Type of listContainer, mapContainer
   * from {{#items}}{{datatype}}{{/items}}
   */
  itemsDataType?: string;
  isAnyType: boolean;
  isBinary: boolean;
  isBoolean: boolean;
  isByteArray: boolean;
  isCircularReference: boolean;
  isContainer: boolean;
  isDate: boolean;
  isDateTime: boolean;
  isDiscriminator: boolean;
  isDouble: boolean;
  isEmail: boolean;
  isEnum: boolean;
  isFile: boolean;
  isFloat: boolean;
  isFreeFormObject: boolean;
  isInherited: boolean;
  isInteger: boolean;
  isListContainer: boolean;
  isLong: boolean;
  isMapContainer: boolean;
  isModel: boolean;
  isNullable: boolean;
  isNumber: boolean;
  isNumeric: boolean;
  isPrimitiveType: boolean;
  isReadOnly: boolean;
  isSelfReference: boolean;
  isString: boolean;
  isUri: boolean;
  isUuid: boolean;
  isWriteOnly: boolean;
  isXmlAttribute: boolean;
  isXmlWrapped: boolean;
}

export interface EnumModel {
  readonly classname: string;
  readonly type: 'enum';
  readonly enumVars: Set<string>;
}

export interface GenericModel {
  readonly classname: string;
  readonly type: 'generic';
  readonly parent?: string;
  readonly discriminator?: {
    readonly propertyName: string;
    readonly mappedModels: {
      readonly mappingName: string;
      readonly modelName: string;
    }[];
  };
  readonly additionalPropertiesType?: boolean;
  /**
   * <name, Property>
   */
  readonly vars?: Record<string, Property>;
  readonly baseNames?: Record<string, string>;
}

export interface OneOfModel {
  readonly classname: string;
  readonly type: 'oneOf';
  readonly discriminator?: {
    readonly propertyName: string;
    readonly mappedModels: {
      readonly mappingName: string;
      readonly modelName: string;
    }[];
  };
  readonly oneOf?: string[];
}

export type Model = EnumModel | GenericModel | OneOfModel;

export class TypeSerializer {
  constructor(readonly models: Record<string, Model>) {}

  toEnumObject = (model: EnumModel, jsonObject: any) => {
    if (model.enumVars.has(jsonObject)) {
      return jsonObject;
    } else {
      throw new APISerializeError(
        `"${jsonObject}" is not an enum value of [${Array.from(
          model.enumVars.values(),
        ).join(', ')}]`,
      );
    }
  };

  toGenericModelValueObject = (
    { discriminator, parent, additionalPropertiesType, vars }: GenericModel,
    ignoreDiscriminator: boolean,
    jsonObject: any,
  ) => {
    if (!vars) return jsonObject;

    if (discriminator && !ignoreDiscriminator) {
      const propertyName: string | undefined = discriminator.propertyName;
      const mappedModel = discriminator.mappedModels.find(
        ({ mappingName }) => jsonObject[propertyName] === mappingName,
      );
      if (mappedModel) {
        return this.toValueObject(mappedModel.modelName, true)(jsonObject);
      }
    }

    return {
      ...(parent ? this.toValueObject(parent)(jsonObject) ?? {} : {}),
      ...(additionalPropertiesType === true ? jsonObject : {}),
      ...Object.keys(vars).reduce((obj, name) => {
        const property: Property = vars[name];
        const value: unknown = jsonObject[property.baseName];

        if (value === undefined) {
          if (property.required) {
            throw new APISerializeError(`"${property.baseName}" is required`);
          } else {
            obj[name] = undefined;
          }
        } else if (value === null) {
          if (property.isNullable) {
            obj[name] = null;
          } else {
            throw new APISerializeError(
              `"${property.baseName}" is not nullable`,
            );
          }
        } else if (property.isPrimitiveType) {
          obj[name] =
            typeof value === 'string' &&
            (property.isDate || property.isDateTime)
              ? new Date(value)
              : value;
        } else if (Array.isArray(value) && property.isListContainer) {
          if (!property.itemsDataType) {
            throw new APISerializeError(
              `Undefined items.datatype from ${property}`,
            );
          } else {
            obj[name] = this.toValueObjectList(property.itemsDataType)(value);
          }
        } else if (value instanceof Object && property.isMapContainer) {
          if (!property.itemsDataType) {
            throw new APISerializeError(
              `Undefined items.datatype from ${property}`,
            );
          } else {
            obj[name] = this.toValueObjectMap(property.itemsDataType)(value);
          }
        } else if (!property.isFreeFormObject) {
          obj[name] = this.toValueObject(property.datatype)(value);
        } else {
          obj[name] = value;
        }
        return obj;
      }, {} as Record<string, unknown>),
    };
  };

  toGenericModelJsonObject = (
    { additionalPropertiesType, parent, vars }: GenericModel,
    valueObject: any,
  ) => {
    if (!vars) return valueObject;

    if (!(valueObject instanceof Object)) {
      return valueObject;
    }

    return {
      ...(parent ? this.toJsonObject(parent)(valueObject) : {}),
      ...(additionalPropertiesType === true ? valueObject : {}),
      ...Object.keys(vars).reduce((obj, name) => {
        const property: Property = vars[name];
        const value: unknown = valueObject[property.baseName];

        if (value === undefined) {
          if (property.required) {
            throw new APISerializeError(`"${property.baseName}" is required`);
          } else {
            obj[name] = undefined;
          }
        } else if (value === null) {
          if (property.isNullable) {
            obj[name] = null;
          } else {
            throw new APISerializeError(
              `"${property.baseName}" is not nullable`,
            );
          }
        } else if (property.isPrimitiveType) {
          obj[name] =
            value instanceof Date
              ? property.isDate
                ? value.toISOString().substr(0, 10)
                : property.isDateTime
                ? value.toISOString()
                : value
              : value;
        } else if (Array.isArray(value) && property.isListContainer) {
          if (!property.itemsDataType) {
            throw new APISerializeError(
              `Undefined items.datatype from ${property}`,
            );
          } else {
            obj[name] = this.toJsonObjectList(property.itemsDataType)(value);
          }
        } else if (value instanceof Object && property.isMapContainer) {
          if (!property.itemsDataType) {
            throw new APISerializeError(
              `Undefined items.datatype from ${property}`,
            );
          } else {
            obj[name] = this.toJsonObjectMap(property.itemsDataType)(value);
          }
        } else if (!property.isFreeFormObject) {
          obj[name] = this.toJsonObject(property.datatype)(value);
        } else {
          obj[name] = value;
        }

        return obj;
      }, {} as Record<string, unknown>),
    };
  };

  toOneOfModelValueObject = (
    { classname, discriminator, oneOf }: OneOfModel,
    ignoreDiscriminator: boolean = false,
    jsonObject: any,
  ): any => {
    if (jsonObject === undefined || jsonObject === null) {
      return jsonObject;
    }

    if (discriminator) {
      const propertyName: string | undefined = discriminator.propertyName;
      const mappedModel = discriminator.mappedModels.find(
        ({ mappingName }) => jsonObject[propertyName] === mappingName,
      );
      if (mappedModel) {
        return this.toValueObject(mappedModel.modelName, true)(jsonObject);
      } else {
        throw new APISerializeError(
          `No variant of "${classname}" exists with "${propertyName}"=valueObject[${propertyName}]`,
        );
      }
    } else if (oneOf) {
      return Object.assign(
        {},
        ...oneOf.map((type) => this.toValueObject(type)(jsonObject)),
      );
    } else {
      throw new APISerializeError(`no oneOf...`);
    }
  };

  toOneOfModelJsonObject = (
    { classname, discriminator, oneOf }: OneOfModel,
    valueObject: any,
  ): any => {
    if (valueObject === undefined || valueObject === null) {
      return valueObject;
    }

    if (discriminator) {
      const propertyName: string | undefined = discriminator.propertyName;
      const mappedModel = discriminator.mappedModels.find(
        ({ mappingName }) => valueObject[propertyName] === mappingName,
      );
      if (mappedModel) {
        return this.toJsonObject(mappedModel.modelName)(valueObject);
      } else {
        throw new APISerializeError(
          `No variant of "${classname}" exists with "${propertyName}"=valueObject[${propertyName}]`,
        );
      }
    } else if (oneOf) {
      return Object.assign(
        {},
        ...oneOf.map((type) => this.toJsonObject(type)(valueObject)),
      );
    } else {
      throw new APISerializeError(`no oneOf...`);
    }
  };

  toValueObject = (type: string, ignoreDiscriminator: boolean = false) => (
    jsonObject: any,
  ): any => {
    if (type === 'string' || type === 'number' || type === 'boolean') {
      return jsonObject;
    }

    const model: Model | undefined = this.models[type];

    if (model) {
      switch (model.type) {
        case 'enum':
          return this.toEnumObject(model, jsonObject);
        case 'generic':
          return this.toGenericModelValueObject(
            model,
            ignoreDiscriminator,
            jsonObject,
          );
        case 'oneOf':
          return this.toOneOfModelValueObject(
            model,
            ignoreDiscriminator,
            jsonObject,
          );
      }
    }

    return jsonObject;
  };

  toValueObjectList = (type: string) => (jsonArray: any[]): any[] => {
    return jsonArray.map(this.toValueObject(type));
  };

  toValueObjectMap = (type: string) => (
    jsonMap: Record<string, any>,
  ): Record<string, any> => {
    const mapper = this.toValueObject(type);
    return Object.keys(jsonMap).reduce((map, name) => {
      map[name] = mapper(jsonMap[name]);
      return map;
    }, {} as Record<string, any>);
  };

  toJsonObject = (type: string) => (valueObject: any): any => {
    if (type === 'string' || type === 'number' || type === 'boolean') {
      return valueObject;
    }

    const model: Model | undefined = this.models[type];

    if (model) {
      switch (model.type) {
        case 'enum':
          return this.toEnumObject(model, valueObject);
        case 'generic':
          return this.toGenericModelJsonObject(model, valueObject);
        case 'oneOf':
          return this.toOneOfModelJsonObject(model, valueObject);
      }
    }

    return valueObject;
  };

  toJsonObjectList = (type: string) => (valueArray: any[]): any[] => {
    return valueArray.map(this.toJsonObject(type));
  };

  toJsonObjectMap = (type: string) => (
    valueMap: Record<string, any>,
  ): Record<string, any> => {
    const mapper = this.toJsonObject(type);
    return Object.keys(valueMap).reduce((map, name) => {
      map[name] = mapper(valueMap[name]);
      return map;
    }, {} as Record<string, any>);
  };
}
