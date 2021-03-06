"use strict";

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _core = require("core-js");

var _core2 = _interopRequireDefault(_core);

var functionPrototype = Object.getPrototypeOf(Function);
var _Map = Map;
var _Set = Set;
var _WeakMap = WeakMap;

var __Metadata__ = new _WeakMap();

function decorate(decorators, target, targetKey, targetDescriptor) {
    if (!IsUndefined(targetDescriptor)) {
        if (!IsArray(decorators)) {
            throw new TypeError();
        } else if (!IsObject(target)) {
            throw new TypeError();
        } else if (IsUndefined(targetKey)) {
            throw new TypeError();
        } else if (!IsObject(targetDescriptor)) {
            throw new TypeError();
        }
        targetKey = ToPropertyKey(targetKey);
        return DecoratePropertyWithDescriptor(decorators, target, targetKey, targetDescriptor);
    } else if (!IsUndefined(targetKey)) {
        if (!IsArray(decorators)) {
            throw new TypeError();
        } else if (!IsObject(target)) {
            throw new TypeError();
        }
        targetKey = ToPropertyKey(targetKey);
        return DecoratePropertyWithoutDescriptor(decorators, target, targetKey);
    } else {
        if (!IsArray(decorators)) {
            throw new TypeError();
        } else if (!IsConstructor(target)) {
            throw new TypeError();
        }
        return DecorateConstructor(decorators, target);
    }
}
Reflect.decorate = decorate;

function metadata(metadataKey, metadataValue) {
    function decorator(target, targetKey) {
        if (!IsUndefined(targetKey)) {
            if (!IsObject(target)) {
                throw new TypeError();
            }
            targetKey = ToPropertyKey(targetKey);
            OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, targetKey);
        } else {
            if (!IsConstructor(target)) {
                throw new TypeError();
            }
            OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, undefined);
        }
    }
    return decorator;
}
Reflect.metadata = metadata;

function defineMetadata(metadataKey, metadataValue, target, targetKey) {
    if (!IsObject(target)) {
        throw new TypeError();
    } else if (!IsUndefined(targetKey)) {
        targetKey = ToPropertyKey(targetKey);
    }
    return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, targetKey);
}
Reflect.defineMetadata = defineMetadata;

function hasMetadata(metadataKey, target, targetKey) {
    if (!IsObject(target)) {
        throw new TypeError();
    } else if (!IsUndefined(targetKey)) {
        targetKey = ToPropertyKey(targetKey);
    }
    return OrdinaryHasMetadata(metadataKey, target, targetKey);
}
Reflect.hasMetadata = hasMetadata;

function hasOwnMetadata(metadataKey, target, targetKey) {
    if (!IsObject(target)) {
        throw new TypeError();
    } else if (!IsUndefined(targetKey)) {
        targetKey = ToPropertyKey(targetKey);
    }
    return OrdinaryHasOwnMetadata(metadataKey, target, targetKey);
}
Reflect.hasOwnMetadata = hasOwnMetadata;

function getMetadata(metadataKey, target, targetKey) {
    if (!IsObject(target)) {
        throw new TypeError();
    } else if (!IsUndefined(targetKey)) {
        targetKey = ToPropertyKey(targetKey);
    }
    return OrdinaryGetMetadata(metadataKey, target, targetKey);
}
Reflect.getMetadata = getMetadata;

function getOwnMetadata(metadataKey, target, targetKey) {
    if (!IsObject(target)) {
        throw new TypeError();
    } else if (!IsUndefined(targetKey)) {
        targetKey = ToPropertyKey(targetKey);
    }
    return OrdinaryGetOwnMetadata(metadataKey, target, targetKey);
}
Reflect.getOwnMetadata = getOwnMetadata;

function getMetadataKeys(target, targetKey) {
    if (!IsObject(target)) {
        throw new TypeError();
    } else if (!IsUndefined(targetKey)) {
        targetKey = ToPropertyKey(targetKey);
    }
    return OrdinaryMetadataKeys(target, targetKey);
}
Reflect.getMetadataKeys = getMetadataKeys;

function getOwnMetadataKeys(target, targetKey) {
    if (!IsObject(target)) {
        throw new TypeError();
    } else if (!IsUndefined(targetKey)) {
        targetKey = ToPropertyKey(targetKey);
    }
    return OrdinaryOwnMetadataKeys(target, targetKey);
}
Reflect.getOwnMetadataKeys = getOwnMetadataKeys;

function deleteMetadata(metadataKey, target, targetKey) {
    if (!IsObject(target)) {
        throw new TypeError();
    } else if (!IsUndefined(targetKey)) {
        targetKey = ToPropertyKey(targetKey);
    }

    var metadataMap = GetOrCreateMetadataMap(target, targetKey, false);
    if (IsUndefined(metadataMap)) {
        return false;
    }
    if (!metadataMap["delete"](metadataKey)) {
        return false;
    }
    if (metadataMap.size > 0) {
        return true;
    }
    var targetMetadata = __Metadata__.get(target);
    targetMetadata["delete"](targetKey);
    if (targetMetadata.size > 0) {
        return true;
    }
    __Metadata__["delete"](target);
    return true;
}
Reflect.deleteMetadata = deleteMetadata;

function DecorateConstructor(decorators, target) {
    for (var i = decorators.length - 1; i >= 0; --i) {
        var decorator = decorators[i];
        var decorated = decorator(target);
        if (!IsUndefined(decorated)) {
            if (!IsConstructor(decorated)) {
                throw new TypeError();
            }
            target = decorated;
        }
    }
    return target;
}
function DecoratePropertyWithDescriptor(decorators, target, propertyKey, descriptor) {
    for (var i = decorators.length - 1; i >= 0; --i) {
        var decorator = decorators[i];
        var decorated = decorator(target, propertyKey, descriptor);
        if (!IsUndefined(decorated)) {
            if (!IsObject(decorated)) {
                throw new TypeError();
            }
            descriptor = decorated;
        }
    }
    return descriptor;
}
function DecoratePropertyWithoutDescriptor(decorators, target, propertyKey) {
    for (var i = decorators.length - 1; i >= 0; --i) {
        var decorator = decorators[i];
        decorator(target, propertyKey);
    }
}

function GetOrCreateMetadataMap(target, targetKey, create) {
    var targetMetadata = __Metadata__.get(target);
    if (!targetMetadata) {
        if (!create) {
            return undefined;
        }
        targetMetadata = new _Map();
        __Metadata__.set(target, targetMetadata);
    }
    var keyMetadata = targetMetadata.get(targetKey);
    if (!keyMetadata) {
        if (!create) {
            return undefined;
        }
        keyMetadata = new _Map();
        targetMetadata.set(targetKey, keyMetadata);
    }
    return keyMetadata;
}

function OrdinaryHasMetadata(_x, _x2, _x3) {
    var _again = true;

    _function: while (_again) {
        hasOwn = parent = undefined;
        _again = false;
        var MetadataKey = _x,
            O = _x2,
            P = _x3;

        var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
        if (hasOwn) {
            return true;
        }
        var parent = GetPrototypeOf(O);
        if (parent !== null) {
            _x = MetadataKey;
            _x2 = parent;
            _x3 = P;
            _again = true;
            continue _function;
        }
        return false;
    }
}

function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
    var metadataMap = GetOrCreateMetadataMap(O, P, false);
    if (metadataMap === undefined) {
        return false;
    }
    return Boolean(metadataMap.has(MetadataKey));
}

function OrdinaryGetMetadata(_x4, _x5, _x6) {
    var _again2 = true;

    _function2: while (_again2) {
        hasOwn = parent = undefined;
        _again2 = false;
        var MetadataKey = _x4,
            O = _x5,
            P = _x6;

        var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
        if (hasOwn) {
            return OrdinaryGetOwnMetadata(MetadataKey, O, P);
        }
        var parent = GetPrototypeOf(O);
        if (parent !== null) {
            _x4 = MetadataKey;
            _x5 = parent;
            _x6 = P;
            _again2 = true;
            continue _function2;
        }
        return undefined;
    }
}

function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
    var metadataMap = GetOrCreateMetadataMap(O, P, false);
    if (metadataMap === undefined) {
        return undefined;
    }
    return metadataMap.get(MetadataKey);
}

function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
    var metadataMap = GetOrCreateMetadataMap(O, P, true);
    metadataMap.set(MetadataKey, MetadataValue);
}

function OrdinaryMetadataKeys(O, P) {
    var ownKeys = OrdinaryOwnMetadataKeys(O, P);
    var parent = GetPrototypeOf(O);
    if (parent === null) {
        return ownKeys;
    }
    var parentKeys = OrdinaryMetadataKeys(parent, P);
    if (parentKeys.length <= 0) {
        return ownKeys;
    }
    if (ownKeys.length <= 0) {
        return parentKeys;
    }
    var set = new _Set();
    var keys = [];
    for (var _i = 0; _i < ownKeys.length; _i++) {
        var key = ownKeys[_i];
        var hasKey = set.has(key);
        if (!hasKey) {
            set.add(key);
            keys.push(key);
        }
    }
    for (var _a = 0; _a < parentKeys.length; _a++) {
        var key = parentKeys[_a];
        var hasKey = set.has(key);
        if (!hasKey) {
            set.add(key);
            keys.push(key);
        }
    }
    return keys;
}

function OrdinaryOwnMetadataKeys(target, targetKey) {
    var metadataMap = GetOrCreateMetadataMap(target, targetKey, false);
    var keys = [];
    if (metadataMap) {
        metadataMap.forEach(function (_, key) {
            return keys.push(key);
        });
    }
    return keys;
}

function IsUndefined(x) {
    return x === undefined;
}

function IsArray(x) {
    return Array.isArray(x);
}

function IsObject(x) {
    return typeof x === "object" ? x !== null : typeof x === "function";
}

function IsConstructor(x) {
    return typeof x === "function";
}

function IsSymbol(x) {
    return typeof x === "symbol";
}

function ToPropertyKey(value) {
    if (IsSymbol(value)) {
        return value;
    }
    return String(value);
}
function GetPrototypeOf(O) {
    var proto = Object.getPrototypeOf(O);
    if (typeof O !== "function" || O === functionPrototype) {
        return proto;
    }

    if (proto !== functionPrototype) {
        return proto;
    }

    var prototype = O.prototype;
    var prototypeProto = Object.getPrototypeOf(prototype);
    if (prototypeProto == null || prototypeProto === Object.prototype) {
        return proto;
    }

    var constructor = prototypeProto.constructor;
    if (typeof constructor !== "function") {
        return proto;
    }

    if (constructor === O) {
        return proto;
    }

    return constructor;
}