//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { NetworkRequestState } from "../State";
import { Transaction, Shoe } from "../Model";

export type SellOrderHistoryPayload = {
  state: NetworkRequestState;
  sellHistory?: Transaction[];
  shoes?: Shoe[];
  error?: any;
};

export type SearchShoePayload = {
  state: NetworkRequestState;
  shoes?: Shoe[];
  error?: any;
};

export type GetShoesPayload = SearchShoePayload;
