
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
    constructor(config, cardId){
        this._isAlarmRinging = false;
        this._mappingMediaPlayer = {
            'turn_on': 'media_play',
            'turn_off': 'media_pause'
        };
        this._alarmActionsScript = [];
        this._cardId = cardId;
        this._config = config; // TODO: make a copy here?
        this._setAlarmRinging = $b2cd7c9abb677932$export$4dc2b60021baefca.throttle((state)=>{
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
        this._evaluate();
    }
    snooze() {
        this._setAlarmRinging(false);
        // allow animations to complete before saving
        window.setTimeout(()=>{
            this.nextAlarmReset(true); // TODO: should not refer directly to config, rather to accessors on this controller; same everywhere
        }, 250);
        if (this._config.alarm_actions) this._config.alarm_actions.filter((action)=>action.when === 'on_snooze').forEach((action)=>this._runAction(action));
    }
    dismiss() {
        this._setAlarmRinging(false);
        // console.log('*** dismiss fired');
        // allow animations to complete before saving
        window.setTimeout(()=>{
            this.nextAlarmReset(); // TODO: should not refer directly to config, rather to accessors on this controller; same everywhere
        }, 250);
        if (this._config.alarm_actions) {
            this._config.alarm_actions.filter((action)=>action.when === 'on_dismiss').forEach((action)=>this._runAction(action));
            this._alarmActionsScript = [];
        }
    }
    // snoozeConfig(snoozeDuration: Duration) {
    //     const nextAlarmTime = dayjs().add(dayjs.duration(snoozeDuration));
    //     const keyValue = {
    //         overridden: true,
    //         snooze: true,
    //         enabled: true,
    //         time: nextAlarmTime.format('HH:mm:ss'),
    //         date: nextAlarmTime.format('YYYY-MM-DD'),
    //         date_time: nextAlarmTime.format('YYYY-MM-DD HH:mm:ss')
    //     }
    //     // console.log('*** time now: ' + dayjs().format('HH:mm:ss') + '; new nextAlarm time: ' + keyValue.time);
    //     this._saveConfig('next_alarm', keyValue);
    // }
    //TODO: Rename or combine with createNextAlarmNew? why is createnextalarmnew called here and again in set nextAlarm? move this code to editor?
    // dismissConfig() {
    //     const momentTomorrow = dayjs().add(1, 'day');
    //     const alarmTomorrow = this._config[momentTomorrow.format('dd').toLowerCase()]; //create accessor?
    //     const keyValue = AlarmController.createNextAlarmNew(alarmTomorrow);
    //     this._saveConfig('next_alarm', keyValue);
    // }
    // TODO: snoozeconfig and dismissconfig should maybe be setters on this controller, since they modify and save config
    nextAlarmReset(snooze = false) {
        // console.log('*** nextAlarmReset fired');
        let keyValue;
        if (snooze) {
            const nextAlarmTime = (0, (/*@__PURE__*/$parcel$interopDefault($7b2a0b4b3c09b2f0$exports)))().add((0, (/*@__PURE__*/$parcel$interopDefault($7b2a0b4b3c09b2f0$exports))).duration(this._config.snooze_duration_default));
            keyValue = {
                overridden: true,
                snooze: true,
                enabled: true,
                time: nextAlarmTime.format('HH:mm:ss'),
                date: nextAlarmTime.format('YYYY-MM-DD'),
                date_time: nextAlarmTime.format('YYYY-MM-DD HH:mm:ss')
            };
        } else {
            // new nextAlarm will set nap, snooze, and overridden to default settings
            const dayTomorrow = (0, (/*@__PURE__*/$parcel$interopDefault($7b2a0b4b3c09b2f0$exports)))().add(1, 'day').format('dd').toLowerCase();
            const dayToday = (0, (/*@__PURE__*/$parcel$interopDefault($7b2a0b4b3c09b2f0$exports)))().format('dd').toLowerCase();
            const forToday = (0, (/*@__PURE__*/$parcel$interopDefault($7b2a0b4b3c09b2f0$exports)))().format('HH:mm:ss') < this._config[dayToday].time;
            const newAlarm = forToday ? this._config[dayToday] : this._config[dayTomorrow];
            keyValue = $b2cd7c9abb677932$export$cfa71a29f5c0676d.createNextAlarm(newAlarm, forToday);
        // const momentTomorrow = dayjs().add(1, 'day');
        // const alarmTomorrow = this._config[momentTomorrow.format('dd').toLowerCase()]; //create accessor?
        // keyValue = AlarmController.createNextAlarm(alarmTomorrow);
        }
        this._saveConfig('next_alarm', keyValue);
    // console.log('*** nextAlarmReset; saving new nextAlarm: ', keyValue);
    }
    static createNextAlarm(alarm, forToday = false) {
        // console.log('*** createnextalarm fired');
        let alarmDate = (0, (/*@__PURE__*/$parcel$interopDefault($7b2a0b4b3c09b2f0$exports)))();
        if (!(alarm.time >= alarmDate.format('HH:mm:ss') && forToday)) alarmDate = alarmDate.add(1, 'day');
        return {
            ...alarm,
            date: alarmDate.format('YYYY-MM-DD'),
            date_time: `${alarmDate.format('YYYY-MM-DD')} ${alarm.time}`
        };
    }
    set nextAlarm(alarm) {
        // console.log('*** set nextAlarm on contoller');
        const forToday = true;
        const keyValue = {
            ...$b2cd7c9abb677932$export$cfa71a29f5c0676d.createNextAlarm(alarm, forToday),
            overridden: true
        };
        this._saveConfig('next_alarm', keyValue);
    }
    get nextAlarm() {
        // console.log('*** getting nextAlarm before: ', this._config.next_alarm);// new Date().toJSON());
        const nextAlarm = Object.assign({}, this._config.next_alarm); // TODO: necessary to make a copy? this should happen when saving, not now, right?
        // const nextAlarm = this._config.next_alarm;
        if (!nextAlarm) {
            console.warn('*** get nextAlarm(); NextAlarm undefined: returning default config');
            return $b2cd7c9abb677932$export$4dc2b60021baefca.defaultConfig.next_alarm;
        }
        // console.log('*** getting nextAlarm after: ', this._config.next_alarm);// new Date().toJSON());
        return nextAlarm;
    }
    get isAlarmEnabled() {
        // console.log('*** checking whether alarm enabled');
        const nextAlarm = this.nextAlarm;
        if (nextAlarm.overridden && nextAlarm.enabled) return true;
        return this._config.alarms_enabled && nextAlarm.enabled;
    }
    set hideCardsDefault(keyValue) {
        // console.log('*** saving hide_cards_default: ', keyValue);
        this._saveConfig('hide_cards_default', keyValue);
    }
    async _saveConfig(key, value) {
        try {
            const lovelace = $b2cd7c9abb677932$export$4dc2b60021baefca.getLovelace().lovelace;
            // console.log('*** saveConfig(); lovelace: ', lovelace);
            // console.log('*** saveConfig(); this: ', this);
            const newConfig = structuredClone(lovelace.config);
            const tabGroupArry = [
                ...$b2cd7c9abb677932$export$4dc2b60021baefca.getLovelace().shadowRoot.querySelectorAll('sl-tab-group sl-tab')
            ];
            // console.log('*** _saveConfig on controller(); tabGroup: ', tabGroup);
            let viewIndex;
            viewIndex = tabGroupArry.findIndex((tab)=>{
                return tab.hasAttribute('active');
            });
            if (viewIndex === -1) viewIndex = 0;
            // console.log('*** _saveConfig on controller(); viewIndex: ', viewIndex);
            // console.log('*** _saveConfig on controller(); newCardConfig: ', newConfig.views[viewIndex]);
            const cardConfig = $b2cd7c9abb677932$export$4dc2b60021baefca.findNested(newConfig.views[viewIndex], 'type', 'custom:kobold-alarm-clock-card');
            // console.log('*** _saveConfig(); cardConfig: ', cardConfig);
            // console.log('*** _saveConfig(); newConfig: ', newConfig);
            if (cardConfig && cardConfig[key] !== undefined) {
                cardConfig[key] = value;
                // console.log('*** saveConfig on controller(); key: ' + JSON.stringify(key) + '; value: ' + JSON.stringify(value));
                cardConfig.last_updated = (0, (/*@__PURE__*/$parcel$interopDefault($7b2a0b4b3c09b2f0$exports)))().format('YYYY-MM-DD HH:mm:ss');
                // console.log('*** saveConfig on controller(); last_updated: ', this._config.last_updated);
                // console.log('*** saveConfig on controller(); saving newConfig: ', newConfig);
                // console.log('*** saveConfig on controller(); saving cardConfig: ', cardConfig);
                // console.log('*** saveConfig on controller(); cardConfig.next_alarm: ', cardConfig.next_alarm);
                // console.log('*** saveConfig on controller(); newConfig.next_alarm: ', Helpers.findNested(newConfig, 'type', 'custom:kobold-alarm-clock-card').next_alarm);?
                await lovelace.saveConfig(newConfig);
                $b2cd7c9abb677932$export$4dc2b60021baefca.testUntilTimeout(()=>$b2cd7c9abb677932$export$4dc2b60021baefca.getNotification(), 5000).then(()=>{
                    if ($b2cd7c9abb677932$export$4dc2b60021baefca.getNotification().labelText.includes('dashboard was updated')) $b2cd7c9abb677932$export$4dc2b60021baefca.fireEvent('hass-notification', {
                        message: 'Configuration updated'
                    }, $b2cd7c9abb677932$export$4dc2b60021baefca.getHa());
                }).catch(()=>{}); //timed out
            } else throw {
                message: 'Unable to find Kobold card in lovelace configuration or kobold card config is corrupt'
            };
        } catch (err) {
            alert(`Saving failed: ${err.message}.`);
        }
    }
    isAlarmRinging() {
        return this._isAlarmRinging;
    }
    evaluateAlarms() {
        this._evaluate();
    }
    _evaluate() {
        // console.log('*** isAlarmRinging: ', this.isAlarmRinging());
        const nextAlarm = this.nextAlarm;
        const dateToday = (0, (/*@__PURE__*/$parcel$interopDefault($7b2a0b4b3c09b2f0$exports)))().format('YYYY-MM-DD');
        // console.log('*** evaluate(); config: ', this._config);
        // if (dayjs().format('HH:mm') === '23:58' && nextAlarm.date <= dateToday) {
        // if nextAlarm has passed, reset alarm
        // const myA = dayjs().subtract(1, "minute").format("HH:mm:ss") > nextAlarm.time && nextAlarm.date === dateToday;
        // const myB = nextAlarm.date < dateToday;
        // console.log('*** nextAlarm date is today & time is past: ' + myA + '; nextAlarm date before today: ' + myB + '; alarm not ringing: ' + !this.isAlarmRinging());
        // console.log('*** nextAlarm date is today: ', nextAlarm.date === dateToday);
        // console.log('*** nextAlarm date: ', nextAlarm.date);
        // console.log('*** date today: ', dateToday);
        // console.log('*** nextAlarm time is past: ', dayjs().subtract(1, "minute").format("HH:mm:ss") > nextAlarm.time);
        // if time now is later than alarm, reset nextAlarm (should only happen if continuous operation of Kobold is interrupted)
        if ((nextAlarm.date < dateToday || (0, (/*@__PURE__*/$parcel$interopDefault($7b2a0b4b3c09b2f0$exports)))().subtract(1, 'minute').format('HH:mm:ss') > nextAlarm.time && nextAlarm.date === dateToday) && !this.isAlarmRinging()) {
            // console.log('*** _evaluate; nextAlarm passed');
            this.nextAlarmReset();
            if (this._config.debug) {
                console.warn('*** _evaluate(); Resetting nextAlarm');
                this._hass.callService('system_log', 'write', {
                    'message': '*** Resetting nextAlarm',
                    'level': 'info'
                });
            }
        }
        // if (!this._config.alarms_enabled && !nextAlarm.nap) {
        //     return;
        // }
        // if (!nextAlarm.enabled) {
        //     return;
        // }
        // console.log('*** evaluate(); alarmActionsScript: ', this._alarmActionsScript);
        if (!this.isAlarmEnabled) return;
        // console.log('*** _evaluate(); alarm enabled');
        // console.log('*** _evaluate(); snooze: ' + nextAlarm.snooze + '; nap: ' + nextAlarm.nap + '; actions: ' + this._config.alarm_actions);
        if (!this.isAlarmRinging() && (0, (/*@__PURE__*/$parcel$interopDefault($7b2a0b4b3c09b2f0$exports)))().format('HH:mm:ss') >= nextAlarm.time && nextAlarm.date === dateToday) this._setAlarmRinging(true);
        else if (this.isAlarmRinging()) // dismiss alarm after alarm_duration_default time elapses
        {
            if ((0, (/*@__PURE__*/$parcel$interopDefault($7b2a0b4b3c09b2f0$exports)))(nextAlarm.time, 'HH:mm:ss').add((0, (/*@__PURE__*/$parcel$interopDefault($7b2a0b4b3c09b2f0$exports))).duration(this._config.alarm_duration_default)).format('HH:mm:ss') <= (0, (/*@__PURE__*/$parcel$interopDefault($7b2a0b4b3c09b2f0$exports)))().format('HH:mm:ss')) // console.log('*** _evaluate(); dismissing ringing automatically');
            this.dismiss();
        } else if (!nextAlarm.snooze && !nextAlarm.nap && this._config.alarm_actions) // console.log('*** _evaluate(); not ringing, no nap, no snooze alarm actions present');
        // this._config.alarm_actions
        //     .filter(action => action.when !== 'on_snooze' && action.when !== 'on_dismiss' && !this._alarmActionsScript[`${action.entity}-${action.when}`])
        //     .filter(action => dayjs(nextAlarm.time, 'HH:mm:ss').add(dayjs.duration(Helpers.convertToMinutes(action.when))).format('HH:mm:ss') <= dayjs().format('HH:mm:ss'))
        //     .forEach(action => this._runAction(action));
        this._config.alarm_actions.filter((action)=>action.when !== 'on_snooze' && action.when !== 'on_dismiss' && !this._alarmActionsScript[`${action.entity}-${action.when}`]).forEach((action)=>{
            let myDuration = structuredClone(action.offset);
            if (action.negative && action.offset) myDuration = {
                hours: myDuration.hours *= -1,
                minutes: myDuration.minutes *= -1,
                seconds: myDuration.seconds *= -1
            };
            // console.log('*** _evaluate(); alarm action time: ', dayjs(nextAlarm.time, 'HH:mm:ss').add(dayjs.duration(myDuration)).format('HH:mm:ss'));
            if ((0, (/*@__PURE__*/$parcel$interopDefault($7b2a0b4b3c09b2f0$exports)))(nextAlarm.time, 'HH:mm:ss').add((0, (/*@__PURE__*/$parcel$interopDefault($7b2a0b4b3c09b2f0$exports))).duration(myDuration)).format('HH:mm:ss') <= (0, (/*@__PURE__*/$parcel$interopDefault($7b2a0b4b3c09b2f0$exports)))().format('HH:mm:ss')) this._runAction(action);
        // dayjs(nextAlarm.time, 'HH:mm:ss').add(dayjs.duration(Helpers.convertToMinutes(action.when))).format('HH:mm:ss') <= dayjs().format('HH:mm:ss'))
        // .forEach(action => this._runAction(action));
        });
    }
    _runAction(action) {
        const myAction = {
            service: 'homeassistant.turn_on',
            ...action
        };
        const actionServiceCommand = myAction.service.split('.');
        this._hass.callService(actionServiceCommand[0], actionServiceCommand[1], {
            "entity_id": myAction.entity
        });
        this._alarmActionsScript[`${myAction.entity}-${myAction.when}`] = true;
    }
    _callAlarmRingingService(action) {
        if (this._config.debug) this._hass.callService('system_log', 'write', {
            'message': '*** _callAlarmRingingService; action: ' + action + '; editor ID: ' + this._cardId,
            'level': 'info'
        });
        try {
            if (this._config.alarm_entities) this._config.alarm_entities.forEach((entity)=>{
                const entityState = this._hass.states[entity].state;
                if (entity.startsWith('media_player')) {
                    if (action === 'turn_on' && entityState !== 'on' || action === 'turn_off' && entityState !== 'off') this._hass.callService('media_player', this._mappingMediaPlayer[action], {
                        'entity_id': entity
                    });
                } else if (action === 'turn_on' && entityState !== 'on' || action === 'turn_off' && entityState !== 'off') this._hass.callService('homeassistant', action, {
                    'entity_id': entity
                });
            });
        } catch (err) {
            if (this._config.debug) this._hass.callService('system_log', 'write', {
                'message': '*** _callAlarmRingingService; Error while calling service: ' + err,
                'level': 'info'
            });
            console.warn('*** _callAlarmRingingService(); Error while calling service: ' + err);
            return;
        }
    }
}
class $b2cd7c9abb677932$export$4dc2b60021baefca {
    static #_ = this.fireEvent = (event, detail, element = this.getLovelace())=>{
        element.dispatchEvent(new CustomEvent(event, {
            detail: detail,
            bubbles: true,
            cancelable: false,
            composed: true
        }));
    };
    static deepMerge(obj1, obj2) {
        const result = {
            ...obj1
        };
        for(let key in obj2)if (obj2.hasOwnProperty(key)) {
            if (obj2[key] instanceof Object && obj1[key] instanceof Object) result[key] = this.deepMerge(obj1[key], obj2[key]);
            else result[key] = obj2[key];
        }
        return result;
    }
    // returns object containing all and only changed properties
    static deepCompareObj(original, current) {
        if (original === current) return null;
        // Handle non-object types (including null)
        if (typeof original !== 'object' || typeof current !== 'object' || original === null || current === null) return current;
        const changes = {};
        let hasChanges = false;
        // Check for changes in current object
        for (const key of Object.keys(current)){
            if (!(key in original)) {
                changes[key] = current[key];
                hasChanges = true;
                continue;
            }
            const diff = this.deepCompareObj(original[key], current[key]);
            if (diff !== null) {
                changes[key] = diff;
                hasChanges = true;
            }
        }
        // Check for deleted keys
        for (const key of Object.keys(original))if (!(key in current)) {
            changes[key] = undefined;
            hasChanges = true;
        }
        return hasChanges ? changes : null;
    }
    static findNested(obj, key, val) {
        let found;
        JSON.stringify(obj, (_, nestedVal)=>{
            if (nestedVal && nestedVal[key] === val) found = nestedVal;
            return nestedVal;
        });
        return found;
    }
    static #_2 = this.getHa = ()=>{
        let root = document.querySelector('home-assistant');
        return root;
    };
    static #_3 = this.getEditor = ()=>{
        let root = this.getHa();
        root = root && root.shadowRoot;
        root = root && root.querySelector('hui-dialog-edit-card');
        // console.log('*** getEditor(); root: ', root);
        return root;
    };
    static #_4 = this.getPreview = ()=>{
        let root = this.getHa();
        root = root && root.shadowRoot;
        root = root && root.querySelector('hui-dialog-edit-card');
        root = root && root.shadowRoot;
        root = root && root.querySelector('div.element-preview');
        // console.log('*** getPreview(); root: ', root);
        return root;
    };
    static #_5 = this.getEditorButtons = ()=>{
        let root = this.getEditor();
        root = root && root.shadowRoot;
        root = root && root.querySelector('div[slot="primaryAction"]');
        // console.log('*** getEditorButtons(); root: ', root);
        return root;
    };
    static #_6 = this.getLovelace = ()=>{
        let root = this.getHa();
        root = root && root.shadowRoot;
        root = root && root.querySelector('home-assistant-main');
        root = root && root.shadowRoot;
        root = root && root.querySelector('ha-panel-lovelace');
        root = root && root.shadowRoot;
        root = root && root.querySelector('hui-root');
        // console.log('*** getLovelace(); root: ', root);
        return root;
    };
    static #_7 = this.getDrawer = ()=>{
        let root = this.getHa();
        root = root && root.shadowRoot;
        root = root && root.querySelector('home-assistant-main');
        root = root && root.shadowRoot;
        root = root && root.querySelector('ha-drawer');
        root = root && root.shadowRoot;
        root = root && root.querySelector('aside');
        // console.log('*** getDrawer(); root: ', root);
        return root;
    };
    static #_8 = this.getNotification = ()=>{
        let root = this.getHa();
        root = root && root.shadowRoot;
        root = root && root.querySelector('notification-manager');
        root = root && root.shadowRoot;
        root = root && root.querySelector('ha-toast');
        // console.log('*** getNotification(); root: ', root);
        return root;
    };
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
    static #_9 = // source: frontend/src/common/config/version.ts
    // @param version (this._hass.config.version)
    // @param major (major version number)
    // @param minor (minor version number)
    // @returns boolean
    this.atLeastVersion = (version, major, minor, patch)=>{
        // if (__DEMO__) {
        //     return true;
        // }
        const [haMajor, haMinor, haPatch] = version.split(".", 3);
        return Number(haMajor) > major || Number(haMajor) === major && (patch === undefined ? Number(haMinor) >= minor : Number(haMinor) > minor) || patch !== undefined && Number(haMajor) === major && Number(haMinor) === minor && Number(haPatch) >= patch;
    };
    static #_10 = this.testUntilTimeout = async (f, timeoutMs)=>{
        return new Promise((resolve, reject)=>{
            const timeWas = new Date();
            const wait = setInterval(function() {
                if (f()) {
                    clearInterval(wait);
                    resolve('resolved');
                } else if (new Date().valueOf() - timeWas.valueOf() > timeoutMs) {
                    clearInterval(wait);
                    reject('timed out');
                }
            }, 20);
        });
    };
    // static convertToMinutes(HHMM: string): { 'minutes': number } {
    //     // HHMM is a string in the format "HH:MM" (e.g., "08:30", "-08:30", "00:00", "12:00")
    //     const [H, M] = HHMM.split(":").map(val => parseInt(val));
    //     // https://dev.to/emnudge/identifying-negative-zero-2j1o
    //     let minutes = Math.abs(H) * 60 + M; minutes *= Math.sign(1 / H || H);
    //     return { 'minutes': minutes };
    // };
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
        if (!element.getAttribute('type-media-control')) return; // TODO: could not find this attribute anywhere in github for HA frontend; eliminate, modify?
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
    static #_11 = this.defaultConfig = {
        name: "kobold_clock",
        type: "custom:kobold-alarm-clock-card",
        alarms_enabled: false,
        next_alarm: {
            enabled: false,
            time: "07:00:00",
            date: (0, (/*@__PURE__*/$parcel$interopDefault($7b2a0b4b3c09b2f0$exports)))().add(1, 'day').format('YYYY-MM-DD'),
            date_time: (0, (/*@__PURE__*/$parcel$interopDefault($7b2a0b4b3c09b2f0$exports)))().add(1, 'day').format('YYYY-MM-DD') + " 07:00:00",
            overridden: false
        },
        mo: {
            enabled: false,
            time: "07:00:00"
        },
        tu: {
            enabled: false,
            time: "07:00:00"
        },
        we: {
            enabled: false,
            time: "07:00:00"
        },
        th: {
            enabled: false,
            time: "07:00:00"
        },
        fr: {
            enabled: false,
            time: "07:00:00"
        },
        sa: {
            enabled: false,
            time: "09:00:00"
        },
        su: {
            enabled: false,
            time: "09:00:00"
        },
        snooze_duration_default: {
            hours: 0,
            minutes: 15,
            seconds: 0
        },
        alarm_duration_default: {
            hours: 0,
            minutes: 30,
            seconds: 0
        },
        nap_duration: {
            hours: 0,
            minutes: 30,
            seconds: 0
        },
        time_format: "12hr",
        clock_display_font: 0,
        hide_cards_default: true,
        debug: false
    };
}


// import { AlarmConfiguration } from './alarm-controller';

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
        // console.log('*** nextAlarm time: ', this.nextAlarm.time);
        return (0, $0f25a2e8805a310f$export$c0bb0b647f701bb5)`
            <div class="alarm" id="alarmPicker">
                ${this.getAttribute('show-icon') ? (0, $0f25a2e8805a310f$export$c0bb0b647f701bb5)`
                    <ha-icon icon=${this._getAlarmPickerIcon(this.nextAlarm)} @click=${this.openSchedule} class="button"></ha-icon>
                ` : ''}

                <slot></slot>
                <div class="sliders picker">
                    <ha-slider
                        id="hoursSlider"
                        labeled
                        min=1
                        max=24
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
                <div class="row-options"
                >
                    <ha-textfield
                        id="alarmTimeInput"
                        pattern="([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]( AM| PM|)"
                        maxlength="8"
                        ?disabled=${this.disabled}
                        .value=${!this.nextAlarm ? '' : (0, (/*@__PURE__*/$parcel$interopDefault($7b2a0b4b3c09b2f0$exports)))(this.nextAlarm.time, 'HH:mm:ss').format(this._alarmTimeFormat())}
                        ?overridden=${this.config?.next_alarm.overridden}
                        @click=${this._clickHandler}
                        readonly
                        >
                    </ha-textfield>
                </div>

                <ha-switch id="alarmEnabledToggleButton" ?checked=${!this.nextAlarm ? false : this.nextAlarm.enabled} @change=${this.toggleAlarmEnabled} ?disabled=${this.disabled} class></ha-switch>

            </div>
        `;
    }
    static #_ = this.styles = (0, $22deac181f878bbd$export$dbf350e5966cf602)`
        @media (max-width: 600px), (max-height: 600px) {
            div#alarmPicker.alarm {
                height: 2rem;
            }
        }
        /*@container (width < 750px) {
            div#alarmPicker.alarm.open {
                height: 4rem;
            }
            div#alarmPicker.alarm.open > .sliders {
                margin-left: 0;
                width: 0;
                overflow: hidden;
            }
        }*/

        :host(.narrow) div#alarmPicker.alarm.open {
            height: 4rem;
        }

        :host(.narrow) div#alarmPicker.alarm.open > .sliders {
            margin-left: 0;
            width: 0;
            overflow: hidden;
        }

        .alarm {
            display:inline-flex;
            justify-content: space-between;
            align-items: center;
            height: 4rem;
        }

        #alarmPicker.alarm.open {
            height: 10rem;
        }

        /*div#alarmPicker .row-options.settings-picker {
            width: 22em;
            text-align: left;
            transition: width 120ms;
        }
        #alarmPicker.alarm.open .row-options.settings-picker {
            width: 7rem;
        }*/

        #alarmTimeInput {
            width: 5.1em;
            margin: 0 1em;
        }

        #alarmTimeInput {
            filter: invert(1);
            margin: 0 0.5em;
        }

        #alarmTimeInput[overridden] {
            border: 1px dotted #969696;
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
            padding-top: 6rem; backdrop-filter: blur(10px);
        }

        @keyframes delay-overflow {
            from { overflow: hidden; }
        }

        .button {
            cursor: pointer;
        }

       #alarmEnabledToggleButton {
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
            // let allStyle = '.mdc-text-field--filled { padding: 0 !important; } .mdc-text-field__input { font-size: inherit !important; }';
            // let pickerOrOptionsDialogStyle = '';
            let myStyle;
            if (this._alarmPickerSwitchQ.shadowRoot) {
                myStyle = document.createElement('style');
                let switchStyle = 'div.mdc-switch__thumb { box-shadow: 0 0 15px 2px; } div.mdc-switch__track { background-color: #969696 !important; border-color: #969696 !important; }';
                myStyle.innerHTML = switchStyle;
                this._alarmPickerSwitchQ.shadowRoot.appendChild(myStyle);
            }
            // if (this.id === 'tab-2') {
            if (this._iconButtonQ.shadowRoot) {
                myStyle = document.createElement('style');
                // let iconStyle = 'ha-svg-icon { height: calc(1.5rem + 1vh); width: calc(1.5rem + 1vh); }';
                let iconStyle = 'ha-svg-icon { height: calc(1.25rem + 0.5cqw); width: calc(1.25rem + 0.5cqw); }';
                myStyle.innerHTML = iconStyle;
                this._iconButtonQ.shadowRoot.appendChild(myStyle);
            }
            // } else {
            //     console.log('*** id: ', this.id);
            // }
            // if ((this.parentElement.parentElement.id === 'alarm-picker-dialog-content') || (this.parentElement.parentElement.parentElement.parentElement.id === 'settingsDialog')) {
            //     pickerOrOptionsDialogStyle = ' .mdc-text-field--filled { height: 2em !important; }';
            // }
            if (this._alarmTimeInputQ.shadowRoot) {
                const allStyle = '.mdc-text-field--filled { padding: 0 !important; } .mdc-text-field__input { font-size: inherit !important; text-align: center; }';
                const pickerStyle = ' .mdc-text-field__input { color: #969696 !important; } .mdc-line-ripple::before, .mdc-line-ripple::after { border-bottom-width: 0 !important; } .mdc-text-field--filled { height: 1.75em !important; background-color: transparent !important; }';
                myStyle = document.createElement('style');
                myStyle.innerHTML = allStyle + pickerStyle;
                this._alarmTimeInputQ.shadowRoot.appendChild(myStyle);
            }
        }
    }
    _clickHandler() {
        let timeArray;
        // if (this.id === 'tab-2') {
        if (!this._alarmPickerQ.classList.contains('open')) this.dispatchEvent(new CustomEvent('toggle-logo-visibility'));
        const isEnabled = this.nextAlarm.enabled;
        // const isOverridden = this.alarmConfiguration.nextAlarm.overridden;
        const isOverridden = this.config.next_alarm.overridden;
        // console.log('*** isEnabled: ' + isEnabled + '; isOverridden: ' + isOverridden);
        if (isEnabled && !isOverridden || !isEnabled && !isOverridden) // console.log('*** should be set to current time: ', this.time);
        // set sliders to current time
        // console.log('*** format: ', this._alarmTimeFormat());
        timeArray = (0, (/*@__PURE__*/$parcel$interopDefault($7b2a0b4b3c09b2f0$exports)))(this.time, this._alarmTimeFormat()).format('HH:mm').split(':');
        else // set sliders to nextAlarm time
        timeArray = this.nextAlarm.time.split(':');
        // console.log('*** timeArray: ', timeArray);
        // } else {
        //     // set sliders to nextAlarm time
        //     timeArray = this.alarm.time.split(':');
        // }
        this._displayedValueH = timeArray[0];
        this._displayedValueM = timeArray[1];
        this._alarmPickerQ.classList.add('open');
        document.removeEventListener('click', this._clickOutsideAlarmTimeInput);
        document.addEventListener('click', (event)=>{
            this._clickOutsideAlarmTimeInput(event);
        }, false);
    }
    _clickOutsideAlarmTimeInput(event) {
        if (typeof event.composedPath === 'function' && !event.composedPath().includes(this._alarmPickerQ)) {
            if (this._alarmPickerQ.classList.contains('open')) this.dispatchEvent(new CustomEvent('toggle-logo-visibility'));
            this._alarmPickerQ.classList.remove('open');
            document.removeEventListener('click', this._clickOutsideAlarmTimeInput);
        }
    }
    _alarmTimeFormat() {
        // return (this.alarmConfiguration['timeFormat'] === '24hr' || this.id === 'napTimePicker' || this.id === 'snoozeDurationPicker' || this.id === 'alarmDurationPicker') ? 'HH:mm' : 'h:mm A';
        return this.config.time_format === '24hr' ? 'HH:mm' : 'h:mm A';
    }
    _updateValue(event) {
        const value = event.target.value; //Number((e.target).value);
        event.target.id === 'hoursSlider' ? this._displayedValueH = value : this._displayedValueM = value;
        // console.log('*** time: ', this._displayedValueH + ':' + this._displayedValueM);
        this._onTimeChanged(this._displayedValueH + ':' + this._displayedValueM);
        if (this._alarmPickerQ.classList.contains('open')) this.dispatchEvent(new CustomEvent('toggle-logo-visibility'));
        this._alarmPickerQ.classList.remove('open');
        document.removeEventListener('click', this._clickOutsideAlarmTimeInput);
    }
    _getAlarmPickerIcon(nextAlarm) {
        if (!nextAlarm.enabled) return 'mdi:alarm-off';
        else if (nextAlarm.snooze) return 'mdi:alarm-snooze';
        return 'mdi:alarm';
    }
    _onTimeChanged(timeStr) {
        this.nextAlarm.time = (0, (/*@__PURE__*/$parcel$interopDefault($7b2a0b4b3c09b2f0$exports)))(timeStr, 'HH:mm').format('HH:mm:ss');
        // console.log('*** nextAlarm.time: ', this.nextAlarm.time);
        this.nextAlarm.enabled = true;
        // listener for this event is on #alarmpicker element, so only received when "this" used here is #alarmpicker element
        this.dispatchEvent(new CustomEvent('nextAlarm-changed', {
            detail: {
                nextAlarm: this.nextAlarm
            }
        }));
    }
    toggleAlarmEnabled(event) {
        // const alarm = Object.assign({}, this.alarm);
        this.nextAlarm.enabled = event.target.checked;
        // alarm.enabled = (<HTMLInputElement>event.target).checked;
        this.requestUpdate('nextAlarm'); //necessary because lit does not mutate reactive object properties
        this.dispatchEvent(new CustomEvent('nextAlarm-changed', {
            detail: {
                nextAlarm: {
                    time: this.nextAlarm.time,
                    enabled: this.nextAlarm.enabled
                }
            }
        }));
    // this.dispatchEvent(new CustomEvent('alarm-changed', { detail: { alarm: { time: alarm.time, enabled: alarm.enabled } } }));
    }
    openSchedule() {
        this.dispatchEvent(new CustomEvent('alarm-button-clicked'));
    }
    get value() {
        return this.nextAlarm;
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
], $3ce236f40c9404d3$var$AlarmPicker.prototype, "config", void 0);
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $6bc2845c2b7eed7f$export$d541bacb2bda4494)({
        reflect: false
    })
], $3ce236f40c9404d3$var$AlarmPicker.prototype, "nextAlarm", void 0);
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


// function loadCSS(url: string) {
//   const link = document.createElement('link');
//   link.type = 'text/css';
//   link.rel = 'stylesheet';
//   link.href = url;
//   document.head.appendChild(link);
// }
// loadCSS('https://fonts.googleapis.com/css2?family=Noto+Sans:wdth,wght@87.5,600&display=swap');
// loadCSS('https://fonts.googleapis.com/css2?family=Oswald:wght@600&display=swap');
// loadCSS('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@600&display=swap');
// fontStyles: woff & woff2 fontfaces converted to base64 and added to @font-face declarations, which are placed into single string (i.e., no line breaks)
const $2109a11e0895c6b1$var$fontStyles = '@font-face { font-family: "noto_sansmedium"; src: url(data:application/font-woff2;charset=utf-8;base64,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) format("woff2"), url(data:application/font-woff;charset=utf-8;base64,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) format("woff"); font-weight: normal; font-style: normal; font-display: swap; } @font-face { font-family: "oswald_regularregular"; src: url(data:application/font-woff2;charset=utf-8;base64,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) format("woff2"), url(data:application/font-woff;charset=utf-8;base64,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) format("woff"); font-weight: normal; font-style: normal; font-display: swap; } @font-face { font-family: "ibm_plex_sansmedium"; src: url(data:application/font-woff2;charset=utf-8;base64,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) format("woff2"), url(data:application/font-woff;charset=utf-8;base64,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) format("woff"); font-weight: normal; font-style: normal; font-display: swap; }';
let $2109a11e0895c6b1$var$myStyle = document.createElement('style');
$2109a11e0895c6b1$var$myStyle.innerHTML = $2109a11e0895c6b1$var$fontStyles;
document.head.appendChild($2109a11e0895c6b1$var$myStyle);
(0, (/*@__PURE__*/$parcel$interopDefault($7b2a0b4b3c09b2f0$exports))).extend((0, (/*@__PURE__*/$parcel$interopDefault($e60b0d000ec57fbf$exports))));
(0, (/*@__PURE__*/$parcel$interopDefault($7b2a0b4b3c09b2f0$exports))).extend((0, (/*@__PURE__*/$parcel$interopDefault($5e2bd162b336a82b$exports))));
const $2109a11e0895c6b1$var$DOMAINS_ALARM_ENTITIES = [
    "input_boolean",
    "switch",
    "media_player"
];
window.customCards = window.customCards || [];
window.customCards.push({
    type: "kobold-alarm-clock-card",
    name: "Kobold",
    description: "A multi-alarm clock for Home Assistant",
    preview: true,
    documentationURL: "https://codeberg.org/entekadesign/kobold-alarm-clock-card#readme"
});
class $2109a11e0895c6b1$var$KoboldAlarmClockCard extends (0, $da1fd7e2c62fd6f3$export$3f2f9f5909897157) {
    connectedCallback() {
        super.connectedCallback();
        this._updateLoop();
        if (this._config.debug) {
            this._hass.callService('system_log', 'write', {
                'message': '*** connectedCallback(); _cardID: ' + this._cardId,
                'level': 'info'
            });
            console.warn('*** connectedCallback(); _cardID: ' + this._cardId);
        }
        // recover from disconnect, e.g., HA restart
        window.addEventListener('connection-status', this._connectionStatusEvent);
        (0, $b2cd7c9abb677932$export$4dc2b60021baefca).getHa().addEventListener('kobold-editor', this._koboldEditorEvent);
        (0, $b2cd7c9abb677932$export$4dc2b60021baefca).getHa().addEventListener('dialog-closed', this._dialogClosedEvent);
        window.setMyEditMode = (mode = true)=>{
            const ll = (0, $b2cd7c9abb677932$export$4dc2b60021baefca).getLovelace();
            if (ll && ll.lovelace.editMode !== mode) ll.lovelace.setEditMode(mode);
        };
    // this.addEventListener('ll-rebuild', (ev) => {
    //   ev.stopPropagation();
    //   console.log('*** rebuilding card');
    // });
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
        window.removeEventListener('connection-status', this._connectionStatusEvent);
        (0, $b2cd7c9abb677932$export$4dc2b60021baefca).getHa().removeEventListener('kobold-editor', this._koboldEditorEvent);
        (0, $b2cd7c9abb677932$export$4dc2b60021baefca).getHa().removeEventListener('dialog-closed', this._dialogClosedEvent);
    }
    static getConfigElement() {
        return document.createElement("kobold-card-editor");
    }
    static getStubConfig(hass, entities) {
        // console.log('*** getStubConfig; entities: ', entities);
        const ents = entities.filter((e)=>{
            const domain = e.split(".")[0];
            // console.log('*** getStubConfig; domain: ', domain);
            return $2109a11e0895c6b1$var$DOMAINS_ALARM_ENTITIES.includes(domain);
        });
        // console.log('*** getStubConfig; ents: ', ents[Math.floor(Math.random() * ents.length)] || "");
        // console.log('*** getStubConfig; ents: ', ents);
        const alarmEntities = [
            ents.includes('input_boolean.kobold_clock') ? 'input_boolean.kobold_clock' : ents[0]
        ];
        // console.log('*** getStubConfig; alarm_entities: ', alarmEntities);
        // console.log('*** getStubConfig; customCards: ', window.customCards);
        // console.log('*** getStubConfig; preview: ', this.preview);
        // Return a minimal configuration that will result in a working card configuration
        return {
            alarm_entities: alarmEntities,
            ...(0, $b2cd7c9abb677932$export$4dc2b60021baefca).defaultConfig
        };
    // return Helpers.defaultConfig;
    }
    render() {
        this._nextAlarm = this._nextAlarm ?? this._alarmController.nextAlarm; //TODO: why not get nextalarm from this._config.next_alarm?
        // console.log('*** render(); nextAlarm: ', this._nextAlarm);
        // console.log('*** render(); nextAlarm.overridden: ', this._nextAlarm.overridden);
        // console.log('*** preview: ', this.preview);
        // console.log('*** render(); alarmClockClasses: ', this._alarmClockClasses);
        // console.log('*** render(); alarmClock class: ', this._koboldClockQ?.classList.value);
        // this._alarmClockClasses = this._alarmClockClasses || {};
        // this._alarmButtonsClasses = this._alarmButtonsClasses || {};
        // this._footClasses = this._footClasses || {};
        // this._clockClasses = this._clockClasses || { clock: true };
        // const isAlarmRinging = this._alarmController.isAlarmRinging();
        // if (isAlarmRinging && !this._ringingBegun) {
        //   this._ringingBegun = true;
        //   this._alarmClockClasses = { fullscreen: false };
        //   this._alarmButtonsClasses = { showButtons: true };
        //   this._footClasses = { hideFoot: false };
        // } else if (!isAlarmRinging && this._ringingBegun) {
        //   this._ringingBegun = false;
        //   this._alarmButtonsClasses = { showButtons: false };
        // }
        // const isAlarmRinging = this._alarmController.isAlarmRinging();
        // console.log('*** isAlarmRinging: ', isAlarmRinging);
        // if (isAlarmRinging && !this._ringingBegun) {
        //   this._ringingBegun = true;
        //   this._alarmButtonsQ.classList.add('showButtons');
        //   this._koboldClockQ.classList.remove('fullscreen');
        //   this._footQ.classList.remove('hideFoot');
        // } else if (!isAlarmRinging && this._ringingBegun) {
        //   this._ringingBegun = false;
        //   this._alarmButtonsQ.classList.remove('showButtons');
        // }
        const isAlarmRinging = this._alarmController.isAlarmRinging();
        // console.log('*** clock: ', this._clockQ);
        // console.log('*** alarmButtons: ', this._alarmButtonsQ);
        // console.log('*** isAlarmRinging: ' + isAlarmRinging + '; ringingBegun: ' + this._ringingBegun);
        if (this._clockQ) {
            if (isAlarmRinging && !this._ringingBegun) {
                // console.log('*** adding "showButtons" class');
                this._ringingBegun = true;
                this._footQ.classList.remove('hideFoot');
                this._alarmButtonsQ.classList.add('showButtons');
                this._koboldClockQ.classList.remove('fullscreen');
            } else if (!isAlarmRinging && this._ringingBegun) {
                // console.log('*** removing "showButtons" class');
                this._ringingBegun = false;
                // allow animations to complete before saving
                window.setTimeout(()=>{
                    this._alarmButtonsQ.classList.remove('showButtons');
                }, 250);
                this._koboldClockQ.classList.add('fullscreen');
                this._footQ.classList.add('hideFoot');
            }
        }
        return (0, $0f25a2e8805a310f$export$c0bb0b647f701bb5)`
        <ha-card>
          <div>

            <div id="koboldClock">
              <div id="alarmTop" class="meta">
                <div id="koboldLogo"></div>
                <div id="date"></div>
                <div class="optionButtons">
                  <ha-icon id="tab-0" class="settingsButton button" icon="mdi:cog" @click=${this._showEditor}></ha-icon>
                  <ha-icon id="tab-1" class="napButton button" icon="mdi:sleep" @click=${this._showEditor}></ha-icon>
                </div>
                ${this._areAlarmsEnabled() ? (0, $0f25a2e8805a310f$export$c0bb0b647f701bb5)`
                    <alarm-picker
                        id="tab-2"
                        show-icon="true"
                        .nextAlarm=${this._nextAlarm}
                        .config=${this._config}
                        .time=${this._time}
                        @alarm-button-clicked=${this._showEditor}
                        @nextAlarm-changed=${this._onAlarmChanged}
                        @toggle-logo-visibility=${this._toggleLogoVisibility}
                        ></alarm-picker>
                  ` : (0, $0f25a2e8805a310f$export$c0bb0b647f701bb5)`
                  <ha-icon id="tab-2" class="alarmpickerButton button" icon="mdi:alarm"
                                @click=${this._showEditor}></ha-icon>
                  `}
              </div>
              <div id="clock" @click=${!this.preview ? this._toggleHideCards : null}>TIME</div>
            </div>
          </div>
        </ha-card>

        <div id="foot">
          <div id="alarmButtons">
            <div class="alarmButton button">
              <button id="snooze" @click=${this._handleAlarmButtonsClick}>Snooze</button>
            </div>
            <div class="alarmButton button">
              <button id="dismiss" @click=${this._handleAlarmButtonsClick}>Dismiss</button>
            </div>
          </div>

          <div id="extraInfo">
              <div class="loading" style="text-align: center;">Loading cards...</div>
          </div>
        </div>
      `;
    }
    static #_ = this.styles = (0, $22deac181f878bbd$export$dbf350e5966cf602)`

    /* ************ */
    /* *** main *** */
    /* ************ */

    /* narrow screen, container size */
    /*@media (max-width: 750px) {
      div#alarmTop > div#koboldLogo {
        display: none;
      }
    }
    @container (max-width: 750px) {
      div#alarmTop > div#koboldLogo {
        display: none;
      }
    }*/

    #koboldClock {
      container-type: inline-size;
      padding: 1.5rem;
      height: 65vh;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      opacity: 1;
      transition: height 240ms, opacity 240ms;
    }

    #koboldClock.narrow div#koboldLogo {
      display: none;
    }

    #koboldClock.fullscreen {
      height: 100vh;
    }

    #koboldClock.fullscreen #clock {
      padding-top: 0;
    }

    #alarmTop {
      position: relative;
      font-size: calc(1rem + 1vh);
      font-size: calc(0.5cqw + 1em);
      display: flex;
      justify-content: space-between;
      height: 4vh;
      white-space: nowrap;
      align-items: center;
      color: var(--secondary-text-color);
    }

    #alarmTop div#koboldLogo {
      background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%27750%27%20height%3D%27175%27%20viewBox%3D%270%200%20198.437%2046.302%27%3E%3Cdefs%3E%3Cpath%20id%3D%27a%27%20d%3D%27M134.532%20279.996h1013.197v243.84H134.532z%27%2F%3E%3C%2Fdefs%3E%3Cg%20aria-label%3D%27KOBOLD%27%20style%3D%27font-size%3A192px%3Bline-height%3A1.25%3Bwhite-space%3Apre%3Bshape-inside%3Aurl%28%23a%29%27%20transform%3D%27translate%28-39.822%2011.568%29%20scale%28.26458%29%27%3E%3Cpath%20d%3D%27M297.007%20381.147v7.723l-36.756%2043.764q9.01%2010.87%2018.307%2022.025%209.439%2011.013%2018.45%2021.739v7.723h-23.17l-33.753-40.331H219.92v40.331h-22.311V381.147h22.31v40.331h20.166q3.29-3.718%206.436-7.58%203.147-3.861%206.436-7.723l20.881-25.028zm232.264%2040.474q0%204.005-1%206.58%202.144%202.717%203.575%206.292%201.43%203.433%201.43%207.151v21.31q0%204.434-1.716%208.295-1.717%203.862-4.577%206.722-2.86%202.86-6.722%204.577-3.861%201.573-8.295%201.573h-81.664V381.147h77.802q4.291%200%208.153%201.716%203.861%201.573%206.721%204.434%203.004%202.86%204.577%206.722%201.716%203.861%201.716%208.295zM452.47%20461.81h58.352v-18.879H452.47Zm0-41.19h54.347v-17.162H452.47Zm222.958-39.616h22.168v80.806h80.807v22.311H675.428Zm193.22.143q4.434%200%208.295%201.716%203.862%201.573%206.722%204.434%202.86%202.86%204.577%206.722%201.716%203.861%201.716%208.295v60.64q0%204.434-1.716%208.295-1.717%203.862-4.577%206.722-2.86%202.86-6.722%204.577-3.861%201.573-8.295%201.573h-81.664V381.147Zm-59.496%2080.663h58.352v-58.352h-58.352z%27%20style%3D%27font-family%3AOrbitron%3B-inkscape-font-specification%3AOrbitron%3Bstroke-width%3A.744895%27%20transform%3D%27translate%28-33.794%20-401.053%29%20scale%281.02854%29%27%2F%3E%3Cpath%20d%3D%27M419.64%20675.367A117.536%20117.536%200%200%200%20302.101%20792.9%20117.536%20117.536%200%200%200%20419.64%20910.437%20117.536%20117.536%200%200%200%20537.172%20792.9%20117.536%20117.536%200%200%200%20419.64%20675.367Zm-.71%2012.63%203.237%2036.913%203.195%2036.426h.043l-.032.141.032.346h-.106l-3.132%2014.648-3.237%2015.135-3.237-15.135-3.135-14.648h-.102l.028-.346-.028-.14h.042l3.195-36.427zm-1.728%20106.955-5.173%208.6-5.007%208.322.078.138-.194.06-.05.081-.031-.056-20.703%206.41-20.977%206.496%2016.118-14.916%2015.9-14.722-.032-.057h.095l.148-.14.082.137%209.71-.173z%27%20style%3D%27fill%3A%23000%3Bstroke-width%3A.999999%27%20transform%3D%27translate%2895.652%20-407.931%29%20scale%28.56969%29%27%2F%3E%3Cpath%20d%3D%27M705.391%20675.367A117.536%20117.536%200%200%200%20587.855%20792.9%20117.536%20117.536%200%200%200%20705.39%20910.437%20117.536%20117.536%200%200%200%20822.925%20792.9%20117.536%20117.536%200%200%200%20705.39%20675.367Zm.54%2012.63%203.237%2036.913%203.195%2036.426h.042l-.032.141.032.346h-.106l-3.131%2014.648-3.237%2015.135-3.24-15.135-3.132-14.648h-.102l.028-.346-.028-.14h.042l3.191-36.427zm1.57%20106.856%2010.035.18%209.715.173.077-.138.152.141h.091l-.031.057%2015.9%2014.722%2016.118%2014.916-20.978-6.495-20.699-6.411-.031.056-.05-.08-.197-.06.077-.138-5.007-8.322z%27%20style%3D%27fill%3A%23000%3Bstroke-width%3A.999999%27%20transform%3D%27translate%28185.991%20-407.931%29%20scale%28.56969%29%27%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E");

      height: calc(0.55em + 1vh);
      height: calc(0.05cqw + 1em);
      width: 100%;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center center;
      filter: invert(1) brightness(0.41); /* match --secondary-text-color */
      position: absolute;
      display: block;
    }
    #alarmTop div#koboldLogo.hidden {
      display: none;
    }

    #clock {
      -webkit-font-smoothing: subpixel-antialiased !important;
      text-rendering:optimizeLegibility !important;
      overflow: hidden;
      transition: padding-top 240ms;
      padding-top: 0.15em;
      /*padding-right: 0.05em;*/
      display: flex;
      justify-content: center;
      height: 100%;
      /*font-size: calc(14vw + 5em);*/
      /*font-size: 40vh;*/
      font-size: 18.23em;
      font-size: calc(14cqw + 5em);
      /*font-size: 100vh;
      font-size: 100cqh;*/
      letter-spacing: -0.02em;
      /*font-weight: 500;*/
      align-items: center;
      white-space-collapse: collapse;
      text-wrap-mode: nowrap;
      white-space: nowrap;
      text-shadow: 0 0 0.04em var(--primary-text-color);
    }
    /* Safari before v16 */
    @supports not (trim-margin: block) {
      @media not all and (min-resolution: 0.001dpcm) {
        /* Early Safari: bounding box incorrect when child in vertical writing mode */
        #clock {
          padding-right: 0.2em;
        }
      }
    }
    /*#clock svg {
      fill: currentColor;
    }*/
    #clock .periodName {
      position: relative;
      /*bottom: 2.2vh;*/
      bottom: 0.2em;
      margin-left: -0.2em;
      /*font-size: 31%;*/
      font-size: 0.3em;
      font-weight: 900 !important;
      writing-mode: vertical-lr;
      /*writing-mode: tb;*/ /* SVG 1 syntax */
      /*glyph-orientation-vertical: 0;*/ /* SVG 1 syntax */
      text-orientation: upright;
      letter-spacing: -0.15em;
    }
    /* Firefox */
    @-moz-document url-prefix() {
      #clock .periodName {
        letter-spacing: -0.05em;
      }
    }
    /* Safari */
    @media not all and (min-resolution: 0.001dpcm) {
      #clock .periodName {
        letter-spacing: -0.05em;
      }
    }
    #clock .periodName.periodKern {
      margin-left: -0.3em;
    }
    #clock .colonKernL {
      margin-left: -0.1em;
    }
    #clock .colonKernR {
      margin-right: -0.05em;
    }
    #clock .colon {
      position: relative;
      /*bottom: 3.3vh;*/
      bottom: 0.09em;
    }

    #clock.fontFace1 {
      font-family: 'noto_sansmedium';
      /*font-family: 'Noto Sans', sans-serif;*/
      /*font-optical-sizing: auto;*/
      /*font-weight: 600;*/
      /*font-weight: normal;*/
      font-style: normal;
      /*font-variation-settings: 'wdth' 87.5;*/
      letter-spacing: 0;
    }
    #clock.fontFace1 .periodName {
      /*bottom: 4vh;*/
      bottom: 0.43em;
      letter-spacing: -0.5em;
    }
    /* Firefox */
    @-moz-document url-prefix() {
      #clock.fontFace1 .periodName {
        bottom: 0.12em;
        letter-spacing: -0.05em;
      }
    }
    /* Safari */
    @media not all and (min-resolution: 0.001dpcm) {
      #clock.fontFace1 .periodName {
        bottom: 0.12em;
        letter-spacing: -0.05em;
      }
    }
    /*#clock.fontFace1 .periodName.periodKern {
      margin-left: -0.5em;
    }*/

    #clock.fontFace2 {
      font-family: 'oswald_regularregular';
      /*font-family: 'Oswald', sans-serif;*/
      /*font-optical-sizing: auto;*/
      /*font-weight: 600;*/
      /*font-weight: normal;*/
      font-style: normal;
      letter-spacing: 0;
    }
    #clock.fontFace2 .colonKernL {
      margin-left: -0.05em;
    }
    #clock.fontFace2 .colonKernR {
      margin-right: 0;
    }
    #clock.fontFace2 .periodName {
      /*bottom: 1.8vh;*/
      /*letter-spacing: -0.4em;*/
      letter-spacing: 0;
    }

    #clock.fontFace3 {
      font-family: 'ibm_plex_sansmedium';
      /*font-family: 'IBM Plex Sans', sans-serif;*/
      /*font-weight: 600;*/
      /*font-weight: normal;*/
      font-style: normal;
      letter-spacing: 0;
    }
    #clock.fontFace3 .periodName {
      letter-spacing: -0.4em;
      /*bottom: 4.5vh;*/
      bottom: 0.43em;
    }
    /* Firefox */
    @-moz-document url-prefix() {
      #clock.fontFace3 .periodName {
        letter-spacing: -0.05em;
        bottom: 0.19em;
      }
    }
    /* Safari */
    @media not all and (min-resolution: 0.001dpcm) {
      #clock.fontFace3 .periodName {
        letter-spacing: -0.05em;
        bottom: 0.19em;
      }
    }
    #clock.fontFace3 .colonKernL {
      margin-left: 0;
    }
    #clock.fontFace3 .colonKernR {
      margin-right: 0;
    }

    .optionButtons {
      text-align: right;
      width: 100%;
      margin-right: 1em;
      display: flex;
      justify-content: space-between;
    }

    .settingsButton.button {
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
    /* *** preview *** */
    /* *************** */

    :host([preview]) #koboldClock {
      height: 65vh;
    }
    :host([preview]) #clock {
      text-shadow: none;
      font-size: calc(5em + 100%);
      /*font-size: 10em;*/
      /*font-size: 12em;*/
      font-size: calc(5cqw + 5em);
    }
    :host([preview]) #clock.seconds {
      /*font-size: 7em;*/
    }
    :host([preview]) #clock .periodName {
      margin-left: 0.3em;
      /*bottom: 0.3em;*/
    }
    :host([preview]) #clock .periodName.periodKern {
      margin-left: 0.01em;
    }
    :host([preview]) #clock.fontFace3 .periodName.periodKern {
      margin-left: 0.1em;
    }
    :host([preview]) #clock .colon {
      /*bottom: 0.07em;*/
    }

    /*:host([preview]) #alarmTop #koboldLogo {
      filter: invert(1) brightness(0);
      display: block !important;
    }*/
    :host([preview]) div#alarmTop > div#koboldLogo {
      filter: invert(1) brightness(0);
      display: block;
    }

    :host([preview]) #foot, :host([preview]) #date, :host([preview]) #alarmTop .optionButtons, :host([preview]) #alarmTop alarm-picker, :host([preview]) .alarmpickerButton {
      display: none;
    }
  `;
    willUpdate(_changedProperties) {}
    // protected update(_changedProperties: PropertyValues): void {
    //   super.update(_changedProperties);
    //   console.log('*** update(); changed properties: ', _changedProperties);
    // }
    firstUpdated(_changedProperties) {
        // const preview = Helpers.getHa().shadowRoot.querySelector('hui-dialog-create-card').shadowRoot.querySelector('hui-card-picker');
        this.preview = this.preview || this.parentElement.classList.contains('preview') ? true : false;
        // console.log('*** firstUpdated; parentElement contains preview: ', this.parentElement?.classList.contains('preview'));
        // console.log('*** firstUpdated; this._config ', this._config);
        // console.log('*** atLeastVersion: ', Helpers.atLeastVersion(this._hass.config.version, 2024, 6));
        if (!this._alarmController.isAlarmRinging()) {
            // when card starts up, hide cards (prevents flicker during save)
            this._enforceHideCards(true);
            window.setTimeout(()=>{
                if (!this._config.hide_cards_default && this._config.cards) this._enforceHideCards(false);
            }, 250);
        }
        this._updateTime();
        if (this._haCardQ) // console.log('*** _buildCard(); extraInfoQ kobold-card: ', this._extraInfoQ.querySelectorAll('*')); //'[kobold-card="true"]'));
        // console.log('*** _buildCard(); extraInfoQ.childElementCount: ', this._extraInfoQ.childElementCount);
        // console.log('*** _buildCard(); extraInfoQ: ', this._extraInfoQ);
        // console.log('*** _buildCard(); extraInfoQ.children: ', this._extraInfoQ.children);
        // console.log('*** _buildCard(); extraInfoQ.childNodes: ', this._extraInfoQ.childNodes);
        // if (!this.preview) this._buildCard();
        this._buildCard();
        else console.warn('*** firstUpdated(); Missing <ha-card> in shadowRoot');
    }
    updated(_changedProperties) {
        // console.log('*** updated; changeProperties: ', _changedProperties);
        // if (_changedProperties.has('_nextAlarm')) console.log('*** Card updated(); nextAlarm changed: ', this._nextAlarm);
        const cardWidth = this.getBoundingClientRect().width;
        // console.log('*** card width: ', cardWidth);
        if (this._koboldClockQ && this._alarmPickerQ) {
            if (cardWidth < 750) {
                this._koboldClockQ.classList.add('narrow');
                this._alarmPickerQ.classList.add('narrow');
            } else {
                this._koboldClockQ.classList.remove('narrow');
                this._alarmPickerQ.classList.remove('narrow');
            }
        }
        if (!this._injectStylesDone) {
            this._injectStylesDone = true;
            // Is Kobold displayed in Kiosk mode?
            // let cardWidth = this.offsetWidth;
            // let windowWidth = Helpers.getHa().offsetWidth;
            // if (cardWidth === 0 || windowWidth === 0) {
            // cardWidth = this.getBoundingClientRect().width;
            // windowWidth = window.innerWidth;
            // }
            if (cardWidth === window.innerWidth) {
                // console.log('*** kobold is in kiosk mode; card width: ' + this.offsetWidth + '; HA width: ' + Helpers.getHa().offsetWidth);
                // hide visible line separating sidebar from main view on iOS
                (0, $b2cd7c9abb677932$export$4dc2b60021baefca).getDrawer().style.borderRightStyle = 'unset';
                // prevent scrolling
                document.querySelector('body').style.overflow = 'hidden';
                document.querySelector('body').style.position = 'fixed';
                document.querySelector('body').style.width = '100%';
            }
            // inject style into mdc form fields
            let myStyle;
            //  alarmTop styles
            if (this._optionButtonsHostsQ) {
                // const optionButtonsStyle = 'ha-svg-icon { height: calc(1.5rem + 1vh); width: calc(1.5rem + 1vh); }';
                const optionButtonsStyle = 'ha-svg-icon { height: calc(1.5rem + 1vh); height: calc(1.25rem + 0.5cqw); width: calc(1.5rem + 1vh); width: calc(1.25rem + 0.5cqw); }';
                this._optionButtonsHostsQ.forEach((optionButtonsHost)=>{
                    myStyle = document.createElement('style');
                    myStyle.innerHTML = optionButtonsStyle;
                    optionButtonsHost.shadowRoot.appendChild(myStyle);
                });
            }
        }
    }
    setConfig(config) {
        if (!config) alert('Card config incorrectly formatted or missing.');
        if (!config.cards || !Array.isArray(config.cards)) {
            if (config.debug) {
                this._hass.callService('system_log', 'write', {
                    'message': '*** setConfig(); No HA cards available to configure',
                    'level': 'info'
                });
                console.warn('*** setConfig(); No HA cards available to configure');
            }
        }
        if (!config.alarm_entities || !Array.isArray(config.alarm_entities)) {
            if (config.debug) {
                this._hass.callService('system_log', 'write', {
                    'message': '*** setConfig(); No array of alarm_entities found in card configuration',
                    'level': 'info'
                });
                console.warn('*** setConfig(); No array of alarm_entities found in card configuration');
            }
        }
        this._config = config; //TODO: make a copy here?
        // this._config = Helpers.deepMerge(Helpers.defaultConfig, config); //only helpful if inside editor
        // console.log('*** Card setConfig: config: ', this._config);
        // Helpers.fireEvent('config-changed', { config: this._config }, Helpers.getEditor()); //only works inside editor
        // console.log('*** Card setConfig: config.nextAlarm: ', this._config.next_alarm);
        // NOTE: Some cards call setConfig() multiple times during life of card
        if (!this._alarmController) this._alarmController = new (0, $b2cd7c9abb677932$export$cfa71a29f5c0676d)(this._config, this._cardId);
    }
    set hass(hass) {
        this._hass = hass;
        this._alarmController.hass = hass;
        (0, (/*@__PURE__*/$parcel$interopDefault($7b2a0b4b3c09b2f0$exports))).locale(hass.language);
        if (this._elements) this._elements.forEach((element)=>{
            element.hass = hass;
        });
    }
    getCardSize() {
        return 3;
    }
    _buildCard() {
        if (!this._extraInfoQ) console.warn('*** _buildCard(); Card root (element id "extraInfo") not available');
        while(this._extraInfoQ.lastChild)this._extraInfoQ.removeChild(this._extraInfoQ.lastChild);
        const config = this._config;
        if (config.alarm_entities && Array.isArray(config.alarm_entities)) config.alarm_entities.forEach((item)=>{
            if (!this._hass.states[item]) console.warn(`*** _buildCard(); Entity ${item} does not exist in HA`);
        });
        else alert('No array of alarm_entities found in card configuration. One is required for alarm.');
        if (config.cards) {
            const elements = this._elements = [];
            Promise.all(config.cards.map(async (card)=>{
                const element = await this._createCardElement(card);
                // element.setAttribute('kobold-card', 'true');
                if (card.type === 'media-control') element.setAttribute('type-media-control', 'true');
                elements.push(element);
                this._extraInfoQ.appendChild(element);
            })).catch((error)=>{
                console.error('*** Error while creating card element: ', error.message);
            }).then(()=>{
                this._elements = elements;
                this._elements.forEach((element)=>{
                    (0, $b2cd7c9abb677932$export$4dc2b60021baefca).updateHeight(element);
                    if (this._hass) element.hass = this._hass;
                    else console.warn('*** _buildCard(); No hass object available for config');
                });
            });
        }
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
        const fontNum = !this._config.clock_display_font ? '0' : this._config.clock_display_font;
        let clockClass = 'fontFace' + fontNum;
        const showSeconds = false;
        if (showSeconds) clockClass += ' seconds';
        // this._clockClasses = fontNum === '0' ? { clock: true } : { clock: true, [fontFaceClass]: true };
        this._clockQ.classList.value = clockClass;
        const time = (0, (/*@__PURE__*/$parcel$interopDefault($7b2a0b4b3c09b2f0$exports)))().format(this._config.time_format === '24hr' ? 'HH:mm:ss' : 'h:mm:ss A');
        const isAlarmRinging = this._alarmController.isAlarmRinging();
        // // console.log('*** isAlarmRinging: ' + isAlarmRinging + '; ringingBegun: ' + this._ringingBegun);
        // if (isAlarmRinging && !this._ringingBegun) {
        //   console.log('*** adding "showButtons" class');
        //   this._ringingBegun = true;
        //   this._alarmButtonsQ.classList.add('showButtons');
        //   this._koboldClockQ.classList.remove('fullscreen');
        //   this._footQ.classList.remove('hideFoot');
        // } else if (!isAlarmRinging && this._ringingBegun) {
        //   console.log('*** removing "showButtons" class');
        //   this._ringingBegun = false;
        //   this._alarmButtonsQ.classList.remove('showButtons');
        //   this._koboldClockQ.classList.add('fullscreen');
        //   this._footQ.classList.add('hideFoot');
        // }
        if (this._clockQ && (force || this._time !== time)) {
            this._time = time;
            // this._ringing = isAlarmRinging;  //TODO: do we need both these variables? seems not; leave for testing
            // this._controllersAlarmConfigLastUpdate = this._config.last_updated;
            // console.log('*** updateTime(); last_updated: ', this._config.last_updated);
            let timeDisplay;
            // time variable includes seconds, even when showSeconds is false
            const [timeHr, timeMn, timeSd] = time.split(':');
            let colon1Kern = '';
            let colon2Kern = '';
            if (timeHr.slice(-1) === '1') colon1Kern = ' colonKernL';
            if (timeMn.slice(0, 1) === '1') colon1Kern = colon1Kern + ' colonKernR';
            if (showSeconds) {
                if (timeMn.slice(-1) === '1') colon2Kern = ' colonKernL';
                if (timeSd.slice(0, 1) === '1') colon2Kern = colon2Kern + ' colonKernR';
            }
            if (this._config.time_format === '24hr') {
                if (showSeconds) timeDisplay = timeHr + '<span class="colon' + colon1Kern + '">:</span>' + timeMn + '<span class="colon' + colon2Kern + '">:</span>' + timeSd;
                else timeDisplay = timeHr + '<span class="colon' + colon1Kern + '">:</span>' + timeMn;
            } else {
                let periodKern = '';
                const [timeSdNum, timeTxt] = timeSd.split(' ');
                if (showSeconds) {
                    if (timeSdNum.slice(-1) === '1' || timeSdNum.slice(-1) === '7') periodKern = ' periodKern';
                    timeDisplay = timeHr + '<span class="colon' + colon1Kern + '">:</span>' + timeMn + '<span class="colon' + colon2Kern + '">:</span>' + timeSdNum + '<span class="periodName' + periodKern + '">' + timeTxt + '</span>';
                } else {
                    if (timeMn.slice(-1) === '1' || timeMn.slice(-1) === '7') periodKern = ' periodKern';
                    timeDisplay = timeHr + '<span class="colon' + colon1Kern + '">:</span>' + timeMn + '<span class="periodName' + periodKern + '">' + timeTxt + '</span>';
                }
            }
            this._clockQ.innerHTML = `
        <div>
          ${timeDisplay}
        </div>
      `;
            // this._clockQ.innerHTML = `
            //   <svg>
            //     <text>${timeDisplay}</text>
            //   </svg>
            // `;
            // const mySvg = this._clockQ.querySelector('svg');
            // const bbox = mySvg.querySelector('text').getBBox();
            // mySvg.setAttribute('viewBox', [bbox.x, bbox.y, bbox.width, bbox.height].join(' '));
            // const periodName: SVGspanElement = mySvg.querySelector('tspan.periodName');
            // const periodNameBbox = periodName.getBBox();
            // const myX = bbox.width - (periodNameBbox.width / 2);
            // const myY = bbox.height - (periodNameBbox.height / 2);
            // periodName.setAttribute('x', myX.toString());
            // periodName.setAttribute('y', myY.toString());
            const dateFormat = this._config.time_format === '24hr' ? 'dddd, D MMMM' : 'dddd, MMMM D';
            this._dateQ.innerHTML = (0, (/*@__PURE__*/$parcel$interopDefault($7b2a0b4b3c09b2f0$exports)))().format(dateFormat);
        }
    }
    _areAlarmsEnabled() {
        return this._config.alarms_enabled || !!this._alarmController.nextAlarm.nap;
    }
    _onAlarmChanged(event) {
        // this only fires for changes to nextalarm in #alarmpicker element html of kobold-alarm-clock-card.js
        // if (!event.detail.nextAlarm.enabled) {
        //   this._alarmController.nextAlarm = { enabled: false, time: event.detail.nextAlarm.time };
        // } else {
        //   this._alarmController.nextAlarm = event.detail.nextAlarm;
        // }
        let data;
        if (!event.detail.nextAlarm.enabled) data = {
            enabled: false,
            time: event.detail.nextAlarm.time
        };
        else data = event.detail.nextAlarm;
        if (!this._config.hide_cards_default) this._enforceHideCards(true);
        // allow animations to complete before saving
        window.setTimeout(()=>{
            this._alarmController.nextAlarm = data;
        }, 250);
    }
    _handleAlarmButtonsClick(event) {
        // console.log('*** click detected: ', event.target);
        this._alarmController[event.target.id]();
    }
    // _toggleAlarmFullscreen(force: boolean) {
    //   if (!this._alarmController.isAlarmRinging()) {
    //     if (this._alarmClockClasses.fullscreen || !force) {
    //       this._alarmClockClasses = { fullscreen: false };
    //       this._footClasses = { hideFoot: false };
    //     } else {
    //       this._alarmClockClasses = { fullscreen: true };
    //       this._footClasses = { hideFoot: true };
    //     }
    //     if (force) {
    //       // save hide_cards_default(force) and remove obsolete option to configure in settings
    //     }
    //   }
    // }
    // _toggleClockFullscreen(forceHide: boolean | PointerEvent) {
    //   console.log('*** _toggleClockFullscreen fired');
    //   // console.log('*** alarmClockClasses: ', this._alarmClockClasses);
    //   let state = forceHide;
    //   if (!this._alarmController.isAlarmRinging()) {
    //     // if ((!this._alarmClockClasses.fullscreen && forceHide instanceof PointerEvent) || forceHide === true) {
    //     if ((!this._koboldClockQ.classList.contains('fullscreen') && forceHide instanceof PointerEvent) || forceHide === true) {
    //       // this._alarmClockClasses = { fullscreen: true };
    //       this._koboldClockQ.classList.add('fullscreen');
    //       // this._footClasses = { hideFoot: true };
    //       this._footQ.classList.add('hideFoot');
    //       state = true;
    //     } else if ((this._koboldClockQ.classList.contains('fullscreen') && forceHide instanceof PointerEvent) || forceHide === false) {
    //       // } else if ((this._alarmClockClasses.fullscreen && forceHide instanceof PointerEvent) || forceHide === false) {
    //       // this._alarmClockClasses = { fullscreen: false };
    //       // this._footClasses = { hideFoot: false };
    //       this._koboldClockQ.classList.remove('fullscreen');
    //       this._footQ.classList.remove('hideFoot');
    //       state = false;
    //     }
    //   }
    //   if (this._config.hide_cards_default !== state) this._alarmController.hideCardsDefault = state;
    // }
    _toggleHideCards(event) {
        // console.log('*** _toggleHideCards fired');
        if (!this._alarmController.isAlarmRinging() && this._config.cards) {
            // if (!this._config.hide_cards_default) {
            //   // this._koboldClockQ.classList.add('fullscreen');
            //   // this._footQ.classList.add('hideFoot');
            //   state = true;
            // } else {
            //   // this._koboldClockQ.classList.remove('fullscreen');
            //   // this._footQ.classList.remove('hideFoot');
            //   state = false;
            // }
            // const state = !this._config.hide_cards_default ? true : false;
            if (!this._config.hide_cards_default) {
                // hiding cards
                this._enforceHideCards(true);
                // allow animation to complete before saving
                window.setTimeout(()=>{
                    this._alarmController.hideCardsDefault = true;
                }, 250);
            } else // showing cards
            this._alarmController.hideCardsDefault = false;
        }
    }
    _enforceHideCards(hideCards) {
        // hide cards requested, not already hiding cards
        if (hideCards && !this._koboldClockQ.classList.contains('fullscreen')) {
            this._koboldClockQ.classList.add('fullscreen');
            this._footQ.classList.add('hideFoot');
        }
        // show cards requested, not already showing cards
        if (!hideCards && this._koboldClockQ.classList.contains('fullscreen')) {
            this._koboldClockQ.classList.remove('fullscreen');
            this._footQ.classList.remove('hideFoot');
        }
    }
    _toggleLogoVisibility() {
        if (this._koboldLogoQ) {
            if (!this._koboldLogoQ.classList.contains('hidden')) // if (this._koboldLogoQ.style.display !== 'none') {
            // this._koboldLogoQ.style.display = 'none';
            this._koboldLogoQ.classList.add('hidden');
            else // this._koboldLogoQ.style.display = 'block';
            this._koboldLogoQ.classList.remove('hidden');
        }
    }
    async _showEditor(event) {
        event.stopPropagation();
        let tabNo = parseInt(event.target.id.slice(4));
        window.setMyEditMode();
        this._clockQ.style.display = 'none';
        // Helpers.getLovelace().style.display = 'none';
        // Helpers.getLovelace().style.filter = 'blur(10px)';
        //  dialogBackground styles
        if ((0, $b2cd7c9abb677932$export$4dc2b60021baefca).getLovelace().shadowRoot) {
            const dialogBackgroundStyle = 'hui-view, div.header { opacity: 0; transition: opacity 750ms; }';
            const myStyle = document.createElement('style');
            myStyle.innerHTML = dialogBackgroundStyle;
            // console.log('*** lovelace style: ', Helpers.getLovelace().shadowRoot.querySelector('div'));
            (0, $b2cd7c9abb677932$export$4dc2b60021baefca).getLovelace().shadowRoot.querySelector('div').appendChild(myStyle);
        }
        let rounds = 0;
        // wait for availability of card-options; kobold card might be nested
        while(!this.closest('hui-card-options') && !this.getRootNode().host.closest('hui-card-options') && rounds++ < 5)await new Promise((r)=>setTimeout(r, 100));
        if (rounds === 6) console.warn('*** _showEditor(); Timed out waiting for edit mode');
        else {
            const huiCardPath = this.closest('hui-card-options')?.path ?? this.getRootNode().host.closest('hui-card-options')?.path;
            (0, $b2cd7c9abb677932$export$4dc2b60021baefca).fireEvent('ll-edit-card', {
                path: huiCardPath
            }, this);
            let rounds = 0;
            while(!this._koboldEditor && rounds++ < 5)await new Promise((r)=>setTimeout(r, 100));
            if (rounds === 6) console.warn('*** _showEditor(); Timed out waiting for editor');
            else {
                (0, $b2cd7c9abb677932$export$4dc2b60021baefca).fireEvent('kobold-tab', {
                    tab: tabNo
                }, this._koboldEditor.shadowRoot.querySelector('#kobold-card-config'));
                this._koboldEditor = undefined;
            }
        }
        this._clockQ.style.display = 'flex';
    }
    constructor(...args){
        super(...args), this._cardId = Math.random().toString(36).slice(2, 9) + ', ' + new Date().toJSON(), this.preview = false, this._connectionStatusEvent = (event)=>{
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
                        window.setTimeout(()=>{
                            this._hass.callService('system_log', 'write', {
                                'message': '*** HA Restarted. Refreshing browser',
                                'level': 'info'
                            });
                            window.setTimeout(()=>{
                                location.reload();
                            }, 2000);
                        }, 60000);
                    }, 'homeassistant_started');
                });
            }
        }, this._dialogClosedEvent = (event)=>{
            // NOTE: this will fire when closing any edit dialog
            if (event.detail.dialog === 'hui-dialog-edit-card') {
                window.setMyEditMode(false);
                window.setTimeout(()=>{
                    // replace browser history with path lacking edit parameter
                    // see _handleClosed https://github.com/home-assistant/frontend/blob/f3380891486c01f2a75c83524578b5aeed85f114/src/dialogs/make-dialog-manager.ts
                    const base = window.location.pathname;
                    window.history.replaceState(null, '', base);
                }, 100);
            }
        }, this._koboldEditorEvent = (event)=>{
            this._koboldEditor = event.detail.editorEl;
        };
    }
}
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $e978bded0760ae3c$export$ca000e230c0caa3e)()
], $2109a11e0895c6b1$var$KoboldAlarmClockCard.prototype, "_nextAlarm", void 0);
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $e978bded0760ae3c$export$ca000e230c0caa3e)()
], $2109a11e0895c6b1$var$KoboldAlarmClockCard.prototype, "_hass", void 0);
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $e978bded0760ae3c$export$ca000e230c0caa3e)()
], $2109a11e0895c6b1$var$KoboldAlarmClockCard.prototype, "_time", void 0);
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $e978bded0760ae3c$export$ca000e230c0caa3e)()
], $2109a11e0895c6b1$var$KoboldAlarmClockCard.prototype, "_koboldEditor", void 0);
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $6bc2845c2b7eed7f$export$d541bacb2bda4494)({
        type: Boolean,
        reflect: true
    })
], $2109a11e0895c6b1$var$KoboldAlarmClockCard.prototype, "preview", void 0);
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $08419c1b2039b9cc$export$2fa187e846a241c4)('#clock', true)
], $2109a11e0895c6b1$var$KoboldAlarmClockCard.prototype, "_clockQ", void 0);
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $08419c1b2039b9cc$export$2fa187e846a241c4)('#koboldClock', true)
], $2109a11e0895c6b1$var$KoboldAlarmClockCard.prototype, "_koboldClockQ", void 0);
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $08419c1b2039b9cc$export$2fa187e846a241c4)('#foot', true)
], $2109a11e0895c6b1$var$KoboldAlarmClockCard.prototype, "_footQ", void 0);
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $08419c1b2039b9cc$export$2fa187e846a241c4)('#alarmButtons', true)
], $2109a11e0895c6b1$var$KoboldAlarmClockCard.prototype, "_alarmButtonsQ", void 0);
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
    (0, $08419c1b2039b9cc$export$2fa187e846a241c4)('#extraInfo', true)
], $2109a11e0895c6b1$var$KoboldAlarmClockCard.prototype, "_extraInfoQ", void 0);
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $08419c1b2039b9cc$export$2fa187e846a241c4)('#alarmTop div#koboldLogo', true)
], $2109a11e0895c6b1$var$KoboldAlarmClockCard.prototype, "_koboldLogoQ", void 0);
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $08419c1b2039b9cc$export$2fa187e846a241c4)('alarm-picker', true)
], $2109a11e0895c6b1$var$KoboldAlarmClockCard.prototype, "_alarmPickerQ", void 0);
$2109a11e0895c6b1$var$KoboldAlarmClockCard = (0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $fcbcbba309c0f62b$export$da64fc29f17f9d0e)('kobold-alarm-clock-card')
], $2109a11e0895c6b1$var$KoboldAlarmClockCard);
class $2109a11e0895c6b1$var$KoboldCardEditor extends (0, $da1fd7e2c62fd6f3$export$3f2f9f5909897157) {
    // @query('hui-dialog-edit-card', true) _editorQ: HTMLElement;
    // @query('div#editor') _editorQ: HTMLElement;
    constructor(){
        super(), this._configSchemaSettings = [
            {
                name: "alarm_entities",
                label: "Alarm Ringer Entities",
                selector: {
                    entity: {
                        multiple: true,
                        filter: {
                            domain: $2109a11e0895c6b1$var$DOMAINS_ALARM_ENTITIES
                        }
                    }
                }
            },
            {
                name: "time_format",
                label: "Time Format",
                selector: {
                    select: {
                        options: [
                            {
                                label: "12-Hour",
                                value: "12hr"
                            },
                            {
                                label: "24-Hour",
                                value: "24hr"
                            }
                        ]
                    }
                }
            },
            {
                name: "clock_display_font",
                label: "Clock Display Font",
                selector: {
                    select: {
                        options: [
                            {
                                label: "System",
                                value: 0
                            },
                            {
                                label: "Noto Sans",
                                value: 1
                            },
                            {
                                label: "Oswald",
                                value: 2
                            },
                            {
                                label: "IBM Plex Sans",
                                value: 3
                            }
                        ]
                    }
                }
            },
            // {
            //   name: "hide_cards_default",
            //   label: "Hide Cards by Default",
            //   selector: { boolean: {} },
            // },
            // {
            //   type: "grid", schema: [
            //     {}, { name: "stuff", label: "", selector: { duration: {} } }
            //   ]
            // },
            {
                name: "snooze_duration_default",
                label: "Snooze Duration Default",
                selector: {
                    duration: {}
                }
            },
            {
                name: "alarm_duration_default",
                label: "Alarm Duration Default",
                selector: {
                    duration: {}
                }
            },
            {
                name: "alarm_actions",
                label: "Alarm Actions",
                selector: {
                    object: {
                        label_field: "entity",
                        description_field: "when",
                        multiple: true,
                        fields: {
                            entity: {
                                label: "Alarm Action Entity",
                                selector: {
                                    entity: {}
                                },
                                required: true
                            },
                            when: {
                                label: "Activate Action When",
                                selector: {
                                    select: {
                                        options: [
                                            {
                                                label: "On Snooze",
                                                value: "on_snooze"
                                            },
                                            {
                                                label: "On Dismiss",
                                                value: "on_dismiss"
                                            },
                                            {
                                                label: "Offset from Alarm Ring Time",
                                                value: "offset"
                                            }
                                        ]
                                    }
                                },
                                required: true
                            },
                            offset: {
                                label: "Offset Duration",
                                selector: {
                                    duration: {}
                                }
                            },
                            negative: {
                                label: "Offset Negative",
                                selector: {
                                    boolean: {}
                                }
                            }
                        }
                    }
                }
            },
            {
                name: "cards",
                label: "Cards to Display",
                selector: {
                    object: {
                        label_field: "entity",
                        multiple: true,
                        fields: {
                            entity: {
                                label: "Card Entity",
                                selector: {
                                    entity: {}
                                },
                                required: true
                            },
                            "": {
                                label: "Card Configuration",
                                selector: {
                                    object: {}
                                }
                            }
                        }
                    }
                }
            },
            {
                name: "debug",
                label: "Debug Mode",
                selector: {
                    boolean: {}
                }
            }
        ], this._configSchemaSchedule = (alarms_disabled)=>[
                {
                    name: "alarms_enabled",
                    label: "Alarms Schedule Enabled",
                    selector: {
                        boolean: {}
                    }
                },
                {
                    type: "grid",
                    name: "mo",
                    schema: [
                        {
                            name: "enabled",
                            label: this._getDayOfWeek(0),
                            selector: {
                                boolean: {}
                            },
                            disabled: alarms_disabled
                        },
                        {
                            name: "time",
                            label: "",
                            selector: {
                                time: {}
                            },
                            disabled: alarms_disabled
                        }
                    ]
                },
                {
                    type: "grid",
                    name: "tu",
                    schema: [
                        {
                            name: "enabled",
                            label: this._getDayOfWeek(1),
                            selector: {
                                boolean: {}
                            },
                            disabled: alarms_disabled
                        },
                        {
                            name: "time",
                            label: "",
                            selector: {
                                time: {}
                            },
                            disabled: alarms_disabled
                        }
                    ]
                },
                {
                    type: "grid",
                    name: "we",
                    schema: [
                        {
                            name: "enabled",
                            label: this._getDayOfWeek(2),
                            selector: {
                                boolean: {}
                            },
                            disabled: alarms_disabled
                        },
                        {
                            name: "time",
                            label: "",
                            selector: {
                                time: {}
                            },
                            disabled: alarms_disabled
                        }
                    ]
                },
                {
                    type: "grid",
                    name: "th",
                    schema: [
                        {
                            name: "enabled",
                            label: this._getDayOfWeek(3),
                            selector: {
                                boolean: {}
                            },
                            disabled: alarms_disabled
                        },
                        {
                            name: "time",
                            label: "",
                            selector: {
                                time: {}
                            },
                            disabled: alarms_disabled
                        }
                    ]
                },
                {
                    type: "grid",
                    name: "fr",
                    schema: [
                        {
                            name: "enabled",
                            label: this._getDayOfWeek(4),
                            selector: {
                                boolean: {}
                            },
                            disabled: alarms_disabled
                        },
                        {
                            name: "time",
                            label: "",
                            selector: {
                                time: {}
                            },
                            disabled: alarms_disabled
                        }
                    ]
                },
                {
                    type: "grid",
                    name: "sa",
                    schema: [
                        {
                            name: "enabled",
                            label: this._getDayOfWeek(5),
                            selector: {
                                boolean: {}
                            },
                            disabled: alarms_disabled
                        },
                        {
                            name: "time",
                            label: "",
                            selector: {
                                time: {}
                            },
                            disabled: alarms_disabled
                        }
                    ]
                },
                {
                    type: "grid",
                    name: "su",
                    schema: [
                        {
                            name: "enabled",
                            label: this._getDayOfWeek(6),
                            selector: {
                                boolean: {}
                            },
                            disabled: alarms_disabled
                        },
                        {
                            name: "time",
                            label: "",
                            selector: {
                                time: {}
                            },
                            disabled: alarms_disabled
                        }
                    ]
                }
            ], this._selectedTab = 0;
        (0, $b2cd7c9abb677932$export$4dc2b60021baefca).fireEvent('kobold-editor', {
            editorEl: this
        }, (0, $b2cd7c9abb677932$export$4dc2b60021baefca).getHa());
    }
    set hass(hass) {
        this._hass = hass;
    }
    setConfig(config) {
        // TODO: add check to determine whether config same as after merge with defaultconfig? If same, no need to update last_updated
        console.log('*** Editor setConfig(); config: ', config);
        // console.log('*** Editor setConfig; config nextAlarm overridden: ', config.next_alarm.overridden);
        this._config = (0, $b2cd7c9abb677932$export$4dc2b60021baefca).deepMerge((0, $b2cd7c9abb677932$export$4dc2b60021baefca).defaultConfig, config);
        const configChanges = (0, $b2cd7c9abb677932$export$4dc2b60021baefca).deepCompareObj(this._config, config);
        // if (!configChanges) return;
        if (configChanges) {
            // console.log('*** Editor setConfig(); changes v default: ', Helpers.deepCompareObj(configChanges, Helpers.defaultConfig));
            // console.log('*** Editor setConfig(); changes v config: ', Helpers.deepCompareObj(configChanges, config));
            console.log('*** Editor setConfig(); configChanges: ', configChanges);
            // console.log('*** Editor setConfig(); config: ', config);
            console.log('*** Editor setConfig(); this._config: ', (0, $b2cd7c9abb677932$export$4dc2b60021baefca).defaultConfig);
        }
        // this._config.last_updated = dayjs().format('YYYY-MM-DD HH:mm:ss');
        // console.log('*** setConfig on card(); last_updated: ', this._config.last_updated);
        (0, $b2cd7c9abb677932$export$4dc2b60021baefca).fireEvent('config-changed', {
            config: this._config
        }, this); //updates lovelace.config
        if (!this._oldConfig) this._oldConfig = this._config;
    }
    firstUpdated(_changedProperties) {
        // console.log('*** this._nextAlarmConfig: ', this._nextAlarmConfig);
        // const saveButton = Helpers.getEditorButtons().querySelectorAll('mwc-button')[1];
        // if (saveButton) {
        //   saveButton.addEventListener('click', () => {
        //     if (this._nextAlarmConfig) {
        //       const nextAlarmDiff = Helpers.deepCompareObj(this._nextAlarmConfig.next_alarm, this._config.next_alarm);
        //       if (nextAlarmDiff) {
        //         this._saveNextAlarm(this._nextAlarmConfig);
        //       }
        //     }
        //   });
        // } else {
        //   console.error(`*** Save button not found`);
        // }
        // console.log('*** editor: ', Helpers.getEditor().shadowRoot.querySelector('hui-card-element-editor').shadowRoot.querySelector('hui-stack-card-editor').shadowRoot.querySelector('hui-card-element-editor').shadowRoot.querySelector('kobold-card-editor').shadowRoot.querySelector('#kobold-card-config'));
        // console.log('*** this: ', this.shadowRoot);//.querySelector('*'));
        const editorStyleTag = (0, $b2cd7c9abb677932$export$4dc2b60021baefca).getLovelace().shadowRoot ? (0, $b2cd7c9abb677932$export$4dc2b60021baefca).getLovelace().shadowRoot.querySelector('div > style') : undefined;
        const myDialog = (0, $b2cd7c9abb677932$export$4dc2b60021baefca).getEditor().shadowRoot.querySelector('ha-dialog');
        if (myDialog) myDialog.addEventListener('keydown', (event)=>{
            //https://developer.mozilla.org/en-US/docs/Web/API/Element/keydown_event#keydown_events_with_ime
            if (event.isComposing || event.keyCode === 229) // console.log('*** ignorable key event fired; returning');
            return;
            // console.log('*** key hit: ', event.key);
            if (event.key === 'Enter') {
                // console.log('*** saving after key event.');
                if (editorStyleTag) editorStyleTag.remove();
                this._handleSaveButton();
            }
        });
        else console.error('*** firstUpdated(); Editor dialog not found. Refresh browser');
        const cancelButton = (0, $b2cd7c9abb677932$export$4dc2b60021baefca).getHa().shadowRoot.querySelector('hui-dialog-edit-card').shadowRoot.querySelector('ha-icon-button[dialogaction=cancel]');
        if (cancelButton) cancelButton.addEventListener('click', (event)=>{
            // console.log('*** event: ', event);
            if (editorStyleTag) editorStyleTag.remove();
        });
        else console.error('*** firstUpdated(); Cancel button not found. Refresh browser');
        let editButtons = (0, $b2cd7c9abb677932$export$4dc2b60021baefca).getEditorButtons().querySelectorAll('ha-button');
        if (editButtons.length === 0) editButtons = (0, $b2cd7c9abb677932$export$4dc2b60021baefca).getEditorButtons().querySelectorAll('mwc-button');
        // console.log('*** editButtons: ', editButtons);
        if (editButtons.length > 0) editButtons.forEach((button, index)=>{
            // ['click', 'keypress'].forEach(event => {
            //   button.addEventListener(event, function (e, myNextAlarmConfig) {
            //     if (event === 'click' || e.keyCode === 13) {
            //       if (Helpers.getLovelace().shadowRoot) {
            //         Helpers.getLovelace().shadowRoot.querySelector('div > style').remove();
            //       }
            //       if (index === 1) {
            //         // console.log('*** this._nextAlarmConfig: ', this._nextAlarmConfig);
            //         // console.log('*** this._nextAlarmConfig: ', myNextAlarmConfig);
            //         if (this._nextAlarmConfig) {
            //           const nextAlarmDiff = Helpers.deepCompareObj(this._nextAlarmConfig.next_alarm, this._config.next_alarm);
            //           if (nextAlarmDiff) {
            //             this._saveNextAlarm(this._nextAlarmConfig);
            //           }
            //         }
            //       }
            //     }
            //   });
            // });
            button.addEventListener('click', ()=>{
                if (editorStyleTag) editorStyleTag.remove();
                if (index === 1) // console.log('*** saving after click event');
                this._handleSaveButton();
            });
        });
        else console.error('*** firstUpdated(); Editor buttons not found. Refresh browser');
    //   if (Helpers.getPreview()) {
    //     let myStyle;
    //     console.log('*** firstUpdated; preview: ', Helpers.getPreview());
    //     const clockStyle = '#clock { background-color: green !important}; }';
    //     myStyle = document.createElement('style');
    //     myStyle.innerHTML = clockStyle;
    //     let card = Helpers.getPreview().querySelector('kobold-alarm-clock-card');
    //     if (!card) {
    //       card = Helpers.getPreview().shadowRoot?.querySelector('kobold-alarm-clock-card');
    //       if (!card) {
    //         console.warn('*** firstUpdated(); No card found for preview');
    //         Helpers.getPreview().style.visibility = 'hidden';
    //       }
    //     }
    //     if (card) card.appendChild(myStyle);
    //   }
    }
    updated(_changedProperties) {
        //   // console.log('*** updated; changed properties: ', _changedProperties);
        // if (!this._injectStylesDone) {
        const formRootHost = this.shadowRoot.querySelector('#schedule')?.querySelector('ha-form')?.shadowRoot;
        // console.log('*** formRootHost: ', formRootHost);
        if (formRootHost) {
            if (!formRootHost.querySelector('style#formRoot')) {
                // if (formRootHost.style.contains('ha-form-grid')) {
                // console.log('*** style already added');
                // console.log('*** style: ', formRootHost.querySelector('style'));
                // this._injectStylesDone = true;
                // const formStyle = 'ha-form-grid { grid-template-columns: repeat(2, calc(50% - 4px)) !important; }';
                // const formStyle = 'ha-form-grid { grid-template-columns: auto auto !important; justify-content: end; }';
                // const formStyle = 'ha-form-grid { grid-template-columns: auto calc(60% - 4px) !important; justify-content: end; }';
                const formStyle = 'ha-form-grid { grid-template-columns: auto 65% !important; justify-content: end; }';
                let myStyle = document.createElement('style');
                myStyle.setAttribute('id', 'formRoot');
                myStyle.innerHTML = formStyle;
                formRootHost.appendChild(myStyle);
            }
        }
    }
    _handleSaveButton() {
        // console.log('*** saveSettings called.');
        // nextAlarmConfig undefined unless nap settings tab was visited
        if (this._nextAlarmConfig) {
            const nextAlarmDiff = (0, $b2cd7c9abb677932$export$4dc2b60021baefca).deepCompareObj(this._nextAlarmConfig.next_alarm, this._config.next_alarm);
            if (nextAlarmDiff) // console.log('*** saving nextAlarm.');
            this._saveNextAlarm(this._nextAlarmConfig);
        }
    }
    _getDayOfWeek(days) {
        // returns day of week in language set in set hass() method of card
        return (0, (/*@__PURE__*/$parcel$interopDefault($7b2a0b4b3c09b2f0$exports)))('2018-08-27').add(days, 'days').format('dddd');
    }
    _valueChanged(event) {
        event.stopPropagation();
        if (!this._config) return;
        // console.log('*** value: ', event.detail.value);
        const configChanges = (0, $b2cd7c9abb677932$export$4dc2b60021baefca).deepCompareObj(this._oldConfig, event.detail.value);
        if (!configChanges) return;
        // console.log('*** valueChanged(); configChanges: ', configChanges);
        // console.log('*** valueChanged(); oldConfig: ', this._oldConfig);
        // console.log('*** valueChanged(); event value: ', event.detail.value);
        // console.log('*** before: config.snooze_duration_default: ', this._config.snooze_duration_default);
        // this._config = Helpers.deepMerge(Helpers.defaultConfig, event.detail.value);
        // this._config.last_updated = dayjs().format('YYYY-MM-DD HH:mm:ss');
        // console.log('*** valueChanged(); new config: ', this._config);
        // const momentTomorrow = dayjs().add(1, 'day');
        // const dayTomorrow = momentTomorrow.format('dd').toLowerCase();
        const dayTomorrow = (0, (/*@__PURE__*/$parcel$interopDefault($7b2a0b4b3c09b2f0$exports)))().add(1, 'day').format('dd').toLowerCase();
        const dayToday = (0, (/*@__PURE__*/$parcel$interopDefault($7b2a0b4b3c09b2f0$exports)))().format('dd').toLowerCase();
        Object.keys(configChanges).forEach((item)=>{
            // console.log('*** item: ', item);
            // console.log('*** item.time: ', event.detail.value[item]?.time);
            // console.log('*** undefined. value: ' + event.detail.value[item] + '; value.time: ' + (event.detail.value[item].time && !event.detail.value[item].time));
            if (event.detail.value[item] === undefined || event.detail.value[item].hasOwnProperty('time') && event.detail.value[item].time === undefined) // event.detail.value[item] = this._oldConfig[item];
            // event.detail.value[item] = this._config[item];
            // console.log('*** undefined item: ' + item + '; new value: ' + JSON.stringify(Helpers.defaultConfig[item]));
            event.detail.value[item] = (0, $b2cd7c9abb677932$export$4dc2b60021baefca).defaultConfig[item];
            // update nextAlarm
            if (item === dayTomorrow || item === dayToday || item === 'alarms_enabled' || item === 'next_alarm') {
                // console.log('*** changed item: ', item);
                // const alarmTomorrow = this._config[dayTomorrow];
                // const alarmTomorrow = event.detail.value[dayTomorrow];
                const forToday = item === dayToday && (0, (/*@__PURE__*/$parcel$interopDefault($7b2a0b4b3c09b2f0$exports)))().format('HH:mm:ss') < event.detail.value[item].time;
                // console.log('*** now: ' + dayjs().add(1, 'minute').format('HH:mm:ss') + ' < ' + event.detail.value[item].time);
                // console.log('*** forToday: ', forToday);
                const newAlarm = forToday ? event.detail.value[dayToday] : event.detail.value[dayTomorrow];
                // this._config.next_alarm = AlarmController.createNextAlarm(alarmTomorrow); // sometimes undesired: resets overridden, etc
                // this._config.next_alarm = {
                event.detail.value.next_alarm = {
                    ...this._config.next_alarm,
                    // ...AlarmController.createNextAlarm(alarmTomorrow),
                    ...(0, $b2cd7c9abb677932$export$cfa71a29f5c0676d).createNextAlarm(newAlarm, forToday)
                };
            // console.log('*** new next_alarm.enabled: ', event.detail.value.next_alarm);
            }
        });
        // this.requestUpdate();
        // console.log('*** before value.next_alarm: ', event.detail.value.next_alarm);
        // console.log('*** before value.alarms_enabled: ', event.detail.value.alarms_enabled);
        // console.log('*** before value: ', event.detail.value);
        // console.log('*** before config.next_alarm: ', this._config.next_alarm);
        this._config = (0, $b2cd7c9abb677932$export$4dc2b60021baefca).deepMerge((0, $b2cd7c9abb677932$export$4dc2b60021baefca).defaultConfig, event.detail.value);
        // console.log('*** after value.alarms_enabled: ', event.detail.value.alarms_enabled);
        // console.log('*** after value: ', event.detail.value);
        // console.log('*** after config.next_alarm: ', this._config.next_alarm);
        this._config.last_updated = (0, (/*@__PURE__*/$parcel$interopDefault($7b2a0b4b3c09b2f0$exports)))().format('YYYY-MM-DD HH:mm:ss');
        // console.log('*** valueChanged(); last_updated: ', this._config.last_updated);
        this._oldConfig = this._config;
        // console.log('*** after: config.snooze_duration_default: ', this._config.snooze_duration_default);
        // console.log('*** config: ', this._config);
        (0, $b2cd7c9abb677932$export$4dc2b60021baefca).fireEvent('config-changed', {
            config: this._config
        }, this);
    }
    _valueChangedNap(event) {
        // console.log('*** value: ', event.detail.value);
        if (event.detail.value === undefined) {
            // event.detail.value = this._config.nap_duration;
            event.detail.value = (0, $b2cd7c9abb677932$export$4dc2b60021baefca).defaultConfig.nap_duration;
            this._nextAlarmConfig.nap_duration = event.detail.value;
            this._nextAlarmConfig.next_alarm.overridden = false;
            this.requestUpdate();
            // console.log('*** this._nextAlarmConfig.next_alarm.overridden: ', this._nextAlarmConfig.next_alarm.overridden);
            // console.log('*** this._config.next_alarm.overridden: ', this._config.next_alarm.overridden);
            return;
        }
        // TODO: same as set nextAlarm() in controller (except overridden)? use _setNextalarm below?
        const nextAlarmTime = (0, (/*@__PURE__*/$parcel$interopDefault($7b2a0b4b3c09b2f0$exports)))().add((0, (/*@__PURE__*/$parcel$interopDefault($7b2a0b4b3c09b2f0$exports))).duration(event.detail.value));
        const nextAlarm = {
            ...this._nextAlarmConfig.next_alarm,
            enabled: true,
            nap: true,
            time: nextAlarmTime.format('HH:mm:ss'),
            date_time: nextAlarmTime.format('YYYY-MM-DD HH:mm:ss'),
            date: nextAlarmTime.format('YYYY-MM-DD'),
            overridden: true
        };
        this._nextAlarmConfig.next_alarm = nextAlarm;
        this._nextAlarmConfig.nap_duration = event.detail.value;
        this.requestUpdate();
    }
    // fires *after* save button pressed in order to avoid alarm ringing during setting of nextAlarm in nap settings
    async _saveNextAlarm(nextAlarmConfig) {
        // console.log('*** saveNextAlarm; overridden: ', nextAlarmConfig.next_alarm.overridden);
        // console.log('*** saveNextAlarm called');
        try {
            const lovelace = (0, $b2cd7c9abb677932$export$4dc2b60021baefca).getLovelace().lovelace;
            const newConfig = structuredClone(lovelace.config);
            const tabGroupArry = [
                ...(0, $b2cd7c9abb677932$export$4dc2b60021baefca).getLovelace().shadowRoot.querySelectorAll('sl-tab-group sl-tab')
            ];
            let viewIndex;
            viewIndex = tabGroupArry.findIndex((tab)=>{
                return tab.hasAttribute('active');
            });
            if (viewIndex === -1) viewIndex = 0;
            const cardConfig = (0, $b2cd7c9abb677932$export$4dc2b60021baefca).findNested(newConfig.views[viewIndex], 'type', 'custom:kobold-alarm-clock-card');
            if (cardConfig && cardConfig.next_alarm && cardConfig.nap_duration) {
                //TODO: add check to ensure save only happens if a change?
                if (nextAlarmConfig.next_alarm.overridden) {
                    // same as is valueChangedNap except overridden?; TODO: have both goto new _setNextAlarm() method?
                    // console.log('*** saveNextAlarm; overridden is true');
                    const nextAlarmTime = (0, (/*@__PURE__*/$parcel$interopDefault($7b2a0b4b3c09b2f0$exports)))().add((0, (/*@__PURE__*/$parcel$interopDefault($7b2a0b4b3c09b2f0$exports))).duration(nextAlarmConfig.nap_duration));
                    const nextAlarm = {
                        ...this._nextAlarmConfig.next_alarm,
                        enabled: true,
                        nap: true,
                        time: nextAlarmTime.format('HH:mm:ss'),
                        date_time: nextAlarmTime.format('YYYY-MM-DD HH:mm:ss'),
                        date: nextAlarmTime.format('YYYY-MM-DD')
                    };
                    cardConfig.next_alarm = nextAlarm;
                } else {
                    //reset alarm when overridden is switched to false
                    // console.log('*** reset alarm');
                    const momentTomorrow = (0, (/*@__PURE__*/$parcel$interopDefault($7b2a0b4b3c09b2f0$exports)))().add(1, 'day');
                    const alarmTomorrow = this._config[momentTomorrow.format('dd').toLowerCase()];
                    cardConfig.next_alarm = (0, $b2cd7c9abb677932$export$cfa71a29f5c0676d).createNextAlarm(alarmTomorrow);
                }
                cardConfig.nap_duration = nextAlarmConfig.nap_duration;
                // cardConfig.last_updated = dayjs().format('YYYY-MM-DD HH:mm:ss'); //TODO: is this necessary?
                await lovelace.saveConfig(newConfig);
                // Override HA refresh dashboard notification
                window.setTimeout(()=>{
                    (0, $b2cd7c9abb677932$export$4dc2b60021baefca).fireEvent('hass-notification', {
                        message: 'Successfully saved'
                    }, (0, $b2cd7c9abb677932$export$4dc2b60021baefca).getHa());
                }, 50);
            } else throw {
                message: 'Unable to find Kobold card in lovelace configuration or kobold card config is corrupt'
            };
        } catch (err) {
            alert(`Saving failed: ${err.message}.`);
            // Override HA successful save notification
            window.setTimeout(()=>{
                (0, $b2cd7c9abb677932$export$4dc2b60021baefca).fireEvent('hass-notification', {
                    message: 'Saving failed'
                }, (0, $b2cd7c9abb677932$export$4dc2b60021baefca).getHa());
            }, 50);
        }
    }
    _handleSwitchTab(event) {
        switch(event.detail.name){
            case 'settings':
                this._selectedTab = 0;
                break;
            case 'nap':
                this._selectedTab = 1;
                break;
            case 'schedule':
                this._selectedTab = 2;
                break;
            default:
                this._selectedTab = 0;
        }
    }
    render() {
        if (!this._hass || !this._config) return (0, $0f25a2e8805a310f$export$c0bb0b647f701bb5)``;
        return (0, $0f25a2e8805a310f$export$c0bb0b647f701bb5)`
    <div id="kobold-card-config" class="card-config"
        @kobold-tab=${(event)=>{
            this._selectedTab = event.detail.tab;
        }}
    >
        <div class="toolbar">
          <sl-tab-group
            @sl-tab-show=${this._handleSwitchTab}
          >
            <sl-tab slot="nav" .panel=${"settings"} .active=${this._selectedTab === 0}>Settings</sl-tab>
            <sl-tab slot="nav" .panel=${"nap"} .active=${this._selectedTab === 1}>Nap</sl-tab>
            <sl-tab slot="nav" .panel=${"schedule"} .active=${this._selectedTab === 2}>Schedule</sl-tab>
          </sl-tab-group>
        </div>
        <div id="editor">
          ${[
            this._renderSettingsEditor,
            this._renderNapEditor,
            this._renderScheduleEditor
        ][this._selectedTab].bind(this)()}
        </div>
    </div>
    `;
    }
    _renderSettingsEditor() {
        // console.log('*** when: ', this._config.alarm_actions);
        return (0, $0f25a2e8805a310f$export$c0bb0b647f701bb5)`<div class="box">
      <ha-form
          .hass=${this._hass}
          .data=${this._config}
          .schema=${this._configSchemaSettings}
          .computeLabel=${(s)=>s.label ?? s.name}
          @value-changed=${this._valueChanged}
      ></ha-form>
    </div>`;
    }
    _renderNapEditor() {
        if (!this._nextAlarmConfig) // console.log('*** rederNapEditor()');
        this._nextAlarmConfig = {
            next_alarm: structuredClone(this._config.next_alarm),
            nap_duration: structuredClone(this._config.nap_duration)
        };
        // console.log('*** renderNapEditor; _nextAlarmConfig: ', this._nextAlarmConfig);
        return (0, $0f25a2e8805a310f$export$c0bb0b647f701bb5)`
      <div class="box">
        <div class="kobold-nap-form">
          <div class="ha-form-grid">
            <div class="ha-form">
              <div class="ha-formfield">
                <span><p>Nap Duration</p></span>
                <ha-switch ?checked=${this._nextAlarmConfig.next_alarm.overridden} @change=${()=>{
            this._nextAlarmConfig.next_alarm.overridden = !this._nextAlarmConfig.next_alarm.overridden;
            this.requestUpdate();
        }}></ha-switch>
              </div>
            </div>
            <div class="ha-form">
              <ha-duration-input
                .data=${this._nextAlarmConfig.nap_duration}
                @value-changed=${this._valueChangedNap}
              ></ha-duration-input>
            </div>
          </div>
        </div>
      </div>`;
    }
    _renderScheduleEditor() {
        // console.log('*** alarms_enabled: ', this._config.alarms_enabled);
        return (0, $0f25a2e8805a310f$export$c0bb0b647f701bb5)`<div class="box" id="schedule">
      <ha-form
        .hass=${this._hass}
        .data=${this._config}
        .schema=${this._configSchemaSchedule(!this._config.alarms_enabled)}
        .computeLabel=${(s)=>s.label ?? s.name}
        @value-changed=${this._valueChanged}
      ></ha-form>
    </div>`;
    }
    static get styles() {
        return (0, $22deac181f878bbd$export$dbf350e5966cf602)`
          sl-tab-group {
            margin-bottom: 16px;
          }

          sl-tab {
            flex: 1;
          }

          sl-tab::part(base) {
            width: 100%;
            justify-content: center;
          }

          .box {
            margin-top: 8px;
            border: 1px solid var(--divider-color);
            padding: 12px;
          }
          .box .toolbar {
            display: flex;
            justify-content: flex-end;
            width: 100%;
            gap: 8px;
          }
          .gui-mode-button {
            margin-right: auto;
          }

          .kobold-nap-form .ha-form-grid {
            display: grid !important;
            /*grid-template-columns: repeat(var(--form-grid-column-count, auto-fit), minmax(var(--form-grid-min-width, 200px), 1fr));*/
            /*grid-template-columns: repeat(2, calc(50% - 4px));*/
            /*grid-template-columns: auto auto;*/
            grid-template-columns: auto 50%;
            /*grid-template-columns: calc(35% - 4px) auto;*/
            grid-column-gap: 8px;
            grid-row-gap: 24px;
            justify-content: end;
          }

          .kobold-nap-form .ha-form {
            display: block;
          }

          /*.kobold-nap-form .ha-form {
            display: inline-block !important;
            vertical-align: top;
            width: calc(50% - 4px);
            margin: 0 0 24px 0;
          }*/

          .kobold-nap-form .ha-formfield {
            justify-content: space-between;
            align-items: var(--ha-formfield-align-items, center);
            gap: 4px;
            width: 100%;
            display: flex;
            min-height: 56px;
            align-items: center;
            --mdc-typography-body2-font-size: 1em;
          }

          .kobold-nap-form p {
            margin: 0;
          }
        `;
    }
}
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $e978bded0760ae3c$export$ca000e230c0caa3e)()
], $2109a11e0895c6b1$var$KoboldCardEditor.prototype, "_hass", void 0);
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $e978bded0760ae3c$export$ca000e230c0caa3e)()
], $2109a11e0895c6b1$var$KoboldCardEditor.prototype, "_config", void 0);
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $e978bded0760ae3c$export$ca000e230c0caa3e)()
], $2109a11e0895c6b1$var$KoboldCardEditor.prototype, "_selectedTab", void 0);
(0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $e978bded0760ae3c$export$ca000e230c0caa3e)()
], $2109a11e0895c6b1$var$KoboldCardEditor.prototype, "_nextAlarmConfig", void 0);
$2109a11e0895c6b1$var$KoboldCardEditor = (0, $6dd3ba7ab41ebe11$export$29e00dfd3077644b)([
    (0, $fcbcbba309c0f62b$export$da64fc29f17f9d0e)('kobold-card-editor')
], $2109a11e0895c6b1$var$KoboldCardEditor);


//# sourceMappingURL=kobold-alarm-clock-card.js.map
