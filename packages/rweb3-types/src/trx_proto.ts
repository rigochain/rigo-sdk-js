import Long from 'long';

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
