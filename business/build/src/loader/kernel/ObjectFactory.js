//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!
import { Container } from "inversify";
class Factory {
    constructor() {
        this._container = new Container();
    }
    static get instance() {
        if (!this._instance) {
            this._instance = new Factory();
        }
        return this._instance;
    }
    register(key, implementation) {
        if (this._container.isBound(key)) {
            this._container.unbind(key);
        }
        this._container.bind(key).toConstantValue(implementation);
    }
    getObjectInstance(key) {
        return this._container.get(key);
    }
}
export const ObjectFactory = Factory.instance;
