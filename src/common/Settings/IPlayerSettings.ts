//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

export interface ISettingsProvider {
  // TASK 5665423: Change ISettingsProvider's save and load methods to match conventions, along with implementations.
  currentAccount: {
    accountProvider: string;
    accessToken: string;
  };

  /** Load the settings. Returns a promise indicating when the load operation is complete, and if it was successful. */
  load(): Promise<boolean>;

  /** Save the settings. Returns a promise indicating when the save operation is complete, and if it was successful. */
  save(): Promise<boolean>;

  /** Get a setting by the key. */
  getValue(key: string): any;

  /** Remove a setting by the key. */
  removeValue(key: string): void;

  /** Set a setting value. */
  setValue(key: string, value: any, shouldPersist?: boolean): void;

  /** Clears all the data in the settings provider */
  clear(): void;
}
