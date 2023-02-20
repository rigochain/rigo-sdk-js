## TrxBuilder


### BuildTransferTrx

```ts
function BuildTransferTrx(obj: Trx): trxPb.TrxProto
```

#### Parameters

#### Returns

#### Examples

---


### BuildDelegateTrx

```ts
function BuildDelegateTrx(obj: Trx): trxPb.TrxProto
```

#### Parameters

#### Returns

#### Examples

---

### BuildUndelegateTrx

```ts
function BuildUndelegateTrx(obj: Trx): trxPb.TrxProto
```

#### Parameters

#### Returns

#### Examples

---

### SignTrx

```ts
function SignTrx(tx:trxPb.TrxProto, acct:Account): [Bytes, Bytes]
```

#### Parameters

#### Returns

#### Examples

---

### DecodeTrx

```ts
function DecodeTrx(d: Bytes): Trx
```

#### Parameters

#### Returns

#### Examples

