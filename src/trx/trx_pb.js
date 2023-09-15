"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrxPayloadContractProto = exports.TrxPayloadVotingProto = exports.TrxPayloadProposalProto = exports.TrxPayloadExecContractProto = exports.TrxPayloadUnstakingProto = exports.TrxPayloadStakingProto = exports.TrxProto = exports.protobufPackage = void 0;
/* eslint-disable */
var long_1 = require("long");
var minimal_1 = require("protobufjs/minimal");
exports.protobufPackage = "types";
function createBaseTrxProto() {
    return {
        version: 0,
        time: long_1.default.ZERO,
        nonce: long_1.default.UZERO,
        from: new Uint8Array(0),
        to: new Uint8Array(0),
        Amount: new Uint8Array(0),
        Gas: new Uint8Array(0),
        type: 0,
        Payload: new Uint8Array(0),
        sig: new Uint8Array(0),
    };
}
exports.TrxProto = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.default.Writer.create(); }
        if (message.version !== 0) {
            writer.uint32(8).uint32(message.version);
        }
        if (!message.time.isZero()) {
            writer.uint32(16).int64(message.time);
        }
        if (!message.nonce.isZero()) {
            writer.uint32(24).uint64(message.nonce);
        }
        if (message.from.length !== 0) {
            writer.uint32(34).bytes(message.from);
        }
        if (message.to.length !== 0) {
            writer.uint32(42).bytes(message.to);
        }
        if (message.Amount.length !== 0) {
            writer.uint32(50).bytes(message.Amount);
        }
        if (message.Gas.length !== 0) {
            writer.uint32(58).bytes(message.Gas);
        }
        if (message.type !== 0) {
            writer.uint32(64).int32(message.type);
        }
        if (message.Payload.length !== 0) {
            writer.uint32(74).bytes(message.Payload);
        }
        if (message.sig.length !== 0) {
            writer.uint32(82).bytes(message.sig);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseTrxProto();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.version = reader.uint32();
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.time = reader.int64();
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.nonce = reader.uint64();
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.from = reader.bytes();
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.to = reader.bytes();
                    continue;
                case 6:
                    if (tag !== 50) {
                        break;
                    }
                    message.Amount = reader.bytes();
                    continue;
                case 7:
                    if (tag !== 58) {
                        break;
                    }
                    message.Gas = reader.bytes();
                    continue;
                case 8:
                    if (tag !== 64) {
                        break;
                    }
                    message.type = reader.int32();
                    continue;
                case 9:
                    if (tag !== 74) {
                        break;
                    }
                    message.Payload = reader.bytes();
                    continue;
                case 10:
                    if (tag !== 82) {
                        break;
                    }
                    message.sig = reader.bytes();
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON: function (object) {
        return {
            version: isSet(object.version) ? Number(object.version) : 0,
            time: isSet(object.time) ? long_1.default.fromValue(object.time) : long_1.default.ZERO,
            nonce: isSet(object.nonce) ? long_1.default.fromValue(object.nonce) : long_1.default.UZERO,
            from: isSet(object.from) ? bytesFromBase64(object.from) : new Uint8Array(0),
            to: isSet(object.to) ? bytesFromBase64(object.to) : new Uint8Array(0),
            Amount: isSet(object.Amount) ? bytesFromBase64(object.Amount) : new Uint8Array(0),
            Gas: isSet(object.Gas) ? bytesFromBase64(object.Gas) : new Uint8Array(0),
            type: isSet(object.type) ? Number(object.type) : 0,
            Payload: isSet(object.Payload) ? bytesFromBase64(object.Payload) : new Uint8Array(0),
            sig: isSet(object.sig) ? bytesFromBase64(object.sig) : new Uint8Array(0),
        };
    },
    toJSON: function (message) {
        var obj = {};
        if (message.version !== 0) {
            obj.version = Math.round(message.version);
        }
        if (!message.time.isZero()) {
            obj.time = (message.time || long_1.default.ZERO).toString();
        }
        if (!message.nonce.isZero()) {
            obj.nonce = (message.nonce || long_1.default.UZERO).toString();
        }
        if (message.from.length !== 0) {
            obj.from = base64FromBytes(message.from);
        }
        if (message.to.length !== 0) {
            obj.to = base64FromBytes(message.to);
        }
        if (message.Amount.length !== 0) {
            obj.Amount = base64FromBytes(message.Amount);
        }
        if (message.Gas.length !== 0) {
            obj.Gas = base64FromBytes(message.Gas);
        }
        if (message.type !== 0) {
            obj.type = Math.round(message.type);
        }
        if (message.Payload.length !== 0) {
            obj.Payload = base64FromBytes(message.Payload);
        }
        if (message.sig.length !== 0) {
            obj.sig = base64FromBytes(message.sig);
        }
        return obj;
    },
    create: function (base) {
        return exports.TrxProto.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial: function (object) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        var message = createBaseTrxProto();
        message.version = (_a = object.version) !== null && _a !== void 0 ? _a : 0;
        message.time = (object.time !== undefined && object.time !== null) ? long_1.default.fromValue(object.time) : long_1.default.ZERO;
        message.nonce = (object.nonce !== undefined && object.nonce !== null) ? long_1.default.fromValue(object.nonce) : long_1.default.UZERO;
        message.from = (_b = object.from) !== null && _b !== void 0 ? _b : new Uint8Array(0);
        message.to = (_c = object.to) !== null && _c !== void 0 ? _c : new Uint8Array(0);
        message.Amount = (_d = object.Amount) !== null && _d !== void 0 ? _d : new Uint8Array(0);
        message.Gas = (_e = object.Gas) !== null && _e !== void 0 ? _e : new Uint8Array(0);
        message.type = (_f = object.type) !== null && _f !== void 0 ? _f : 0;
        message.Payload = (_g = object.Payload) !== null && _g !== void 0 ? _g : new Uint8Array(0);
        message.sig = (_h = object.sig) !== null && _h !== void 0 ? _h : new Uint8Array(0);
        return message;
    },
};
function createBaseTrxPayloadStakingProto() {
    return {};
}
exports.TrxPayloadStakingProto = {
    encode: function (_, writer) {
        if (writer === void 0) { writer = minimal_1.default.Writer.create(); }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseTrxPayloadStakingProto();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON: function (_) {
        return {};
    },
    toJSON: function (_) {
        var obj = {};
        return obj;
    },
    create: function (base) {
        return exports.TrxPayloadStakingProto.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial: function (_) {
        var message = createBaseTrxPayloadStakingProto();
        return message;
    },
};
function createBaseTrxPayloadUnstakingProto() {
    return { txHash: new Uint8Array(0) };
}
exports.TrxPayloadUnstakingProto = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.default.Writer.create(); }
        if (message.txHash.length !== 0) {
            writer.uint32(10).bytes(message.txHash);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseTrxPayloadUnstakingProto();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.txHash = reader.bytes();
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON: function (object) {
        return { txHash: isSet(object.txHash) ? bytesFromBase64(object.txHash) : new Uint8Array(0) };
    },
    toJSON: function (message) {
        var obj = {};
        if (message.txHash.length !== 0) {
            obj.txHash = base64FromBytes(message.txHash);
        }
        return obj;
    },
    create: function (base) {
        return exports.TrxPayloadUnstakingProto.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial: function (object) {
        var _a;
        var message = createBaseTrxPayloadUnstakingProto();
        message.txHash = (_a = object.txHash) !== null && _a !== void 0 ? _a : new Uint8Array(0);
        return message;
    },
};
function createBaseTrxPayloadExecContractProto() {
    return { Code: new Uint8Array(0) };
}
exports.TrxPayloadExecContractProto = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.default.Writer.create(); }
        if (message.Code.length !== 0) {
            writer.uint32(10).bytes(message.Code);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseTrxPayloadExecContractProto();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.Code = reader.bytes();
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON: function (object) {
        return { Code: isSet(object.Code) ? bytesFromBase64(object.Code) : new Uint8Array(0) };
    },
    toJSON: function (message) {
        var obj = {};
        if (message.Code.length !== 0) {
            obj.Code = base64FromBytes(message.Code);
        }
        return obj;
    },
    create: function (base) {
        return exports.TrxPayloadExecContractProto.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial: function (object) {
        var _a;
        var message = createBaseTrxPayloadExecContractProto();
        message.Code = (_a = object.Code) !== null && _a !== void 0 ? _a : new Uint8Array(0);
        return message;
    },
};
function createBaseTrxPayloadProposalProto() {
    return { message: "", startVotingHeight: long_1.default.ZERO, votingBlocks: long_1.default.ZERO, optType: 0, options: [] };
}
exports.TrxPayloadProposalProto = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.default.Writer.create(); }
        if (message.message !== "") {
            writer.uint32(10).string(message.message);
        }
        if (!message.startVotingHeight.isZero()) {
            writer.uint32(16).int64(message.startVotingHeight);
        }
        if (!message.votingBlocks.isZero()) {
            writer.uint32(24).int64(message.votingBlocks);
        }
        if (message.optType !== 0) {
            writer.uint32(32).int32(message.optType);
        }
        for (var _i = 0, _a = message.options; _i < _a.length; _i++) {
            var v = _a[_i];
            writer.uint32(42).bytes(v);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseTrxPayloadProposalProto();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.message = reader.string();
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.startVotingHeight = reader.int64();
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.votingBlocks = reader.int64();
                    continue;
                case 4:
                    if (tag !== 32) {
                        break;
                    }
                    message.optType = reader.int32();
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.options.push(reader.bytes());
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON: function (object) {
        return {
            message: isSet(object.message) ? String(object.message) : "",
            startVotingHeight: isSet(object.startVotingHeight) ? long_1.default.fromValue(object.startVotingHeight) : long_1.default.ZERO,
            votingBlocks: isSet(object.votingBlocks) ? long_1.default.fromValue(object.votingBlocks) : long_1.default.ZERO,
            optType: isSet(object.optType) ? Number(object.optType) : 0,
            options: Array.isArray(object === null || object === void 0 ? void 0 : object.options) ? object.options.map(function (e) { return bytesFromBase64(e); }) : [],
        };
    },
    toJSON: function (message) {
        var _a;
        var obj = {};
        if (message.message !== "") {
            obj.message = message.message;
        }
        if (!message.startVotingHeight.isZero()) {
            obj.startVotingHeight = (message.startVotingHeight || long_1.default.ZERO).toString();
        }
        if (!message.votingBlocks.isZero()) {
            obj.votingBlocks = (message.votingBlocks || long_1.default.ZERO).toString();
        }
        if (message.optType !== 0) {
            obj.optType = Math.round(message.optType);
        }
        if ((_a = message.options) === null || _a === void 0 ? void 0 : _a.length) {
            obj.options = message.options.map(function (e) { return base64FromBytes(e); });
        }
        return obj;
    },
    create: function (base) {
        return exports.TrxPayloadProposalProto.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial: function (object) {
        var _a, _b, _c;
        var message = createBaseTrxPayloadProposalProto();
        message.message = (_a = object.message) !== null && _a !== void 0 ? _a : "";
        message.startVotingHeight = (object.startVotingHeight !== undefined && object.startVotingHeight !== null)
            ? long_1.default.fromValue(object.startVotingHeight)
            : long_1.default.ZERO;
        message.votingBlocks = (object.votingBlocks !== undefined && object.votingBlocks !== null)
            ? long_1.default.fromValue(object.votingBlocks)
            : long_1.default.ZERO;
        message.optType = (_b = object.optType) !== null && _b !== void 0 ? _b : 0;
        message.options = ((_c = object.options) === null || _c === void 0 ? void 0 : _c.map(function (e) { return e; })) || [];
        return message;
    },
};
function createBaseTrxPayloadVotingProto() {
    return { txHash: new Uint8Array(0), choice: 0 };
}
exports.TrxPayloadVotingProto = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.default.Writer.create(); }
        if (message.txHash.length !== 0) {
            writer.uint32(10).bytes(message.txHash);
        }
        if (message.choice !== 0) {
            writer.uint32(16).int32(message.choice);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseTrxPayloadVotingProto();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.txHash = reader.bytes();
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.choice = reader.int32();
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON: function (object) {
        return {
            txHash: isSet(object.txHash) ? bytesFromBase64(object.txHash) : new Uint8Array(0),
            choice: isSet(object.choice) ? Number(object.choice) : 0,
        };
    },
    toJSON: function (message) {
        var obj = {};
        if (message.txHash.length !== 0) {
            obj.txHash = base64FromBytes(message.txHash);
        }
        if (message.choice !== 0) {
            obj.choice = Math.round(message.choice);
        }
        return obj;
    },
    create: function (base) {
        return exports.TrxPayloadVotingProto.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial: function (object) {
        var _a, _b;
        var message = createBaseTrxPayloadVotingProto();
        message.txHash = (_a = object.txHash) !== null && _a !== void 0 ? _a : new Uint8Array(0);
        message.choice = (_b = object.choice) !== null && _b !== void 0 ? _b : 0;
        return message;
    },
};
function createBaseTrxPayloadContractProto() {
    return { data: new Uint8Array(0) };
}
exports.TrxPayloadContractProto = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = minimal_1.default.Writer.create(); }
        if (message.data.length !== 0) {
            writer.uint32(10).bytes(message.data);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof minimal_1.default.Reader ? input : minimal_1.default.Reader.create(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseTrxPayloadContractProto();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.data = reader.bytes();
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON: function (object) {
        return { data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(0) };
    },
    toJSON: function (message) {
        var obj = {};
        if (message.data.length !== 0) {
            obj.data = base64FromBytes(message.data);
        }
        return obj;
    },
    create: function (base) {
        return exports.TrxPayloadContractProto.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial: function (object) {
        var _a;
        var message = createBaseTrxPayloadContractProto();
        message.data = (_a = object.data) !== null && _a !== void 0 ? _a : new Uint8Array(0);
        return message;
    },
};
var tsProtoGlobalThis = (function () {
    if (typeof globalThis !== "undefined") {
        return globalThis;
    }
    if (typeof self !== "undefined") {
        return self;
    }
    if (typeof window !== "undefined") {
        return window;
    }
    if (typeof global !== "undefined") {
        return global;
    }
    throw "Unable to locate global object";
})();
function bytesFromBase64(b64) {
    if (tsProtoGlobalThis.Buffer) {
        return Uint8Array.from(tsProtoGlobalThis.Buffer.from(b64, "base64"));
    }
    else {
        var bin = tsProtoGlobalThis.atob(b64);
        var arr = new Uint8Array(bin.length);
        for (var i = 0; i < bin.length; ++i) {
            arr[i] = bin.charCodeAt(i);
        }
        return arr;
    }
}
function base64FromBytes(arr) {
    if (tsProtoGlobalThis.Buffer) {
        return tsProtoGlobalThis.Buffer.from(arr).toString("base64");
    }
    else {
        var bin_1 = [];
        arr.forEach(function (byte) {
            bin_1.push(String.fromCharCode(byte));
        });
        return tsProtoGlobalThis.btoa(bin_1.join(""));
    }
}
if (minimal_1.default.util.Long !== long_1.default) {
    minimal_1.default.util.Long = long_1.default;
    minimal_1.default.configure();
}
function isSet(value) {
    return value !== null && value !== undefined;
}
