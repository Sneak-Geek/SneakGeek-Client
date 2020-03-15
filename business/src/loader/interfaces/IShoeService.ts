import { Shoe } from "../../model";

export interface IShoeService {
  searchShoes: (key: string, page: number) => Promise<Shoe[]>;
}