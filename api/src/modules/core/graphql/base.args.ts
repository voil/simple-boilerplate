import { Field, InputType, createUnionType } from '@nestjs/graphql';
import { OrderTypes, LimitTypes, FilteringTypes } from '../../../support/enums';
import { IsString, IsNumber, IsOptional, IsIn, IsArray } from 'class-validator';

/**
 * OffsetType
 * Offset type for list records.
 *

 */
@InputType()
export class OffsetType {
  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  page?: number;

  @Field(type => LimitTypes, { nullable: true })
  @IsOptional()
  @IsIn([10, 25, 50, 100])
  @IsNumber()
  limit?: LimitTypes;
}

/**
 * OrderType
 * Order type for list records.
 *

 */
@InputType()
export class OrderType {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  field?: string;

  @Field(type => OrderTypes, { nullable: true })
  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  type?: OrderTypes;
}

@InputType()
class FilterType {
  @Field()
  @IsString()
  field?: string;

  @Field(type => FilteringTypes)
  type?: FilteringTypes;

  @Field({ nullable: false })
  // FIX - znajdz sposob na dodawanie wielu typów - string / input / boolean
  value?: string;
}

/**
 * RecordsListArgs
 * Records list args records.
 *
 * @param String[] ColumnsArray

 */
export function RecordsListArgs() {
  @InputType({ isAbstract: true })
  abstract class RecordsListArgs {
    @Field({ nullable: true })
    @IsOptional()
    offset?: OffsetType;

    @Field({ nullable: true })
    @IsOptional()
    order?: OrderType;

    @Field(type => [FilterType], { nullable: true })
    @IsOptional()
    @IsArray()
    filters?: FilterType;
  }

  return RecordsListArgs;
}

/**
 * RecordArgs
 * Record args records.
 *

 */
@InputType()
export class RecordArgs {
  // ...
}
