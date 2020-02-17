declare class Factory {
    private _container;
    private static _instance;
    private constructor();
    static get instance(): Factory;
    register<T>(key: symbol, implementation: T): void;
    getObjectInstance<T>(key: symbol): T;
}
export declare const ObjectFactory: Factory;
export {};
