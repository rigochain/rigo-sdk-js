/*
    Copyright 2023 All Rigo Chain Developers

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "types";

export interface TrxProto {
  version: number;
  time: Long;
  nonce: Long;
  from: Uint8Array;
  to: Uint8Array;
  Amount: Uint8Array;
  Gas: Uint8Array;
  type: number;
  Payload: Uint8Array;
  sig: Uint8Array;
}

export interface TrxPayloadStakingProto {
}

export interface TrxPayloadUnstakingProto {
  txHash: Uint8Array;
}

export interface TrxPayloadExecContractProto {
  Code: Uint8Array;
}

export interface TrxPayloadProposalProto {
  message: string;
  startVotingHeight: Long;
  votingBlocks: Long;
  optType: number;
  options: Uint8Array[];
}

export interface TrxPayloadVotingProto {
  txHash: Uint8Array;
  choice: number;
}

export interface TrxPayloadContractProto {
  data: Uint8Array;
}

function createBaseTrxProto(): TrxProto {
  return {
    version: 0,
    time: Long.ZERO,
    nonce: Long.UZERO,
    from: new Uint8Array(),
    to: new Uint8Array(),
    Amount: new Uint8Array(),
    Gas: new Uint8Array(),
    type: 0,
    Payload: new Uint8Array(),
    sig: new Uint8Array(),
  };
}

export const TrxProto = {
  encode(message: TrxProto, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): TrxProto {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTrxProto();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.version = reader.uint32();
          break;
        case 2:
          message.time = reader.int64() as Long;
          break;
        case 3:
          message.nonce = reader.uint64() as Long;
          break;
        case 4:
          message.from = reader.bytes();
          break;
        case 5:
          message.to = reader.bytes();
          break;
        case 6:
          message.Amount = reader.bytes();
          break;
        case 7:
          message.Gas = reader.bytes();
          break;
        case 8:
          message.type = reader.int32();
          break;
        case 9:
          message.Payload = reader.bytes();
          break;
        case 10:
          message.sig = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TrxProto {
    return {
      version: isSet(object.version) ? Number(object.version) : 0,
      time: isSet(object.time) ? Long.fromValue(object.time) : Long.ZERO,
      nonce: isSet(object.nonce) ? Long.fromValue(object.nonce) : Long.UZERO,
      from: isSet(object.from) ? bytesFromBase64(object.from) : new Uint8Array(),
      to: isSet(object.to) ? bytesFromBase64(object.to) : new Uint8Array(),
      Amount: isSet(object.Amount) ? bytesFromBase64(object.Amount) : new Uint8Array(),
      Gas: isSet(object.Gas) ? bytesFromBase64(object.Gas) : new Uint8Array(),
      type: isSet(object.type) ? Number(object.type) : 0,
      Payload: isSet(object.Payload) ? bytesFromBase64(object.Payload) : new Uint8Array(),
      sig: isSet(object.sig) ? bytesFromBase64(object.sig) : new Uint8Array(),
    };
  },

  toJSON(message: TrxProto): unknown {
    const obj: any = {};
    message.version !== undefined && (obj.version = Math.round(message.version));
    message.time !== undefined && (obj.time = (message.time || Long.ZERO).toString());
    message.nonce !== undefined && (obj.nonce = (message.nonce || Long.UZERO).toString());
    message.from !== undefined &&
      (obj.from = base64FromBytes(message.from !== undefined ? message.from : new Uint8Array()));
    message.to !== undefined && (obj.to = base64FromBytes(message.to !== undefined ? message.to : new Uint8Array()));
    message.Amount !== undefined &&
      (obj.Amount = base64FromBytes(message.Amount !== undefined ? message.Amount : new Uint8Array()));
    message.Gas !== undefined &&
      (obj.Gas = base64FromBytes(message.Gas !== undefined ? message.Gas : new Uint8Array()));
    message.type !== undefined && (obj.type = Math.round(message.type));
    message.Payload !== undefined &&
      (obj.Payload = base64FromBytes(message.Payload !== undefined ? message.Payload : new Uint8Array()));
    message.sig !== undefined &&
      (obj.sig = base64FromBytes(message.sig !== undefined ? message.sig : new Uint8Array()));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TrxProto>, I>>(object: I): TrxProto {
    const message = createBaseTrxProto();
    message.version = object.version ?? 0;
    message.time = (object.time !== undefined && object.time !== null) ? Long.fromValue(object.time) : Long.ZERO;
    message.nonce = (object.nonce !== undefined && object.nonce !== null) ? Long.fromValue(object.nonce) : Long.UZERO;
    message.from = object.from ?? new Uint8Array();
    message.to = object.to ?? new Uint8Array();
    message.Amount = object.Amount ?? new Uint8Array();
    message.Gas = object.Gas ?? new Uint8Array();
    message.type = object.type ?? 0;
    message.Payload = object.Payload ?? new Uint8Array();
    message.sig = object.sig ?? new Uint8Array();
    return message;
  },
};

function createBaseTrxPayloadStakingProto(): TrxPayloadStakingProto {
  return {};
}

export const TrxPayloadStakingProto = {
  encode(_: TrxPayloadStakingProto, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TrxPayloadStakingProto {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTrxPayloadStakingProto();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): TrxPayloadStakingProto {
    return {};
  },

  toJSON(_: TrxPayloadStakingProto): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TrxPayloadStakingProto>, I>>(_: I): TrxPayloadStakingProto {
    const message = createBaseTrxPayloadStakingProto();
    return message;
  },
};

function createBaseTrxPayloadUnstakingProto(): TrxPayloadUnstakingProto {
  return { txHash: new Uint8Array() };
}

export const TrxPayloadUnstakingProto = {
  encode(message: TrxPayloadUnstakingProto, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.txHash.length !== 0) {
      writer.uint32(10).bytes(message.txHash);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TrxPayloadUnstakingProto {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTrxPayloadUnstakingProto();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.txHash = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TrxPayloadUnstakingProto {
    return { txHash: isSet(object.txHash) ? bytesFromBase64(object.txHash) : new Uint8Array() };
  },

  toJSON(message: TrxPayloadUnstakingProto): unknown {
    const obj: any = {};
    message.txHash !== undefined &&
      (obj.txHash = base64FromBytes(message.txHash !== undefined ? message.txHash : new Uint8Array()));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TrxPayloadUnstakingProto>, I>>(object: I): TrxPayloadUnstakingProto {
    const message = createBaseTrxPayloadUnstakingProto();
    message.txHash = object.txHash ?? new Uint8Array();
    return message;
  },
};

function createBaseTrxPayloadExecContractProto(): TrxPayloadExecContractProto {
  return { Code: new Uint8Array() };
}

export const TrxPayloadExecContractProto = {
  encode(message: TrxPayloadExecContractProto, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.Code.length !== 0) {
      writer.uint32(10).bytes(message.Code);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TrxPayloadExecContractProto {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTrxPayloadExecContractProto();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Code = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TrxPayloadExecContractProto {
    return { Code: isSet(object.Code) ? bytesFromBase64(object.Code) : new Uint8Array() };
  },

  toJSON(message: TrxPayloadExecContractProto): unknown {
    const obj: any = {};
    message.Code !== undefined &&
      (obj.Code = base64FromBytes(message.Code !== undefined ? message.Code : new Uint8Array()));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TrxPayloadExecContractProto>, I>>(object: I): TrxPayloadExecContractProto {
    const message = createBaseTrxPayloadExecContractProto();
    message.Code = object.Code ?? new Uint8Array();
    return message;
  },
};

function createBaseTrxPayloadProposalProto(): TrxPayloadProposalProto {
  return { message: "", startVotingHeight: Long.ZERO, votingBlocks: Long.ZERO, optType: 0, options: [] };
}

export const TrxPayloadProposalProto = {
  encode(message: TrxPayloadProposalProto, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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
    for (const v of message.options) {
      writer.uint32(42).bytes(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TrxPayloadProposalProto {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTrxPayloadProposalProto();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.message = reader.string();
          break;
        case 2:
          message.startVotingHeight = reader.int64() as Long;
          break;
        case 3:
          message.votingBlocks = reader.int64() as Long;
          break;
        case 4:
          message.optType = reader.int32();
          break;
        case 5:
          message.options.push(reader.bytes());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TrxPayloadProposalProto {
    return {
      message: isSet(object.message) ? String(object.message) : "",
      startVotingHeight: isSet(object.startVotingHeight) ? Long.fromValue(object.startVotingHeight) : Long.ZERO,
      votingBlocks: isSet(object.votingBlocks) ? Long.fromValue(object.votingBlocks) : Long.ZERO,
      optType: isSet(object.optType) ? Number(object.optType) : 0,
      options: Array.isArray(object?.options) ? object.options.map((e: any) => bytesFromBase64(e)) : [],
    };
  },

  toJSON(message: TrxPayloadProposalProto): unknown {
    const obj: any = {};
    message.message !== undefined && (obj.message = message.message);
    message.startVotingHeight !== undefined &&
      (obj.startVotingHeight = (message.startVotingHeight || Long.ZERO).toString());
    message.votingBlocks !== undefined && (obj.votingBlocks = (message.votingBlocks || Long.ZERO).toString());
    message.optType !== undefined && (obj.optType = Math.round(message.optType));
    if (message.options) {
      obj.options = message.options.map((e) => base64FromBytes(e !== undefined ? e : new Uint8Array()));
    } else {
      obj.options = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TrxPayloadProposalProto>, I>>(object: I): TrxPayloadProposalProto {
    const message = createBaseTrxPayloadProposalProto();
    message.message = object.message ?? "";
    message.startVotingHeight = (object.startVotingHeight !== undefined && object.startVotingHeight !== null)
      ? Long.fromValue(object.startVotingHeight)
      : Long.ZERO;
    message.votingBlocks = (object.votingBlocks !== undefined && object.votingBlocks !== null)
      ? Long.fromValue(object.votingBlocks)
      : Long.ZERO;
    message.optType = object.optType ?? 0;
    message.options = object.options?.map((e) => e) || [];
    return message;
  },
};

function createBaseTrxPayloadVotingProto(): TrxPayloadVotingProto {
  return { txHash: new Uint8Array(), choice: 0 };
}

export const TrxPayloadVotingProto = {
  encode(message: TrxPayloadVotingProto, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.txHash.length !== 0) {
      writer.uint32(10).bytes(message.txHash);
    }
    if (message.choice !== 0) {
      writer.uint32(16).int32(message.choice);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TrxPayloadVotingProto {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTrxPayloadVotingProto();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.txHash = reader.bytes();
          break;
        case 2:
          message.choice = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TrxPayloadVotingProto {
    return {
      txHash: isSet(object.txHash) ? bytesFromBase64(object.txHash) : new Uint8Array(),
      choice: isSet(object.choice) ? Number(object.choice) : 0,
    };
  },

  toJSON(message: TrxPayloadVotingProto): unknown {
    const obj: any = {};
    message.txHash !== undefined &&
      (obj.txHash = base64FromBytes(message.txHash !== undefined ? message.txHash : new Uint8Array()));
    message.choice !== undefined && (obj.choice = Math.round(message.choice));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TrxPayloadVotingProto>, I>>(object: I): TrxPayloadVotingProto {
    const message = createBaseTrxPayloadVotingProto();
    message.txHash = object.txHash ?? new Uint8Array();
    message.choice = object.choice ?? 0;
    return message;
  },
};

function createBaseTrxPayloadContractProto(): TrxPayloadContractProto {
  return { data: new Uint8Array() };
}

export const TrxPayloadContractProto = {
  encode(message: TrxPayloadContractProto, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.data.length !== 0) {
      writer.uint32(10).bytes(message.data);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TrxPayloadContractProto {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTrxPayloadContractProto();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.data = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TrxPayloadContractProto {
    return { data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array() };
  },

  toJSON(message: TrxPayloadContractProto): unknown {
    const obj: any = {};
    message.data !== undefined &&
      (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TrxPayloadContractProto>, I>>(object: I): TrxPayloadContractProto {
    const message = createBaseTrxPayloadContractProto();
    message.data = object.data ?? new Uint8Array();
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var tsProtoGlobalThis: any = (() => {
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

function bytesFromBase64(b64: string): Uint8Array {
  if (tsProtoGlobalThis.Buffer) {
    return Uint8Array.from(tsProtoGlobalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = tsProtoGlobalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if (tsProtoGlobalThis.Buffer) {
    return tsProtoGlobalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(String.fromCharCode(byte));
    });
    return tsProtoGlobalThis.btoa(bin.join(""));
  }
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Long ? string | number | Long : T extends Array<infer U> ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
