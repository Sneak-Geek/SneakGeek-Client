//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!

class Factory {
  private static _instance: Factory = new Factory();
  private factory: Map<string, any> = new Map<string, any>();

  public static get instance(): Factory {
    return this._instance;
  }

  public register<T>(name: string, objectInstance: T) {
    this.factory.set(name, objectInstance);
  }

  public getObjectInstance<T>(name: string): T {
    const objectInstance = this.factory.get(name);
    if (!objectInstance) {
      throw new Error("Object factory is not properly initialized");
    }

    return objectInstance;
  }
}

export const ObjectFactory = Factory.instance;
