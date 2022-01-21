import { registerEnumType } from '@nestjs/graphql';

export enum OrderTypes {
  ASC='asc',
  DESC='desc'
}

registerEnumType(OrderTypes, {
  name: 'OrderTypes'
});

export enum LimitTypes {
  L10=10,
  L25=25,
  L50=50,
  L100=100,
}

registerEnumType(LimitTypes, {
  name: 'LimitTypes'
});


export enum FilteringTypes {
  IS_IN='isIn',
  EQUAL_TO='equalTo',
  CONTAINS='contains',
  IS_NOT_IN='isNotIn',
  EQUAL_NOT='equalNot',
  LESS_THAN='lessThan',
  NOT_CONTAINS='notContains',
  GREATHER_THAN='greatherThan',
  LESS_THAN_OR_EQUAL_TO='lessThanOrEqualTo',
  GREATHER_THAN_EQUAL_TO='greatherThanEqualTo'
}

registerEnumType(FilteringTypes, {
  name: 'FilteringTypes'
});

