//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { NetworkRequestState } from "../State";
import { Transaction, Shoe, Profile, Account } from "../Model";

type NetworkPayload = {
  state: NetworkRequestState;
  error?: any;
};

export type SellOrderHistoryPayload = {
  sellHistory?: Transaction[];
  shoes?: Shoe[];
} & NetworkPayload;

export type SearchShoePayload = {
  shoes?: Shoe[];
} & NetworkPayload;

export type GetShoesPayload = SearchShoePayload;

export type GetUserProfilePayload = {
  profile?: Profile;
} & NetworkPayload;

export type CheckAccountWithEmailPayload = {
  existStatus?: boolean;
} & NetworkPayload;

export type RequestTokenPayload = NetworkPayload;
export type VerifyTokenPayload = NetworkPayload;
export type SetPasswordPayload = NetworkPayload;

export type UpdateUserProfilePayload = {
  profile?: Profile;
} & NetworkPayload;
