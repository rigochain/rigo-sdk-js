# RPC

## account
주소를 키워드로 하여 계정 정보를 조회한다.

### HTTP
```bash
curl localhost:26657/account?addr=0x68F9AACFAEC8B2EDC440FCB534F6F2BA4E7BA59F
```

### JSONRPC
```json
{
  "jsonrpc": "2.0",
  "id": -1,
  "method": "account", 
  "params": {"addr":  "68F9AACFAEC8B2EDC440FCB534F6F2BA4E7BA59F"}
}
```

### Parameters

- `addr` : 계정 주소. 40chars hex-string (20bytes)

### Returns

```json
{
  "jsonrpc": "2.0",
  "id": -1,
  "result": {
    "key": "68F9AACFAEC8B2EDC440FCB534F6F2BA4E7BA59F",
    "value": {
      "address": "68F9AACFAEC8B2EDC440FCB534F6F2BA4E7BA59F",
      "nonce": 0,
      "balance": "100000000000000000000000000"
    }
  }
}
```

---

## block

블록 높이로 블록 정보를 조회한다.

### HTTP
```bash
curl localhost:26657/block?height=319
```

### JSONRPC
```json
{
  "jsonrpc": "2.0",
  "id": -1,
  "method": "block", 
  "params": {"height":  "319"}
}
```

### Parameters

- `height` : 블록의 높이. 이 파리메터를 생략하면 마지막 블록이 조회 된다.

### Returns

```json
{
  "jsonrpc": "2.0",
  "id": -1,
  "result": {
    "block_id": {
      "hash": "857DCD3AB898827436524DFAFC00B70D73056B5AD8FD59D5A8B6136AC5A14B07",
      "parts": {
        "total": 1,
        "hash": "30129073FFA9018D20CF4FCFB6BA0B26F059624C07FF3F273C8A20E0AC11F348"
      }
    },
    "block": {
      "header": {
        "version": {
          "block": "11",
          "app": "4294967296"
        },
        "chain_id": "localnet",
        "height": "319",
        "time": "2023-02-22T07:48:44.166257Z",
        "last_block_id": {
          "hash": "239066BEDD1BD64D3776CEF980E6CBD9CA2F9965153250F0140F54081CC5D0B7",
          "parts": {
            "total": 1,
            "hash": "29B3B0F4AFF08A28DC40F8B82FF5C517584D7E2209E9D7C598D632F5E4CA8B21"
          }
        },
        "last_commit_hash": "B95DDD3C0DCB29994811BA3DF680BAAF367E5BF73EEAE89EE9CDCEC6C9C9F31E",
        "data_hash": "E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855",
        "validators_hash": "12A05F850516E918E1E15394D0623E22B5D2AA4576483CF5CA2CF637201DE338",
        "next_validators_hash": "12A05F850516E918E1E15394D0623E22B5D2AA4576483CF5CA2CF637201DE338",
        "consensus_hash": "048091BC7DDC283F77BFBF91D73C44DA58C3DF8A9CBC867405D8B7F3DAADA22F",
        "app_hash": "3F2F36C85CE93707F9091E446266FA1C8B44B35C89A286491D65A78467C91475",
        "last_results_hash": "E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855",
        "evidence_hash": "E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855",
        "proposer_address": "68F9AACFAEC8B2EDC440FCB534F6F2BA4E7BA59F"
      },
      "data": {
        "txs": []
      },
      "evidence": {
        "evidence": []
      },
      "last_commit": {
        "height": "318",
        "round": 0,
        "block_id": {
          "hash": "239066BEDD1BD64D3776CEF980E6CBD9CA2F9965153250F0140F54081CC5D0B7",
          "parts": {
            "total": 1,
            "hash": "29B3B0F4AFF08A28DC40F8B82FF5C517584D7E2209E9D7C598D632F5E4CA8B21"
          }
        },
        "signatures": [
          {
            "block_id_flag": 2,
            "validator_address": "68F9AACFAEC8B2EDC440FCB534F6F2BA4E7BA59F",
            "timestamp": "2023-02-22T07:48:44.166257Z",
            "signature": "mMWFCaCtoQBHZzWrdjITOqLpXgKH+xCcnYYI7iQAdKguJ2AwmKCXzUKyIT4yckJKfZ2aL5YPDx08fDRPQI7cWg=="
          }
        ]
      }
    }
  }
}
```

---

## block_by_hash

블록 해시값으로 블록 정보를 조회한다.

### HTTP
```bash
curl localhost:26657/block_by_hash?hash=0x239066BEDD1BD64D3776CEF980E6CBD9CA2F9965153250F0140F54081CC5D0B7
```

### JSONRPC
```json
{
  "jsonrpc": "2.0",
  "id": -1,
  "method": "block_by_hash",
  "params": {"hash":  "239066BEDD1BD64D3776CEF980E6CBD9CA2F9965153250F0140F54081CC5D0B7"}
}
```

### Parameters

- `hash` : 블록의 해시. 64chars hex-string (32bytes)
 
### Returns

```json
{
  "jsonrpc": "2.0",
  "id": -1,
  "result": {
    "block_id": {
      "hash": "239066BEDD1BD64D3776CEF980E6CBD9CA2F9965153250F0140F54081CC5D0B7",
      "parts": {
        "total": 1,
        "hash": "29B3B0F4AFF08A28DC40F8B82FF5C517584D7E2209E9D7C598D632F5E4CA8B21"
      }
    },
    "block": {
      "header": {
        "version": {
          "block": "11",
          "app": "4294967296"
        },
        "chain_id": "localnet",
        "height": "318",
        "time": "2023-02-22T07:48:42.029719Z",
        "last_block_id": {
          "hash": "88CC3AB2150B9F5106E1B2B0791D1F2E871CADFB9CFCEE2B029EC7229288082F",
          "parts": {
            "total": 1,
            "hash": "33A21FA1CC75F01B3DF81DBFA2EB850A515A817D5BFBC61707566AE1B924522E"
          }
        },
        "last_commit_hash": "ABB6276405AFAA374F3DED24B8717425448B33FC34DB8D4FDE0AB1149807FE07",
        "data_hash": "E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855",
        "validators_hash": "12A05F850516E918E1E15394D0623E22B5D2AA4576483CF5CA2CF637201DE338",
        "next_validators_hash": "12A05F850516E918E1E15394D0623E22B5D2AA4576483CF5CA2CF637201DE338",
        "consensus_hash": "048091BC7DDC283F77BFBF91D73C44DA58C3DF8A9CBC867405D8B7F3DAADA22F",
        "app_hash": "3F2F36C85CE93707F9091E446266FA1C8B44B35C89A286491D65A78467C91475",
        "last_results_hash": "E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855",
        "evidence_hash": "E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855",
        "proposer_address": "68F9AACFAEC8B2EDC440FCB534F6F2BA4E7BA59F"
      },
      "data": {
        "txs": []
      },
      "evidence": {
        "evidence": []
      },
      "last_commit": {
        "height": "317",
        "round": 0,
        "block_id": {
          "hash": "88CC3AB2150B9F5106E1B2B0791D1F2E871CADFB9CFCEE2B029EC7229288082F",
          "parts": {
            "total": 1,
            "hash": "33A21FA1CC75F01B3DF81DBFA2EB850A515A817D5BFBC61707566AE1B924522E"
          }
        },
        "signatures": [
          {
            "block_id_flag": 2,
            "validator_address": "68F9AACFAEC8B2EDC440FCB534F6F2BA4E7BA59F",
            "timestamp": "2023-02-22T07:48:42.029719Z",
            "signature": "+gqKKBguRPk49CDAjffa9dOAtyZlfD5E0WOl7ZAVxjQDoQ9WiazWgzzGMNU4BiGbQqEZG8P9cYA6jrdFkDRBQQ=="
          }
        ]
      }
    }
  }
}
```

---

## tx

트랜잭션 해시값으로 트랜잭션 정보를 조회한다.

### HTTP

```bash
curl localhost:26657/tx?hash=0x5880e40956d1b274f7be9f15b5d8b9d5afdd69341ffef5fcc5d43d16c4627e4c
```

### JSONRPC

```json
{
  "jsonrpc": "2.0",
  "id": -1,
  "method": "tx",
  "params": {"hash": "5880e40956d1b274f7be9f15b5d8b9d5afdd69341ffef5fcc5d43d16c4627e4c"}
}
```

### Parameters

- `hash`: 트랜잭션 해시. 64chars hex-string (32bytes)

### Return

```json
{
  "jsonrpc": "2.0",
  "id": -1,
  "result": {
    "hash": "5880E40956D1B274F7BE9F15B5D8B9D5AFDD69341FFEF5FCC5D43D16C4627E4C",
    "height": "110440",
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
              "value": "OERDNDFBODZCOTFFQjg4RDgyNDg5QzREMDM3QUU5RkZDQTY1Q0ZCRg==",
              "index": true
            },
            {
              "key": "dHgucmVjZWl2ZXI=",
              "value": "MUM2QzcxRDNCMERCMEM0NTM3RjdFQ0REMkM5RkU2Rjg2QkI5QzE1RQ==",
              "index": true
            },
            {
              "key": "dHguYWRkcnBhaXI=",
              "value": "OERDNDFBODZCOTFFQjg4RDgyNDg5QzREMDM3QUU5RkZDQTY1Q0ZCRjFDNkM3MUQzQjBEQjBDNDUzN0Y3RUNERDJDOUZFNkY4NkJCOUMxNUU=",
              "index": true
            }
          ]
        }
      ],
      "codespace": ""
    },
    "tx": "CAEQgJGLmKjz2aIXGAwiFI3EGoa5HriNgkicTQN66f/KZc+/KhQcbHHTsNsMRTf37N0sn+b4a7nBXjIEQjo1xzoBCkABUkEztR8Kh0ycBw63WZgWTR868mFFgjX9TDdpOS4951GGJk3s7H21SSPpuzh9xVvp4QjxyhetDFwfDhFxIgDclTV/AQ=="
  }
}
```
---

## tx_search

Not supported

---

## broadcast_tx_sync

블록체인 네트워크에 트랜잭션을 제출 한다.

### HTTP
```json
curl localhost:26657/broadcast_tx_sync?tx=0xABCDEF0123456789....
```

### JSONRPC
```json
{
  "jsonrpc": "2.0",
  "id": -1,
  "method": "broadcast_tx_sync",
  "params": {"tx": "CAEQgJGLmKjz2aIXGAwiFI3EGoa5HriNgkicTQN66f/KZc+/KhQcbHHTsNsMRTf37N0sn+b4a7nBXjIEQjo1xzoBCkABUkEztR8Kh0ycBw63WZgWTR868mFFgjX9TDdpOS4951GGJk3s7H21SSPpuzh9xVvp4QjxyhetDFwfDhFxIgDclTV/AQ=="}
}
```

### Parameters

- `tx`: 트랜잭션 데이터.  
JSONRPC 로 요청하는 경우, base64 인코딩된 값을 사용 하고,  
HTTP/GET 방식으로 요청할 경우, hex-string(`"0x"` prefix 포함) 으로 인코딩한 값을 사용한다.

### Returns
```json
{
  "jsonrpc": "2.0",
  "id": 0,
  "result": {
    "code": "0",
    "data": "",
    "log": "",
    "hash": "5880E40956D1B274F7BE9F15B5D8B9D5AFDD69341FFEF5FCC5D43D16C4627E4C"
  }
}
```

---

## validators

현재 또는 특정 블록 높이 시점에서의 Validator 목록을 조회한다.

### HTTP
```bash
curl localhost:26657/validators?height=5
```

### JSONRPC
```json
{
  "jsonrpc": "2.0",
  "id": -1,
  "method": "validators",
  "params": {"height": "5"}
}
```

### Parameters
- `height`: 블록높이

### Returns
```json
{
  "jsonrpc": "2.0",
  "id": -1,
  "result": {
    "block_height": "1",
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
}
```

---

## stakes

특정 계정의 지분(stakes) 를 조회 한다.

### HTTP
```bash
curl localhost:26657/stakes?addr=0x8DC41A86B91EB88D82489C4D037AE9FFCA65CFBF
```

### JSONRPC
```json
{
  "jsonrpc": "2.0",
  "id": -1,
  "method": "stakes",
  "params": {"addr": "8DC41A86B91EB88D82489C4D037AE9FFCA65CFBF"}
}
```

### Parameters
- `addr`: 조회하고자 하는 계정의 주소.

### Returns
```json
{
  "jsonrpc": "2.0",
  "id": -1,
  "result": {
    "key": "8DC41A86B91EB88D82489C4D037AE9FFCA65CFBF",
    "value": [
      {
        "owner": "8DC41A86B91EB88D82489C4D037AE9FFCA65CFBF",
        "to": "8DC41A86B91EB88D82489C4D037AE9FFCA65CFBF",
        "amount": 10000000000000000000,
        "power": "10",
        "blockRewardUnit": 10000000000,
        "ReceivedReward": 22820000000000,
        "txhash": "0000000000000000000000000000000000000000000000000000000000000000",
        "startHeight": "0",
        "refundHeight": "0"
      }
    ]
  }
}
```
---

## delegatee
특정 계정이 누구(계정)에게 지분 위임을 하였는지 조회

### HTTP
```bash
http://localhost:26657/delegatee?addr=0x8DC41A86B91EB88D82489C4D037AE9FFCA65CFBF
```

### JSONRPC
```json
{
  "jsonrpc": "2.0",
  "id": -1,
  "method": "delegatee",
  "params": {"addr": "8DC41A86B91EB88D82489C4D037AE9FFCA65CFBF"}
}
```

### Parameters
- `addr`: 조회하고자 하는 계정의 주소. `addr`로 부터 지분 위임 받은 계정 목록이 조회된다.

### Returns
```json
{
  "jsonrpc": "2.0",
  "id": -1,
  "result": {
    "key": "8DC41A86B91EB88D82489C4D037AE9FFCA65CFBF",
    "value": {
      "address": "8DC41A86B91EB88D82489C4D037AE9FFCA65CFBF",
      "pubKey": "031D9DF1C09F0BAD0D8C84BB1BA27C8474CF3DFE89BF180F463495A4BFBCDD092B",
      "selfAmount": 10000000000000000000,
      "selfPower": "10",
      "totalAmount": 10000000000000000000,
      "totalPower": "10",
      "rewardAmount": 22820000000000,
      "stakes": [
        {
          "owner": "8DC41A86B91EB88D82489C4D037AE9FFCA65CFBF",
          "to": "8DC41A86B91EB88D82489C4D037AE9FFCA65CFBF",
          "amount": 10000000000000000000,
          "power": "10",
          "blockRewardUnit": 10000000000,
          "ReceivedReward": 22820000000000,
          "txhash": "0000000000000000000000000000000000000000000000000000000000000000",
          "startHeight": "0",
          "refundHeight": "0"
        }
      ]
    }
  }
}
```

---

## rule
현재 거버넌스 규칙을 조회 한다.

### HTTP
```bash
curl http://localhost:26657/rule
```

### JSONRPC
```json
{
  "jsonrpc": "2.0",
  "id": -1,
  "method": "rule",
}
```

### Paramters

N/A

### Returns
```json
{
  "jsonrpc": "2.0",
  "id": -1,
  "result": {
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
}
```

---

## proposals

---

## subscribe

Websocket 을 이용한 [Event Subscription](subscriber.md) 을 참조한다.

---

## unsbscribe

Websocket 을 이용한 [Event Subscription](subscriber.md) 을 참조한다.

---

