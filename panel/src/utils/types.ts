export enum ListsEnum {
  L10,
  L25,
  L50,
  L100
}

export type OffsetType = {
  page: number;
  [limit: string]: string | number;
};

export type SortOrderType = {
  field: string;
  type: string;
};
