//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!
class Factory {
    constructor() {
        this.factory = new Map();
    }
    static get instance() {
        return this._instance;
    }
    register(name, objectInstance) {
        this.factory.set(name, objectInstance);
    }
    getObjectInstance(name) {
        const objectInstance = this.factory.get(name);
        if (!objectInstance) {
            throw new Error("Object factory is not properly initialized");
        }
        return objectInstance;
    }
}
Factory._instance = new Factory();
export const ObjectFactory = Factory.instance;
