//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { ISettingsProvider } from "./IPlayerSettings";
import AsyncStorage from "@react-native-community/async-storage";

export class AppSettings implements ISettingsProvider {
  private _dict: Object;
  private readonly APP_SETTINGS_KEY = "SneakGeekSettings";

  constructor() {
    this._dict = new Map<string, any>();
  }

  public async load(): Promise<boolean> {
    const value = await AsyncStorage.getItem(this.APP_SETTINGS_KEY);
    if (value) {
      try {
        this._dict = Object.assign(JSON.parse(value), this._dict);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }

    return false;
  }
  save(): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  getValue(_key: string) {
    throw new Error("Method not implemented.");
  }
  removeValue(_key: string): void {
    throw new Error("Method not implemented.");
  }
  setValue(_key: string, _value: any, _shouldPersist?: boolean | undefined): void {
    throw new Error("Method not implemented.");
  }
  clear(): void {
    throw new Error("Method not implemented.");
  }
}
