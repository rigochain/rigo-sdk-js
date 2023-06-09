## Contract

### deploy
```ts
deploy(account: Account, bytecode: string, args: any[])
```
RIGO 네트워크에 새로운 스마트 컨트랙트를 배포 한다.

#### Parameters

1. `account` : `Account` 객체.
2. `bytecode` : 스마트 컨트랙트의 바이트 코드.
3. `args` : Arguments 배열.

#### Example
```ts
const prvKeyBytes = Bytes.fromHex('ABCDEF0123456789....');
const account:Account = Account.Import("new name", "new passphrase", prvKeyBytes);
rweb3.syncAccount(account);

const jsonInterface = JSON.parse(fs.readFileSync('./abi.json', 'utf-8'));
const contract = rweb3.createContract(jsonInterface);

const bytecode = '0x516186765....'
const result = await contract.deploy(account, bytecode, ['arg1', 'arg2']);
console.log(result);
```

#### Returns
```json
{
  "code" : 0,
  "data" : "",
  "log" : "",
  "codespace" : "",
  "hash" : "0CE8C8675812FD869E7D73D132229BE746EE847E643C506CCF7DAC32EBAE4312"
}
```

---

### excute
```ts
execute(account: Account, functionName: string, values: any[])
```

#### Parameters

1. `account` : `Account` 객체.
2. `functionName` : 대상 함수명.
3. `values` : Arguments 배열.

#### Example
```ts
const prvKeyBytes = Bytes.fromHex('ABCDEF0123456789...');
const account:Account = Account.Import("new name", "new passphrase", prvKeyBytes);
rweb3.syncAccount(account);

const jsonInterface = JSON.parse(fs.readFileSync('./abi.json', 'utf-8'));
const contractAddress = '42d09a60ad1...';
const contract = rweb3.createContract(jsonInterface, contractAddress);
const values = ['280057599c3975537bb8ad42343078d879384436', BigInt('100')];

const result = await contract.execute(account, 'transfer', values);
console.log(result);
```

#### Returns
```json
{
  "code" : 0,
  "data" : "",
  "log" : "",
  "codespace" : "",
  "hash" : "6681B51192F59F7EACC6D12558886CCBC414BB5E5475CF051772002652E29FAB"
}
```

---

### query
```ts
query(account: Account, functionName: string, values?: any[])
```

#### Parameters

1. `account` : `Account` 객체.
2. `functionName` : 대상 함수명.
3. `values` : Arguments 배열.

#### Example
```ts
const prvKeyBytes = Bytes.fromHex('ABCDEF0123456789...');
const account:Account = Account.Import("new name", "new passphrase", prvKeyBytes);
rweb3.syncAccount(account);

const jsonInterface = JSON.parse(fs.readFileSync('./abi.json', 'utf-8'));
const contractAddress = '42d09a60ad1...';
const contract = rweb3.createContract(jsonInterface, contractAddress);
const values = ['280057599c3975537bb8ad42343078d879384436'];

const result = await contract.query(importUser, 'balanceOf', values);
console.log(result);
```

#### Returns
```json
{
  "key": "696BFA1C38B123EDCB45952D89A5205913F89D38FD4D3B0F16C74CD236AD8761309D51EF92CA880B70A08231000000000000000000000000280057599C3975537BB8AD42343078D879384436",
  "value": {
    "usedGas": "24365",
    "returnData": "000000000000000000000000000000000000000000000000000000000000012c"
  }
}
```

---

### getContractAddress
```ts
getContractAddress(txHash: string)
```

#### Parameters

1. `txHash` : 배포된 스마트 컨트랙트 트랙잭션 해시 값.

#### Example
```ts
const contract = rweb3.createContract();
const txHash = '4FF4A18BC39180C34E18AD7A21090476F8B4293DF07C29B2D54A49ED1F3937D2';
const addr = await contract.getContractAddress(txHash);
```

#### Returns
스마트 컨트랙트 주소