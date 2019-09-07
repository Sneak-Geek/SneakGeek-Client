//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { Shoe } from "../../Reducers";

export interface IAppContentService {
  getShoes(): Promise<Shoe[]>;
  searchShoes(key: string): Promise<Shoe[]>;
}
