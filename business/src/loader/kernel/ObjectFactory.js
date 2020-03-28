"use strict";
//!
//! Copyright (c) 2019 - SneakGeek. All rights reserved
//!
exports.__esModule = true;
var inversify_1 = require("inversify");
var Factory = /** @class */ (function () {
    function Factory() {
        this._container = new inversify_1.Container();
    }
    Object.defineProperty(Factory, "instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new Factory();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    Factory.prototype.register = function (key, implementation) {
        if (this._container.isBound(key)) {
            this._container.unbind(key);
        }
        this._container.bind(key).toConstantValue(implementation);
    };
    Factory.prototype.getObjectInstance = function (key) {
        return this._container.get(key);
    };
    return Factory;
}());
exports.ObjectFactory = Factory.instance;
