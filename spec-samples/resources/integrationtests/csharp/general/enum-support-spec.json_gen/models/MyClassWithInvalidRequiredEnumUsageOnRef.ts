/* eslint-disable */
/**
 * My title
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * Do not edit the class manually.
 */

import { GenericModel } from '@rocket-scripts/openapi';

import { WeekDays } from './';

/**
 * Invalid use of required on $ref enum, per Swagger 2.0 spec: Any members other than '$ref' in a JSON Reference object SHALL be ignored. See My_Class_With_Required_Inline_Enum for appropriate usage.
 * @interface MyClassWithInvalidRequiredEnumUsageOnRef
 */
export interface MyClassWithInvalidRequiredEnumUsageOnRef {
  /**
   *
   * @type {boolean}
   * @memberof MyClassWithInvalidRequiredEnumUsageOnRef
   */
  first?: boolean;

  /**
   *
   * @type {WeekDays}
   * @memberof MyClassWithInvalidRequiredEnumUsageOnRef
   */
  days?: WeekDays;
}

export const MyClassWithInvalidRequiredEnumUsageOnRefModel: GenericModel = {
  classname: 'MyClassWithInvalidRequiredEnumUsageOnRef',
  type: 'generic',
  parent: undefined,
  vars: {
    first: {
      name: 'first',
      baseName: 'first',
      datatype: 'boolean',
      required: false,
      itemsDataType: undefined,
      isAnyType: false,
      isBinary: false,
      isBoolean: true,
      isByteArray: false,
      isCircularReference: false,
      isContainer: false,
      isDate: false,
      isDateTime: false,
      isDiscriminator: false,
      isDouble: false,
      isEmail: false,
      isEnum: false,
      isFile: false,
      isFloat: false,
      isFreeFormObject: false,
      isInherited: false,
      isInteger: false,
      isListContainer: false,
      isLong: false,
      isMapContainer: false,
      isModel: false,
      isNullable: false,
      isNumber: false,
      isNumeric: false,
      isPrimitiveType: true,
      isReadOnly: false,
      isSelfReference: false,
      isString: false,
      isUri: false,
      isUuid: false,
      isWriteOnly: false,
      isXmlAttribute: false,
      isXmlWrapped: false,
    },
    days: {
      name: 'days',
      baseName: 'days',
      datatype: 'WeekDays',
      required: false,
      itemsDataType: undefined,
      isAnyType: false,
      isBinary: false,
      isBoolean: false,
      isByteArray: false,
      isCircularReference: false,
      isContainer: false,
      isDate: false,
      isDateTime: false,
      isDiscriminator: false,
      isDouble: false,
      isEmail: false,
      isEnum: false,
      isFile: false,
      isFloat: false,
      isFreeFormObject: false,
      isInherited: false,
      isInteger: false,
      isListContainer: false,
      isLong: false,
      isMapContainer: false,
      isModel: false,
      isNullable: false,
      isNumber: false,
      isNumeric: false,
      isPrimitiveType: false,
      isReadOnly: false,
      isSelfReference: false,
      isString: false,
      isUri: false,
      isUuid: false,
      isWriteOnly: false,
      isXmlAttribute: false,
      isXmlWrapped: false,
    },
  },
  baseNames: {
    first: 'first',
    days: 'days',
  },
};