import { ISettingsProvider, SettingsKey } from "business";
import { AsyncStorage } from "react-native";

export class SettingsProvider implements ISettingsProvider {
  private _isLoaded: boolean = false;
  private _storageKey: string = SettingsKey.LocalSettings;
  private _values: { [key: string]: string } = {};

  public isSettingsLoaded(): boolean {
    return this._isLoaded;
  }

  public async load(): Promise<boolean> {
    const value = await AsyncStorage.getItem(this._storageKey);
    this._values = { ...this._values, ...JSON.parse(value) };

    this._isLoaded = true;
    return true;
  }

  loadServerSettings(): Promise<boolean> {
    return Promise.resolve(true);
  }

  public async save(): Promise<boolean> {
    try {
      await AsyncStorage.setItem(this._storageKey, JSON.stringify(this._values));
      return true;
    } catch (error) {
      return false;
    }
  }

  public getValue(key: string) {
    if (!this._isLoaded) {
      throw new Error("Settings are not loaded");
    }

    return this._values[key];
  }

  public async removeValue(key: string): Promise<void> {
    if (!this._isLoaded) {
      throw new Error("Settings are not loaded");
    }

    delete this._values[key];
    await this.save();
  }

  public async setValue(key: string, value: any): Promise<void> {
    this._values[key] = value;
    await this.save();
  }

  public async clear(): Promise<void> {
    this._values = {};
    await this.save();
  }
}