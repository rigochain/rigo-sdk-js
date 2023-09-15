# Rigo Chain Documentation

## Protobuf Package
The name of the protobufPackage is 'types'.

## Interfaces

### `TrxPayloadStakingProto`
An empty interface.

### `TrxPayloadUnstakingProto`
```
{
    txHash: Uint8Array;
}
```
### `TrxPayloadExecContractProto`
```
{
    Code: Uint8Array;
}
```
### `TrxPayloadProposalProto`
```
{
    message: string;
    startVotingHeight: Long;
    votingBlocks: Long;
    optType: number;
    options: Uint8Array[];
}
```
### `TrxPayloadVotingProto`
```
{
    txHash: Uint8Array;
    choice: number;
}
```
### `TrxPayloadContractProto`
```
{
    data: Uint8Array;
}
```
## Function createBaseTrxProto
A method which creates a `TrxProto` object with default values.

## TrxProtoUtils
A utility object that provides methods for encoding and decoding `TrxProto` messages.

## TrxPayloadStakingProto
A utility object that provides methods for encoding and decoding `TrxPayloadStakingProto` messages.

## TrxPayloadUnstakingProto
A utility object that provides methods for encoding and decoding `TrxPayloadUnstakingProto` messages.

## TrxPayloadExecContractProto
A utility object that provides methods for encoding and decoding `TrxPayloadExecContractProto` messages.

## TrxPayloadProposalProto
A utility object that provides methods for encoding and decoding `TrxPayloadProposalProto` messages.

## TrxPayloadVotingProto
A utility object that provides methods for encoding and decoding `TrxPayloadVotingProto` messages.

## TrxPayloadContractProto
A utility object that provides methods for encoding and decoding `TrxPayloadContractProto` messages.
