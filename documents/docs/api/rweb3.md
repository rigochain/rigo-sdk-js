## RWeb3

`RWeb3` API 는 NRIGO Provider (NRIGO RPC 서버) 에 접속하여 JSONRPC 요청 작업을 수행 한다.

```ts
import RWeb3 from "rweb3";
const rweb3 = new RWeb3('http://localhost:26657')

...

```

---

### ~~setUrl~~
*DEPRECATED*

`RWeb3` API 호출시 접속하게 될 Provider(NRIGO 노드 RPC 서버) URL을 설정한다.

```ts
setUrl(url:string)
```


#### Parameters
- `url`: NRIGO 노드의 RPC 서버 URL


#### Example
```ts
rweb3.setUrl('http://localhost:26657')
```

---

### getUrl
현재 사용중인 Provider(NRIGO 노드 RPC 서버) URL 조회.

```ts
static getUrl():string
```

#### Example
```ts
const nodeUrl = rweb3.getUrl()
console.log(nodeUrl) // 'http://localhost:26657'
```


---

### queryBlockByHeight

```ts
queryBlockByHeight(height: number|string): PromiseLike<any>
```

블록 높이(번호)로 블록을 조회 한다.

#### Parameters

- `height`: 블록 높이(번호).

#### Example
```ts
rweb3.queryBlockByHeight(10818).then(resp => {
    console.log(resp)
}

```

#### Returns

```json
{
  "block_id": {
    "hash": "2227E9F1505C98EE0360A953735623FC3FD74A6E81ADFC9D7EF3BE8927F9136E",
    "parts": {
      "total": 1,
      "hash": "99334F31D0B4CFFEFDC4D5E79C3D2088E1A6EC86DD89D239F814C48FDB50ADEE"
    }
  },
  "block": {
    "header": {
      "version": {
        "block": "11",
        "app": "4294967296"
      },
      "chain_id": "localnet",
      "height": "10818",
      "time": "2023-02-07T08:05:56.788513Z",
      "last_block_id": {
        "hash": "8113152BFD6476DBDA918F3870F8EE7EE9370A56AE99231E032BE384764BE3EE",
        "parts": {
          "total": 1,
          "hash": "E856C017C67CD7559467C1A16377ECD8B8A0B19A17AA53ADE73AE82BA811E5BC"
        }
      },
      "last_commit_hash": "8A5A5F04B37C4E318C211C343907B1DD64515C6C7F922DE61CFDE593117515D0",
      "data_hash": "003D156CB163310A1B87407DD97F6242F92ED8ED9347DC2B3C7FB83524899F57",
      "validators_hash": "FE36DFA0965A3207F370004FD5A35B0D9CFE22C1E5EC6282B11E0A078E022C11",
      "next_validators_hash": "FE36DFA0965A3207F370004FD5A35B0D9CFE22C1E5EC6282B11E0A078E022C11",
      "consensus_hash": "048091BC7DDC283F77BFBF91D73C44DA58C3DF8A9CBC867405D8B7F3DAADA22F",
      "app_hash": "322829380FD53F359AF2040B2536FB0B6A47E2DDF4918766590541D719D1CAD7",
      "last_results_hash": "CCEC9736296570B1A5CA9F69D56AE286E473BDE1950EB97B419259C2DA071637",
      "evidence_hash": "E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855",
      "proposer_address": "8DC41A86B91EB88D82489C4D037AE9FFCA65CFBF"
    },
    "data": {
      "txs": [
        "CAEQwKK/6piI36AXGJoIIhTEYfux+YzfUycqPFBZp2SsYziBXCoUrjsLNQASnt99xA4njqI1k3RaF4QyAgLEOgEKQAFSQdLVXe+ELBnuS2vF0OwYlfDNgurj0IWiBXGdq8cpaO81M6qvwyiGb8Mr6ZWOnD3/nDvWEkKCSKVWuS+Ld4bXg1wA",
        "CAEQkK/A6piI36AXGJoIIhQAQCOcw9QIFDgBqNRXMYBk7BBd/yoUfEskb4RzA8QqK4B2H39FIVpmxAUyAgLEOgEKQAFSQVPT9NJZ426c89CotpatqndouTxORCt94204obWs6RlXa1e2vSpZwrFkfCn409SsoIkPrQUoXm29K/dWzoJvatIB",
        "CAEQkKbD6piI36AXGJoIIhSNFO5EqCyixc74BbcNjB0kDbooISoUMLAlEfyMyew1LDPiOyR8dqPntqgyAgLEOgEKQAFSQcz4UOU5qT9H8txblik9sYiCBrS3dkO7/v/AwPgjR31HIdK1RFd7Gvi5aNOC12WBDVNrPzX/s14zwH9vG9LEXJsB",
        "CAEQ+KfF6piI36AXGJoIIhQRkD2yGoCJ2LplnWugmZteVqGJLCoUb6EpBDEV3C1kjGLETUsdVClZmnkyAgLEOgEKQAFSQUTYppjNZzJiv73eBd4iVL0MZRFefI27+1F7DclBN/PUVgO3ymip5wo9oDmjujjX+JRug0WJZ75Huyuc9229CoAA",
        "CAEQmKbQ6piI36AXGJoIIhQ923KOXCHGdek8olfpLuS6Bq8RjyoUcdqwpyeP8PU+s7QVP+ZaIv3NXqgyAgLEOgEKQAFSQXdmLY21GvElXS54SMShK+VTGhn5y+6DbayWD4NMBeM2A9E3Fuus5PjQgYuofZNN6BOS3zUuTogdCj5jMIRMTV0A",
        "CAEQoMrR6piI36AXGJoIIhTtwwfQPUjSDuS+fNE8FfLD1GJXlyoUZxMNYNR9J+jqpNUFkBClkG8XqS0yAgLEOgEKQAFSQcRZEHGNiMQuxh6rYucuLb6w3LP9x4pYGq54f3XP/654Fxf2zANuO01cPkQTZdhi0Y2JaTEnjJ5OCpY+ctOs1wwA",
        "CAEQiNjP6piI36AXGJoIIhQUFOQiWO8r7++FWhg7jOkucHR/SyoU2KU7DNCsqsSOEWZTjtrittYSBlkyAgLEOgEKQAFSQU04aE+ZAJ7W7V9Kv5zu7Rz7e1CDuUtq3kSOc1FedKSQaCCuXqF2/x5RSc1Ix19ksY89UBUbxf9J4QBp/0D/saAA",
        "CAEQkPPT6piI36AXGJoIIhSzK8vw2EZt+BNCYr7RCMa6SCvtdyoUssY9flobuPJRnY9xdsLa3slx40AyAgLEOgEKQAFSQQA5/AS+cwqb7D89In8Qsnm1EYYkvJlLS/Iyt5qJlRy1SrVmBP+GRfv1H8m7pHGk1sdvv42EydP3sNZAcU3YccgA",
        "CAEQ6KbV6piI36AXGJoIIhRh8JfNVC+0RFKIvBUuxz+WEstDHioUNiw81aRP6L6KD03GCBVLCmiU814yAgLEOgEKQAFSQWy45CDU57VHi4O7AmZuCpd5HYfJCATP651y4ZIQi+uYUHojMZgcDsG7euId5oqKX4+1BN/Zplw6/IcL8hTANgAB"
      ]
    },
    "evidence": {
      "evidence": []
    },
    "last_commit": {
      "height": "10817",
      "round": 0,
      "block_id": {
        "hash": "8113152BFD6476DBDA918F3870F8EE7EE9370A56AE99231E032BE384764BE3EE",
        "parts": {
          "total": 1,
          "hash": "E856C017C67CD7559467C1A16377ECD8B8A0B19A17AA53ADE73AE82BA811E5BC"
        }
      },
      "signatures": [
        {
          "block_id_flag": 2,
          "validator_address": "8DC41A86B91EB88D82489C4D037AE9FFCA65CFBF",
          "timestamp": "2023-02-07T08:05:56.788513Z",
          "signature": "JC8Js09k3LPlWFmV3kJoL2gkgvA74Did2cZTRXFdjfRikA0aRwNDMkAnMDtAxtRgsa8ZSVDLngDg3gtU1sq6bg=="
        }
      ]
    }
  }
}
```

- `block_id`: 블록 해시 값. `block_id.hash` 값을 사용한다.
- `block`: 블록의 내용.
- `data.txs`: 블록에 포함된 트랜잭션 배열. 각각의 트랜잭션 데이터는 Protobuf v3 인코딩 데이터의 base64 형식.

---

### queryBlockByHash
```ts
queryBlockByHash(hash: string|Uint8Array): PromiseLike<any>
```
블록 해시 값으로 블록을 조회 한다.

#### Parameters

- `hash`: 블록 해시 값. (32bytes or 64chars hex-string)

#### Example
```ts
rweb3.queryBlockByHash("2227E9F1505C98EE0360A953735623FC3FD74A6E81ADFC9D7EF3BE8927F9136E").then(resp => {
    console.log(resp)
}
```

#### Returns
`queryBlockByHeight` 와 동일

---

### broadcastTrxSync
```ts
broadcastTrxSync(tx: TrxProto): PromiseLike<any>
```
트랜잭션을 NRIGO 네트워크에 제출 한다.  

#### Parameters
- `tx`: 트랜잭션 객체. `TrxBuiler.BuildXXX` 로 생성. [TrxBuilder](./trxbuilder.md) 참조.

---

### queryTrx
```ts
queryTrx(txhash: string|Uint8Array)
```
트랜잭션 해시로 트랜잭션을 조회한다.

#### Parameters
- `txhash`: 조회하고자 하는 트랜잭션의 해시. (32bytes or 64chars Hex-string)

#### Example
```ts
rweb3.queryTrx("AD10C104B8E3B3DBE357CF4133B8376B6EB48E44AE28260D42F7A0B53E1B34F1").then(resp => {
  console.log(resp)
  console.log(resp.encoded) // base64(protobuf(tx object))
  console.log(resp.tx) // tx object
})
```

#### Returns

```json
{
    "hash": "AD10C104B8E3B3DBE357CF4133B8376B6EB48E44AE28260D42F7A0B53E1B34F1",
    "height": "6980",
    "index": 0,
    "tx_result": {
        "code": 0,
        "data": null,
        "log": "",
        "info": "",
        "gas_wanted": "10",
        "gas_used": "10",
        "events": [
            {
                "type": "tx",
                "attributes": [
                    {
                        "key": "dHgudHlwZQ==",
                        "value": "dHJhbnNmZXI=",
                        "index": true
                    },
                    {
                        "key": "dHguc2VuZGVy",
                        "value": "MjkwMzZBQjAwRDE4QjFCNzI3NDQ0ODJGNUEwOUZEREU4QzZGMTk2RQ==",
                        "index": true
                    },
                    {
                        "key": "dHgucmVjZWl2ZXI=",
                        "value": "OERDNDFBODZCOTFFQjg4RDgyNDg5QzREMDM3QUU5RkZDQTY1Q0ZCRg==",
                        "index": true
                    },
                    {
                        "key": "dHguYWRkcnBhaXI=",
                        "value": "MjkwMzZBQjAwRDE4QjFCNzI3NDQ0ODJGNUEwOUZEREU4QzZGMTk2RThEQzQxQTg2QjkxRUI4OEQ4MjQ4OUM0RDAzN0FFOUZGQ0E2NUNGQkY=",
                        "index": true
                    }
                ]
            }
        ],
        "codespace": ""
    },
    "tx": {
        "hash": "ad10c104b8e3b3dbe357cf4133b8376b6eb48e44ae28260d42f7a0b53e1b34f1",
        "version": 1,
        "time": "1675752794424000000",
        "nonce": "3",
        "from": "29036ab00d18b1b72744482f5a09fdde8c6f196e",
        "to": "8dc41a86b91eb88d82489c4d037ae9ffca65cfbf",
        "amount": "1",
        "gas": "10",
        "type": 1,
        "sig": "89122638fef0e2793a0f3fba18fa9884690d8f1ac957fb1437e9b282f74909c04aae758bd118e7f324f25fbecedfc61e9c90fe6749fd1f0905945571f8360d0500"
    },
    "proof": {
        "root_hash": "D27A3C02E3618E16982ED008703381BB43A84C44A12ECE2600E271200E42099E",
        "data": "CAEQgPyK2JuJ3qAXGAMiFCkDarANGLG3J0RIL1oJ/d6MbxluKhSNxBqGuR64jYJInE0Deun/ymXPvzIBAToBCkABUkGJEiY4/vDieToPP7oY+piEaQ2PGslX+xQ36bKC90kJwEqudYvRGOfzJPJfvs7fxh6ckP5nSf0fCQWUVXH4Ng0FAA==",
        "proof": {
            "total": "1",
            "index": "0",
            "leaf_hash": "0no8AuNhjhaYLtAIcDOBu0OoTEShLs4mAOJxIA5CCZ4=",
            "aunts": []
        }
    },
    "encoded": "CAEQgPyK2JuJ3qAXGAMiFCkDarANGLG3J0RIL1oJ/d6MbxluKhSNxBqGuR64jYJInE0Deun/ymXPvzIBAToBCkABUkGJEiY4/vDieToPP7oY+piEaQ2PGslX+xQ36bKC90kJwEqudYvRGOfzJPJfvs7fxh6ckP5nSf0fCQWUVXH4Ng0FAA=="
}
```

- `hash`: 트랜잭션 해시
- `height`: 트랜잭션이 포함된 블록의 높이(번호)
- `index`: 블록내에서 트랜잭션의 순번
- `tx_result`: 트랜잭션 처리 결과.  `tx_result.code`가 `0` 이면 성공, 그렇지 않으면 실패에 해당된다.
- `tx`: 처리된 트랜잭션.
- `encoded`: Protobuf v3 로 인코딩된 트랜잭션 데이터의 base64 형식.
- `proof`:

---

### queryAccount
```ts
queryAccount(addr: string|Bytes)
```
`addr`로 지정된 주소의 `Account` 최신 상태 정보를 조회 한다.

#### Parameters
- `addr`: 조회 대상 `Account`의 주소. (20bytes 또는 40chars hex-string)

#### Example
```ts
rweb3.queryAccount("DF976A96545DAD0E0B14FED615587A89BA980B84").then(resp => {
    console.log(resp)
})
```

#### Returns
```json
{
    ...
    "value": {
        "address": "DF976A96545DAD0E0B14FED615587A89BA980B84",
        "nonce": 0,
        "balance": "0"
    }
    ...
}    
```
`value` 객체의 값이 실질적인 조회 결과에 해당된다.

- `address`: 조회한 계정의 주소. `key` 값과 동일한 값.
- `nonce`: 현재 계정으로 발행한 트랜잭션 수.
- `balance`: 계정의 잔액.


---

### syncAccount
```ts
syncAccount(acct: Account, cb?:(_:any)=>void) 
```
블록체인상에 기록된 `acct`의 최신 상태 정보(`nonce`, `balance`) 를 동기화 한다.

#### Parameters
- `acct`: 조회 대상 `Account` 객체.

#### Example
```ts
let acct = Account.New("test-0")

    ...

rweb3.syncAccount(acct, resp => {
    console.log(acct) // `acct` is not updated.
})
.then( resp => {
    console.log(acct) // `acct` is updated.
})
```

#### Returns
`queryAccount` 의 리턴값과 동일하다.

---

### queryValidators
```ts
queryValidators(height:number|string)
```
지정된 블록 번호 시점의 Validator 목록을 조회한다.

#### Parameters
- `height`: 블록 번호.

#### Example
```ts
rweb3.queryValidators().then( resp => {
    console.log(resp)
})
```

#### Returns
```json
{
    "block_height": "1153",
    "validators": [
      {
        "address": "8DC41A86B91EB88D82489C4D037AE9FFCA65CFBF",
        "pub_key": {
          "type": "tendermint/PubKeySecp256k1",
          "value": "Ax2d8cCfC60NjIS7G6J8hHTPPf6JvxgPRjSVpL+83Qkr"
        },
        "voting_power": "10",
        "proposer_priority": "0"
      }
    ],
    "count": "1",
    "total": "1"
}
```

- `block_height`: 블록 번호.
- `validators`: Validator 목록.
  - `address`: Validator 계정의 주소.
  - `pub_key`: Validator의 Public Key. (Base64 인코딩)
  - `voting_power`: Validator의 지분.
  - `proposer_proiority`: Validator 가 블록 제안자(Proposer)가 될 수 있는 우선 순위.  
    지분이 클 수록, 마지막 블록 제안이후 경과 시간이 클 수록 우선 순위는 높아진다.
- `count`: `validators` 의 개수.
- `total`: 현재(`block_height`) 시점의 총 Validator 수.
---

### queryStakes
```ts
queryStakes(addr: string|Bytes)
```
주소가 `addr`인 계정의 지분목록을 조회한다.

#### Parameters
- `addr`: 계정 주소.

#### Example
```ts
 rweb3.queryStakes("8DC41A86B91EB88D82489C4D037AE9FFCA65CFBF").then (resp => {
     console.log(resp)
 }
```
#### Returns
```json
{
    ...
    "value": [
      {
        "owner": "8DC41A86B91EB88D82489C4D037AE9FFCA65CFBF",
        "to": "8DC41A86B91EB88D82489C4D037AE9FFCA65CFBF",
        "amount": 10000000000000000000,
        "power": "10",
        "blockRewardUnit": 10000000000,
        "ReceivedReward": 0,
        "txhash": "0000000000000000000000000000000000000000000000000000000000000000",
        "startHeight": "0",
        "refundHeight": "0"
      },
      ...
    ]
}
```

- `owner`:
- `to`:
- `amount`:
- `power`:
- `blockRewardUnit`:
- `txhash`:
- `startHeight`:
- `refundHeight`:
---

### queryDelegatee
*Not descripted yet*

---


### queryRule
```ts
queryRule(): PromiseLike<any>
```
현재 적용된 governance rule 을 조회한다.

#### Example
```ts
rweb3.queryRule().then(resp => {
    console.log(resp)
})
```

#### Returns

```json
{
    "value": {
      "version": "0",
      "maxValidatorCnt": "21",
      "amountPerPower": "1000000000000000000",
      "rewardPerPower": "1000000000",
      "lazyRewardBlocks": "20",
      "lazyApplyingBlocks": "10",
      "minTrxFee": "10",
      "minVotingPeriodBlocks": "259200",
      "maxVotingPeriodBlocks": "2592000"
    }
  }
```

- `version`: 거버넌스 규칙 버전.
- `maxValidatorCnt`: 최대 Validator 수.
- `amountPerPower`: 1 voting power 당 암호화폐 자산 수량.
- `rewardPerPower`: 1 voting power 당 받게되는 블록 보상 수량.
- `lazyRewardBlocks`: Un-staking 후 보상량을 전송할 수 있게 되기까지의 블록 수.
- `lazyApplyingBlocks`: 제안된 새로운 거버넌스 규칙이 투표 종료 부터 실재 반영되기까지의 블록 수.
- `minTrxFee`: 최소 트랜잭션 수수료.
- `minVotingPeriodBlocks`: 최소 투표 기간(블록 수).
- `maxVotingPeriodBlocks`: 최대 투표 기간(블록 수).

---

### subscribe
```ts
subscribe(url:string, query: string, cb: (resp:string)=>void): Subscriber
```
NRIGO 네트워크에서 발생되는 이벤트 구독을 요청한다.  
구독 종료는 리턴되는 `Subscriber` 객체의 `stop` 메소드를 사용한다. 자세한 사항은 [Subscriber](subscriber.md)를 참조한다.

#### Parameters

1. `url` : NRIGO Node 의 websocket endpoint.
2. `query` : 구독하고자 하는 이벤트 조건 지정.
3. `cb` : 이벤트를 수신할 callback function.

#### Example
```ts
var sub = Subscriber.Listen('ws://localhost:26657/websocket', "tm.event='NewBlockHeader'", (resp) => {
    if(!resp.data) {
        return
    }
    console.log(resp)
    // do something
})

...

listener.stop()
```

#### Returns
`Subscriber` 객체.

