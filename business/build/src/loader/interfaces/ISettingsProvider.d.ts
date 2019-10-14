export interface ISettingsProvider {
    isSettingsLoaded(): boolean;
    /** Load the settings. Returns a promise indicating when the load operation is complete, and if it was successful. */
    load(): Promise<boolean>;
    /** Load server settings */
    loadServerSettings(): Promise<boolean>;
    /** Save the settings. Returns a promise indicating when the save operation is complete, and if it was successful. */
    save(): Promise<boolean>;
    /** Get a setting by the key. */
    getValue(key: string): any;
    /** Remove a setting by the key. */
    removeValue(key: string): Promise<void>;
    /** Set a setting value. */
    setValue(key: string, value: any): Promise<void>;
    /** Clears all the data in the settings provider */
    clear(): Promise<void>;
}
export declare const SettingsKey: {
    LocalSettings: string;
    CurrentAccessToken: string;
    RemoteSettings: string;
};
