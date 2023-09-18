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
  amount: Uint8Array;
  gas: Long;
  gasPrice: Uint8Array;
  type: number;
  payload: Uint8Array;
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
    from: new Uint8Array(0),
    to: new Uint8Array(0),
    amount: new Uint8Array(0),
    gas: Long.UZERO,
    gasPrice: new Uint8Array(0),
    type: 0,
    payload: new Uint8Array(0),
    sig: new Uint8Array(0),
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
    if (message.amount.length !== 0) {
      writer.uint32(50).bytes(message.amount);
    }
    if (!message.gas.isZero()) {
      writer.uint32(56).uint64(message.gas);
    }
    if (message.gasPrice.length !== 0) {
      writer.uint32(66).bytes(message.gasPrice);
    }
    if (message.type !== 0) {
      writer.uint32(72).int32(message.type);
    }
    if (message.payload.length !== 0) {
      writer.uint32(82).bytes(message.payload);
    }
    if (message.sig.length !== 0) {
      writer.uint32(90).bytes(message.sig);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TrxProto {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTrxProto();
    while (reader.pos < end) {
      const tag = reader.uint32();
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

          message.time = reader.int64() as Long;
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.nonce = reader.uint64() as Long;
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

          message.amount = reader.bytes();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.gas = reader.uint64() as Long;
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.gasPrice = reader.bytes();
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.type = reader.int32();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.payload = reader.bytes();
          continue;
        case 11:
          if (tag !== 90) {
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

  fromJSON(object: any): TrxProto {
    return {
      version: isSet(object.version) ? Number(object.version) : 0,
      time: isSet(object.time) ? Long.fromValue(object.time) : Long.ZERO,
      nonce: isSet(object.nonce) ? Long.fromValue(object.nonce) : Long.UZERO,
      from: isSet(object.from) ? bytesFromBase64(object.from) : new Uint8Array(0),
      to: isSet(object.to) ? bytesFromBase64(object.to) : new Uint8Array(0),
      amount: isSet(object.amount) ? bytesFromBase64(object.amount) : new Uint8Array(0),
      gas: isSet(object.gas) ? Long.fromValue(object.gas) : Long.UZERO,
      gasPrice: isSet(object.gasPrice) ? bytesFromBase64(object.gasPrice) : new Uint8Array(0),
      type: isSet(object.type) ? Number(object.type) : 0,
      payload: isSet(object.payload) ? bytesFromBase64(object.payload) : new Uint8Array(0),
      sig: isSet(object.sig) ? bytesFromBase64(object.sig) : new Uint8Array(0),
    };
  },

  toJSON(message: TrxProto): unknown {
    const obj: any = {};
    if (message.version !== 0) {
      obj.version = Math.round(message.version);
    }
    if (!message.time.isZero()) {
      obj.time = (message.time || Long.ZERO).toString();
    }
    if (!message.nonce.isZero()) {
      obj.nonce = (message.nonce || Long.UZERO).toString();
    }
    if (message.from.length !== 0) {
      obj.from = base64FromBytes(message.from);
    }
    if (message.to.length !== 0) {
      obj.to = base64FromBytes(message.to);
    }
    if (message.amount.length !== 0) {
      obj.amount = base64FromBytes(message.amount);
    }
    if (!message.gas.isZero()) {
      obj.gas = (message.gas || Long.UZERO).toString();
    }
    if (message.gasPrice.length !== 0) {
      obj.gasPrice = base64FromBytes(message.gasPrice);
    }
    if (message.type !== 0) {
      obj.type = Math.round(message.type);
    }
    if (message.payload.length !== 0) {
      obj.payload = base64FromBytes(message.payload);
    }
    if (message.sig.length !== 0) {
      obj.sig = base64FromBytes(message.sig);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TrxProto>, I>>(base?: I): TrxProto {
    return TrxProto.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TrxProto>, I>>(object: I): TrxProto {
    const message = createBaseTrxProto();
    message.version = object.version ?? 0;
    message.time = (object.time !== undefined && object.time !== null) ? Long.fromValue(object.time) : Long.ZERO;
    message.nonce = (object.nonce !== undefined && object.nonce !== null) ? Long.fromValue(object.nonce) : Long.UZERO;
    message.from = object.from ?? new Uint8Array(0);
    message.to = object.to ?? new Uint8Array(0);
    message.amount = object.amount ?? new Uint8Array(0);
    message.gas = (object.gas !== undefined && object.gas !== null) ? Long.fromValue(object.gas) : Long.UZERO;
    message.gasPrice = object.gasPrice ?? new Uint8Array(0);
    message.type = object.type ?? 0;
    message.payload = object.payload ?? new Uint8Array(0);
    message.sig = object.sig ?? new Uint8Array(0);
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTrxPayloadStakingProto();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
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

  create<I extends Exact<DeepPartial<TrxPayloadStakingProto>, I>>(base?: I): TrxPayloadStakingProto {
    return TrxPayloadStakingProto.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TrxPayloadStakingProto>, I>>(_: I): TrxPayloadStakingProto {
    const message = createBaseTrxPayloadStakingProto();
    return message;
  },
};

function createBaseTrxPayloadUnstakingProto(): TrxPayloadUnstakingProto {
  return { txHash: new Uint8Array(0) };
}

export const TrxPayloadUnstakingProto = {
  encode(message: TrxPayloadUnstakingProto, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.txHash.length !== 0) {
      writer.uint32(10).bytes(message.txHash);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TrxPayloadUnstakingProto {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTrxPayloadUnstakingProto();
    while (reader.pos < end) {
      const tag = reader.uint32();
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

  fromJSON(object: any): TrxPayloadUnstakingProto {
    return { txHash: isSet(object.txHash) ? bytesFromBase64(object.txHash) : new Uint8Array(0) };
  },

  toJSON(message: TrxPayloadUnstakingProto): unknown {
    const obj: any = {};
    if (message.txHash.length !== 0) {
      obj.txHash = base64FromBytes(message.txHash);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TrxPayloadUnstakingProto>, I>>(base?: I): TrxPayloadUnstakingProto {
    return TrxPayloadUnstakingProto.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TrxPayloadUnstakingProto>, I>>(object: I): TrxPayloadUnstakingProto {
    const message = createBaseTrxPayloadUnstakingProto();
    message.txHash = object.txHash ?? new Uint8Array(0);
    return message;
  },
};

function createBaseTrxPayloadExecContractProto(): TrxPayloadExecContractProto {
  return { Code: new Uint8Array(0) };
}

export const TrxPayloadExecContractProto = {
  encode(message: TrxPayloadExecContractProto, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.Code.length !== 0) {
      writer.uint32(10).bytes(message.Code);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TrxPayloadExecContractProto {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTrxPayloadExecContractProto();
    while (reader.pos < end) {
      const tag = reader.uint32();
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

  fromJSON(object: any): TrxPayloadExecContractProto {
    return { Code: isSet(object.Code) ? bytesFromBase64(object.Code) : new Uint8Array(0) };
  },

  toJSON(message: TrxPayloadExecContractProto): unknown {
    const obj: any = {};
    if (message.Code.length !== 0) {
      obj.Code = base64FromBytes(message.Code);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TrxPayloadExecContractProto>, I>>(base?: I): TrxPayloadExecContractProto {
    return TrxPayloadExecContractProto.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TrxPayloadExecContractProto>, I>>(object: I): TrxPayloadExecContractProto {
    const message = createBaseTrxPayloadExecContractProto();
    message.Code = object.Code ?? new Uint8Array(0);
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTrxPayloadProposalProto();
    while (reader.pos < end) {
      const tag = reader.uint32();
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

          message.startVotingHeight = reader.int64() as Long;
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.votingBlocks = reader.int64() as Long;
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
    if (message.message !== "") {
      obj.message = message.message;
    }
    if (!message.startVotingHeight.isZero()) {
      obj.startVotingHeight = (message.startVotingHeight || Long.ZERO).toString();
    }
    if (!message.votingBlocks.isZero()) {
      obj.votingBlocks = (message.votingBlocks || Long.ZERO).toString();
    }
    if (message.optType !== 0) {
      obj.optType = Math.round(message.optType);
    }
    if (message.options?.length) {
      obj.options = message.options.map((e) => base64FromBytes(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TrxPayloadProposalProto>, I>>(base?: I): TrxPayloadProposalProto {
    return TrxPayloadProposalProto.fromPartial(base ?? ({} as any));
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
  return { txHash: new Uint8Array(0), choice: 0 };
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTrxPayloadVotingProto();
    while (reader.pos < end) {
      const tag = reader.uint32();
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

  fromJSON(object: any): TrxPayloadVotingProto {
    return {
      txHash: isSet(object.txHash) ? bytesFromBase64(object.txHash) : new Uint8Array(0),
      choice: isSet(object.choice) ? Number(object.choice) : 0,
    };
  },

  toJSON(message: TrxPayloadVotingProto): unknown {
    const obj: any = {};
    if (message.txHash.length !== 0) {
      obj.txHash = base64FromBytes(message.txHash);
    }
    if (message.choice !== 0) {
      obj.choice = Math.round(message.choice);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TrxPayloadVotingProto>, I>>(base?: I): TrxPayloadVotingProto {
    return TrxPayloadVotingProto.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TrxPayloadVotingProto>, I>>(object: I): TrxPayloadVotingProto {
    const message = createBaseTrxPayloadVotingProto();
    message.txHash = object.txHash ?? new Uint8Array(0);
    message.choice = object.choice ?? 0;
    return message;
  },
};

function createBaseTrxPayloadContractProto(): TrxPayloadContractProto {
  return { data: new Uint8Array(0) };
}

export const TrxPayloadContractProto = {
  encode(message: TrxPayloadContractProto, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.data.length !== 0) {
      writer.uint32(10).bytes(message.data);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TrxPayloadContractProto {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTrxPayloadContractProto();
    while (reader.pos < end) {
      const tag = reader.uint32();
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

  fromJSON(object: any): TrxPayloadContractProto {
    return { data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(0) };
  },

  toJSON(message: TrxPayloadContractProto): unknown {
    const obj: any = {};
    if (message.data.length !== 0) {
      obj.data = base64FromBytes(message.data);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TrxPayloadContractProto>, I>>(base?: I): TrxPayloadContractProto {
    return TrxPayloadContractProto.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TrxPayloadContractProto>, I>>(object: I): TrxPayloadContractProto {
    const message = createBaseTrxPayloadContractProto();
    message.data = object.data ?? new Uint8Array(0);
    return message;
  },
};

declare const self: any | undefined;
declare const window: any | undefined;
declare const global: any | undefined;
const tsProtoGlobalThis: any = (() => {
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
