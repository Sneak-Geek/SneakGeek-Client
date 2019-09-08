//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

import { IAppSettings } from "./IAppSettings";
import AsyncStorage from "@react-native-community/async-storage";
import { SettingsKeys } from "./SettingsKeys";
import { injectable } from "inversify";

@injectable()
export class AppSettings implements IAppSettings {
  private _dict: { [key: string]: any } = {};
  private _isLoaded: boolean = false;

  public async /** override */ load(): Promise<boolean> {
    const value = await AsyncStorage.getItem(SettingsKeys.AppSettingsKey);

    if (value) {
      try {
        this._dict = Object.assign(JSON.parse(value), this._dict);
      } catch (error) {
        console.log(`Load settings error: ${error}`);
      }
    }
    this._isLoaded = true;
    return true;
  }

  public /** override */ isSettingsLoaded(): boolean {
    return this._isLoaded;
  }

  public async /** override */ save(): Promise<boolean> {
    try {
      await AsyncStorage.setItem(SettingsKeys.AppSettingsKey, JSON.stringify(this._dict));
      return true;
    } catch (error) {
      return false;
    }
  }

  public /** override */ getValue(key: string): any {
    if (!this._isLoaded) {
      throw new Error("Settings are not loaded");
    }
    return this._dict[key];
  }

  public async /** override */ removeValue(key: string): Promise<void> {
    if (!this._isLoaded) {
      throw new Error("Settings are not loaded");
    }

    delete this._dict[key];
    await this.save();
  }

  public async /** override */ setValue(key: string, value: any): Promise<void> {
    this._dict[key] = value;
    await this.save();
  }

  public async /** override */ clear(): Promise<void> {
    this._dict = {};
    await this.save();
  }
}
