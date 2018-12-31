export class ListResult<T> {
  Skip: number;
  Top: number;
  OrderBy: string;
  Desc: boolean;
  TotalCount: number;
  Bag: { [key: string]: any };
  Data: T[];
}
