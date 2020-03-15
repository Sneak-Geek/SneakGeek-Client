import { Shoe } from "../../model";
import { BaseService } from "./BaseService";
import { IShoeService } from "../interfaces/IShoeService";
export declare class ShoeService extends BaseService implements IShoeService {
    searchShoes(key: string, page?: number): Promise<Shoe[]>;
}
