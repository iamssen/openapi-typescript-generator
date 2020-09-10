/* eslint-disable */
/**
 * My title
 * API under test
 *
 * The version of the OpenAPI document: 1.0.7
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * Do not edit the class manually.
 */

import { TypeSerializer } from '@rocket-scripts/openapi';

import { AnotherXmlObjectModel } from './models/AnotherXmlObject';
import { DuplicateXmlObjectModel } from './models/DuplicateXmlObject';
import { EnumWithStarObjectModel } from './models/EnumWithStarObject';
import { InlineResponse201Model } from './models/InlineResponse201';
import { NullableTestModel } from './models/NullableTest';
import { ObjectHeaderModel } from './models/ObjectHeader';
import { ObjectParamModel } from './models/ObjectParam';
import { ObjectUntypedPropsModel } from './models/ObjectUntypedProps';
import { ObjectWithArrayOfObjectsModel } from './models/ObjectWithArrayOfObjects';
import { StringEnumModel } from './models/StringEnum';
import { XmlObjectModel } from './models/XmlObject';

export const typeSerializer = new TypeSerializer({
  AnotherXmlObject: AnotherXmlObjectModel,
  DuplicateXmlObject: DuplicateXmlObjectModel,
  EnumWithStarObject: EnumWithStarObjectModel,
  InlineResponse201: InlineResponse201Model,
  NullableTest: NullableTestModel,
  ObjectHeader: ObjectHeaderModel,
  ObjectParam: ObjectParamModel,
  ObjectUntypedProps: ObjectUntypedPropsModel,
  ObjectWithArrayOfObjects: ObjectWithArrayOfObjectsModel,
  StringEnum: StringEnumModel,
  XmlObject: XmlObjectModel,
});