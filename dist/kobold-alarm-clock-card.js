
function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ /* global Reflect, Promise, SuppressedError, Symbol, Iterator */ var $6dd3ba7ab41ebe11$var$extendStatics = function(d, b) {
    $6dd3ba7ab41ebe11$var$extendStatics = Object.setPrototypeOf || ({
        __proto__: []
    }) instanceof Array && function(d, b) {
        d.__proto__ = b;
    } || function(d, b) {
        for(var p in b)if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };
    return $6dd3ba7ab41ebe11$var$extendStatics(d, b);
};
function $6dd3ba7ab41ebe11$export$a8ba968b8961cb8a(d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    $6dd3ba7ab41ebe11$var$extendStatics(d, b);
    function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
var $6dd3ba7ab41ebe11$export$18ce0697a983be9b = function() {
    $6dd3ba7ab41ebe11$export$18ce0697a983be9b = Object.assign || function __assign(t) {
        for(var s, i = 1, n = arguments.length; i < n; i++){
            s = arguments[i];
            for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return $6dd3ba7ab41ebe11$export$18ce0697a983be9b.apply(this, arguments);
};
function $6dd3ba7ab41ebe11$export$3c9a16f847548506(s, e) {
    var t = {};
    for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function") {
        for(var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++)if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
    return t;
}
function $6dd3ba7ab41ebe11$export$29e00dfd3077644b(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function $6dd3ba7ab41ebe11$export$d5ad3fd78186038f(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
function $6dd3ba7ab41ebe11$export$3a84e1ae4e97e9b0(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) {
        if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
        return f;
    }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for(var i = decorators.length - 1; i >= 0; i--){
        var context = {};
        for(var p in contextIn)context[p] = p === "access" ? {} : contextIn[p];
        for(var p in contextIn.access)context.access[p] = contextIn.access[p];
        context.addInitializer = function(f) {
            if (done) throw new TypeError("Cannot add initializers after decoration has completed");
            extraInitializers.push(accept(f || null));
        };
        var result = (0, decorators[i])(kind === "accessor" ? {
            get: descriptor.get,
            set: descriptor.set
        } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        } else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
}
function $6dd3ba7ab41ebe11$export$d831c04e792af3d(thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for(var i = 0; i < initializers.length; i++)value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    return useValue ? value : void 0;
}
function $6dd3ba7ab41ebe11$export$6a2a36740a146cb8(x) {
    return typeof x === "symbol" ? x : "".concat(x);
}
function $6dd3ba7ab41ebe11$export$d1a06452d3489bc7(f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", {
        configurable: true,
        value: prefix ? "".concat(prefix, " ", name) : name
    });
}
function $6dd3ba7ab41ebe11$export$f1db080c865becb9(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}
function $6dd3ba7ab41ebe11$export$1050f835b63b671e(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}
function $6dd3ba7ab41ebe11$export$67ebef60e6f28a6(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(g && (g = 0, op[0] && (_ = 0)), _)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
var $6dd3ba7ab41ebe11$export$45d3717a4c69092e = Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
        enumerable: true,
        get: function() {
            return m[k];
        }
    };
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
};
function $6dd3ba7ab41ebe11$export$f33643c0debef087(m, o) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) $6dd3ba7ab41ebe11$export$45d3717a4c69092e(o, m, p);
}
function $6dd3ba7ab41ebe11$export$19a8beecd37a4c45(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function() {
            if (o && i >= o.length) o = void 0;
            return {
                value: o && o[i++],
                done: !o
            };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function $6dd3ba7ab41ebe11$export$8d051b38c9118094(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while((n === void 0 || n-- > 0) && !(r = i.next()).done)ar.push(r.value);
    } catch (error) {
        e = {
            error: error
        };
    } finally{
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally{
            if (e) throw e.error;
        }
    }
    return ar;
}
function $6dd3ba7ab41ebe11$export$afc72e2116322959() {
    for(var ar = [], i = 0; i < arguments.length; i++)ar = ar.concat($6dd3ba7ab41ebe11$export$8d051b38c9118094(arguments[i]));
    return ar;
}
function $6dd3ba7ab41ebe11$export$6388937ca91ccae8() {
    for(var s = 0, i = 0, il = arguments.length; i < il; i++)s += arguments[i].length;
    for(var r = Array(s), k = 0, i = 0; i < il; i++)for(var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)r[k] = a[j];
    return r;
}
function $6dd3ba7ab41ebe11$export$1216008129fb82ed(to, from, pack) {
    if (pack || arguments.length === 2) {
        for(var i = 0, l = from.length, ar; i < l; i++)if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}
function $6dd3ba7ab41ebe11$export$10c90e4f7922046c(v) {
    return this instanceof $6dd3ba7ab41ebe11$export$10c90e4f7922046c ? (this.v = v, this) : new $6dd3ba7ab41ebe11$export$10c90e4f7922046c(v);
}
function $6dd3ba7ab41ebe11$export$e427f37a30a4de9b(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function() {
        return this;
    }, i;
    function awaitReturn(f) {
        return function(v) {
            return Promise.resolve(v).then(f, reject);
        };
    }
    function verb(n, f) {
        if (g[n]) {
            i[n] = function(v) {
                return new Promise(function(a, b) {
                    q.push([
                        n,
                        v,
                        a,
                        b
                    ]) > 1 || resume(n, v);
                });
            };
            if (f) i[n] = f(i[n]);
        }
    }
    function resume(n, v) {
        try {
            step(g[n](v));
        } catch (e) {
            settle(q[0][3], e);
        }
    }
    function step(r) {
        r.value instanceof $6dd3ba7ab41ebe11$export$10c90e4f7922046c ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
    }
    function fulfill(value) {
        resume("next", value);
    }
    function reject(value) {
        resume("throw", value);
    }
    function settle(f, v) {
        if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
    }
}
function $6dd3ba7ab41ebe11$export$bbd80228419bb833(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function(e) {
        throw e;
    }), verb("return"), i[Symbol.iterator] = function() {
        return this;
    }, i;
    function verb(n, f) {
        i[n] = o[n] ? function(v) {
            return (p = !p) ? {
                value: $6dd3ba7ab41ebe11$export$10c90e4f7922046c(o[n](v)),
                done: false
            } : f ? f(v) : v;
        } : f;
    }
}
function $6dd3ba7ab41ebe11$export$e3b29a3d6162315f(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof $6dd3ba7ab41ebe11$export$19a8beecd37a4c45 === "function" ? $6dd3ba7ab41ebe11$export$19a8beecd37a4c45(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
        return this;
    }, i);
    function verb(n) {
        i[n] = o[n] && function(v) {
            return new Promise(function(resolve, reject) {
                v = o[n](v), settle(resolve, reject, v.done, v.value);
            });
        };
    }
    function settle(resolve, reject, d, v) {
        Promise.resolve(v).then(function(v) {
            resolve({
                value: v,
                done: d
            });
        }, reject);
    }
}
function $6dd3ba7ab41ebe11$export$4fb47efe1390b86f(cooked, raw) {
    if (Object.defineProperty) Object.defineProperty(cooked, "raw", {
        value: raw
    });
    else cooked.raw = raw;
    return cooked;
}
var $6dd3ba7ab41ebe11$var$__setModuleDefault = Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
};
var $6dd3ba7ab41ebe11$var$ownKeys = function(o) {
    $6dd3ba7ab41ebe11$var$ownKeys = Object.getOwnPropertyNames || function(o) {
        var ar = [];
        for(var k in o)if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
        return ar;
    };
    return $6dd3ba7ab41ebe11$var$ownKeys(o);
};
function $6dd3ba7ab41ebe11$export$c21735bcef00d192(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k = $6dd3ba7ab41ebe11$var$ownKeys(mod), i = 0; i < k.length; i++)if (k[i] !== "default") $6dd3ba7ab41ebe11$export$45d3717a4c69092e(result, mod, k[i]);
    }
    $6dd3ba7ab41ebe11$var$__setModuleDefault(result, mod);
    return result;
}
function $6dd3ba7ab41ebe11$export$da59b14a69baef04(mod) {
    return mod && mod.__esModule ? mod : {
        default: mod
    };
}
function $6dd3ba7ab41ebe11$export$d5dcaf168c640c35(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}
function $6dd3ba7ab41ebe11$export$d40a35129aaff81f(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
}
function $6dd3ba7ab41ebe11$export$81fdc39f203e4e04(state, receiver) {
    if (receiver === null || typeof receiver !== "object" && typeof receiver !== "function") throw new TypeError("Cannot use 'in' operator on non-object");
    return typeof state === "function" ? receiver === state : state.has(receiver);
}
function $6dd3ba7ab41ebe11$export$88ac25d8e944e405(env, value, async) {
    if (value !== null && value !== void 0) {
        if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
        var dispose, inner;
        if (async) {
            if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
            dispose = value[Symbol.asyncDispose];
        }
        if (dispose === void 0) {
            if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
            dispose = value[Symbol.dispose];
            if (async) inner = dispose;
        }
        if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
        if (inner) dispose = function() {
            try {
                inner.call(this);
            } catch (e) {
                return Promise.reject(e);
            }
        };
        env.stack.push({
            value: value,
            dispose: dispose,
            async: async
        });
    } else if (async) env.stack.push({
        async: true
    });
    return value;
}
var $6dd3ba7ab41ebe11$var$_SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};
function $6dd3ba7ab41ebe11$export$8f076105dc360e92(env) {
    function fail(e) {
        env.error = env.hasError ? new $6dd3ba7ab41ebe11$var$_SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
        env.hasError = true;
    }
    var r, s = 0;
    function next() {
        while(r = env.stack.pop())try {
            if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
            if (r.dispose) {
                var result = r.dispose.call(r.value);
                if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) {
                    fail(e);
                    return next();
                });
            } else s |= 1;
        } catch (e) {
            fail(e);
        }
        if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
        if (env.hasError) throw env.error;
    }
    return next();
}
function $6dd3ba7ab41ebe11$export$889dfb5d17574b0b(path, preserveJsx) {
    if (typeof path === "string" && /^\.\.?\//.test(path)) return path.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function(m, tsx, d, ext, cm) {
        return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : d + ext + "." + cm.toLowerCase() + "js";
    });
    return path;
}
var $6dd3ba7ab41ebe11$export$2e2bcd8739ae039 = {
    __extends: $6dd3ba7ab41ebe11$export$a8ba968b8961cb8a,
    __assign: $6dd3ba7ab41ebe11$export$18ce0697a983be9b,
    __rest: $6dd3ba7ab41ebe11$export$3c9a16f847548506,
    __decorate: $6dd3ba7ab41ebe11$export$29e00dfd3077644b,
    __param: $6dd3ba7ab41ebe11$export$d5ad3fd78186038f,
    __esDecorate: $6dd3ba7ab41ebe11$export$3a84e1ae4e97e9b0,
    __runInitializers: $6dd3ba7ab41ebe11$export$d831c04e792af3d,
    __propKey: $6dd3ba7ab41ebe11$export$6a2a36740a146cb8,
    __setFunctionName: $6dd3ba7ab41ebe11$export$d1a06452d3489bc7,
    __metadata: $6dd3ba7ab41ebe11$export$f1db080c865becb9,
    __awaiter: $6dd3ba7ab41ebe11$export$1050f835b63b671e,
    __generator: $6dd3ba7ab41ebe11$export$67ebef60e6f28a6,
    __createBinding: $6dd3ba7ab41ebe11$export$45d3717a4c69092e,
    __exportStar: $6dd3ba7ab41ebe11$export$f33643c0debef087,
    __values: $6dd3ba7ab41ebe11$export$19a8beecd37a4c45,
    __read: $6dd3ba7ab41ebe11$export$8d051b38c9118094,
    __spread: $6dd3ba7ab41ebe11$export$afc72e2116322959,
    __spreadArrays: $6dd3ba7ab41ebe11$export$6388937ca91ccae8,
    __spreadArray: $6dd3ba7ab41ebe11$export$1216008129fb82ed,
    __await: $6dd3ba7ab41ebe11$export$10c90e4f7922046c,
    __asyncGenerator: $6dd3ba7ab41ebe11$export$e427f37a30a4de9b,
    __asyncDelegator: $6dd3ba7ab41ebe11$export$bbd80228419bb833,
    __asyncValues: $6dd3ba7ab41ebe11$export$e3b29a3d6162315f,
    __makeTemplateObject: $6dd3ba7ab41ebe11$export$4fb47efe1390b86f,
    __importStar: $6dd3ba7ab41ebe11$export$c21735bcef00d192,
    __importDefault: $6dd3ba7ab41ebe11$export$da59b14a69baef04,
    __classPrivateFieldGet: $6dd3ba7ab41ebe11$export$d5dcaf168c640c35,
    __classPrivateFieldSet: $6dd3ba7ab41ebe11$export$d40a35129aaff81f,
    __classPrivateFieldIn: $6dd3ba7ab41ebe11$export$81fdc39f203e4e04,
    __addDisposableResource: $6dd3ba7ab41ebe11$export$88ac25d8e944e405,
    __disposeResources: $6dd3ba7ab41ebe11$export$8f076105dc360e92,
    __rewriteRelativeImportExtension: $6dd3ba7ab41ebe11$export$889dfb5d17574b0b
};



var $7b2a0b4b3c09b2f0$exports = {};
!function(t, e) {
    $7b2a0b4b3c09b2f0$exports = e();
}($7b2a0b4b3c09b2f0$exports, function() {
    "use strict";
    var t = 1e3, e = 6e4, n = 36e5, r = "millisecond", i = "second", s = "minute", u = "hour", a = "day", o = "week", c = "month", f = "quarter", h = "year", d = "date", l = "Invalid Date", $ = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, M = {
        name: "en",
        weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        ordinal: function(t) {
            var e = [
                "th",
                "st",
                "nd",
                "rd"
            ], n = t % 100;
            return "[" + t + (e[(n - 20) % 10] || e[n] || e[0]) + "]";
        }
    }, m = function(t, e, n) {
        var r = String(t);
        return !r || r.length >= e ? t : "" + Array(e + 1 - r.length).join(n) + t;
    }, v = {
        s: m,
        z: function(t) {
            var e = -t.utcOffset(), n = Math.abs(e), r = Math.floor(n / 60), i = n % 60;
            return (e <= 0 ? "+" : "-") + m(r, 2, "0") + ":" + m(i, 2, "0");
        },
        m: function t(e, n) {
            if (e.date() < n.date()) return -t(n, e);
            var r = 12 * (n.year() - e.year()) + (n.month() - e.month()), i = e.clone().add(r, c), s = n - i < 0, u = e.clone().add(r + (s ? -1 : 1), c);
            return +(-(r + (n - i) / (s ? i - u : u - i)) || 0);
        },
        a: function(t) {
            return t < 0 ? Math.ceil(t) || 0 : Math.floor(t);
        },
        p: function(t) {
            return ({
                M: c,
                y: h,
                w: o,
                d: a,
                D: d,
                h: u,
                m: s,
                s: i,
                ms: r,
                Q: f
            })[t] || String(t || "").toLowerCase().replace(/s$/, "");
        },
        u: function(t) {
            return void 0 === t;
        }
    }, g = "en", D = {};
    D[g] = M;
    var p = "$isDayjsObject", S = function(t) {
        return t instanceof _ || !(!t || !t[p]);
    }, w = function t(e, n, r) {
        var i;
        if (!e) return g;
        if ("string" == typeof e) {
            var s = e.toLowerCase();
            D[s] && (i = s), n && (D[s] = n, i = s);
            var u = e.split("-");
            if (!i && u.length > 1) return t(u[0]);
        } else {
            var a = e.name;
            D[a] = e, i = a;
        }
        return !r && i && (g = i), i || !r && g;
    }, O = function(t, e) {
        if (S(t)) return t.clone();
        var n = "object" == typeof e ? e : {};
        return n.date = t, n.args = arguments, new _(n);
    }, b = v;
    b.l = w, b.i = S, b.w = function(t, e) {
        return O(t, {
            locale: e.$L,
            utc: e.$u,
            x: e.$x,
            $offset: e.$offset
        });
    };
    var _ = function() {
        function M(t) {
            this.$L = w(t.locale, null, !0), this.parse(t), this.$x = this.$x || t.x || {}, this[p] = !0;
        }
        var m = M.prototype;
        return m.parse = function(t) {
            this.$d = function(t) {
                var e = t.date, n = t.utc;
                if (null === e) return new Date(NaN);
                if (b.u(e)) return new Date;
                if (e instanceof Date) return new Date(e);
                if ("string" == typeof e && !/Z$/i.test(e)) {
                    var r = e.match($);
                    if (r) {
                        var i = r[2] - 1 || 0, s = (r[7] || "0").substring(0, 3);
                        return n ? new Date(Date.UTC(r[1], i, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, s)) : new Date(r[1], i, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, s);
                    }
                }
                return new Date(e);
            }(t), this.init();
        }, m.init = function() {
            var t = this.$d;
            this.$y = t.getFullYear(), this.$M = t.getMonth(), this.$D = t.getDate(), this.$W = t.getDay(), this.$H = t.getHours(), this.$m = t.getMinutes(), this.$s = t.getSeconds(), this.$ms = t.getMilliseconds();
        }, m.$utils = function() {
            return b;
        }, m.isValid = function() {
            return !(this.$d.toString() === l);
        }, m.isSame = function(t, e) {
            var n = O(t);
            return this.startOf(e) <= n && n <= this.endOf(e);
        }, m.isAfter = function(t, e) {
            return O(t) < this.startOf(e);
        }, m.isBefore = function(t, e) {
            return this.endOf(e) < O(t);
        }, m.$g = function(t, e, n) {
            return b.u(t) ? this[e] : this.set(n, t);
        }, m.unix = function() {
            return Math.floor(this.valueOf() / 1e3);
        }, m.valueOf = function() {
            return this.$d.getTime();
        }, m.startOf = function(t, e) {
            var n = this, r = !!b.u(e) || e, f = b.p(t), l = function(t, e) {
                var i = b.w(n.$u ? Date.UTC(n.$y, e, t) : new Date(n.$y, e, t), n);
                return r ? i : i.endOf(a);
            }, $ = function(t, e) {
                return b.w(n.toDate()[t].apply(n.toDate("s"), (r ? [
                    0,
                    0,
                    0,
                    0
                ] : [
                    23,
                    59,
                    59,
                    999
                ]).slice(e)), n);
            }, y = this.$W, M = this.$M, m = this.$D, v = "set" + (this.$u ? "UTC" : "");
            switch(f){
                case h:
                    return r ? l(1, 0) : l(31, 11);
                case c:
                    return r ? l(1, M) : l(0, M + 1);
                case o:
                    var g = this.$locale().weekStart || 0, D = (y < g ? y + 7 : y) - g;
                    return l(r ? m - D : m + (6 - D), M);
                case a:
                case d:
                    return $(v + "Hours", 0);
                case u:
                    return $(v + "Minutes", 1);
                case s:
                    return $(v + "Seconds", 2);
                case i:
                    return $(v + "Milliseconds", 3);
                default:
                    return this.clone();
            }
        }, m.endOf = function(t) {
            return this.startOf(t, !1);
        }, m.$set = function(t, e) {
            var n, o = b.p(t), f = "set" + (this.$u ? "UTC" : ""), l = (n = {}, n[a] = f + "Date", n[d] = f + "Date", n[c] = f + "Month", n[h] = f + "FullYear", n[u] = f + "Hours", n[s] = f + "Minutes", n[i] = f + "Seconds", n[r] = f + "Milliseconds", n)[o], $ = o === a ? this.$D + (e - this.$W) : e;
            if (o === c || o === h) {
                var y = this.clone().set(d, 1);
                y.$d[l]($), y.init(), this.$d = y.set(d, Math.min(this.$D, y.daysInMonth())).$d;
            } else l && this.$d[l]($);
            return this.init(), this;
        }, m.set = function(t, e) {
            return this.clone().$set(t, e);
        }, m.get = function(t) {
            return this[b.p(t)]();
        }, m.add = function(r, f) {
            var d, l = this;
            r = Number(r);
            var $ = b.p(f), y = function(t) {
                var e = O(l);
                return b.w(e.date(e.date() + Math.round(t * r)), l);
            };
            if ($ === c) return this.set(c, this.$M + r);
            if ($ === h) return this.set(h, this.$y + r);
            if ($ === a) return y(1);
            if ($ === o) return y(7);
            var M = (d = {}, d[s] = e, d[u] = n, d[i] = t, d)[$] || 1, m = this.$d.getTime() + r * M;
            return b.w(m, this);
        }, m.subtract = function(t, e) {
            return this.add(-1 * t, e);
        }, m.format = function(t) {
            var e = this, n = this.$locale();
            if (!this.isValid()) return n.invalidDate || l;
            var r = t || "YYYY-MM-DDTHH:mm:ssZ", i = b.z(this), s = this.$H, u = this.$m, a = this.$M, o = n.weekdays, c = n.months, f = n.meridiem, h = function(t, n, i, s) {
                return t && (t[n] || t(e, r)) || i[n].slice(0, s);
            }, d = function(t) {
                return b.s(s % 12 || 12, t, "0");
            }, $ = f || function(t, e, n) {
                var r = t < 12 ? "AM" : "PM";
                return n ? r.toLowerCase() : r;
            };
            return r.replace(y, function(t, r) {
                return r || function(t) {
                    switch(t){
                        case "YY":
                            return String(e.$y).slice(-2);
                        case "YYYY":
                            return b.s(e.$y, 4, "0");
                        case "M":
                            return a + 1;
                        case "MM":
                            return b.s(a + 1, 2, "0");
                        case "MMM":
                            return h(n.monthsShort, a, c, 3);
                        case "MMMM":
                            return h(c, a);
                        case "D":
                            return e.$D;
                        case "DD":
                            return b.s(e.$D, 2, "0");
                        case "d":
                            return String(e.$W);
                        case "dd":
                            return h(n.weekdaysMin, e.$W, o, 2);
                        case "ddd":
                            return h(n.weekdaysShort, e.$W, o, 3);
                        case "dddd":
                            return o[e.$W];
                        case "H":
                            return String(s);
                        case "HH":
                            return b.s(s, 2, "0");
                        case "h":
                            return d(1);
                        case "hh":
                            return d(2);
                        case "a":
                            return $(s, u, !0);
                        case "A":
                            return $(s, u, !1);
                        case "m":
                            return String(u);
                        case "mm":
                            return b.s(u, 2, "0");
                        case "s":
                            return String(e.$s);
                        case "ss":
                            return b.s(e.$s, 2, "0");
                        case "SSS":
                            return b.s(e.$ms, 3, "0");
                        case "Z":
                            return i;
                    }
                    return null;
                }(t) || i.replace(":", "");
            });
        }, m.utcOffset = function() {
            return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, m.diff = function(r, d, l) {
            var $, y = this, M = b.p(d), m = O(r), v = (m.utcOffset() - this.utcOffset()) * e, g = this - m, D = function() {
                return b.m(y, m);
            };
            switch(M){
                case h:
                    $ = D() / 12;
                    break;
                case c:
                    $ = D();
                    break;
                case f:
                    $ = D() / 3;
                    break;
                case o:
                    $ = (g - v) / 6048e5;
                    break;
                case a:
                    $ = (g - v) / 864e5;
                    break;
                case u:
                    $ = g / n;
                    break;
                case s:
                    $ = g / e;
                    break;
                case i:
                    $ = g / t;
                    break;
                default:
                    $ = g;
            }
            return l ? $ : b.a($);
        }, m.daysInMonth = function() {
            return this.endOf(c).$D;
        }, m.$locale = function() {
            return D[this.$L];
        }, m.locale = function(t, e) {
            if (!t) return this.$L;
            var n = this.clone(), r = w(t, e, !0);
            return r && (n.$L = r), n;
        }, m.clone = function() {
            return b.w(this.$d, this);
        }, m.toDate = function() {
            return new Date(this.valueOf());
        }, m.toJSON = function() {
            return this.isValid() ? this.toISOString() : null;
        }, m.toISOString = function() {
            return this.$d.toISOString();
        }, m.toString = function() {
            return this.$d.toUTCString();
        }, M;
    }(), k = _.prototype;
    return O.prototype = k, [
        [
            "$ms",
            r
        ],
        [
            "$s",
            i
        ],
        [
            "$m",
            s
        ],
        [
            "$H",
            u
        ],
        [
            "$W",
            a
        ],
        [
            "$M",
            c
        ],
        [
            "$y",
            h
        ],
        [
            "$D",
            d
        ]
    ].forEach(function(t) {
        k[t[1]] = function(e) {
            return this.$g(e, t[0], t[1]);
        };
    }), O.extend = function(t, e) {
        return t.$i || (t(e, _, O), t.$i = !0), O;
    }, O.locale = w, O.isDayjs = S, O.unix = function(t) {
        return O(1e3 * t);
    }, O.en = D[g], O.Ls = D, O.p = {}, O;
});


var $8cbe425b16190a93$exports = {};
!function(t, s) {
    $8cbe425b16190a93$exports = s();
}($8cbe425b16190a93$exports, function() {
    "use strict";
    var t, s, n = 1e3, i = 6e4, e = 36e5, r = 864e5, o = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, u = 31536e6, d = 2628e6, a = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/, h = {
        years: u,
        months: d,
        days: r,
        hours: e,
        minutes: i,
        seconds: n,
        milliseconds: 1,
        weeks: 6048e5
    }, c = function(t) {
        return t instanceof g;
    }, f = function(t, s, n) {
        return new g(t, n, s.$l);
    }, m = function(t) {
        return s.p(t) + "s";
    }, l = function(t) {
        return t < 0;
    }, $ = function(t) {
        return l(t) ? Math.ceil(t) : Math.floor(t);
    }, y = function(t) {
        return Math.abs(t);
    }, v = function(t, s) {
        return t ? l(t) ? {
            negative: !0,
            format: "" + y(t) + s
        } : {
            negative: !1,
            format: "" + t + s
        } : {
            negative: !1,
            format: ""
        };
    }, g = function() {
        function l(t, s, n) {
            var i = this;
            if (this.$d = {}, this.$l = n, void 0 === t && (this.$ms = 0, this.parseFromMilliseconds()), s) return f(t * h[m(s)], this);
            if ("number" == typeof t) return this.$ms = t, this.parseFromMilliseconds(), this;
            if ("object" == typeof t) return Object.keys(t).forEach(function(s) {
                i.$d[m(s)] = t[s];
            }), this.calMilliseconds(), this;
            if ("string" == typeof t) {
                var e = t.match(a);
                if (e) {
                    var r = e.slice(2).map(function(t) {
                        return null != t ? Number(t) : 0;
                    });
                    return this.$d.years = r[0], this.$d.months = r[1], this.$d.weeks = r[2], this.$d.days = r[3], this.$d.hours = r[4], this.$d.minutes = r[5], this.$d.seconds = r[6], this.calMilliseconds(), this;
                }
            }
            return this;
        }
        var y = l.prototype;
        return y.calMilliseconds = function() {
            var t = this;
            this.$ms = Object.keys(this.$d).reduce(function(s, n) {
                return s + (t.$d[n] || 0) * h[n];
            }, 0);
        }, y.parseFromMilliseconds = function() {
            var t = this.$ms;
            this.$d.years = $(t / u), t %= u, this.$d.months = $(t / d), t %= d, this.$d.days = $(t / r), t %= r, this.$d.hours = $(t / e), t %= e, this.$d.minutes = $(t / i), t %= i, this.$d.seconds = $(t / n), t %= n, this.$d.milliseconds = t;
        }, y.toISOString = function() {
            var t = v(this.$d.years, "Y"), s = v(this.$d.months, "M"), n = +this.$d.days || 0;
            this.$d.weeks && (n += 7 * this.$d.weeks);
            var i = v(n, "D"), e = v(this.$d.hours, "H"), r = v(this.$d.minutes, "M"), o = this.$d.seconds || 0;
            this.$d.milliseconds && (o += this.$d.milliseconds / 1e3, o = Math.round(1e3 * o) / 1e3);
            var u = v(o, "S"), d = t.negative || s.negative || i.negative || e.negative || r.negative || u.negative, a = e.format || r.format || u.format ? "T" : "", h = (d ? "-" : "") + "P" + t.format + s.format + i.format + a + e.format + r.format + u.format;
            return "P" === h || "-P" === h ? "P0D" : h;
        }, y.toJSON = function() {
            return this.toISOString();
        }, y.format = function(t) {
            var n = t || "YYYY-MM-DDTHH:mm:ss", i = {
                Y: this.$d.years,
                YY: s.s(this.$d.years, 2, "0"),
                YYYY: s.s(this.$d.years, 4, "0"),
                M: this.$d.months,
                MM: s.s(this.$d.months, 2, "0"),
                D: this.$d.days,
                DD: s.s(this.$d.days, 2, "0"),
                H: this.$d.hours,
                HH: s.s(this.$d.hours, 2, "0"),
                m: this.$d.minutes,
                mm: s.s(this.$d.minutes, 2, "0"),
                s: this.$d.seconds,
                ss: s.s(this.$d.seconds, 2, "0"),
                SSS: s.s(this.$d.milliseconds, 3, "0")
            };
            return n.replace(o, function(t, s) {
                return s || String(i[t]);
            });
        }, y.as = function(t) {
            return this.$ms / h[m(t)];
        }, y.get = function(t) {
            var s = this.$ms, n = m(t);
            return "milliseconds" === n ? s %= 1e3 : s = "weeks" === n ? $(s / h[n]) : this.$d[n], s || 0;
        }, y.add = function(t, s, n) {
            var i;
            return i = s ? t * h[m(s)] : c(t) ? t.$ms : f(t, this).$ms, f(this.$ms + i * (n ? -1 : 1), this);
        }, y.subtract = function(t, s) {
            return this.add(t, s, !0);
        }, y.locale = function(t) {
            var s = this.clone();
            return s.$l = t, s;
        }, y.clone = function() {
            return f(this.$ms, this);
        }, y.humanize = function(s) {
            return t().add(this.$ms, "ms").locale(this.$l).fromNow(!s);
        }, y.valueOf = function() {
            return this.asMilliseconds();
        }, y.milliseconds = function() {
            return this.get("milliseconds");
        }, y.asMilliseconds = function() {
            return this.as("milliseconds");
        }, y.seconds = function() {
            return this.get("seconds");
        }, y.asSeconds = function() {
            return this.as("seconds");
        }, y.minutes = function() {
            return this.get("minutes");
        }, y.asMinutes = function() {
            return this.as("minutes");
        }, y.hours = function() {
            return this.get("hours");
        }, y.asHours = function() {
            return this.as("hours");
        }, y.days = function() {
            return this.get("days");
        }, y.asDays = function() {
            return this.as("days");
        }, y.weeks = function() {
            return this.get("weeks");
        }, y.asWeeks = function() {
            return this.as("weeks");
        }, y.months = function() {
            return this.get("months");
        }, y.asMonths = function() {
            return this.as("months");
        }, y.years = function() {
            return this.get("years");
        }, y.asYears = function() {
            return this.as("years");
        }, l;
    }(), p = function(t, s, n) {
        return t.add(s.years() * n, "y").add(s.months() * n, "M").add(s.days() * n, "d").add(s.hours() * n, "h").add(s.minutes() * n, "m").add(s.seconds() * n, "s").add(s.milliseconds() * n, "ms");
    };
    return function(n, i, e) {
        t = e, s = e().$utils(), e.duration = function(t, s) {
            var n = e.locale();
            return f(t, {
                $l: n
            }, s);
        }, e.isDuration = c;
        var r = i.prototype.add, o = i.prototype.subtract;
        i.prototype.add = function(t, s) {
            return c(t) ? p(this, t, 1) : r.bind(this)(t, s);
        }, i.prototype.subtract = function(t, s) {
            return c(t) ? p(this, t, -1) : o.bind(this)(t, s);
        };
    };
});


(0, (/*@__PURE__*/$parcel$interopDefault($7b2a0b4b3c09b2f0$exports))).extend((0, (/*@__PURE__*/$parcel$interopDefault($8cbe425b16190a93$exports))));
class $b2cd7c9abb677932$export$cfa71a29f5c0676d {
    constructor(config, controllerId){
        this._isAlarmRinging = false;
        this._mappingMediaPlayer = {
            'turn_on': 'media_play',
            'turn_off': 'media_pause'
        };
        this._alarmActionsScripts = [];
        this._controllerId = controllerId;
        this._config = config;
        this._alarmRinging = $b2cd7c9abb677932$export$4dc2b60021baefca.throttle((state)=>{
            if (state) {
                this._isAlarmRinging = true;
                this._callAlarmRingingService('turn_on');
            } else {
                this._isAlarmRinging = false;
                this._callAlarmRingingService('turn_off');
            }
        }, 1000);
    }
    set hass(hass) {
        this._hass = hass;
        this._controllersAlarmConfig = null;
        this._evaluate();
    }
    get alarmRingingEntity() {
        return this._hass.states[`input_boolean.${this._config.name}`];
    }
    get alarmSoundLocalEntity() {
        return this._hass.states[this._config.alarm_entity_local];
    }
    get alarmClockVariableEntity() {
        return this._hass.states[`sensor.${this._config.name}`];
    }
    get alarmClockPingEntity() {
        if (this._config.ping_entity) return this._hass.states[this._config.ping_entity];
    }
    get controllersAlarmConfig() {
        if (!this._controllersAlarmConfig) {
            if (this._hass.states[`sensor.${this._config.name}`]) this._controllersAlarmConfig = Object.assign(new $b2cd7c9abb677932$export$5df46671f5b4cca6, this._hass.states[`sensor.${this._config.name}`].attributes);
            else {
                alert(`Card requires Variables+History integration whose entity ID is sensor.${this._config.name}`);
                if (this._config.debug) this._hass.callService('system_log', 'write', {
                    'message': `*** Card requires Variables+History integration whose entity ID is sensor.${this._config.name}`,
                    'level': 'info'
                });
            }
        }
        return this._controllersAlarmConfig;
    }
    saveControllersAlarmConfig(configuration) {
        this._saveConfiguration(configuration);
    }
    isConfigCorrect() {
        return this.alarmClockVariableEntity && this.alarmRingingEntity;
    }
    isSafetyConfigSet() {
        return this.alarmClockPingEntity && this.alarmSoundLocalEntity;
    }
    snooze() {
        this.nextAlarmReset(true);
        if (this._config.alarm_actions) this._config.alarm_actions.filter((action)=>action.when === 'on_snooze').forEach((action)=>this._runAction(action));
        this._alarmRinging(false);
    }
    dismiss() {
        this.nextAlarmReset();
        if (this._config.alarm_actions) {
            this._config.alarm_actions.filter((action)=>action.when === 'on_dismiss').forEach((action)=>this._runAction(action));
            this._alarmActionsScripts = [];
        }
        this._alarmRinging(false);
    }
    nextAlarmReset(snooze = false) {
        const controllersAlarmConfig = this.controllersAlarmConfig;
        if (snooze) controllersAlarmConfig.snooze(controllersAlarmConfig['snoozeDurationDefault'].time);
        else controllersAlarmConfig.dismiss();
        this._saveConfiguration(controllersAlarmConfig);
    }
    get nextAlarm() {
        const nextAlarm = this.controllersAlarmConfig.nextAlarm;
        if (!nextAlarm) return {
            enabled: false,
            time: '08:00',
            date: '',
            dateTime: ''
        };
        return nextAlarm;
    }
    set nextAlarm(nextAlarm) {
        const controllersAlarmConfig = this.controllersAlarmConfig;
        const forToday = true;
        controllersAlarmConfig.nextAlarm = {
            ...$b2cd7c9abb677932$export$5df46671f5b4cca6.createNextAlarm(nextAlarm, forToday),
            overridden: true
        };
        this._saveConfiguration(controllersAlarmConfig);
    }
    get isAlarmEnabled() {
        const nextAlarm = this.nextAlarm;
        if (nextAlarm.overridden && nextAlarm.enabled) return true;
        return this.controllersAlarmConfig.alarmsEnabled && nextAlarm.enabled;
    }
    isAlarmRinging() {
        return this._isAlarmRinging;
    }
    evaluateAlarms() {
        this._evaluate();
    }
    _evaluate() {
        const nextAlarm = this.nextAlarm;
        const dateToday = (0, (/*@__PURE__*/$parcel$interopDefault($7b2a0b4b3c09b2f0$exports)))().format('YYYY-MM-DD');
        // if day is ending and nextAlarm is not set for tomorrow, then reset nextAlarm
        if ((0, (/*@__PURE__*/$parcel$interopDefault($7b2a0b4b3c09b2f0$exports)))().format('HH:mm') === '23:58' && nextAlarm.date <= dateToday) {
            this.nextAlarmReset();
            if (this._config.debug) this._hass.callService('system_log', 'write', {
                'message': '*** No nextAlarm for tomorrow; resetting nextAlarm',
                'level': 'info'
            });
        }
        if (!this.controllersAlarmConfig.alarmsEnabled && !nextAlarm.nap) return;
        if (!nextAlarm.enabled) return;
        if (!this.isAlarmRinging() && (0, (/*@__PURE__*/$parcel$interopDefault($7b2a0b4b3c09b2f0$exports)))().format('HH:mm') >= nextAlarm.time && nextAlarm.date === dateToday) this._alarmRinging(true);
        else if (this.isAlarmRinging()) // dismiss alarm automatically after alarmdurationdefault time elapses
        {
            if ((0, (/*@__PURE__*/$parcel$interopDefault($7b2a0b4b3c09b2f0$exports)))(nextAlarm.time, 'HH:mm').add((0, (/*@__PURE__*/$parcel$interopDefault($7b2a0b4b3c09b2f0$exports))).duration($b2cd7c9abb677932$export$4dc2b60021baefca.convertToMinutes(this.controllersAlarmConfig['alarmDurationDefault'].time))).format('HH:mm') <= (0, (/*@__PURE__*/$parcel$interopDefault($7b2a0b4b3c09b2f0$exports)))().format('HH:mm')) this.dismiss();
        } else if (!nextAlarm.snooze && !nextAlarm.nap && this._config.alarm_actions) this._config.alarm_actions.filter((action)=>action.when !== 'on_snooze' && action.when !== 'on_dismiss' && !this._alarmActionsScripts[`${action.entity}-${action.when}`]).filter((action)=>(0, (/*@__PURE__*/$parcel$interopDefault($7b2a0b4b3c09b2f0$exports)))(nextAlarm.time, 'HH:mm').add((0, (/*@__PURE__*/$parcel$interopDefault($7b2a0b4b3c09b2f0$exports))).duration($b2cd7c9abb677932$export$4dc2b60021baefca.convertToMinutes(action.when))).format('HH:mm') === (0, (/*@__PURE__*/$parcel$interopDefault($7b2a0b4b3c09b2f0$exports)))().format('HH:mm')).forEach((action)=>this._runAction(action));
    }
    _runAction(action) {
        const tempAction = {
            service: 'homeassistant.turn_on',
            ...action
        };
        const actionServiceCommand = tempAction.service.split('.');
        this._hass.callService(actionServiceCommand[0], actionServiceCommand[1], {
            "entity_id": tempAction.entity
        });
        this._alarmActionsScripts[`${tempAction.entity}-${tempAction.when}`] = true;
    }
    _callAlarmRingingService(action) {
        if (this._config.debug) this._hass.callService('system_log', 'write', {
            'message': '*** _callAlarmRingingService; action: ' + action + '; controllerID: ' + this._controllerId,
            'level': 'info'
        });
        try {
            if (this.alarmSoundLocalEntity) {
                if (this.alarmClockPingEntity.state === 'off' || action === 'turn_off' || !this._config.alarm_entities) {
                    if (action === 'turn_on' && this.alarmSoundLocalEntity.state !== 'on' || action === 'turn_off' && this.alarmSoundLocalEntity.state !== 'off') this._hass.callService('homeassistant', action, {
                        'entity_id': this._config.alarm_entity_local
                    });
                }
            } else {
                if (this._config.debug) this._hass.callService('system_log', 'write', {
                    'message': '*** alarmSoundLocalEntity is undefined',
                    'level': 'info'
                });
                console.warn('*** _callAlarmRingingService(); alarmSoundLocalEntity is undefined');
            }
            if (this._config.alarm_entities) {
                const entitiesArray = [];
                const ringerEntities = this.controllersAlarmConfig['ringerEntities'] ? JSON.parse(this.controllersAlarmConfig['ringerEntities']) : '';
                for (const entity of this._config.alarm_entities)if (ringerEntities) {
                    for (const ringerEntity of ringerEntities)if (ringerEntity.entity_id === entity && ringerEntity.enabled) entitiesArray.push(entity);
                } else entitiesArray.push(entity);
                for (const entitiesArrayElement of entitiesArray){
                    const entityState = this._hass.states[entitiesArrayElement].state;
                    if (entitiesArrayElement.startsWith('media_player')) {
                        if (action === 'turn_on' && entityState !== 'on' || action === 'turn_off' && entityState !== 'off') this._hass.callService('media_player', this._mappingMediaPlayer[action], {
                            'entity_id': entitiesArrayElement
                        });
                    } else if (action === 'turn_on' && entityState !== 'on' || action === 'turn_off' && entityState !== 'off') this._hass.callService('homeassistant', action, {
                        'entity_id': entitiesArrayElement
                    });
                }
            }
        } catch (err) {
            if (this._config.debug) this._hass.callService('system_log', 'write', {
                'message': '*** _callAlarmRingingService; Error while calling service: ' + err,
                'level': 'info'
            });
            console.warn('*** _callAlarmRingingService(); Error while calling service: ' + err);
            return;
        }
    }
    _saveConfiguration(configuration) {
        let actualConfiguration = configuration;
        if (!(configuration instanceof $b2cd7c9abb677932$export$5df46671f5b4cca6)) {
            actualConfiguration = Object.assign(new $b2cd7c9abb677932$export$5df46671f5b4cca6, configuration);
            console.warn('*** _saveConfiguration(); Submitted configuration is corrupt');
        }
        // reset next alarm after being disabled and now being re-enabled
        if (actualConfiguration.alarmsEnabled && this.controllersAlarmConfig.alarmsEnabled === false) actualConfiguration.dismiss();
        const configurationWithLastUpdated = {
            ...actualConfiguration,
            lastUpdated: (0, (/*@__PURE__*/$parcel$interopDefault($7b2a0b4b3c09b2f0$exports)))().format('YYYY-MM-DD HH:mm:ss')
        };
        const alarmClockVariableEntityName = 'sensor.' + this._config.name;
        const param = {
            entity_id: alarmClockVariableEntityName,
            attributes: configurationWithLastUpdated,
            replace_attributes: true
        };
        if (this.alarmClockPingEntity.state === 'on') {
            this._hass.callService('variable', 'update_sensor', param);
            this._controllersAlarmConfig = Object.assign(new $b2cd7c9abb677932$export$5df46671f5b4cca6, configurationWithLastUpdated);
        } else {
            if (this._config.debug) this._hass.callService('system_log', 'write', {
                'message': '*** Save attempted while clock disconnected from Home Assistant',
                'level': 'info'
            });
            alert('Save failed. No connection to Home Assistant.');
        }
    }
}
class $b2cd7c9abb677932$export$5df46671f5b4cca6 {
    snooze(snoozeTime) {
        const nextAlarmTime = (0, (/*@__PURE__*/$parcel$interopDefault($7b2a0b4b3c09b2f0$exports)))(this.nextAlarm.time, 'HH:mm').add((0, (/*@__PURE__*/$parcel$interopDefault($7b2a0b4b3c09b2f0$exports))).duration($b2cd7c9abb677932$export$4dc2b60021baefca.convertToMinutes(snoozeTime)));
        this.nextAlarm = {
            ...this.nextAlarm,
            enabled: true,
            snooze: true,
            time: nextAlarmTime.format('HH:mm'),
            dateTime: nextAlarmTime.format('YYYY-MM-DD HH:mm')
        };
    }
    dismiss() {
        const momentTomorrow = (0, (/*@__PURE__*/$parcel$interopDefault($7b2a0b4b3c09b2f0$exports)))().add(1, 'day');
        const alarmTomorrow = this[momentTomorrow.format('dd').toLowerCase()];
        this.nextAlarm = $b2cd7c9abb677932$export$5df46671f5b4cca6.createNextAlarm(alarmTomorrow);
    }
    static createNextAlarm(alarm, forToday = false) {
        let alarmDate = (0, (/*@__PURE__*/$parcel$interopDefault($7b2a0b4b3c09b2f0$exports)))();
        if (!(alarm.time >= alarmDate.format('HH:mm') && forToday)) alarmDate = alarmDate.add(1, 'day');
        return {
            ...alarm,
            date: alarmDate.format('YYYY-MM-DD'),
            dateTime: `${alarmDate.format('YYYY-MM-DD')} ${alarm.time}`
        };
    }
    constructor(){
        this.alarmsEnabled = false;
        this.nextAlarm = {
            enabled: false,
            time: '08:00',
            date: '',
            dateTime: ''
        };
        this.mo = {
            enabled: false,
            time: '07:00'
        };
        this.tu = {
            enabled: false,
            time: '07:00'
        };
        this.we = {
            enabled: false,
            time: '07:00'
        };
        this.th = {
            enabled: false,
            time: '07:00'
        };
        this.fr = {
            enabled: false,
            time: '07:00'
        };
        this.sa = {
            enabled: false,
            time: '09:00'
        };
        this.su = {
            enabled: false,
            time: '09:00'
        };
        this.timeFormat = '12hr';
        this.clockFontFace = '0';
        this.clockDefaultFullscreen = false;
        this.snoozeDurationDefault = {
            enabled: true,
            time: '00:15'
        };
        this.alarmDurationDefault = {
            enabled: true,
            time: '00:30'
        };
        this.napDurationDefault = {
            enabled: true,
            time: '00:30'
        };
    }
}
class $b2cd7c9abb677932$export$4dc2b60021baefca {
    static throttle(fn, delay) {
        let timerFlag = null;
        return (...args)=>{
            if (timerFlag === null) {
                fn(...args);
                timerFlag = setTimeout(()=>{
                    timerFlag = null;
                }, delay);
            }
        };
    }
    static convertToMinutes(HHMM) {
        // HHMM is a string in the format "HH:MM" (e.g., "08:30", "-08:30", "00:00", "12:00")
        const [H, M] = HHMM.split(":").map((val)=>parseInt(val));
        // https://dev.to/emnudge/identifying-negative-zero-2j1o
        let minutes = Math.abs(H) * 60 + M;
        minutes *= Math.sign(1 / H || H);
        return {
            'minutes': minutes
        };
    }
}



/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const $22deac181f878bbd$var$t = globalThis, $22deac181f878bbd$export$b4d10f6001c083c2 = $22deac181f878bbd$var$t.ShadowRoot && (void 0 === $22deac181f878bbd$var$t.ShadyCSS || $22deac181f878bbd$var$t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, $22deac181f878bbd$var$s = Symbol(), $22deac181f878bbd$var$o = new WeakMap;
class $22deac181f878bbd$export$505d1e8739bad805 {
    constructor(t, e, o){
        if (this._$cssResult$ = !0, o !== $22deac181f878bbd$var$s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
        this.cssText = t, this.t = e;
    }
    get styleSheet() {
        let t = this.o;
        const s = this.t;
        if ($22deac181f878bbd$export$b4d10f6001c083c2 && void 0 === t) {
            const e = void 0 !== s && 1 === s.length;
            e && (t = $22deac181f878bbd$var$o.get(s)), void 0 === t && ((this.o = t = new CSSStyleSheet).replaceSync(this.cssText), e && $22deac181f878bbd$var$o.set(s, t));
        }
        return t;
    }
    toString() {
        return this.cssText;
    }
}
const $22deac181f878bbd$export$8d80f9cac07cdb3 = (t)=>new $22deac181f878bbd$export$505d1e8739bad805("string" == typeof t ? t : t + "", void 0, $22deac181f878bbd$var$s), $22deac181f878bbd$export$dbf350e5966cf602 = (t, ...e)=>{
    const o = 1 === t.length ? t[0] : e.reduce((e, s, o)=>e + ((t)=>{
            if (!0 === t._$cssResult$) return t.cssText;
            if ("number" == typeof t) return t;
            throw Error("Value passed to 'css' function must be a 'css' function result: " + t + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
        })(s) + t[o + 1], t[0]);
    return new $22deac181f878bbd$export$505d1e8739bad805(o, t, $22deac181f878bbd$var$s);
}, $22deac181f878bbd$export$2ca4a66ec4cecb90 = (s, o)=>{
    if ($22deac181f878bbd$export$b4d10f6001c083c2) s.adoptedStyleSheets = o.map((t)=>t instanceof CSSStyleSheet ? t : t.styleSheet);
    else for (const e of o){
        const o = document.createElement("style"), n = $22deac181f878bbd$var$t.litNonce;
        void 0 !== n && o.setAttribute("nonce", n), o.textContent = e.cssText, s.appendChild(o);
    }
}, $22deac181f878bbd$export$ee69dfd951e24778 = $22deac181f878bbd$export$b4d10f6001c083c2 ? (t)=>t : (t)=>t instanceof CSSStyleSheet ? ((t)=>{
        let e = "";
        for (const s of t.cssRules)e += s.cssText;
        return $22deac181f878bbd$export$8d80f9cac07cdb3(e);
    })(t) : t;


/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const { is: $96fd22fd0b54b3a6$var$i, defineProperty: $96fd22fd0b54b3a6$var$e, getOwnPropertyDescriptor: $96fd22fd0b54b3a6$var$r, getOwnPropertyNames: $96fd22fd0b54b3a6$var$h, getOwnPropertySymbols: $96fd22fd0b54b3a6$var$o, getPrototypeOf: $96fd22fd0b54b3a6$var$n } = Object, $96fd22fd0b54b3a6$var$a = globalThis, $96fd22fd0b54b3a6$var$c = $96fd22fd0b54b3a6$var$a.trustedTypes, $96fd22fd0b54b3a6$var$l = $96fd22fd0b54b3a6$var$c ? $96fd22fd0b54b3a6$var$c.emptyScript : "", $96fd22fd0b54b3a6$var$p = $96fd22fd0b54b3a6$var$a.reactiveElementPolyfillSupport, $96fd22fd0b54b3a6$var$d = (t, s)=>t, $96fd22fd0b54b3a6$export$7312b35fbf521afb = {
    toAttribute (t, s) {
        switch(s){
            case Boolean:
                t = t ? $96fd22fd0b54b3a6$var$l : null;
                break;
            case Object:
            case Array:
                t = null == t ? t : JSON.stringify(t);
        }
        return t;
    },
    fromAttribute (t, s) {
        let i = t;
        switch(s){
            case Boolean:
                i = null !== t;
                break;
            case Number:
                i = null === t ? null : Number(t);
                break;
            case Object:
            case Array:
                try {
                    i = JSON.parse(t);
                } catch (t) {
                    i = null;
                }
        }
        return i;
    }
}, $96fd22fd0b54b3a6$export$53a6892c50694894 = (t, s)=>!$96fd22fd0b54b3a6$var$i(t, s), $96fd22fd0b54b3a6$var$y = {
    attribute: !0,
    type: String,
    converter: $96fd22fd0b54b3a6$export$7312b35fbf521afb,
    reflect: !1,
    hasChanged: $96fd22fd0b54b3a6$export$53a6892c50694894
};
Symbol.metadata ??= Symbol("metadata"), $96fd22fd0b54b3a6$var$a.litPropertyMetadata ??= new WeakMap;
class $96fd22fd0b54b3a6$export$c7c07a37856565d extends HTMLElement {
    static addInitializer(t) {
        this._$Ei(), (this.l ??= []).push(t);
    }
    static get observedAttributes() {
        return this.finalize(), this._$Eh && [
            ...this._$Eh.keys()
        ];
    }
    static createProperty(t, s = $96fd22fd0b54b3a6$var$y) {
        if (s.state && (s.attribute = !1), this._$Ei(), this.elementProperties.set(t, s), !s.noAccessor) {
            const i = Symbol(), r = this.getPropertyDescriptor(t, i, s);
            void 0 !== r && $96fd22fd0b54b3a6$var$e(this.prototype, t, r);
        }
    }
    static getPropertyDescriptor(t, s, i) {
        const { get: e, set: h } = $96fd22fd0b54b3a6$var$r(this.prototype, t) ?? {
            get () {
                return this[s];
            },
            set (t) {
                this[s] = t;
            }
        };
        return {
            get () {
                return e?.call(this);
            },
            set (s) {
                const r = e?.call(this);
                h.call(this, s), this.requestUpdate(t, r, i);
            },
            configurable: !0,
            enumerable: !0
        };
    }
    static getPropertyOptions(t) {
        return this.elementProperties.get(t) ?? $96fd22fd0b54b3a6$var$y;
    }
    static _$Ei() {
        if (this.hasOwnProperty($96fd22fd0b54b3a6$var$d("elementProperties"))) return;
        const t = $96fd22fd0b54b3a6$var$n(this);
        t.finalize(), void 0 !== t.l && (this.l = [
            ...t.l
        ]), this.elementProperties = new Map(t.elementProperties);
    }
    static finalize() {
        if (this.hasOwnProperty($96fd22fd0b54b3a6$var$d("finalized"))) return;
        if (this.finalized = !0, this._$Ei(), this.hasOwnProperty($96fd22fd0b54b3a6$var$d("properties"))) {
            const t = this.properties, s = [
                ...$96fd22fd0b54b3a6$var$h(t),
                ...$96fd22fd0b54b3a6$var$o(t)
            ];
            for (const i of s)this.createProperty(i, t[i]);
        }
        const t = this[Symbol.metadata];
        if (null !== t) {
            const s = litPropertyMetadata.get(t);
            if (void 0 !== s) for (const [t, i] of s)this.elementProperties.set(t, i);
        }
        this._$Eh = new Map;
        for (const [t, s] of this.elementProperties){
            const i = this._$Eu(t, s);
            void 0 !== i && this._$Eh.set(i, t);
        }
        this.elementStyles = this.finalizeStyles(this.styles);
    }
    static finalizeStyles(s) {
        const i = [];
        if (Array.isArray(s)) {
            const e = new Set(s.flat(1 / 0).reverse());
            for (const s of e)i.unshift((0, $22deac181f878bbd$export$ee69dfd951e24778)(s));
        } else void 0 !== s && i.push((0, $22deac181f878bbd$export$ee69dfd951e24778)(s));
        return i;
    }
    static _$Eu(t, s) {
        const i = s.attribute;
        return !1 === i ? void 0 : "string" == typeof i ? i : "string" == typeof t ? t.toLowerCase() : void 0;
    }
    constructor(){
        super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
    }
    _$Ev() {
        this._$ES = new Promise((t)=>this.enableUpdating = t), this._$AL = new Map, this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t)=>t(this));
    }
    addController(t) {
        (this._$EO ??= new Set).add(t), void 0 !== this.renderRoot && this.isConnected && t.hostConnected?.();
    }
    removeController(t) {
        this._$EO?.delete(t);
    }
    _$E_() {
        const t = new Map, s = this.constructor.elementProperties;
        for (const i of s.keys())this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
        t.size > 0 && (this._$Ep = t);
    }
    createRenderRoot() {
        const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
        return (0, $22deac181f878bbd$export$2ca4a66ec4cecb90)(t, this.constructor.elementStyles), t;
    }
    connectedCallback() {
        this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t)=>t.hostConnected?.());
    }
    enableUpdating(t) {}
    disconnectedCallback() {
        this._$EO?.forEach((t)=>t.hostDisconnected?.());
    }
    attributeChangedCallback(t, s, i) {
        this._$AK(t, i);
    }
    _$EC(t, s) {
        const i = this.constructor.elementProperties.get(t), e = this.constructor._$Eu(t, i);
        if (void 0 !== e && !0 === i.reflect) {
            const r = (void 0 !== i.converter?.toAttribute ? i.converter : $96fd22fd0b54b3a6$export$7312b35fbf521afb).toAttribute(s, i.type);
            this._$Em = t, null == r ? this.removeAttribute(e) : this.setAttribute(e, r), this._$Em = null;
        }
    }
    _$AK(t, s) {
        const i = this.constructor, e = i._$Eh.get(t);
        if (void 0 !== e && this._$Em !== e) {
            const t = i.getPropertyOptions(e), r = "function" == typeof t.converter ? {
                fromAttribute: t.converter
            } : void 0 !== t.converter?.fromAttribute ? t.converter : $96fd22fd0b54b3a6$export$7312b35fbf521afb;
            this._$Em = e, this[e] = r.fromAttribute(s, t.type), this._$Em = null;
        }
    }
    requestUpdate(t, s, i) {
        if (void 0 !== t) {
            if (i ??= this.constructor.getPropertyOptions(t), !(i.hasChanged ?? $96fd22fd0b54b3a6$export$53a6892c50694894)(this[t], s)) return;
            this.P(t, s, i);
        }
        !1 === this.isUpdatePending && (this._$ES = this._$ET());
    }
    P(t, s, i) {
        this._$AL.has(t) || this._$AL.set(t, s), !0 === i.reflect && this._$Em !== t && (this._$Ej ??= new Set).add(t);
    }
    async _$ET() {
        this.isUpdatePending = !0;
        try {
            await this._$ES;
        } catch (t) {
            Promise.reject(t);
        }
        const t = this.scheduleUpdate();
        return null != t && await t, !this.isUpdatePending;
    }
    scheduleUpdate() {
        return this.performUpdate();
    }
    performUpdate() {
        if (!this.isUpdatePending) return;
        if (!this.hasUpdated) {
            if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
                for (const [t, s] of this._$Ep)this[t] = s;
                this._$Ep = void 0;
            }
            const t = this.constructor.elementProperties;
            if (t.size > 0) for (const [s, i] of t)!0 !== i.wrapped || this._$AL.has(s) || void 0 === this[s] || this.P(s, this[s], i);
        }
        let t = !1;
        const s = this._$AL;
        try {
            t = this.shouldUpdate(s), t ? (this.willUpdate(s), this._$EO?.forEach((t)=>t.hostUpdate?.()), this.update(s)) : this._$EU();
        } catch (s) {
            throw t = !1, this._$EU(), s;
        }
        t && this._$AE(s);
    }
    willUpdate(t) {}
    _$AE(t) {
        this._$EO?.forEach((t)=>t.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
    }
    _$EU() {
        this._$AL = new Map, this.isUpdatePending = !1;
    }
    get updateComplete() {
        return this.getUpdateComplete();
    }
    getUpdateComplete() {
        return this._$ES;
    }
    shouldUpdate(t) {
        return !0;
    }
    update(t) {
        this._$Ej &&= this._$Ej.forEach((t)=>this._$EC(t, this[t])), this._$EU();
    }
    updated(t) {}
    firstUpdated(t) {}
}
$96fd22fd0b54b3a6$export$c7c07a37856565d.elementStyles = [], $96fd22fd0b54b3a6$export$c7c07a37856565d.shadowRootOptions = {
    mode: "open"
}, $96fd22fd0b54b3a6$export$c7c07a37856565d[$96fd22fd0b54b3a6$var$d("elementProperties")] = new Map, $96fd22fd0b54b3a6$export$c7c07a37856565d[$96fd22fd0b54b3a6$var$d("finalized")] = new Map, $96fd22fd0b54b3a6$var$p?.({
    ReactiveElement: $96fd22fd0b54b3a6$export$c7c07a37856565d
}), ($96fd22fd0b54b3a6$var$a.reactiveElementVersions ??= []).push("2.0.4");


/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const $0f25a2e8805a310f$var$t = globalThis, $0f25a2e8805a310f$var$i = $0f25a2e8805a310f$var$t.trustedTypes, $0f25a2e8805a310f$var$s = $0f25a2e8805a310f$var$i ? $0f25a2e8805a310f$var$i.createPolicy("lit-html", {
    createHTML: (t)=>t
}) : void 0, $0f25a2e8805a310f$var$e = "$lit$", $0f25a2e8805a310f$var$h = `lit$${Math.random().toFixed(9).slice(2)}$`, $0f25a2e8805a310f$var$o = "?" + $0f25a2e8805a310f$var$h, $0f25a2e8805a310f$var$n = `<${$0f25a2e8805a310f$var$o}>`, $0f25a2e8805a310f$var$r = document, $0f25a2e8805a310f$var$l = ()=>$0f25a2e8805a310f$var$r.createComment(""), $0f25a2e8805a310f$var$c = (t)=>null === t || "object" != typeof t && "function" != typeof t, $0f25a2e8805a310f$var$a = Array.isArray, $0f25a2e8805a310f$var$u = (t)=>$0f25a2e8805a310f$var$a(t) || "function" == typeof t?.[Symbol.iterator], $0f25a2e8805a310f$var$d = "[ \t\n\f\r]", $0f25a2e8805a310f$var$f = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, $0f25a2e8805a310f$var$v = /-->/g, $0f25a2e8805a310f$var$_ = />/g, $0f25a2e8805a310f$var$m = RegExp(`>|${$0f25a2e8805a310f$var$d}(?:([^\\s"'>=/]+)(${$0f25a2e8805a310f$var$d}*=${$0f25a2e8805a310f$var$d}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), $0f25a2e8805a310f$var$p = /'/g, $0f25a2e8805a310f$var$g = /"/g, $0f25a2e8805a310f$var$$ = /^(?:script|style|textarea|title)$/i, $0f25a2e8805a310f$var$y = (t)=>(i, ...s)=>({
            _$litType$: t,
            strings: i,
            values: s
        }), $0f25a2e8805a310f$export$c0bb0b647f701bb5 = $0f25a2e8805a310f$var$y(1), $0f25a2e8805a310f$export$7ed1367e7fa1ad68 = $0f25a2e8805a310f$var$y(2), $0f25a2e8805a310f$export$47d5b44d225be5b4 = $0f25a2e8805a310f$var$y(3), $0f25a2e8805a310f$export$9c068ae9cc5db4e8 = Symbol.for("lit-noChange"), $0f25a2e8805a310f$export$45b790e32b2810ee = Symbol.for("lit-nothing"), $0f25a2e8805a310f$var$A = new WeakMap, $0f25a2e8805a310f$var$C = $0f25a2e8805a310f$var$r.createTreeWalker($0f25a2e8805a310f$var$r, 129);
function $0f25a2e8805a310f$var$P(t, i) {
    if (!$0f25a2e8805a310f$var$a(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
    return void 0 !== $0f25a2e8805a310f$var$s ? $0f25a2e8805a310f$var$s.createHTML(i) : i;
}
const $0f25a2e8805a310f$var$V = (t, i)=>{
    const s = t.length - 1, o = [];
    let r, l = 2 === i ? "<svg>" : 3 === i ? "<math>" : "", c = $0f25a2e8805a310f$var$f;
    for(let i = 0; i < s; i++){
        const s = t[i];
        let a, u, d = -1, y = 0;
        for(; y < s.length && (c.lastIndex = y, u = c.exec(s), null !== u);)y = c.lastIndex, c === $0f25a2e8805a310f$var$f ? "!--" === u[1] ? c = $0f25a2e8805a310f$var$v : void 0 !== u[1] ? c = $0f25a2e8805a310f$var$_ : void 0 !== u[2] ? ($0f25a2e8805a310f$var$$.test(u[2]) && (r = RegExp("</" + u[2], "g")), c = $0f25a2e8805a310f$var$m) : void 0 !== u[3] && (c = $0f25a2e8805a310f$var$m) : c === $0f25a2e8805a310f$var$m ? ">" === u[0] ? (c = r ?? $0f25a2e8805a310f$var$f, d = -1) : void 0 === u[1] ? d = -2 : (d = c.lastIndex - u[2].length, a = u[1], c = void 0 === u[3] ? $0f25a2e8805a310f$var$m : '"' === u[3] ? $0f25a2e8805a310f$var$g : $0f25a2e8805a310f$var$p) : c === $0f25a2e8805a310f$var$g || c === $0f25a2e8805a310f$var$p ? c = $0f25a2e8805a310f$var$m : c === $0f25a2e8805a310f$var$v || c === $0f25a2e8805a310f$var$_ ? c = $0f25a2e8805a310f$var$f : (c = $0f25a2e8805a310f$var$m, r = void 0);
        const x = c === $0f25a2e8805a310f$var$m && t[i + 1].startsWith("/>") ? " " : "";
        l += c === $0f25a2e8805a310f$var$f ? s + $0f25a2e8805a310f$var$n : d >= 0 ? (o.push(a), s.slice(0, d) + $0f25a2e8805a310f$var$e + s.slice(d) + $0f25a2e8805a310f$var$h + x) : s + $0f25a2e8805a310f$var$h + (-2 === d ? i : x);
    }
    return [
        $0f25a2e8805a310f$var$P(t, l + (t[s] || "<?>") + (2 === i ? "</svg>" : 3 === i ? "</math>" : "")),
        o
    ];
};
class $0f25a2e8805a310f$var$N {
    constructor({ strings: t, _$litType$: s }, n){
        let r;
        this.parts = [];
        let c = 0, a = 0;
        const u = t.length - 1, d = this.parts, [f, v] = $0f25a2e8805a310f$var$V(t, s);
        if (this.el = $0f25a2e8805a310f$var$N.createElement(f, n), $0f25a2e8805a310f$var$C.currentNode = this.el.content, 2 === s || 3 === s) {
            const t = this.el.content.firstChild;
            t.replaceWith(...t.childNodes);
        }
        for(; null !== (r = $0f25a2e8805a310f$var$C.nextNode()) && d.length < u;){
            if (1 === r.nodeType) {
                if (r.hasAttributes()) for (const t of r.getAttributeNames())if (t.endsWith($0f25a2e8805a310f$var$e)) {
                    const i = v[a++], s = r.getAttribute(t).split($0f25a2e8805a310f$var$h), e = /([.?@])?(.*)/.exec(i);
                    d.push({
                        type: 1,
                        index: c,
                        name: e[2],
                        strings: s,
                        ctor: "." === e[1] ? $0f25a2e8805a310f$var$H : "?" === e[1] ? $0f25a2e8805a310f$var$I : "@" === e[1] ? $0f25a2e8805a310f$var$L : $0f25a2e8805a310f$var$k
                    }), r.removeAttribute(t);
                } else t.startsWith($0f25a2e8805a310f$var$h) && (d.push({
                    type: 6,
                    index: c
                }), r.removeAttribute(t));
                if ($0f25a2e8805a310f$var$$.test(r.tagName)) {
                    const t = r.textContent.split($0f25a2e8805a310f$var$h), s = t.length - 1;
                    if (s > 0) {
                        r.textContent = $0f25a2e8805a310f$var$i ? $0f25a2e8805a310f$var$i.emptyScript : "";
                        for(let i = 0; i < s; i++)r.append(t[i], $0f25a2e8805a310f$var$l()), $0f25a2e8805a310f$var$C.nextNode(), d.push({
                            type: 2,
                            index: ++c
                        });
                        r.append(t[s], $0f25a2e8805a310f$var$l());
                    }
                }
            } else if (8 === r.nodeType) {
                if (r.data === $0f25a2e8805a310f$var$o) d.push({
                    type: 2,
                    index: c
                });
                else {
                    let t = -1;
                    for(; -1 !== (t = r.data.indexOf($0f25a2e8805a310f$var$h, t + 1));)d.push({
                        type: 7,
                        index: c
                    }), t += $0f25a2e8805a310f$var$h.length - 1;
                }
            }
            c++;
        }
    }
    static createElement(t, i) {
        const s = $0f25a2e8805a310f$var$r.createElement("template");
        return s.innerHTML = t, s;
    }
}
function $0f25a2e8805a310f$var$S(t, i, s = t, e) {
    if (i === $0f25a2e8805a310f$export$9c068ae9cc5db4e8) return i;
    let h = void 0 !== e ? s._$Co?.[e] : s._$Cl;
    const o = $0f25a2e8805a310f$var$c(i) ? void 0 : i._$litDirective$;
    return h?.constructor !== o && (h?._$AO?.(!1), void 0 === o ? h = void 0 : (h = new o(t), h._$AT(t, s, e)), void 0 !== e ? (s._$Co ??= [])[e] = h : s._$Cl = h), void 0 !== h && (i = $0f25a2e8805a310f$var$S(t, h._$AS(t, i.values), h, e)), i;
}
class $0f25a2e8805a310f$var$M {
    constructor(t, i){
        this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = i;
    }
    get parentNode() {
        return this._$AM.parentNode;
    }
    get _$AU() {
        return this._$AM._$AU;
    }
    u(t) {
        const { el: { content: i }, parts: s } = this._$AD, e = (t?.creationScope ?? $0f25a2e8805a310f$var$r).importNode(i, !0);
        $0f25a2e8805a310f$var$C.currentNode = e;
        let h = $0f25a2e8805a310f$var$C.nextNode(), o = 0, n = 0, l = s[0];
        for(; void 0 !== l;){
            if (o === l.index) {
                let i;
                2 === l.type ? i = new $0f25a2e8805a310f$var$R(h, h.nextSibling, this, t) : 1 === l.type ? i = new l.ctor(h, l.name, l.strings, this, t) : 6 === l.type && (i = new $0f25a2e8805a310f$var$z(h, this, t)), this._$AV.push(i), l = s[++n];
            }
            o !== l?.index && (h = $0f25a2e8805a310f$var$C.nextNode(), o++);
        }
        return $0f25a2e8805a310f$var$C.currentNode = $0f25a2e8805a310f$var$r, e;
    }
    p(t) {
        let i = 0;
        for (const s of this._$AV)void 0 !== s && (void 0 !== s.strings ? (s._$AI(t, s, i), i += s.strings.length - 2) : s._$AI(t[i])), i++;
    }
}
class $0f25a2e8805a310f$var$R {
    get _$AU() {
        return this._$AM?._$AU ?? this._$Cv;
    }
    constructor(t, i, s, e){
        this.type = 2, this._$AH = $0f25a2e8805a310f$export$45b790e32b2810ee, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = s, this.options = e, this._$Cv = e?.isConnected ?? !0;
    }
    get parentNode() {
        let t = this._$AA.parentNode;
        const i = this._$AM;
        return void 0 !== i && 11 === t?.nodeType && (t = i.parentNode), t;
    }
    get startNode() {
        return this._$AA;
    }
    get endNode() {
        return this._$AB;
    }
    _$AI(t, i = this) {
        t = $0f25a2e8805a310f$var$S(this, t, i), $0f25a2e8805a310f$var$c(t) ? t === $0f25a2e8805a310f$export$45b790e32b2810ee || null == t || "" === t ? (this._$AH !== $0f25a2e8805a310f$export$45b790e32b2810ee && this._$AR(), this._$AH = $0f25a2e8805a310f$export$45b790e32b2810ee) : t !== this._$AH && t !== $0f25a2e8805a310f$export$9c068ae9cc5db4e8 && this._(t) : void 0 !== t._$litType$ ? this.$(t) : void 0 !== t.nodeType ? this.T(t) : $0f25a2e8805a310f$var$u(t) ? this.k(t) : this._(t);
    }
    O(t) {
        return this._$AA.parentNode.insertBefore(t, this._$AB);
    }
    T(t) {
        this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
    }
    _(t) {
        this._$AH !== $0f25a2e8805a310f$export$45b790e32b2810ee && $0f25a2e8805a310f$var$c(this._$AH) ? this._$AA.nextSibling.data = t : this.T($0f25a2e8805a310f$var$r.createTextNode(t)), this._$AH = t;
    }
    $(t) {
        const { values: i, _$litType$: s } = t, e = "number" == typeof s ? this._$AC(t) : (void 0 === s.el && (s.el = $0f25a2e8805a310f$var$N.createElement($0f25a2e8805a310f$var$P(s.h, s.h[0]), this.options)), s);
        if (this._$AH?._$AD === e) this._$AH.p(i);
        else {
            const t = new $0f25a2e8805a310f$var$M(e, this), s = t.u(this.options);
            t.p(i), this.T(s), this._$AH = t;
        }
    }
    _$AC(t) {
        let i = $0f25a2e8805a310f$var$A.get(t.strings);
        return void 0 === i && $0f25a2e8805a310f$var$A.set(t.strings, i = new $0f25a2e8805a310f$var$N(t)), i;
    }
    k(t) {
        $0f25a2e8805a310f$var$a(this._$AH) || (this._$AH = [], this._$AR());
        const i = this._$AH;
        let s, e = 0;
        for (const h of t)e === i.length ? i.push(s = new $0f25a2e8805a310f$var$R(this.O($0f25a2e8805a310f$var$l()), this.O($0f25a2e8805a310f$var$l()), this, this.options)) : s = i[e], s._$AI(h), e++;
        e < i.length && (this._$AR(s && s._$AB.nextSibling, e), i.length = e);
    }
    _$AR(t = this._$AA.nextSibling, i) {
        for(this._$AP?.(!1, !0, i); t && t !== this._$AB;){
            const i = t.nextSibling;
            t.remove(), t = i;
        }
    }
    setConnected(t) {
        void 0 === this._$AM && (this._$Cv = t, this._$AP?.(t));
    }
}
class $0f25a2e8805a310f$var$k {
    get tagName() {
        return this.element.tagName;
    }
    get _$AU() {
        return this._$AM._$AU;
    }
    constructor(t, i, s, e, h){
        this.type = 1, this._$AH = $0f25a2e8805a310f$export$45b790e32b2810ee, this._$AN = void 0, this.element = t, this.name = i, this._$AM = e, this.options = h, s.length > 2 || "" !== s[0] || "" !== s[1] ? (this._$AH = Array(s.length - 1).fill(new String), this.strings = s) : this._$AH = $0f25a2e8805a310f$export$45b790e32b2810ee;
    }
    _$AI(t, i = this, s, e) {
        const h = this.strings;
        let o = !1;
        if (void 0 === h) t = $0f25a2e8805a310f$var$S(this, t, i, 0), o = !$0f25a2e8805a310f$var$c(t) || t !== this._$AH && t !== $0f25a2e8805a310f$export$9c068ae9cc5db4e8, o && (this._$AH = t);
        else {
            const e = t;
            let n, r;
            for(t = h[0], n = 0; n < h.length - 1; n++)r = $0f25a2e8805a310f$var$S(this, e[s + n], i, n), r === $0f25a2e8805a310f$export$9c068ae9cc5db4e8 && (r = this._$AH[n]), o ||= !$0f25a2e8805a310f$var$c(r) || r !== this._$AH[n], r === $0f25a2e8805a310f$export$45b790e32b2810ee ? t = $0f25a2e8805a310f$export$45b790e32b2810ee : t !== $0f25a2e8805a310f$export$45b790e32b2810ee && (t += (r ?? "") + h[n + 1]), this._$AH[n] = r;
        }
        o && !e && this.j(t);
    }
    j(t) {
        t === $0f25a2e8805a310f$export$45b790e32b2810ee ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
    }
}
class $0f25a2e8805a310f$var$H extends $0f25a2e8805a310f$var$k {
    constructor(){
        super(...arguments), this.type = 3;
    }
    j(t) {
        this.element[this.name] = t === $0f25a2e8805a310f$export$45b790e32b2810ee ? void 0 : t;
    }
}
class $0f25a2e8805a310f$var$I extends $0f25a2e8805a310f$var$k {
    constructor(){
        super(...arguments), this.type = 4;
    }
    j(t) {
        this.element.toggleAttribute(this.name, !!t && t !== $0f25a2e8805a310f$export$45b790e32b2810ee);
    }
}
class $0f25a2e8805a310f$var$L extends $0f25a2e8805a310f$var$k {
    constructor(t, i, s, e, h){
        super(t, i, s, e, h), this.type = 5;
    }
    _$AI(t, i = this) {
        if ((t = $0f25a2e8805a310f$var$S(this, t, i, 0) ?? $0f25a2e8805a310f$export$45b790e32b2810ee) === $0f25a2e8805a310f$export$9c068ae9cc5db4e8) return;
        const s = this._$AH, e = t === $0f25a2e8805a310f$export$45b790e32b2810ee && s !== $0f25a2e8805a310f$export$45b790e32b2810ee || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, h = t !== $0f25a2e8805a310f$export$45b790e32b2810ee && (s === $0f25a2e8805a310f$export$45b790e32b2810ee || e);
        e && this.element.removeEventListener(this.name, this, s), h && this.element.addEventListener(this.name, this, t), this._$AH = t;
    }
    handleEvent(t) {
        "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
    }
}
class $0f25a2e8805a310f$var$z {
    constructor(t, i, s){
        this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
    }
    get _$AU() {
        return this._$AM._$AU;
    }
    _$AI(t) {
        $0f25a2e8805a310f$var$S(this, t);
    }
}
const $0f25a2e8805a310f$export$8613d1ca9052b22e = {
    M: $0f25a2e8805a310f$var$e,
    P: $0f25a2e8805a310f$var$h,
    A: $0f25a2e8805a310f$var$o,
    C: 1,
    L: $0f25a2e8805a310f$var$V,
    R: $0f25a2e8805a310f$var$M,
    D: $0f25a2e8805a310f$var$u,
    V: $0f25a2e8805a310f$var$S,
    I: $0f25a2e8805a310f$var$R,
    H: $0f25a2e8805a310f$var$k,
    N: $0f25a2e8805a310f$var$I,
    U: $0f25a2e8805a310f$var$L,
    B: $0f25a2e8805a310f$var$H,
    F: $0f25a2e8805a310f$var$z
}, $0f25a2e8805a310f$var$j = $0f25a2e8805a310f$var$t.litHtmlPolyfillSupport;
$0f25a2e8805a310f$var$j?.($0f25a2e8805a310f$var$N, $0f25a2e8805a310f$var$R), ($0f25a2e8805a310f$var$t.litHtmlVersions ??= []).push("3.2.1");
const $0f25a2e8805a310f$export$b3890eb0ae9dca99 = (t, i, s)=>{
    const e = s?.renderBefore ?? i;
    let h = e._$litPart$;
    if (void 0 === h) {
        const t = s?.renderBefore ?? null;
        e._$litPart$ = h = new $0f25a2e8805a310f$var$R(i.insertBefore($0f25a2e8805a310f$var$l(), t), t, void 0, s ?? {});
    }
    return h._$AI(t), h;
};




/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ class $da1fd7e2c62fd6f3$export$3f2f9f5909897157 extends (0, $96fd22fd0b54b3a6$export$c7c07a37856565d) {
    constructor(){
        super(...arguments), this.renderOptions = {
            host: this
        }, this._$Do = void 0;
    }
    createRenderRoot() {
        const t = super.createRenderRoot();
        return this.renderOptions.renderBefore ??= t.firstChild, t;
    }
    update(t) {
        const s = this.render();
        this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = (0, $0f25a2e8805a310f$export$b3890eb0ae9dca99)(s, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
        super.connectedCallback(), this._$Do?.setConnected(!0);
    }
    disconnectedCallback() {
        super.disconnectedCallback(), this._$Do?.setConnected(!1);
    }
    render() {
        return 0, $0f25a2e8805a310f$export$9c068ae9cc5db4e8;
    }
}
$da1fd7e2c62fd6f3$export$3f2f9f5909897157._$litElement$ = !0, $da1fd7e2c62fd6f3$export$3f2f9f5909897157["finalized"] = !0, globalThis.litElementHydrateSupport?.({
    LitElement: $da1fd7e2c62fd6f3$export$3f2f9f5909897157
});
const $da1fd7e2c62fd6f3$var$i = globalThis.litElementPolyfillSupport;
$da1fd7e2c62fd6f3$var$i?.({
    LitElement: $da1fd7e2c62fd6f3$export$3f2f9f5909897157
});
const $da1fd7e2c62fd6f3$export$f5c524615a7708d6 = {
    _$AK: (t, e, s)=>{
        t._$AK(e, s);
    },
    _$AL: (t)=>t._$AL
};
(globalThis.litElementVersions ??= []).push("4.1.1");


/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const $36782c8777f67bb8$export$6acf61af03e62db = !1;




/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const $fcbcbba309c0f62b$export$da64fc29f17f9d0e = (t)=>(e, o)=>{
        void 0 !== o ? o.addInitializer(()=>{
            customElements.define(t, e);
        }) : customElements.define(t, e);
    };



/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const $6bc2845c2b7eed7f$var$o = {
    attribute: !0,
    type: String,
    converter: (0, $96fd22fd0b54b3a6$export$7312b35fbf521afb),
    reflect: !1,
    hasChanged: (0, $96fd22fd0b54b3a6$export$53a6892c50694894)
}, $6bc2845c2b7eed7f$export$8d623b1670eb40f4 = (t = $6bc2845c2b7eed7f$var$o, e, r)=>{
    const { kind: n, metadata: i } = r;
    let s = globalThis.litPropertyMetadata.get(i);
    if (void 0 === s && globalThis.litPropertyMetadata.set(i, s = new Map), s.set(r.name, t), "accessor" === n) {
        const { name: o } = r;
        return {
            set (r) {
                const n = e.get.call(this);
                e.set.call(this, r), this.requestUpdate(o, n, t);
            },
            init (e) {
                return void 0 !== e && this.P(o, void 0, t), e;
            }
        };
    }
    if ("setter" === n) {
        const { name: o } = r;
        return function(r) {
            const n = this[o];
            e.call(this, r), this.requestUpdate(o, n, t);
        };
    }
    throw Error("Unsupported decorator location: " + n);
};
function $6bc2845c2b7eed7f$export$d541bacb2bda4494(t) {
    return (e, o)=>"object" == typeof o ? $6bc2845c2b7eed7f$export$8d623b1670eb40f4(t, e, o) : ((t, e, o)=>{
            const r = e.hasOwnProperty(o);
            return e.constructor.createProperty(o, r ? {
                ...t,
                wrapped: !0
            } : t), r ? Object.getOwnPropertyDescriptor(e, o) : void 0;
        })(t, e, o);
}



/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ function $e978bded0760ae3c$export$ca000e230c0caa3e(r) {
    return (0, $6bc2845c2b7eed7f$export$d541bacb2bda4494)({
        ...r,
        state: !0,
        attribute: !1
    });
}


/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ function $74ca6c6327ed02c3$export$b2b799818fbabcf3(t) {
    return (n, o)=>{
        const c = "function" == typeof n ? n : n[o];
        Object.assign(c, t);
    };
}


/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const $62a8b41993a7bd7d$export$51987bb50e1f6752 = (e, t, c)=>(c.configurable = !0, c.enumerable = !0, Reflect.decorate && "object" != typeof t && Object.defineProperty(e, t, c), c);


/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ function $08419c1b2039b9cc$export$2fa187e846a241c4(e, r) {
    return (n, s, i)=>{
        const o = (t)=>t.renderRoot?.querySelector(e) ?? null;
        if (r) {
            const { get: e, set: r } = "object" == typeof s ? n : i ?? (()=>{
                const t = Symbol();
                return {
                    get () {
                        return this[t];
                    },
                    set (e) {
                        this[t] = e;
                    }
                };
            })();
            return (0, $62a8b41993a7bd7d$export$51987bb50e1f6752)(n, s, {
                get () {
                    let t = e.call(this);
                    return void 0 === t && (t = o(this), (null !== t || this.hasUpdated) && r.call(this, t)), t;
                }
            });
        }
        return (0, $62a8b41993a7bd7d$export$51987bb50e1f6752)(n, s, {
            get () {
                return o(this);
            }
        });
    };
}



/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ let $48c67a19bc44103d$var$e;
function $48c67a19bc44103d$export$dcd0d083aa86c355(r) {
    return (n, o)=>(0, $62a8b41993a7bd7d$export$51987bb50e1f6752)(n, o, {
            get () {
                return (this.renderRoot ?? ($48c67a19bc44103d$var$e ??= document.createDocumentFragment())).querySelectorAll(r);
            }
        });
}



/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ function $c2894c02d746a119$export$163dfc35cc43f240(r) {
    return (n, e)=>(0, $62a8b41993a7bd7d$export$51987bb50e1f6752)(n, e, {
            async get () {
                return await this.updateComplete, this.renderRoot?.querySelector(r) ?? null;
            }
        });
}



/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ function $de2d948f9a83424a$export$4682af2d9ee91415(o) {
    return (e, n)=>{
        const { slot: r, selector: s } = o ?? {}, c = "slot" + (r ? `[name=${r}]` : ":not([name])");
        return (0, $62a8b41993a7bd7d$export$51987bb50e1f6752)(e, n, {
            get () {
                const t = this.renderRoot?.querySelector(c), e = t?.assignedElements(o) ?? [];
                return void 0 === s ? e : e.filter((t)=>t.matches(s));
            }
        });
    };
}



/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ function $a348d98ad50dac60$export$1bdbe53f9df1b8(n) {
    return (o, r)=>{
        const { slot: e } = n ?? {}, s = "slot" + (e ? `[name=${e}]` : ":not([name])");
        return (0, $62a8b41993a7bd7d$export$51987bb50e1f6752)(o, r, {
            get () {
                const t = this.renderRoot?.querySelector(s);
                return t?.assignedNodes(n) ?? [];
            }
        });
    };
}





var $e60b0d000ec57fbf$exports = {};
!function(e, t) {
    $e60b0d000ec57fbf$exports = t();
}($e60b0d000ec57fbf$exports, function() {
    "use strict";
    var e = {
        LTS: "h:mm:ss A",
        LT: "h:mm A",
        L: "MM/DD/YYYY",
        LL: "MMMM D, YYYY",
        LLL: "MMMM D, YYYY h:mm A",
        LLLL: "dddd, MMMM D, YYYY h:mm A"
    }, t = /(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g, n = /\d/, r = /\d\d/, i = /\d\d?/, o = /\d*[^-_:/,()\s\d]+/, s = {}, a = function(e) {
        return (e = +e) + (e > 68 ? 1900 : 2e3);
    };
    var f = function(e) {
        return function(t) {
            this[e] = +t;
        };
    }, h = [
        /[+-]\d\d:?(\d\d)?|Z/,
        function(e) {
            (this.zone || (this.zone = {})).offset = function(e) {
                if (!e) return 0;
                if ("Z" === e) return 0;
                var t = e.match(/([+-]|\d\d)/g), n = 60 * t[1] + (+t[2] || 0);
                return 0 === n ? 0 : "+" === t[0] ? -n : n;
            }(e);
        }
    ], u = function(e) {
        var t = s[e];
        return t && (t.indexOf ? t : t.s.concat(t.f));
    }, d = function(e, t) {
        var n, r = s.meridiem;
        if (r) {
            for(var i = 1; i <= 24; i += 1)if (e.indexOf(r(i, 0, t)) > -1) {
                n = i > 12;
                break;
            }
        } else n = e === (t ? "pm" : "PM");
        return n;
    }, c = {
        A: [
            o,
            function(e) {
                this.afternoon = d(e, !1);
            }
        ],
        a: [
            o,
            function(e) {
                this.afternoon = d(e, !0);
            }
        ],
        Q: [
            n,
            function(e) {
                this.month = 3 * (e - 1) + 1;
            }
        ],
        S: [
            n,
            function(e) {
                this.milliseconds = 100 * +e;
            }
        ],
        SS: [
            r,
            function(e) {
                this.milliseconds = 10 * +e;
            }
        ],
        SSS: [
            /\d{3}/,
            function(e) {
                this.milliseconds = +e;
            }
        ],
        s: [
            i,
            f("seconds")
        ],
        ss: [
            i,
            f("seconds")
        ],
        m: [
            i,
            f("minutes")
        ],
        mm: [
            i,
            f("minutes")
        ],
        H: [
            i,
            f("hours")
        ],
        h: [
            i,
            f("hours")
        ],
        HH: [
            i,
            f("hours")
        ],
        hh: [
            i,
            f("hours")
        ],
        D: [
            i,
            f("day")
        ],
        DD: [
            r,
            f("day")
        ],
        Do: [
            o,
            function(e) {
                var t = s.ordinal, n = e.match(/\d+/);
                if (this.day = n[0], t) for(var r = 1; r <= 31; r += 1)t(r).replace(/\[|\]/g, "") === e && (this.day = r);
            }
        ],
        w: [
            i,
            f("week")
        ],
        ww: [
            r,
            f("week")
        ],
        M: [
            i,
            f("month")
        ],
        MM: [
            r,
            f("month")
        ],
        MMM: [
            o,
            function(e) {
                var t = u("months"), n = (u("monthsShort") || t.map(function(e) {
                    return e.slice(0, 3);
                })).indexOf(e) + 1;
                if (n < 1) throw new Error;
                this.month = n % 12 || n;
            }
        ],
        MMMM: [
            o,
            function(e) {
                var t = u("months").indexOf(e) + 1;
                if (t < 1) throw new Error;
                this.month = t % 12 || t;
            }
        ],
        Y: [
            /[+-]?\d+/,
            f("year")
        ],
        YY: [
            r,
            function(e) {
                this.year = a(e);
            }
        ],
        YYYY: [
            /\d{4}/,
            f("year")
        ],
        Z: h,
        ZZ: h
    };
    function l(n) {
        var r, i;
        r = n, i = s && s.formats;
        for(var o = (n = r.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, function(t, n, r) {
            var o = r && r.toUpperCase();
            return n || i[r] || e[r] || i[o].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(e, t, n) {
                return t || n.slice(1);
            });
        })).match(t), a = o.length, f = 0; f < a; f += 1){
            var h = o[f], u = c[h], d = u && u[0], l = u && u[1];
            o[f] = l ? {
                regex: d,
                parser: l
            } : h.replace(/^\[|\]$/g, "");
        }
        return function(e) {
            for(var t = {}, n = 0, r = 0; n < a; n += 1){
                var i = o[n];
                if ("string" == typeof i) r += i.length;
                else {
                    var s = i.regex, f = i.parser, h = e.slice(r), u = s.exec(h)[0];
                    f.call(t, u), e = e.replace(u, "");
                }
            }
            return function(e) {
                var t = e.afternoon;
                if (void 0 !== t) {
                    var n = e.hours;
                    t ? n < 12 && (e.hours += 12) : 12 === n && (e.hours = 0), delete e.afternoon;
                }
            }(t), t;
        };
    }
    return function(e, t, n) {
        n.p.customParseFormat = !0, e && e.parseTwoDigitYear && (a = e.parseTwoDigitYear);
        var r = t.prototype, i = r.parse;
        r.parse = function(e) {
            var t = e.date, r = e.utc, o = e.args;
            this.$u = r;
            var a = o[1];
            if ("string" == typeof a) {
                var f = !0 === o[2], h = !0 === o[3], u = f || h, d = o[2];
                h && (d = o[2]), s = this.$locale(), !f && d && (s = n.Ls[d]), this.$d = function(e, t, n, r) {
                    try {
                        if ([
                            "x",
                            "X"
                        ].indexOf(t) > -1) return new Date(("X" === t ? 1e3 : 1) * e);
                        var i = l(t)(e), o = i.year, s = i.month, a = i.day, f = i.hours, h = i.minutes, u = i.seconds, d = i.milliseconds, c = i.zone, m = i.week, M = new Date, Y = a || (o || s ? 1 : M.getDate()), p = o || M.getFullYear(), v = 0;
                        o && !s || (v = s > 0 ? s - 1 : M.getMonth());
                        var D, w = f || 0, g = h || 0, y = u || 0, L = d || 0;
                        return c ? new Date(Date.UTC(p, v, Y, w, g, y, L + 60 * c.offset * 1e3)) : n ? new Date(Date.UTC(p, v, Y, w, g, y, L)) : (D = new Date(p, v, Y, w, g, y, L), m && (D = r(D).week(m).toDate()), D);
                    } catch (e) {
                        return new Date("");
                    }
                }(t, a, r, n), this.init(), d && !0 !== d && (this.$L = this.locale(d).$L), u && t != this.format(a) && (this.$d = new Date("")), s = {};
            } else if (a instanceof Array) for(var c = a.length, m = 1; m <= c; m += 1){
                o[1] = a[m - 1];
                var M = n.apply(this, o);
                if (M.isValid()) {
                    this.$d = M.$d, this.$L = M.$L, this.init();
                    break;
                }
                m === c && (this.$d = new Date(""));
            }
            else i.call(this, e);
        };
    };
});


(0, (/*@__PURE__*/$parcel$interopDefault($7b2a0b4b3c09b2f0$exports))).extend((0, (/*@__PURE__*/$parcel$interopDefault($e60b0d000ec57fbf$exports))));
class $3ce236f40c9404d3$var$AlarmPicker extends (0, $da1fd7e2c62fd6f3$export$3f2f9f5909897157) {
    render() {
        return (0, $0f25a2e8805a310f$export$c0bb0b647f701bb5)`
            <div class="alarm" id="alarmPicker">
                ${this.getAttribute('show-icon') ? (0, $0f25a2e8805a310f$export$c0bb0b647f701bb5)`
                    <ha-icon icon=${this._getAlarmPickerIcon(this.alarm)} @click=${this.openSchedule} class="button"></ha-icon>
                ` : ''}

                <slot></slot>
                <div class=${this.id === 'alarmpicker' ? 'sliders picker' : 'sliders'}>
                    <ha-slider
                        id="hoursSlider"
                        labeled
                        min=${this.id === 'napTimePicker' || this.id === 'snoozeDurationPicker' || this.id === 'alarmDurationPicker' ? 0 : 1}
                        max=${this.id === 'napTimePicker' || this.id === 'snoozeDurationPicker' || this.id === 'alarmDurationPicker' ? 23 : 24}
                        .value=${this._displayedValueH}
                        @change=${this._updateValue}
                    ></ha-slider>
                    <ha-slider
                        id="minutesSlider"
                        labeled
                        min=0
                        max=59
                        .value=${this._displayedValueM}
                        @change=${this._updateValue}
                    ></ha-slider>
                </div>
                <div class=${this.id === 'snoozeDurationPicker' || this.id === 'alarmDurationPicker' ? 'row-options settings-picker' : 'row-options'}
                >
                    <ha-textfield
                        id="alarmTimeInput"
                        pattern="([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]( AM| PM|)"
                        maxlength="8"
                        ?disabled=${this.disabled}
                        .value=${!this.alarm ? '' : (0, (/*@__PURE__*/$parcel$interopDefault($7b2a0b4b3c09b2f0$exports)))(this.alarm.time, 'HH:mm').format(this._alarmTimeFormat())}
                        ?overridden=${this.id === 'alarmpicker' && this.alarmConfiguration.nextAlarm.overridden}
                        @click=${this._clickHandler}
                        readonly
                        >
                    </ha-textfield>
                </div>

                <ha-switch id="alarmEnabledToggleButton" ?checked=${!this.alarm ? false : this.alarm.enabled} @change=${this.toggleAlarmEnabled} ?disabled=${this.disabled} class></ha-switch>

            </div>
        `;
    }
    static #_ = this.styles = (0, $22deac181f878bbd$export$dbf350e5966cf602)`
        @media (max-width: 600px), (max-height: 600px) {
            div#alarmPicker.alarm {
                height: 2rem;
            }
        }

        .alarm {
            display:inline-flex;
            justify-content: space-between;
            align-items: center;
            height: 4rem;
        }

        div#alarmPicker.alarm.open {
            height: 10rem;
        }

        div#alarmPicker .row-options.settings-picker {
            width: 22em;
            text-align: left;
            transition: width 120ms;
        }

        div#alarmPicker.alarm.open .row-options.settings-picker {
            width: 7rem;
        }

        #alarmTimeInput {
            width: 5.1em;
            margin: 0 1em;
        }

        :host([id="alarmpicker"]) #alarmTimeInput {
            filter: invert(1);
            margin: 0 0.5em;
        }

        #alarmTimeInput[overridden] {
            border: 1px dotted black;
            padding: 1px;
        }

        .alarm.open > .sliders {
            margin-left: 1rem;
            width: 14rem;
            overflow: visible;
            animation: delay-overflow 120ms;
        }

        .alarm > .sliders {
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            overflow: hidden;
            transition: width 120ms;
            width: 0;
        }
        :host([id="alarmpicker"]) .alarm > .sliders {
            padding-top: 6rem; backdrop-filter: blur(10px);
        }

        @keyframes delay-overflow {
            from { overflow: hidden; }
        }

        .button {
            cursor: pointer;
        }

        :host([id="alarmpicker"]) #alarmEnabledToggleButton {
            filter: invert(1);
            scale: 1.25;
            margin: 0 0.5rem;
        }

        :host([hide-toggle-button]) #alarmEnabledToggleButton {
            display: none;
        }
    `;
    updated() {
        if (!this._injectStylesDone) {
            this._injectStylesDone = true;
            // inject style into mdc text field, switch, icon
            let allStyle = '.mdc-text-field--filled { padding: 0 !important; } .mdc-text-field__input { font-size: inherit !important; }';
            let pickerStyle = '';
            let pickerOrOptionsDialogStyle = '';
            let myStyle;
            if (this.id == 'alarmpicker') {
                pickerStyle = ' .mdc-text-field__input { color: #969696 !important; } .mdc-line-ripple::before, .mdc-line-ripple::after { border-bottom-width: 0 !important; } .mdc-text-field--filled { height: 2em !important; background-color: white !important; }';
                myStyle = document.createElement('style');
                let switchStyle = 'div.mdc-switch__thumb { box-shadow: 0 0 15px 2px; }';
                myStyle.innerHTML = switchStyle;
                this._alarmPickerSwitchQ.shadowRoot.appendChild(myStyle);
                myStyle = document.createElement('style');
                let iconStyle = 'ha-svg-icon { height: calc(1.5rem + 1vh); width: calc(1.5rem + 1vh); }';
                myStyle.innerHTML = iconStyle;
                this._iconButtonQ.shadowRoot.appendChild(myStyle);
            }
            if (this.parentElement.parentElement.id === 'alarm-picker-dialog-content' || this.parentElement.parentElement.parentElement.parentElement.id === 'settingsDialog') pickerOrOptionsDialogStyle = ' .mdc-text-field--filled { height: 2em !important; }';
            myStyle = document.createElement('style');
            myStyle.innerHTML = allStyle + pickerStyle + pickerOrOptionsDialogStyle;
            this._alarmTimeInputQ.shadowRoot.appendChild(myStyle);
        }
    }
    _clickHandler() {
        let timeArray;
        if (this.id === 'alarmpicker') {
            if (!this._alarmPickerQ.classList.contains('open')) this.dispatchEvent(new CustomEvent('toggle-logo-visibility'));
            const isEnabled = this.alarm.enabled;
            const isOverridden = this.alarmConfiguration.nextAlarm.overridden;
            if (isEnabled && !isOverridden || !isEnabled && !isOverridden) // set sliders to current time
            timeArray = (0, (/*@__PURE__*/$parcel$interopDefault($7b2a0b4b3c09b2f0$exports)))(this.time, 'h:mm A').format('HH:mm').split(':');
            else // set sliders to nextAlarm time
            timeArray = this.alarm.time.split(':');
        } else // set sliders to nextAlarm time
        timeArray = this.alarm.time.split(':');
        this._displayedValueH = timeArray[0];
        this._displayedValueM = timeArray[1];
        this._alarmPickerQ.classList.add('open');
        document.removeEventListener('click', this._clickOutsideAlarmTimeInput);
        document.addEventListener('click', (e)=>{
            this._clickOutsideAlarmTimeInput(e);
        }, false);
    }
    _clickOutsideAlarmTimeInput(event) {
        if (typeof event.composedPath === 'function' && !event.composedPath().includes(this._alarmPickerQ)) {
            if (this.id === 'alarmpicker' && this._alarmPickerQ.classList.contains('open')) this.dispatchEvent(new CustomEvent('toggle-logo-visibility'));
            this._alarmPickerQ.classList.remove('open');
            document.removeEventListener('click', this._clickOutsideAlarmTimeInput);
        }
    }
    _alarmTimeFormat() {
        return this.alarmConfiguration['timeFormat'] === '24hr' || this.id === 'napTimePicker' || this.id === 'snoozeDurationPicker' || this.id === 'alarmDurationPicker' ? 'HH:mm' : 'h:mm A';
    }
    _updateValue(event) {
        const value = event.target.value; //Number((e.target).value);
        event.target.id === 'hoursSlider' ? this._displayedValueH = value : this._displayedValueM = value;
        this._onTimeChanged(this._displayedValueH + ':' + this._displayedValueM);
    }
    _getAlarmPickerIcon(alarm) {
        if (!alarm.enabled) return 'mdi:alarm-off';
        else if (alarm.snooze) return 'mdi:alarm-snooze';
        return 'mdi:alarm';
    }
    _onTimeChanged(timeStr) {
        this.alarm.time = (0, (/*@__PURE__*/$parcel$interopDefault($7b2a0b4b3c09b2f0$exports)))(timeStr, 'HH:mm').format('HH:mm');
        this.alarm.enabled = true;
        // listener for this event is on #alarmpicker element, so only received when "this" used here is #alarmpicker element
        this.dispatchEvent(new CustomEvent('alarm-changed', {
            detail: {
                alarm: this.alarm
            }
        }));
    }
    toggleAlarmEnabled(event) {
        this.alarm.enabled = event.target.checked;
        this.requestUpdate('alarm'); //necessary because lit does not mutate reactive object properties
        this.dispatchEvent(new CustomEvent('alarm-changed', {
            detail: {
                alarm: {
                    time: this.alarm.time,
                    enabled: this.alarm.enabled
                }
            }
        }));
    }
    openSchedule() {
        this.dispatchEvent(new CustomEvent('alarm-button-clicked'));
    }
    get value() {
        return this.alarm;
    }
}
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $e978bded0760ae3c$export$ca000e230c0caa3e)()
], $3ce236f40c9404d3$var$AlarmPicker.prototype, "_displayedValueH", void 0);
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $e978bded0760ae3c$export$ca000e230c0caa3e)()
], $3ce236f40c9404d3$var$AlarmPicker.prototype, "_displayedValueM", void 0);
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $6bc2845c2b7eed7f$export$d541bacb2bda4494)({
        reflect: false
    })
], $3ce236f40c9404d3$var$AlarmPicker.prototype, "alarmConfiguration", void 0);
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $6bc2845c2b7eed7f$export$d541bacb2bda4494)({
        reflect: false
    })
], $3ce236f40c9404d3$var$AlarmPicker.prototype, "alarm", void 0);
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $6bc2845c2b7eed7f$export$d541bacb2bda4494)({
        reflect: false
    })
], $3ce236f40c9404d3$var$AlarmPicker.prototype, "time", void 0);
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $6bc2845c2b7eed7f$export$d541bacb2bda4494)({
        reflect: false
    })
], $3ce236f40c9404d3$var$AlarmPicker.prototype, "disabled", void 0);
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $08419c1b2039b9cc$export$2fa187e846a241c4)('div#alarmPicker.alarm ha-switch')
], $3ce236f40c9404d3$var$AlarmPicker.prototype, "_alarmPickerSwitchQ", void 0);
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $08419c1b2039b9cc$export$2fa187e846a241c4)('div#alarmPicker.alarm ha-textfield#alarmTimeInput', true)
], $3ce236f40c9404d3$var$AlarmPicker.prototype, "_alarmTimeInputQ", void 0);
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $08419c1b2039b9cc$export$2fa187e846a241c4)('ha-icon.button')
], $3ce236f40c9404d3$var$AlarmPicker.prototype, "_iconButtonQ", void 0);
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $08419c1b2039b9cc$export$2fa187e846a241c4)('#alarmPicker', true)
], $3ce236f40c9404d3$var$AlarmPicker.prototype, "_alarmPickerQ", void 0);
$3ce236f40c9404d3$var$AlarmPicker = (0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $fcbcbba309c0f62b$export$da64fc29f17f9d0e)('alarm-picker')
], $3ce236f40c9404d3$var$AlarmPicker);




/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const $d7edc16a278577c6$export$9ba3b3f20a85bfa = {
    ATTRIBUTE: 1,
    CHILD: 2,
    PROPERTY: 3,
    BOOLEAN_ATTRIBUTE: 4,
    EVENT: 5,
    ELEMENT: 6
}, $d7edc16a278577c6$export$99b43ad1ed32e735 = (t)=>(...e)=>({
            _$litDirective$: t,
            values: e
        });
class $d7edc16a278577c6$export$befdefbdce210f91 {
    constructor(t){}
    get _$AU() {
        return this._$AM._$AU;
    }
    _$AT(t, e, i) {
        this._$Ct = t, this._$AM = e, this._$Ci = i;
    }
    _$AS(t, e) {
        return this.update(t, e);
    }
    update(t, e) {
        return this.render(...e);
    }
}


/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const $b5ce948eee6979f0$export$56cc687933817664 = (0, $d7edc16a278577c6$export$99b43ad1ed32e735)(class extends (0, $d7edc16a278577c6$export$befdefbdce210f91) {
    constructor(t){
        if (super(t), t.type !== (0, $d7edc16a278577c6$export$9ba3b3f20a85bfa).ATTRIBUTE || "class" !== t.name || t.strings?.length > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
    }
    render(t) {
        return " " + Object.keys(t).filter((s)=>t[s]).join(" ") + " ";
    }
    update(s, [i]) {
        if (void 0 === this.st) {
            this.st = new Set, void 0 !== s.strings && (this.nt = new Set(s.strings.join(" ").split(/\s/).filter((t)=>"" !== t)));
            for(const t in i)i[t] && !this.nt?.has(t) && this.st.add(t);
            return this.render(i);
        }
        const r = s.element.classList;
        for (const t of this.st)t in i || (r.remove(t), this.st.delete(t));
        for(const t in i){
            const s = !!i[t];
            s === this.st.has(t) || this.nt?.has(t) || (s ? (r.add(t), this.st.add(t)) : (r.remove(t), this.st.delete(t)));
        }
        return 0, $0f25a2e8805a310f$export$9c068ae9cc5db4e8;
    }
});







var $5e2bd162b336a82b$exports = {};
!function(r, e) {
    $5e2bd162b336a82b$exports = e();
}($5e2bd162b336a82b$exports, function() {
    "use strict";
    return function(r, e, t) {
        r = r || {};
        var n = e.prototype, o = {
            future: "in %s",
            past: "%s ago",
            s: "a few seconds",
            m: "a minute",
            mm: "%d minutes",
            h: "an hour",
            hh: "%d hours",
            d: "a day",
            dd: "%d days",
            M: "a month",
            MM: "%d months",
            y: "a year",
            yy: "%d years"
        };
        function i(r, e, t, o) {
            return n.fromToBase(r, e, t, o);
        }
        t.en.relativeTime = o, n.fromToBase = function(e, n, i, d, u) {
            for(var f, a, s, l = i.$locale().relativeTime || o, h = r.thresholds || [
                {
                    l: "s",
                    r: 44,
                    d: "second"
                },
                {
                    l: "m",
                    r: 89
                },
                {
                    l: "mm",
                    r: 44,
                    d: "minute"
                },
                {
                    l: "h",
                    r: 89
                },
                {
                    l: "hh",
                    r: 21,
                    d: "hour"
                },
                {
                    l: "d",
                    r: 35
                },
                {
                    l: "dd",
                    r: 25,
                    d: "day"
                },
                {
                    l: "M",
                    r: 45
                },
                {
                    l: "MM",
                    r: 10,
                    d: "month"
                },
                {
                    l: "y",
                    r: 17
                },
                {
                    l: "yy",
                    d: "year"
                }
            ], m = h.length, c = 0; c < m; c += 1){
                var y = h[c];
                y.d && (f = d ? t(e).diff(i, y.d, !0) : i.diff(e, y.d, !0));
                var p = (r.rounding || Math.round)(Math.abs(f));
                if (s = f > 0, p <= y.r || !y.r) {
                    p <= 1 && c > 0 && (y = h[c - 1]);
                    var v = l[y.l];
                    u && (p = u("" + p)), a = "string" == typeof v ? v.replace("%d", p) : v(p, n, y.l, s);
                    break;
                }
            }
            if (n) return a;
            var M = s ? l.future : l.past;
            return "function" == typeof M ? M(a) : M.replace("%s", a);
        }, n.to = function(r, e) {
            return i(r, e, this, !0);
        }, n.from = function(r, e) {
            return i(r, e, this);
        };
        var d = function(r) {
            return r.$u ? t.utc() : t();
        };
        n.toNow = function(r) {
            return this.to(d(this), r);
        }, n.fromNow = function(r) {
            return this.from(d(this), r);
        };
    };
});


function $2109a11e0895c6b1$var$loadCSS(url) {
    const link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
}
$2109a11e0895c6b1$var$loadCSS('https://fonts.googleapis.com/css2?family=Noto+Sans:wdth,wght@87.5,600&display=swap');
$2109a11e0895c6b1$var$loadCSS('https://fonts.googleapis.com/css2?family=Oswald:wght@600&display=swap');
$2109a11e0895c6b1$var$loadCSS('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@600&display=swap');
(0, (/*@__PURE__*/$parcel$interopDefault($7b2a0b4b3c09b2f0$exports))).extend((0, (/*@__PURE__*/$parcel$interopDefault($e60b0d000ec57fbf$exports))));
(0, (/*@__PURE__*/$parcel$interopDefault($7b2a0b4b3c09b2f0$exports))).extend((0, (/*@__PURE__*/$parcel$interopDefault($5e2bd162b336a82b$exports))));
class $2109a11e0895c6b1$var$KoboldAlarmClockCard extends (0, $da1fd7e2c62fd6f3$export$3f2f9f5909897157) {
    connectedCallback() {
        super.connectedCallback();
        if (this._config.debug) {
            this._hass.callService('system_log', 'write', {
                'message': '*** connectedCallback(); _cardID: ' + this._cardId,
                'level': 'info'
            });
            console.warn('*** connectedCallback(); _cardID: ' + this._cardId);
        }
        // recover from disconnect, e.g., HA restart
        window.addEventListener('connection-status', (event)=>{
            if (event.detail === 'connected') {
                if (this._config.debug) {
                    this._hass.callService('system_log', 'write', {
                        'message': '*** Recovering from disconnect',
                        'level': 'info'
                    });
                    console.warn('*** Recovering from disconnect');
                }
                // If temporarily disconnected, reload browser after 90-second delay
                // window.setTimeout(() => {
                //   location.reload();
                // }, 1000 * 90);
                // If HA restarts, reload browser
                window.hassConnection.then(({ conn: conn })=>{
                    conn.subscribeEvents(()=>{
                        location.reload();
                    }, 'homeassistant_started');
                });
            }
        });
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        clearTimeout(this._updateLoopId);
        if (this._config.debug) {
            this._hass.callService('system_log', 'write', {
                'message': '*** disconnectedCallback(); _cardID: ' + this._cardId,
                'level': 'info'
            });
            console.warn(' *** disconnectedCallback(); _cardID: ' + this._cardId);
        }
    }
    render() {
        this._alarmConfiguration = this._alarmController.controllersAlarmConfig;
        this._nextAlarm = this._alarmController.nextAlarm;
        this._ringerEntities = this._ringerEntities || [];
        const alarmEntities = [];
        const ringerEntitiesIds = this._ringerEntities.map((item)=>item.entity_id);
        if (this._config.alarm_entities) // add any alarm_entities that are not already members of ringerEntities
        this._config.alarm_entities.forEach((item)=>{
            if (ringerEntitiesIds.indexOf(item) < 0) alarmEntities.push({
                enabled: true,
                entity_id: item
            });
            if (!this._hass.states[item]) console.warn(`*** render(); Entity ${item} does not exist in HA`);
        });
        else if (!this._config.alarm_entity_local) alert('No alarm_entities and no alarm_entity_local in YAML configuration. One is required for alarm');
        // add alarm_entity_local if not already member of ringerEntities
        if (this._config.alarm_entity_local) {
            if (ringerEntitiesIds.indexOf(this._config.alarm_entity_local) < 0) alarmEntities.push({
                enabled: false,
                entity_id: this._config.alarm_entity_local
            });
        }
        this._ringerEntities = [
            ...alarmEntities,
            ...this._ringerEntities
        ];
        this._alarmClockClasses = this._alarmClockClasses || {};
        this._alarmButtonsClasses = this._alarmButtonsClasses || {};
        this._footClasses = this._footClasses || {};
        this._clockClasses = this._clockClasses || {
            clock: true
        };
        const isAlarmRinging = this._alarmController.isAlarmRinging();
        if (isAlarmRinging && !this._ringingBegun) {
            this._ringingBegun = true;
            this._alarmClockClasses = {
                fullscreen: false
            };
            this._alarmButtonsClasses = {
                showButtons: true
            };
            this._footClasses = {
                hideFoot: false
            };
        } else if (!isAlarmRinging && this._ringingBegun) {
            this._ringingBegun = false;
            this._alarmButtonsClasses = {
                showButtons: false
            };
        }
        return (0, $0f25a2e8805a310f$export$c0bb0b647f701bb5)`
        <ha-card>
          <div>

            <dialog id="scheduleDialog" class="mdc-dialog alarm-picker-dialog"
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="alarm-picker-dialog-title"
                aria-describedby="alarm-picker-dialog-content"
                >
                <div class="mdc-dialog__container">
                    <div class="mdc-dialog__surface">
                        <header id="alarm-picker-dialog-title" class="header-bar mdc-dialog__title">
                          <ha-icon-button
                          slot="navigationIcon"
                          dialogAction="cancel"
                          label="Close"
                          >
                            <ha-icon .icon=${'mdi:close'} class="header-navigation-icon" @click=${()=>this.closeDialog('#scheduleDialog')}></ha-icon>
                          </ha-icon-button>
                          <span class="header-title">Set Schedule</span>
                          <ha-switch ?checked=${this._alarmsEnabled} @change=${()=>{
            this._alarmsEnabled = !this._alarmsEnabled;
        }}></ha-switch>
                        </header>
                        <div id="alarm-picker-dialog-content" class="mdc-dialog__content alarm-picker-dialog-content">
                          <div class="workweek">
                              <alarm-picker id="alarmPickerMo" .alarm=${this._alarmPickerMo} disabled=${!this._alarmsEnabled} .alarmConfiguration=${this._alarmConfiguration}><span>${this._getDayOfWeek(0)}: </span></alarm-picker>
                              <alarm-picker id="alarmPickerTu" .alarm=${this._alarmPickerTu} disabled=${!this._alarmsEnabled} .alarmConfiguration=${this._alarmConfiguration}><span>${this._getDayOfWeek(1)}: </span></alarm-picker>
                              <alarm-picker id="alarmPickerWe" .alarm=${this._alarmPickerWe} disabled=${!this._alarmsEnabled} .alarmConfiguration=${this._alarmConfiguration}><span>${this._getDayOfWeek(2)}: </span></alarm-picker>
                              <alarm-picker id="alarmPickerTh" .alarm=${this._alarmPickerTh} disabled=${!this._alarmsEnabled} .alarmConfiguration=${this._alarmConfiguration}><span>${this._getDayOfWeek(3)}: </span></alarm-picker>
                              <alarm-picker id="alarmPickerFr" .alarm=${this._alarmPickerFr} disabled=${!this._alarmsEnabled} .alarmConfiguration=${this._alarmConfiguration}><span>${this._getDayOfWeek(4)}: </span></alarm-picker>
                              <alarm-picker id="alarmPickerSa" .alarm=${this._alarmPickerSa} disabled=${!this._alarmsEnabled} .alarmConfiguration=${this._alarmConfiguration}><span>${this._getDayOfWeek(5)}: </span></alarm-picker>
                              <alarm-picker id="alarmPickerSu" .alarm=${this._alarmPickerSu} disabled=${!this._alarmsEnabled} .alarmConfiguration=${this._alarmConfiguration}><span>${this._getDayOfWeek(6)}: </span></alarm-picker>
                          </div>
                          <div class="alarm-picker-dialog-buttons dialog-buttons">
                            <ha-button @click=${this.saveAndCloseAlarmPicker} raised>Save</ha-button>
                          </div>
                        </div>
                    </div>
                </div>
                <div class="mdc-dialog__scrim" @click=${()=>this.closeDialog('#scheduleDialog')}></div>
            </dialog>

            <dialog id="napDialog" class="mdc-dialog alarm-nap-dialog"
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="alarm-nap-dialog-title"
                aria-describedby="alarm-nap-dialog-content"
                >
                <div class="mdc-dialog__container">
                    <div class="mdc-dialog__surface">
                        <header id="alarm-nap-dialog-title" class="header-bar mdc-dialog__title">
                          <ha-icon-button
                          slot="navigationIcon"
                          dialogAction="cancel"
                          label="Close"
                          >
                            <ha-icon .icon=${'mdi:close'} class="header-navigation-icon" @click=${()=>this.closeDialog('#napDialog')}></ha-icon>
                          </ha-icon-button>
                          <span class="header-title">Set Nap Length</span>
                        </header>
                        <div id="alarm-nap-dialog-content" class="mdc-dialog__content alarm-nap-dialog-content">
                          <alarm-picker id="napTimePicker" .alarm=${this._napTime} hide-toggle-button .alarmConfiguration=${this._alarmConfiguration}>
                              <span>Nap Duration: </span>
                          </alarm-picker>
                          <div class="alarm-nap-dialog-buttons dialog-buttons">
                              <ha-button @click=${this.saveAndCloseNap} raised>Save</ha-button>
                              <ha-button @click=${this.clearAndCloseNap} raised>Clear</ha-button>
                          </div>
                        </div>
                    </div>
                </div>
                <div class="mdc-dialog__scrim" @click=${()=>this.closeDialog('#napDialog')}></div>
            </dialog>

            <dialog id="settingsDialog" class="mdc-dialog alarm-settings-dialog"
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="alarm-settings-dialog-title"
              aria-describedby="alarm-settings-dialog-content"
              >
              <div class="mdc-dialog__container">
                <div class="mdc-dialog__surface">
                  <header id="alarm-settings-dialog-title" class="header-bar mdc-dialog__title">
                    <ha-icon-button
                    slot="navigationIcon"
                    dialogAction="cancel"
                    label="Close"
                    >
                      <ha-icon .icon=${'mdi:close'} class="header-navigation-icon" @click=${()=>this.closeDialog('#settingsDialog')}></ha-icon>
                    </ha-icon-button>
                    <span class="header-title">Set Preferences</span>
                  </header>
                  <div id="alarm-settings-dialog-content" class="mdc-dialog__content alarm-settings-dialog-content">
                    <div id="alarmRingers" class="switches-group-table">
                      <div class="switches-group-row">
                        <span>Alarm Ringers:</span>
                        <div class="switches-group-options">
                          ${this._ringerEntities.map((entity, i)=>(0, $0f25a2e8805a310f$export$c0bb0b647f701bb5)`
                              <div class="switch-row">
                                <div class="switch-row-group">
                                  <ha-textfield
                                    id="ringer-text-${i}"
                                    class="ringer-text"
                                    .value=${this._hass.states[entity.entity_id] ? this._hass.states[entity.entity_id].attributes.friendly_name : 'No ringer entity found'}
                                    readonly
                                    >
                                  </ha-textfield>
                                  <ha-switch id="ringer-switch-${i}" class="ringer-switch" ?checked=${entity.enabled} @change=${this._handleSwitchRingerEntity}></ha-switch>
                                </div>
                              </div>
                            `)}
                        </div>
                      </div>
                    </div>
                    <div id="timeFormat" class="radio-row">
                      <div class="radio-row-group">
                        <span>Time Format:</span>
                        <div class="radio-row-options">
                          <ha-formfield
                          label="24hr"
                          >
                            <ha-radio
                                @change=${this._handleRadioValueTimeFormat}
                                value="24hr"
                                name="24hr"
                                ?checked=${this._timeFormat === '24hr'}
                            >
                            </ha-radio>
                          </ha-formfield>
                          <ha-formfield
                          label="12hr"
                          >
                            <ha-radio
                                @change=${this._handleRadioValueTimeFormat}
                                value="12hr"
                                name="12hr"
                                ?checked=${this._timeFormat === '12hr'}
                            >
                            </ha-radio>
                          </ha-formfield>
                        </div>
                      </div>
                    </div>
                    <div id="clockFontFace" class="radio-row">
                      <div class="radio-row-group">
                        <span>Clock Display Font:</span>
                        <div class="radio-row-options">
                          <ha-formfield
                          label="System"
                          >
                            <ha-radio
                                @change=${this._handleRadioValueClockFontFace}
                                value="0"
                                name="0"
                                ?checked=${this._clockFontFace === '0'}
                            >
                            </ha-radio>
                          </ha-formfield>
                          <ha-formfield
                          label="1"
                          >
                            <ha-radio
                                @change=${this._handleRadioValueClockFontFace}
                                value="1"
                                name="1"
                                ?checked=${this._clockFontFace === '1'}
                            >
                            </ha-radio>
                          </ha-formfield>
                          <ha-formfield
                          label="2"
                          >
                            <ha-radio
                                @change=${this._handleRadioValueClockFontFace}
                                value="2"
                                name="2"
                                ?checked=${this._clockFontFace === '2'}
                            >
                            </ha-radio>
                          </ha-formfield>
                          <ha-formfield
                          label="3"
                          >
                            <ha-radio
                                @change=${this._handleRadioValueClockFontFace}
                                value="3"
                                name="3"
                                ?checked=${this._clockFontFace === '3'}
                            >
                            </ha-radio>
                          </ha-formfield>
                        </div>
                      </div>
                    </div>
                    <div class="switches-group-table">
                        <div class="switches-group-row fullscreen-row">
                        <span>Hide Cards Default:</span>
                            <div class="switches-group-options">
                                <div class="switch-row">
                                    <div class="switch-row-group">
                                        <ha-switch
                                            id="clockDefaultFullscreen"
                                            class="fullscreen-switch"
                                            ?checked=${this._clockDefaultFullscreen}
                                            @change=${(e)=>{
            this._clockDefaultFullscreen = e.target.checked;
        }}>
                                        </ha-switch>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <alarm-picker id="snoozeDurationPicker" .alarm=${this._snoozeDurationDefault} hide-toggle-button .alarmConfiguration=${this._alarmConfiguration}>
                      <span>Snooze Duration: </span>
                    </alarm-picker>
                    <alarm-picker id="alarmDurationPicker" .alarm=${this._alarmDurationDefault} hide-toggle-button .alarmConfiguration=${this._alarmConfiguration}>
                      <span>Alarm Duration: </span>
                    </alarm-picker>
                    <div class="alarm-settings-dialog-buttons dialog-buttons">
                      <ha-button @click=${this.saveAndCloseSettings} raised>Save</ha-button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mdc-dialog__scrim" @click=${()=>this.closeDialog('#settingsDialog')}></div>
            </dialog>

            <div id="alarmclock" class=${(0, $b5ce948eee6979f0$export$56cc687933817664)(this._alarmClockClasses)}>
              <div id="alarm-top" class="meta">
                <div id="clockLogo"></div>
                <div id="date"></div>
                <div class="optionButtons">
                  <ha-icon id="settingsButton" class="button" icon="mdi:cog" @click=${this._showSettingsDialog}></ha-icon>
                  <ha-icon id="napButton" class="button" icon="mdi:sleep" @click=${this._showNapDialog}></ha-icon>
                </div>
                ${this._areAlarmsEnabled() ? (0, $0f25a2e8805a310f$export$c0bb0b647f701bb5)`
                    <alarm-picker id="alarmpicker" show-icon="true" .alarm=${this._nextAlarm}
                        .alarmConfiguration=${this._alarmConfiguration}
                        .time=${this._time}
                        @alarm-button-clicked=${this._showAlarmPicker}
                        @alarm-changed=${this._onAlarmChanged}
                        @toggle-logo-visibility=${this._toggleLogoVisibility}
                        ></alarm-picker>
                  ` : (0, $0f25a2e8805a310f$export$c0bb0b647f701bb5)`
                  <ha-icon id="alarmpickerButton" class="button" icon="mdi:alarm"
                                @click=${this._showAlarmPicker}></ha-icon>
                  `}
              </div>
              <div id="clock" class=${(0, $b5ce948eee6979f0$export$56cc687933817664)(this._clockClasses)} @click=${this._toggleAlarmFullscreen}>TIME</div>
            </div>
          </div>
        </ha-card>

        <div id="foot" class=${(0, $b5ce948eee6979f0$export$56cc687933817664)(this._footClasses)}>
          <div id="alarmButtons" class=${(0, $b5ce948eee6979f0$export$56cc687933817664)(this._alarmButtonsClasses)}>
            <div class="alarmButton button">
              <button id="snooze" @click=${this._handleAlarmButtonsClick}>Snooze</button>
            </div>
            <div class="alarmButton button">
              <button id="dismiss" @click=${this._handleAlarmButtonsClick}>Dismiss</button>
            </div>
          </div>

          <div id="extraInfo">
              <div style="text-align: center;">Loading cards...</div>
          </div>
        </div>
      `;
    }
    static #_ = this.styles = (0, $22deac181f878bbd$export$dbf350e5966cf602)`
    /* ************ */
    /* *** main *** */
    /* ************ */

    /* mobile screen sizes */
    @media (max-width: 900px) {
      #alarm-top div#clockLogo {
        display: none;
      }
    }

    #alarmclock {
      padding: 1.5rem;
      height: 65vh;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: height 240ms;
    }

    #alarmclock.fullscreen {
      height: 100vh;
    }

    #alarmclock.fullscreen #clock {
      padding-top: 0;
    }

    #alarm-top {
      font-size: calc(1rem + 1vh);
      display: flex;
      justify-content: space-between;
      height: 4vh;
      white-space: nowrap;
      align-items: center;
      color: var(--secondary-text-color);
    }

    #alarm-top div#clockLogo {
      background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%27750%27%20height%3D%27175%27%20viewBox%3D%270%200%20198.437%2046.302%27%3E%3Cdefs%3E%3Cpath%20id%3D%27a%27%20d%3D%27M134.532%20279.996h1013.197v243.84H134.532z%27%2F%3E%3C%2Fdefs%3E%3Cg%20aria-label%3D%27KOBOLD%27%20style%3D%27font-size%3A192px%3Bline-height%3A1.25%3Bwhite-space%3Apre%3Bshape-inside%3Aurl%28%23a%29%27%20transform%3D%27translate%28-39.822%2011.568%29%20scale%28.26458%29%27%3E%3Cpath%20d%3D%27M297.007%20381.147v7.723l-36.756%2043.764q9.01%2010.87%2018.307%2022.025%209.439%2011.013%2018.45%2021.739v7.723h-23.17l-33.753-40.331H219.92v40.331h-22.311V381.147h22.31v40.331h20.166q3.29-3.718%206.436-7.58%203.147-3.861%206.436-7.723l20.881-25.028zm232.264%2040.474q0%204.005-1%206.58%202.144%202.717%203.575%206.292%201.43%203.433%201.43%207.151v21.31q0%204.434-1.716%208.295-1.717%203.862-4.577%206.722-2.86%202.86-6.722%204.577-3.861%201.573-8.295%201.573h-81.664V381.147h77.802q4.291%200%208.153%201.716%203.861%201.573%206.721%204.434%203.004%202.86%204.577%206.722%201.716%203.861%201.716%208.295zM452.47%20461.81h58.352v-18.879H452.47Zm0-41.19h54.347v-17.162H452.47Zm222.958-39.616h22.168v80.806h80.807v22.311H675.428Zm193.22.143q4.434%200%208.295%201.716%203.862%201.573%206.722%204.434%202.86%202.86%204.577%206.722%201.716%203.861%201.716%208.295v60.64q0%204.434-1.716%208.295-1.717%203.862-4.577%206.722-2.86%202.86-6.722%204.577-3.861%201.573-8.295%201.573h-81.664V381.147Zm-59.496%2080.663h58.352v-58.352h-58.352z%27%20style%3D%27font-family%3AOrbitron%3B-inkscape-font-specification%3AOrbitron%3Bstroke-width%3A.744895%27%20transform%3D%27translate%28-33.794%20-401.053%29%20scale%281.02854%29%27%2F%3E%3Cpath%20d%3D%27M419.64%20675.367A117.536%20117.536%200%200%200%20302.101%20792.9%20117.536%20117.536%200%200%200%20419.64%20910.437%20117.536%20117.536%200%200%200%20537.172%20792.9%20117.536%20117.536%200%200%200%20419.64%20675.367Zm-.71%2012.63%203.237%2036.913%203.195%2036.426h.043l-.032.141.032.346h-.106l-3.132%2014.648-3.237%2015.135-3.237-15.135-3.135-14.648h-.102l.028-.346-.028-.14h.042l3.195-36.427zm-1.728%20106.955-5.173%208.6-5.007%208.322.078.138-.194.06-.05.081-.031-.056-20.703%206.41-20.977%206.496%2016.118-14.916%2015.9-14.722-.032-.057h.095l.148-.14.082.137%209.71-.173z%27%20style%3D%27fill%3A%23000%3Bstroke-width%3A.999999%27%20transform%3D%27translate%2895.652%20-407.931%29%20scale%28.56969%29%27%2F%3E%3Cpath%20d%3D%27M705.391%20675.367A117.536%20117.536%200%200%200%20587.855%20792.9%20117.536%20117.536%200%200%200%20705.39%20910.437%20117.536%20117.536%200%200%200%20822.925%20792.9%20117.536%20117.536%200%200%200%20705.39%20675.367Zm.54%2012.63%203.237%2036.913%203.195%2036.426h.042l-.032.141.032.346h-.106l-3.131%2014.648-3.237%2015.135-3.24-15.135-3.132-14.648h-.102l.028-.346-.028-.14h.042l3.191-36.427zm1.57%20106.856%2010.035.18%209.715.173.077-.138.152.141h.091l-.031.057%2015.9%2014.722%2016.118%2014.916-20.978-6.495-20.699-6.411-.031.056-.05-.08-.197-.06.077-.138-5.007-8.322z%27%20style%3D%27fill%3A%23000%3Bstroke-width%3A.999999%27%20transform%3D%27translate%28185.991%20-407.931%29%20scale%28.56969%29%27%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E");

      height: calc(0.55em + 1vh);
      width: 100%;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center center;
      filter: invert(1) brightness(0.41); /* match --secondary-text-color */
      position: absolute;
    }

    #clock {
      transition: padding-top 240ms;
      padding-top: 0.15em;
      padding-right: 0.05em;
      display: flex;
      justify-content: center;
      height: 100%;
      font-size: 40vh;
      letter-spacing: -0.02em;
      font-weight: 500;
      align-items: center;
      white-space: nowrap;
      text-shadow: 0 0 0.04em var(--primary-text-color);
    }
    #clock .periodName {
      position: relative;
      bottom: 2.2vh;
      margin-left: -0.2em;
      font-size: 31%;
      font-weight: 900;
      writing-mode: vertical-lr;
      text-orientation: upright;
      letter-spacing: -0.15em;
    }
    #clock .periodKern {
      margin-left: -0.3em !important;
    }
    #clock .colonKern {
      margin-left: -0.1em !important;
    }
    #clock .colon {
      position: relative;
      bottom: 3.3vh;
    }

    #clock.fontFace1 {
      font-family: 'Noto Sans', sans-serif;
      font-optical-sizing: auto;
      font-weight: 600;
      font-style: normal;
      font-variation-settings: 'wdth' 87.5;
      letter-spacing: 0;
    }
    #clock.fontFace1 .periodName {
      bottom: 5.2vh;
      letter-spacing: -0.4em;
    }
    #clock.fontFace1 .periodKern {
      margin-left: -0.3em !important;
    }

    #clock.fontFace2 {
      font-family: 'Oswald', sans-serif;
      font-optical-sizing: auto;
      font-weight: 600;
      font-style: normal;
      letter-spacing: 0;
    }
    #clock.fontFace2 .colonKern {
      margin-left: -0.05em !important;
    }
    #clock.fontFace2 .periodName {
      bottom: 5.4vh;
      letter-spacing: -0.4em;
    }

    #clock.fontFace3 {
      font-family: 'IBM Plex Sans', sans-serif;
      font-weight: 600;
      font-style: normal;
      letter-spacing: 0;
    }
    #clock.fontFace3 .periodName {
      letter-spacing: -0.2em;
    }
    #clock.fontFace3 .colonKern {
      margin-left: 0 !important;
    }

    .optionButtons {
      text-align: right;
      width: 100%;
      margin-right: 1em;
      display: flex;
      justify-content: space-between;
    }

    #settingsButton {
      margin: 0 1em;
    }

    #foot {
      position: relative;
      height: 35vh;
      display: flex;
      transition: height 240ms;
    }

     #foot.hideFoot {
      height: 0;
      overflow: hidden;
    }

    #alarmButtons, #extraInfo {
      justify-content: space-between;
      box-sizing: border-box;
      height: 35vh;
      gap: 10px;
    }

    #extraInfo {
      display: flex;
      position: absolute;
      width: 100%;
      top: 0;
    }

    #alarmButtons {
      display: none;
      position: relative;
      z-index: 8;
      background: var(--ha-card-background,var(--card-background-color,#fff));
      flex: auto;
    }

    #alarmButtons.showButtons {
      display: flex;
    }

    #alarmButtons > *, #extraInfo > * {
      flex: 1 1 0;
    }

    .button {
      cursor: pointer;
    }

    .alarmButton {
      display: flex;
      justify-content: center;
      height: 100%;
    }

    .alarmButton button {
      color: black !important;
      background-color: white;
      font-size: 4em;
      font-weight: 900;
      width: 100%;
      border-radius: 12px;
      box-shadow: 0 0 5px -1px white;
      transition: background-color 120ms;
      text-shadow: 0 0 5px rgba(0,0,0,0.4);
    }

    .alarmButton button:hover {
      background-color: rgba(255,255,255,0.90);
    }

    /* *************** */
    /* *** dialogs *** */
    /* *************** */

    /* mobile screen sizes */
    @media (max-width: 600px), (max-height: 600px) {
      dialog {
        --dialog-surface-margin-top: 0px;
        --mdc-dialog-min-width: calc( 100vw - env(safe-area-inset-right) - env(safe-area-inset-left) );
        --mdc-dialog-max-width: calc( 100vw - env(safe-area-inset-right) - env(safe-area-inset-left) );
        --mdc-dialog-min-height: 100%;
        --mdc-dialog-max-height: 100%;
        --ha-dialog-border-radius: 0;
      }

      .mdc-dialog .mdc-dialog__content {
        padding-top: 0 !important;
      }

      #alarm-nap-dialog-content {
        padding-top: 25vh !important;
      }
      #alarm-nap-dialog-content .alarm-nap-dialog-buttons {
        padding-top: 10vh !important;
      }

      #alarm-settings-dialog-content div.radio-row span {
        line-height: 2em;
        display: block;
      }
      #alarm-settings-dialog-content div.radio-row .radio-row-group .radio-row-options {
        height: 2em;
      }

      #alarm-settings-dialog-content div.radio-row .radio-row-group .radio-row-options ha-radio {
        margin-left: 0;
      }

      #alarm-settings-dialog-content div.switch-row .switch-row-group {
        height: 2em;
      }
    }

    @media (min-width: 601px) and (min-height: 601px) {
      dialog {
        --mdc-dialog-min-width: 580px;
        --mdc-dialog-max-width: 580px;
        --mdc-dialog-max-height: calc(100% - 72px);
      }
    }

    dialog[open] {
      z-index: 99;
    }

    dialog {
      background: none;
      padding: 0;
      border: medium none;
    }

    .mdc-dialog, .mdc-dialog__scrim {
      background-color: var(--mdc-dialog-scrim-color,rgba(0,0,0,.32));
      position: fixed;
      top: 0px;
      left: 0px;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
    }

    .mdc-dialog__container {
      align-items: var(--vertical-align-dialog,center);
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      box-sizing: border-box;
      height: 100%;
    }

    .mdc-dialog__surface {
      border: 1px solid var(--primary-background-color);
      z-index: var(--dialog-z-index, 8);
      transform: scale(.8);
      opacity: 0;
      transition: opacity 120ms, transform 120ms;
      position: var(--dialog-surface-position, relative);
      top: var(--dialog-surface-top);
      margin-top: var(--dialog-surface-margin-top);
      min-height: var(--mdc-dialog-min-height, auto);
      min-width: var(--mdc-dialog-min-width,280px);
      border-radius: 28px;
      -webkit-backdrop-filter: var(--ha-dialog-surface-backdrop-filter, none);
      backdrop-filter: var(--ha-dialog-surface-backdrop-filter, none);
      background: var(
        --ha-dialog-surface-background,
        var(--mdc-theme-surface, #fff)
      );
      box-shadow: var(
        --mdc-dialog-box-shadow,0px 11px 15px -7px rgba(0,0,0,.2),0px 24px 38px 3px rgba(0,0,0,.14),0px 9px 46px 8px rgba(0,0,0,.12)
      );
    }

    .mdc-dialog.open .mdc-dialog__surface {
      transform: scale(1);
      opacity: 1;
    }

    .mdc-dialog.open {
      backdrop-filter: var(--ha-dialog-scrim-backdrop-filter,var(--dialog-backdrop-filter,none));
    }

    .mdc-dialog__content {
      padding: var(--dialog-content-padding,24px);
      position: var(--dialog-content-position,relative);
      text-align: center;
    }

    .mdc-dialog {
      --mdc-dialog-scroll-divider-color: var(
        --dialog-scroll-divider-color,
        var(--divider-color)
      );
      -webkit-backdrop-filter: var(
        --ha-dialog-scrim-backdrop-filter,
        var(--dialog-backdrop-filter, none)
      );
      backdrop-filter: var(
        --ha-dialog-scrim-backdrop-filter,
        var(--dialog-backdrop-filter, none)
      );
      --mdc-dialog-box-shadow: var(--dialog-box-shadow, none);
      --mdc-typography-headline6-font-weight: 400;
      --mdc-typography-headline6-font-size: 1.574rem;
    }

    .mdc-dialog__container {
      align-items: var(--vertical-align-dialog, center);
    }

    .header-bar {
      padding: 12px;
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      box-sizing: border-box;
    }

    .header-bar ha-switch {
      padding: 16px 12px 0 0;
    }

    .header-navigation-icon {
      flex: 0 0 auto;
      min-width: 8px;
      height: 100%;
      display: flex;
      flex-direction: row;
    }

    .header-title {
      flex: 1 1 0%;
      font-size: 22px;
      line-height: 28px;
      font-weight: 400;
      padding: 10px 4px;
      min-width: 0px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .mdc-dialog__title {
      padding: 24px 24px 0 24px;
    }
    .mdc-dialog__actions {
      padding: 12px 24px 12px 24px;
    }
    .mdc-dialog__title::before {
      content: unset;
    }
    .mdc-dialog .mdc-dialog__content {
      position: var(--dialog-content-position, relative);
      padding: var(--dialog-content-padding, 24px);
    }

    .dialog-buttons {
      display: flex;
      padding: 16px;
      justify-content: space-between;
    }

    /* *************************** */
    /* *** alarm-picker-dialog *** */
    /* *************************** */

    .workweek {
      display: flex;
      flex-direction: column;
    }

    alarm-picker span {
      width: 6.5em;
      text-align: right;
    }

    /* ************************ */
    /* *** alarm-nap-dialog *** */
    /* ************************ */

    #napTimePicker > span {
      width: auto;
    }

    /* ***************************** */
    /* *** alarm-settings-dialog *** */
    /* ***************************** */

    div.radio-row, div.switch-row {
      display: block;
    }

    div.radio-row .radio-row-group, div.switch-row .switch-row-group {
      display: inline-flex;
    }

    div.switch-row .switch-row-group {
      width: 22em;
      height: 4em;
    }

    .radio-row .radio-row-group .radio-row-options {
      display: inline-flex;
      width: 22em;
      height: 4em;
    }

    div.switches-group-table {
      display: table;
      margin: 0 auto;
    }

    div.switches-group-table .ringer-text {
      width: 17em;
      margin: auto 1em;
    }

    div.switches-group-table .switches-group-row {
      display: table-row;
    }

    div.switches-group-table .switches-group-row.fullscreen-row {
      display: flex;
      align-items: center;
    }

    #clockDefaultFullscreen {
      margin: 0 0 0 2em;
    }

    div.switches-group-table .switches-group-row span, div.switches-group-table .switches-group-row .switches-group-options {
      display: table-cell;
    }

    div.switches-group-table .switches-group-row span {
      text-align: right;
      width: 10em;
    }

    .radio-row-group span {
      display: block;
      text-align: right;
      width: 10em;
      line-height: 4em;
    }

    ha-radio {
      margin-left: 1em;
    }

    alarm-picker#snoozeDurationPicker, alarm-picker#alarmDurationPicker {
      display: block;
    }

    alarm-picker#snoozeDurationPicker span, alarm-picker#alarmDurationPicker span {
      width: 10em;
      white-space: nowrap;
    }
  `;
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        this._timeFormat = this._alarmConfiguration['timeFormat'];
        this._clockFontFace = this._alarmConfiguration['clockFontFace'];
        this._toggleAlarmFullscreen(this._alarmConfiguration['clockDefaultFullscreen']);
        this._updateTime();
        this._updateLoop();
        if (this._haCardQ) this._buildCard();
        else console.warn('*** firstUpdated(); Missing <ha-card> in shadowRoot');
        if (!this._alarmController.isSafetyConfigSet()) {
            if (this._config.debug) this._hass.callService('system_log', 'write', {
                'message': '*** Safety config not set: install (1) binary sensor entity from ping integration, and (2) LAN-accessible alarm entity',
                'level': 'info'
            });
            console.warn('*** Safety config not set: install (1) binary sensor entity from ping integration, and (2) LAN-accessible alarm entity');
        }
        this._alarmsEnabled = this._alarmConfiguration.alarmsEnabled;
    }
    // updated(changedProperties: Map<string, any>): void {
    updated() {
        if (!this._injectStylesDone) {
            this._injectStylesDone = true;
            // hide visible line separating sidebar from main view on iOS
            document.querySelector('home-assistant').shadowRoot.querySelector('home-assistant-main').shadowRoot.querySelector('ha-drawer').shadowRoot.querySelector('aside').style.borderRightStyle = 'unset';
            // prevent scrolling
            document.querySelector('body').style.overflow = 'hidden';
            document.querySelector('body').style.position = 'fixed';
            document.querySelector('body').style.width = '100%';
            // inject style into mdc form fields
            let myStyle;
            //  alarm-top styles
            if (this._optionButtonsHostsQ) {
                let optionButtonsStyle = 'ha-svg-icon { height: calc(1.5rem + 1vh); width: calc(1.5rem + 1vh); }';
                this._optionButtonsHostsQ.forEach((optionButtonsHost)=>{
                    myStyle = document.createElement('style');
                    myStyle.innerHTML = optionButtonsStyle;
                    optionButtonsHost.shadowRoot.appendChild(myStyle);
                });
            }
            // settings dialog styles
            if (this._switchHostsQ) {
                let settingsDialogStyle = '.mdc-switch{ margin: auto 0 !important; }';
                this._switchHostsQ.forEach((switchHost)=>{
                    myStyle = document.createElement('style');
                    myStyle.innerHTML = settingsDialogStyle;
                    switchHost.shadowRoot.appendChild(myStyle);
                });
            }
            if (this._textfieldHostsQ) {
                let settingsDialogStyle = '.mdc-text-field--filled { height: 2em !important; }';
                this._textfieldHostsQ.forEach((textfieldHost)=>{
                    myStyle = document.createElement('style');
                    myStyle.innerHTML = settingsDialogStyle;
                    textfieldHost.shadowRoot.appendChild(myStyle);
                });
            }
            if (this._formfieldHostsQ) {
                let settingsDialogStyle = '.mdc-form-field > label { margin-left: -0.5em !important } .mdc-form-field { color: #000000 !important; gap: 0 !important }';
                this._formfieldHostsQ.forEach((formfieldHost)=>{
                    myStyle = document.createElement('style');
                    myStyle.innerHTML = settingsDialogStyle;
                    formfieldHost.shadowRoot.appendChild(myStyle);
                });
            }
        }
    }
    setConfig(config) {
        if (!config) alert('Card config incorrectly formatted or missing.');
        if (!config.cards || !Array.isArray(config.cards)) console.warn('*** setConfig(); No cards available for config');
        // these settings can be overridden by including them in card's yaml config
        this._config = {
            name: 'alarm_clock',
            ...config
        };
        // NOTE: Some cards call setConfig() multiple times during life of card
        if (!this._alarmController) this._alarmController = new (0, $b2cd7c9abb677932$export$cfa71a29f5c0676d)(this._config, this._cardId);
    }
    set hass(hass) {
        this._hass = hass;
        this._alarmController.hass = hass;
        (0, (/*@__PURE__*/$parcel$interopDefault($7b2a0b4b3c09b2f0$exports))).locale(hass.language);
        if (this._elements) this._elements.forEach((element)=>{
            // console.log('*** TEMP: setConfig element: ', element);
            element.hass = hass;
        });
    }
    getCardSize() {
        return 3;
    }
    _buildCard() {
        if (!this._rootQ) console.warn('*** _buildCard(); Card root (element id extraInfo) not available');
        while(this._rootQ.lastChild)this._rootQ.removeChild(this._rootQ.lastChild);
        const config = this._config;
        if (config.cards) {
            const elements = this._elements = [];
            Promise.all(config.cards.map(async (card)=>{
                const element = await this._createCardElement(card);
                if (card.type === 'media-control') element.setAttribute('type-media-control', 'true');
                elements.push(element);
                this._rootQ.appendChild(element);
            })).catch((error)=>{
                console.error('*** Error while creating card element: ', error.message);
            }).then(()=>{
                this._elements = elements;
                this._elements.forEach((element)=>{
                    $2109a11e0895c6b1$var$HeightUpdater.updateHeight(element);
                    if (this._hass) element.hass = this._hass;
                    else console.warn('*** _buildCard(); No hass object available for config');
                });
            });
        }
        if (!this._alarmController.isConfigCorrect()) alert(`Card requires two integration entities: input boolean helper and Variables+History whose entity IDs are: sensor.${config.name} and input_boolean.${config.name}`);
    }
    async _createCardElement(card) {
        let element;
        try {
            this._cardHelpers = await window.loadCardHelpers();
            element = await this._cardHelpers.createCardElement(card);
            if (this._hass) element.hass = this._hass;
            else console.warn(`*** _createCardElement(); Missing hass object for card ${card.type}`);
        } catch (error) {
            console.warn(`*** Could not create card ${card.type}; ${error}`);
        }
        return element;
    }
    _updateLoop() {
        this._updateLoopId = setTimeout(()=>{
            this._updateTime();
            this._updateLoop();
        }, 1000);
    }
    _updateTime(force = false) {
        this._alarmController.evaluateAlarms();
        const fontNum = !this._alarmController.alarmClockPingEntity || this._alarmController.alarmClockPingEntity.state === 'off' || !this._alarmConfiguration['clockFontFace'] ? '0' : this._alarmConfiguration['clockFontFace'];
        const fontFaceClass = 'fontFace' + fontNum;
        this._clockClasses = fontNum === '0' ? {
            clock: true
        } : {
            clock: true,
            [fontFaceClass]: true
        };
        const time = (0, (/*@__PURE__*/$parcel$interopDefault($7b2a0b4b3c09b2f0$exports)))().format(this._alarmConfiguration['timeFormat'] === '24hr' ? 'HH:mm' : 'h:mm A');
        const isAlarmRinging = this._alarmController.isAlarmRinging();
        if (this._clockQ && (force || this._time !== time || this._ringing !== isAlarmRinging || this._controllersAlarmConfigLastUpdate !== this._alarmConfiguration.lastUpdated)) {
            this._time = time;
            this._ringing = isAlarmRinging;
            this._controllersAlarmConfigLastUpdate = this._alarmConfiguration.lastUpdated;
            let timeDisplay;
            if (this._alarmConfiguration['timeFormat'] === '24hr') timeDisplay = time;
            else {
                const [timeNum, timeTxt] = time.split(' ');
                let periodKern = '';
                if (timeNum.slice(-1) === '1' || timeNum.slice(-1) === '7') periodKern = ' periodKern';
                timeDisplay = timeNum + '<span class="periodName' + periodKern + '">' + timeTxt + '</span>';
            }
            const [timeHr, timeMn] = timeDisplay.split(':');
            let colonKern = '';
            if (timeHr.slice(-1) === '1') colonKern = ' colonKern';
            timeDisplay = timeHr + '<span class="colon' + colonKern + '">:</span>' + timeMn;
            this._clockQ.innerHTML = `
        <div class="clock-display">
          ${timeDisplay}
        </div>
      `;
            const dateFormat = this._alarmConfiguration['timeFormat'] === '24hr' ? 'dddd, D MMMM' : 'dddd, MMMM D';
            this._dateQ.innerHTML = (0, (/*@__PURE__*/$parcel$interopDefault($7b2a0b4b3c09b2f0$exports)))().format(dateFormat);
        }
    }
    _setAlarm() {
        const alarm = JSON.parse(JSON.stringify(this._napTimePickerQ.value));
        const alarmTime = (0, (/*@__PURE__*/$parcel$interopDefault($7b2a0b4b3c09b2f0$exports)))().add((0, (/*@__PURE__*/$parcel$interopDefault($7b2a0b4b3c09b2f0$exports))).duration((0, $b2cd7c9abb677932$export$4dc2b60021baefca).convertToMinutes(alarm.time)));
        this._alarmController.nextAlarm = {
            ...this._alarmController.nextAlarm,
            enabled: true,
            time: alarmTime.format('HH:mm'),
            nap: true,
            overridden: true
        };
    }
    _areAlarmsEnabled() {
        return this._alarmConfiguration.alarmsEnabled || !!this._alarmController.nextAlarm.nap;
    }
    _onAlarmChanged(event) {
        // this not triggered by snooze or alarm picker dialogs; only fires for changes to nextalarm in #alarmpicker element html of kobold-alarm-clock-card.js
        if (!event.detail.alarm.enabled) this._alarmController.nextAlarm = {
            ...this._alarmConfiguration.nextAlarm,
            enabled: false,
            overridden: true
        };
        else this._alarmController.nextAlarm = event.detail.alarm;
    }
    _handleAlarmButtonsClick(event) {
        this._alarmController[event.target.id]();
    }
    _handleRadioValueTimeFormat(event) {
        this._timeFormat = event.target.value;
    }
    _handleRadioValueClockFontFace(event) {
        this._clockFontFace = event.target.value;
    }
    _handleSwitchRingerEntity(event) {
        const entityIndex = event.target.id.split('-').pop();
        this._ringerEntities[entityIndex].enabled = event.target.checked;
    }
    _toggleAlarmFullscreen(force) {
        if (!this._alarmController.isAlarmRinging()) {
            if (this._alarmClockClasses.fullscreen || !force) {
                this._alarmClockClasses = {
                    fullscreen: false
                };
                this._footClasses = {
                    hideFoot: false
                };
            } else {
                this._alarmClockClasses = {
                    fullscreen: true
                };
                this._footClasses = {
                    hideFoot: true
                };
            }
        }
    }
    _getDayOfWeek(days) {
        // returns day of week in language set in set hass() method
        return (0, (/*@__PURE__*/$parcel$interopDefault($7b2a0b4b3c09b2f0$exports)))('2018-08-27').add(days, 'days').format('dddd');
    }
    saveAndCloseAlarmPicker() {
        const controllersAlarmConfig = Object.assign(new (0, $b2cd7c9abb677932$export$5df46671f5b4cca6), {
            ...this._alarmConfiguration,
            alarmsEnabled: this._haSwitchQ.checked,
            mo: this._alarmPickerMoQ.value,
            tu: this._alarmPickerTuQ.value,
            we: this._alarmPickerWeQ.value,
            th: this._alarmPickerThQ.value,
            fr: this._alarmPickerFrQ.value,
            sa: this._alarmPickerSaQ.value,
            su: this._alarmPickerSuQ.value
        });
        controllersAlarmConfig.dismiss();
        this._alarmController.saveControllersAlarmConfig(controllersAlarmConfig);
        this.closeDialog('#scheduleDialog');
    }
    saveAndCloseSettings() {
        const controllersAlarmConfig = Object.assign(new (0, $b2cd7c9abb677932$export$5df46671f5b4cca6), {
            ...this._alarmConfiguration,
            ringerEntities: JSON.stringify(this._ringerEntities),
            timeFormat: this._timeFormatQ.value,
            clockFontFace: this._clockFontFaceQ.value,
            clockDefaultFullscreen: this._clockDefaultFullscreenQ.checked,
            snoozeDurationDefault: this._snoozeDurationPickerQ.value,
            alarmDurationDefault: this._alarmDurationPickerQ.value
        });
        this._alarmController.saveControllersAlarmConfig(controllersAlarmConfig);
        if (this._alarmClockClasses.fullscreen !== this._clockDefaultFullscreen) this._toggleAlarmFullscreen(this._clockDefaultFullscreen);
        this.closeDialog('#settingsDialog');
    }
    saveAndCloseNap() {
        this._setAlarm();
        const controllersAlarmConfig = Object.assign(new (0, $b2cd7c9abb677932$export$5df46671f5b4cca6), {
            ...this._alarmConfiguration,
            napDurationDefault: this._napTimePickerQ.value
        });
        this._alarmController.saveControllersAlarmConfig(controllersAlarmConfig);
        this.closeDialog('#napDialog');
    }
    clearAndCloseNap() {
        this._alarmController.nextAlarmReset();
        this.closeDialog('#napDialog');
    }
    _showAlarmPicker() {
        this._alarmsEnabled = this._alarmConfiguration.alarmsEnabled;
        this._alarmPickerMo = JSON.parse(JSON.stringify(this._alarmConfiguration['mo']));
        this._alarmPickerTu = JSON.parse(JSON.stringify(this._alarmConfiguration['tu']));
        this._alarmPickerWe = JSON.parse(JSON.stringify(this._alarmConfiguration['we']));
        this._alarmPickerTh = JSON.parse(JSON.stringify(this._alarmConfiguration['th']));
        this._alarmPickerFr = JSON.parse(JSON.stringify(this._alarmConfiguration['fr']));
        this._alarmPickerSa = JSON.parse(JSON.stringify(this._alarmConfiguration['sa']));
        this._alarmPickerSu = JSON.parse(JSON.stringify(this._alarmConfiguration['su']));
        this._scheduleDialogQ.show();
        this._scheduleDialogQ.classList.add('open');
    }
    _showNapDialog() {
        this._napTime = JSON.parse(JSON.stringify(this._alarmConfiguration['napDurationDefault']));
        this._napDialogQ.show();
        this._napDialogQ.classList.add('open');
    }
    _showSettingsDialog() {
        this._timeFormat = this._alarmConfiguration['timeFormat'];
        this._clockDefaultFullscreen = this._alarmConfiguration['clockDefaultFullscreen'];
        this._clockFontFace = this._alarmConfiguration['clockFontFace'];
        this._snoozeDurationDefault = JSON.parse(JSON.stringify(this._alarmConfiguration['snoozeDurationDefault']));
        this._alarmDurationDefault = JSON.parse(JSON.stringify(this._alarmConfiguration['alarmDurationDefault']));
        const alarmEntities = [];
        const ringerEntitiesIds = this._ringerEntities.map((item)=>item.entity_id);
        const ringerEntitiesConfig = this._alarmConfiguration['ringerEntities'] ? JSON.parse(this._alarmConfiguration['ringerEntities']) : [];
        ringerEntitiesConfig.forEach((item)=>{
            if (ringerEntitiesIds.indexOf(item.entity_id) >= 0) alarmEntities.push(item);
        });
        this._ringerEntities = alarmEntities;
        this._settingsDialogQ.show();
        this._settingsDialogQ.classList.add('open');
    }
    closeDialog(target) {
        const dialogElement = this.shadowRoot.querySelector(target);
        dialogElement.classList.remove('open');
        setTimeout(()=>{
            dialogElement.close();
        }, 120);
    }
    _toggleLogoVisibility() {
        if (this._clockLogoQ) {
            if (this._clockLogoQ.style.display !== 'none') this._clockLogoQ.style.display = 'none';
            else this._clockLogoQ.style.display = 'block';
        }
    }
    constructor(...args){
        super(...args), this._cardId = Math.random().toString(36).slice(2, 9) + ', ' + new Date().toJSON();
    }
}
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $e978bded0760ae3c$export$ca000e230c0caa3e)()
], $2109a11e0895c6b1$var$KoboldAlarmClockCard.prototype, "_alarmsEnabled", void 0);
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $e978bded0760ae3c$export$ca000e230c0caa3e)()
], $2109a11e0895c6b1$var$KoboldAlarmClockCard.prototype, "_nextAlarm", void 0);
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $e978bded0760ae3c$export$ca000e230c0caa3e)()
], $2109a11e0895c6b1$var$KoboldAlarmClockCard.prototype, "_alarmPickerMo", void 0);
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $e978bded0760ae3c$export$ca000e230c0caa3e)()
], $2109a11e0895c6b1$var$KoboldAlarmClockCard.prototype, "_alarmPickerTu", void 0);
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $e978bded0760ae3c$export$ca000e230c0caa3e)()
], $2109a11e0895c6b1$var$KoboldAlarmClockCard.prototype, "_alarmPickerWe", void 0);
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $e978bded0760ae3c$export$ca000e230c0caa3e)()
], $2109a11e0895c6b1$var$KoboldAlarmClockCard.prototype, "_alarmPickerTh", void 0);
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $e978bded0760ae3c$export$ca000e230c0caa3e)()
], $2109a11e0895c6b1$var$KoboldAlarmClockCard.prototype, "_alarmPickerFr", void 0);
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $e978bded0760ae3c$export$ca000e230c0caa3e)()
], $2109a11e0895c6b1$var$KoboldAlarmClockCard.prototype, "_alarmPickerSa", void 0);
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $e978bded0760ae3c$export$ca000e230c0caa3e)()
], $2109a11e0895c6b1$var$KoboldAlarmClockCard.prototype, "_alarmPickerSu", void 0);
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $e978bded0760ae3c$export$ca000e230c0caa3e)()
], $2109a11e0895c6b1$var$KoboldAlarmClockCard.prototype, "_napTime", void 0);
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $e978bded0760ae3c$export$ca000e230c0caa3e)()
], $2109a11e0895c6b1$var$KoboldAlarmClockCard.prototype, "_timeFormat", void 0);
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $e978bded0760ae3c$export$ca000e230c0caa3e)()
], $2109a11e0895c6b1$var$KoboldAlarmClockCard.prototype, "_clockDefaultFullscreen", void 0);
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $e978bded0760ae3c$export$ca000e230c0caa3e)()
], $2109a11e0895c6b1$var$KoboldAlarmClockCard.prototype, "_clockFontFace", void 0);
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $e978bded0760ae3c$export$ca000e230c0caa3e)()
], $2109a11e0895c6b1$var$KoboldAlarmClockCard.prototype, "_hass", void 0);
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $e978bded0760ae3c$export$ca000e230c0caa3e)()
], $2109a11e0895c6b1$var$KoboldAlarmClockCard.prototype, "_ringerEntities", void 0);
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $e978bded0760ae3c$export$ca000e230c0caa3e)()
], $2109a11e0895c6b1$var$KoboldAlarmClockCard.prototype, "_alarmClockClasses", void 0);
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $e978bded0760ae3c$export$ca000e230c0caa3e)()
], $2109a11e0895c6b1$var$KoboldAlarmClockCard.prototype, "_alarmButtonsClasses", void 0);
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $e978bded0760ae3c$export$ca000e230c0caa3e)()
], $2109a11e0895c6b1$var$KoboldAlarmClockCard.prototype, "_footClasses", void 0);
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $e978bded0760ae3c$export$ca000e230c0caa3e)()
], $2109a11e0895c6b1$var$KoboldAlarmClockCard.prototype, "_clockClasses", void 0);
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $08419c1b2039b9cc$export$2fa187e846a241c4)('#clock', true)
], $2109a11e0895c6b1$var$KoboldAlarmClockCard.prototype, "_clockQ", void 0);
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $08419c1b2039b9cc$export$2fa187e846a241c4)('#date', true)
], $2109a11e0895c6b1$var$KoboldAlarmClockCard.prototype, "_dateQ", void 0);
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $08419c1b2039b9cc$export$2fa187e846a241c4)('ha-card', true)
], $2109a11e0895c6b1$var$KoboldAlarmClockCard.prototype, "_haCardQ", void 0);
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $48c67a19bc44103d$export$dcd0d083aa86c355)('div.optionButtons ha-icon')
], $2109a11e0895c6b1$var$KoboldAlarmClockCard.prototype, "_optionButtonsHostsQ", void 0);
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $48c67a19bc44103d$export$dcd0d083aa86c355)('dialog#settingsDialog #alarm-settings-dialog-content .radio-row ha-formfield')
], $2109a11e0895c6b1$var$KoboldAlarmClockCard.prototype, "_formfieldHostsQ", void 0);
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $48c67a19bc44103d$export$dcd0d083aa86c355)('dialog#settingsDialog #alarm-settings-dialog-content .switches-group-table ha-textfield')
], $2109a11e0895c6b1$var$KoboldAlarmClockCard.prototype, "_textfieldHostsQ", void 0);
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $48c67a19bc44103d$export$dcd0d083aa86c355)('dialog#settingsDialog #alarm-settings-dialog-content .switches-group-table ha-switch')
], $2109a11e0895c6b1$var$KoboldAlarmClockCard.prototype, "_switchHostsQ", void 0);
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $08419c1b2039b9cc$export$2fa187e846a241c4)('#extraInfo', true)
], $2109a11e0895c6b1$var$KoboldAlarmClockCard.prototype, "_rootQ", void 0);
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $08419c1b2039b9cc$export$2fa187e846a241c4)('#napTimePicker', true)
], $2109a11e0895c6b1$var$KoboldAlarmClockCard.prototype, "_napTimePickerQ", void 0);
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $08419c1b2039b9cc$export$2fa187e846a241c4)('#alarm-picker-dialog-title ha-switch', true)
], $2109a11e0895c6b1$var$KoboldAlarmClockCard.prototype, "_haSwitchQ", void 0);
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $08419c1b2039b9cc$export$2fa187e846a241c4)('#alarmPickerMo', true)
], $2109a11e0895c6b1$var$KoboldAlarmClockCard.prototype, "_alarmPickerMoQ", void 0);
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $08419c1b2039b9cc$export$2fa187e846a241c4)('#alarmPickerTu', true)
], $2109a11e0895c6b1$var$KoboldAlarmClockCard.prototype, "_alarmPickerTuQ", void 0);
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $08419c1b2039b9cc$export$2fa187e846a241c4)('#alarmPickerWe', true)
], $2109a11e0895c6b1$var$KoboldAlarmClockCard.prototype, "_alarmPickerWeQ", void 0);
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $08419c1b2039b9cc$export$2fa187e846a241c4)('#alarmPickerTh', true)
], $2109a11e0895c6b1$var$KoboldAlarmClockCard.prototype, "_alarmPickerThQ", void 0);
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $08419c1b2039b9cc$export$2fa187e846a241c4)('#alarmPickerFr', true)
], $2109a11e0895c6b1$var$KoboldAlarmClockCard.prototype, "_alarmPickerFrQ", void 0);
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $08419c1b2039b9cc$export$2fa187e846a241c4)('#alarmPickerSa', true)
], $2109a11e0895c6b1$var$KoboldAlarmClockCard.prototype, "_alarmPickerSaQ", void 0);
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $08419c1b2039b9cc$export$2fa187e846a241c4)('#alarmPickerSu', true)
], $2109a11e0895c6b1$var$KoboldAlarmClockCard.prototype, "_alarmPickerSuQ", void 0);
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $08419c1b2039b9cc$export$2fa187e846a241c4)('#timeFormat ha-radio[checked]')
], $2109a11e0895c6b1$var$KoboldAlarmClockCard.prototype, "_timeFormatQ", void 0);
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $08419c1b2039b9cc$export$2fa187e846a241c4)('#clockFontFace ha-radio[checked]')
], $2109a11e0895c6b1$var$KoboldAlarmClockCard.prototype, "_clockFontFaceQ", void 0);
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $08419c1b2039b9cc$export$2fa187e846a241c4)('#clockDefaultFullscreen', true)
], $2109a11e0895c6b1$var$KoboldAlarmClockCard.prototype, "_clockDefaultFullscreenQ", void 0);
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $08419c1b2039b9cc$export$2fa187e846a241c4)('#snoozeDurationPicker', true)
], $2109a11e0895c6b1$var$KoboldAlarmClockCard.prototype, "_snoozeDurationPickerQ", void 0);
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $08419c1b2039b9cc$export$2fa187e846a241c4)('#alarmDurationPicker', true)
], $2109a11e0895c6b1$var$KoboldAlarmClockCard.prototype, "_alarmDurationPickerQ", void 0);
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $08419c1b2039b9cc$export$2fa187e846a241c4)('#scheduleDialog', true)
], $2109a11e0895c6b1$var$KoboldAlarmClockCard.prototype, "_scheduleDialogQ", void 0);
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $08419c1b2039b9cc$export$2fa187e846a241c4)('#napDialog', true)
], $2109a11e0895c6b1$var$KoboldAlarmClockCard.prototype, "_napDialogQ", void 0);
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $08419c1b2039b9cc$export$2fa187e846a241c4)('#settingsDialog', true)
], $2109a11e0895c6b1$var$KoboldAlarmClockCard.prototype, "_settingsDialogQ", void 0);
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $08419c1b2039b9cc$export$2fa187e846a241c4)('#alarm-top div#clockLogo', true)
], $2109a11e0895c6b1$var$KoboldAlarmClockCard.prototype, "_clockLogoQ", void 0);
$2109a11e0895c6b1$var$KoboldAlarmClockCard = (0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $fcbcbba309c0f62b$export$da64fc29f17f9d0e)('kobold-alarm-clock-card')
], $2109a11e0895c6b1$var$KoboldAlarmClockCard);
class $2109a11e0895c6b1$var$HeightUpdater {
    static updateHeight(element) {
        if (this._updateHeightOnNormalCard(element)) return true;
        if (this._updateHeightOnNestedCards(element)) return true;
        if (this._updateHeightOnMediaControlCards(element)) return true;
        return false;
    }
    static _updateHeightOnNormalCard(element) {
        if (element.shadowRoot) {
            let cardTag = element.shadowRoot.querySelector('ha-card');
            if (cardTag) {
                cardTag.style.height = "100%";
                cardTag.style.boxSizing = "border-box";
                return true;
            }
        }
        return false;
    }
    static _updateHeightOnNestedCards(element) {
        if (element.firstChild && element.children[0].shadowRoot) {
            let cardTag = element.children[0].shadowRoot.querySelector('ha-card');
            if (cardTag) {
                cardTag.style.height = "100%";
                cardTag.style.boxSizing = "border-box";
                return true;
            }
        }
        return false;
    }
    static _updateHeightOnMediaControlCards(element) {
        if (!element.getAttribute('type-media-control')) return;
        if (element.children[0] && element.children[0].shadowRoot) {
            element.children[0].style.height = '100%';
            let bannerTag = element.children[0].shadowRoot.querySelector('div.banner');
            if (bannerTag) {
                bannerTag.style.boxSizing = "border-box";
                bannerTag.style.height = "calc(100% - 72px)";
                return true;
            }
        }
        return false;
    }
}


//# sourceMappingURL=kobold-alarm-clock-card.js.map
