import { InputType, registerEnumType } from '@nestjs/graphql';
import { RecordsListArgs } from '../../core/graphql/base.args';

@InputType()
export class PrivilageCategorieArgs extends RecordsListArgs() {}
