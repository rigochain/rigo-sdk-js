# Event Subscription

## Event Query

이벤트 쿼리는 **"key operator operand"** 형식의 `string` 으로 구성되며, 복수의 쿼리문은 `AND` 로 연결될 수 있다.

### key

구독할 이벤트의 종류를 제한하기 위하여 사용하며 RIGO 에 사전 정의된 **key**는 다음과 같다.

- `tm.event` : 구독할 이벤트 종류를 제한 한다. 다음과 같이 값을 가질 수 있다.
    - `tm.event = 'NewBlock'`
    - `tm.event = 'NewBlockHeader'`
    - `tm.event = 'Tx'`

- `tx.hash` : 트랜잭션 hash. `tm.event='Tx'` 와 함께 사용된다.  
  트랜잭션 hash는 `0x`를 제거한 대문자 Hex-String 으로 지정한다.

- `tx.height` : 트랜잭션이 포함된 블록의 번호. `tm.event='Tx'` 와 함께 사용된다.

- `tx.type` : 트랜잭션의 종류. `tm.event='Tx'` 와 함께 사용된다. 다음과 같은 값을 가질 수 있다.
    - `tx.type = 'transfer'`
    - `tx.type = 'staking'`
    - `tx.type = 'unstaking'`

- `tx.sender` : 트랜잭션의 `sender` 주소. `tm.event='Tx'` 와 함께 사용된다.  
  주소는 `0x`를 제거한 대문자 Hex-String 으로 지정한다.
- `tx.receiver` - 트랜잭션의 `receiver` 주소. `tm.event='Tx'` 와 함께 사용된다.  
  주소는 `0x`를 제거한 대문자 Hex-String 으로 지정한다.
- `tx.addrpair` - 트랜잭션의 `sender | receiver` 주소 합성. `tm.event='Tx'` 와 함께 사용된다.


### operation

**key** 와 **operand** 의 관계를 나타내며,
`=`, `<`, `<=`, `>`, `>=`, `CONTAINS`, `EXISTS` 값을 가질 수 있다.

### operand

**key** 의 값에 해당한다.

### Examples

#### Block event

```ts
import Subscriber from "./subscriber";


// 블록 생성 이벤트 구독 요청
var sub = new Subscriber("ws://localhost:26657/websocket", "tm.event = 'NewBlock'")
sub.start( resp => console.log(resp) )
```

`NewBlock` 이벤트는 다음과 같다.
```json
{
    "query": "tm.event='NewBlock'",
    "data": {
        "type": "tendermint/event/NewBlock",
        "value": {
            "block": {
                "header": {
                    "version": {
                        "block": "11",
                        "app": "4294967296"
                    },
                    "chain_id": "localnet",
                    "height": "1095",
                    "time": "2023-03-01T07:52:55.02685Z",
                    "last_block_id": {
                        "hash": "8B1D0CA3930C84AA83127006F023F58636C9B7AB208B13CC89487DE4319E2B5C",
                        "parts": {
                            "total": 1,
                            "hash": "9822070631411D2EDF8CBB1210C47EA5B2BB5873FC88DC23017F9D148E184529"
                        }
                    },
                    "last_commit_hash": "E612B34F93449AC5B3FBC060BE353673760D453A3B36F60E17ABF5C23CB8CBF2",
                    "data_hash": "B19689C3DB8D5144E77084C717293C2AECFADA432B775784A83F6D7F6AD0C4A6",
                    "validators_hash": "8848F26A69AF34431CC233A408276D047328F60199895F160E678F133F004DBB",
                    "next_validators_hash": "8848F26A69AF34431CC233A408276D047328F60199895F160E678F133F004DBB",
                    "consensus_hash": "048091BC7DDC283F77BFBF91D73C44DA58C3DF8A9CBC867405D8B7F3DAADA22F",
                    "app_hash": "BA91F41C30A6A9D1A2160AE45CE2D0A379A25EED6A2FF4EE022018C7B13490C5",
                    "last_results_hash": "CCEC9736296570B1A5CA9F69D56AE286E473BDE1950EB97B419259C2DA071637",
                    "evidence_hash": "E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855",
                    "proposer_address": "7BA6CA35C656795F44DFF8862D6BF586FD13BBB8"
                },
                "data": {
                    "txs": [
                        "CAEQ+NeBtIGKj6QXGAwiFEm8JzC96QwZ94ltfTuCmlA8deNSKhQGFlJNfKhf5ZtTgMsHseHEvUmSTTICA1Y6AQpAAVJBWMNXPPmqIib49R3dshVwSU0JKaQftagSnbISphShV/QVSm2bLbFCb3J6itx6YCn+jJDnreFaOj+OCXx7pB62cgA=",
                        "CAEQqMWCtIGKj6QXGAwiFCzNRcOIaQmo8UiITzpIBaE6Zvp0KhTpmoObMGwDDIguAbBwUL3RD4EA3TICA1Y6AQpAAVJBdHxHk/uBIScM3w38v8oZhVoA6Q24PiL/dLRzoqrqih9vXJzNyX2N4olyHwMmMvNxaMeV2BrmPF1RiJsAzfxSDQA=",
                        "CAEQwLeEtIGKj6QXGAwiFCXnKywRBXHSumMP4IIQTtYwtLCYKhTTyvXTr23a755fS2uTvuMvg72ZHTICA1Y6AQpAAVJBoTw9S4bFk+CngX3wiJzAooO/Emr6P0QS65GDC2a9myhs8VSpV6A48MnZ/4GDpx5xN+OozoMgkWkM2lYLSNQGaAA=",
                        "CAEQ6POutYGKj6QXGAwiFFPf0v1o8Nht70SsMBUs1mDKPNtUKhRdBlEtsGE5UP2Dt+GQIruGE9CpPzICA1Y6AQpAAVJBsouVIpQ1wtHY5hNoWPCzrfSi/0Ki0IygqAbv9l46yudJHxiThrgmgwfN8GeSh4ii6PC8RvRur2TDgd4F8zzFeAE=",
                        "CAEQyJLBtoGKj6QXGAwiFHSyVaZv7Y02CVjR+tebd9vtI3jiKhSHOxzcP6bUaTruZisKZiSev9XuADICA1Y6AQpAAVJBwMmwGPeITg8lTGEx2FC8QmLDL5UMnRaeDutsNb8Q0tQtucLIUEas7lb2uqpxW66vnyNS7XgKaE8GGcJCshCiVwE=",
                        "CAEQ4OGeuIGKj6QXGAwiFIdcsCqtwPJPA11FPeHcvSFCIqPcKhTUNd8mkzuGpmRM4FazPcaQGFhkBjICA1Y6AQpAAVJBOqTOipa6U6rke7WtHKkfn2JRbxIPI66wZ1upS1W+zKlSiz6R+J/1GZgXnCO3+4ommcP1apdHaT/fP3hx/aFCCAA=",
                        "CAEQiN20uYGKj6QXGAwiFIqGCfyxYt3OZw5kcNRe+oln+R4HKhRpSjuhkCWR9hXgUxOSYy5Af2Q4ZDICA1Y6AQpAAVJBGXxpK+dBzngR3u+e+iWhdMY6ctlLbDuzOEgBlwWczM8WekE6T2Aql5n+9fMOVa8+uz1DsQJrizIf7XCE1mFumgE=",
                        "CAEQ2JLPuoGKj6QXGAwiFM3rjioS3TGAaj/dsk43A5aFYUXUKhQFW3eIQmqcqPkMjcAR3v5xx8YUizICA1Y6AQpAAVJBwb3OjXPnLikTpNOu5k9k5MM0knSitYXi9L7kGwiLrMw3hLEVpaQ8+lUrjS1p+g4L/+77xnA2YppniWJQ4iGu+wE=",
                        "CAEQgPznvIGKj6QXGAwiFPDsQNY5KT3yMmvTKOO9DEbOSazHKhR8MuGWrneKsWy4yO5D4NhIZ9x11DICA1Y6AQpAAVJBhLSVp7Ngp6Hm5XFT2fnRUXIUjTpo9gp+QwucTkG+TJ40/EgjHtP9XTELMxFtNSWY+8oQo4fVEwdkj+0LDM6gGAA="
                    ]
                },
                "evidence": {
                    "evidence": []
                },
                "last_commit": {
                    "height": "1094",
                    "round": 0,
                    "block_id": {
                        "hash": "8B1D0CA3930C84AA83127006F023F58636C9B7AB208B13CC89487DE4319E2B5C",
                        "parts": {
                            "total": 1,
                            "hash": "9822070631411D2EDF8CBB1210C47EA5B2BB5873FC88DC23017F9D148E184529"
                        }
                    },
                    "signatures": [
                        {
                            "block_id_flag": 2,
                            "validator_address": "7BA6CA35C656795F44DFF8862D6BF586FD13BBB8",
                            "timestamp": "2023-03-01T07:52:55.02685Z",
                            "signature": "MlezkFjgKwqJ8SNpMW2ROnkxzUTRLdKkZ0tDlWUFkaUxRw9yfpBNcy7ngcwOgBXeaZPaUj1rMVoWDJg/JTNKrw=="
                        }
                    ]
                }
            },
            "result_begin_block": {},
            "result_end_block": {
                "validator_updates": []
            }
        }
    },
    "events": {
        "tm.event": [
            "NewBlock"
        ]
    }
}
```

`NewBlockHeader` 이벤트는 다음과 같다.
```json
{
    "query": "tm.event='NewBlockHeader'",
    "data": {
        "type": "tendermint/event/NewBlockHeader",
        "value": {
            "header": {
                "version": {
                    "block": "11",
                    "app": "4294967296"
                },
                "chain_id": "localnet",
                "height": "92175",
                "time": "2023-02-13T13:27:58.840771Z",
                "last_block_id": {
                    "hash": "525B7E1B39ABFF6643D5CA0AF2B4C080AA69B8F6E6B88F5D96FA1C4B669EDA57",
                    "parts": {
                        "total": 1,
                        "hash": "518791BB1F931395B3036C8E9AEC40E92498FE30A582F8DF871790A6A48CCD33"
                    }
                },
                "last_commit_hash": "CC16D8C757360897B9682646F2D910ECC77A2A80EED54AE06D0539E365B77164",
                "data_hash": "E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855",
                "validators_hash": "FE36DFA0965A3207F370004FD5A35B0D9CFE22C1E5EC6282B11E0A078E022C11",
                "next_validators_hash": "FE36DFA0965A3207F370004FD5A35B0D9CFE22C1E5EC6282B11E0A078E022C11",
                "consensus_hash": "048091BC7DDC283F77BFBF91D73C44DA58C3DF8A9CBC867405D8B7F3DAADA22F",
                "app_hash": "F05DE653A484B266512480747A80522450D9241D3AE43E5FB49FBB6613FB07CF",
                "last_results_hash": "E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855",
                "evidence_hash": "E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855",
                "proposer_address": "8DC41A86B91EB88D82489C4D037AE9FFCA65CFBF"
            },
            "num_txs": "0",
            "result_begin_block": {},
            "result_end_block": {
                "validator_updates": []
            }
        }
    },
    "events": {
        "tm.event": [
            "NewBlockHeader"
        ]
    }
}
```




#### Transaction event

```ts
// 
// 트랜잭션 hash 'A7FC574491B18ADD8E3DD60E7442CB34D90A4862E30E9E9B5412154EBFB0E100' 인 
// 트랜잭션 처리완료 이벤트 구독 요청
var sub = new Subscriber("ws://localhost:26657/websocket", "tm.event = 'Tx' AND tx.hash='A7FC574491B18ADD8E3DD60E7442CB34D90A4862E30E9E9B5412154EBFB0E100'")
sub.start( resp => console.log(resp) )
```

```ts
// 트랜잭션 타입이 'transfer' 이고, 
// sender 주소가 'D8C2C3D121696F51B733F7CF36C8AE60F8F264CC' 인 
// 트랜잭션 처리완료 이벤트 구독 요청.
var sub = new Subscriber("ws://localhost:26657/websocket", "tm.event = 'Tx' AND tx.type='transfer' AND tx.sender='D8C2C3D121696F51B733F7CF36C8AE60F8F264CC'")
sub.start( resp => console.log(resp) )
```

```ts
// 트랜잭션 타입이 'transfer' 이고, 
// sender 주소가 'D8C2C3D121696F51B733F7CF36C8AE60F8F264CC' 인 
// 트랜잭션 처리완료 이벤트 구독 요청.
var sub = new Subscriber("ws://localhost:26657/websocket", "tm.event = 'Tx' AND tx.type='transfer' AND tx.sender='D8C2C3D121696F51B733F7CF36C8AE60F8F264CC'")
sub.start( resp => console.log(resp) )
```

`Tx` 이벤트는 다음과 같이 수신된다.
```json
{
    "query": "tm.event = 'Tx'",
    "data": {
      "type": "tendermint/event/Tx",
      "value": {
        "TxResult": {
          "height": "1922",
          "index": 8,
          "tx": "CAEQ+PWi4Oiij6QXGMMEIhRJvCcwvekMGfeJbX07gppQPHXjUioU6he992wc+owCVAD1IOCgA4H8vegyAgNWOgEKQAFSQR9I4zu2O1WrdzIRLA1M4o12sd0fyHE6EtpX6i5UjIBoZKlzqOvxYZJr47OSeqYooNIi2R3w1gtnRsEJQFtyxVoA",
          "result": {
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
                    "value": "NDlCQzI3MzBCREU5MEMxOUY3ODk2RDdEM0I4MjlBNTAzQzc1RTM1Mg==",
                    "index": true
                  },
                  {
                    "key": "dHgucmVjZWl2ZXI=",
                    "value": "RUExN0JERjc2QzFDRkE4QzAyNTQwMEY1MjBFMEEwMDM4MUZDQkRFOA==",
                    "index": true
                  },
                  {
                    "key": "dHguYWRkcnBhaXI=",
                    "value": "NDlCQzI3MzBCREU5MEMxOUY3ODk2RDdEM0I4MjlBNTAzQzc1RTM1MkVBMTdCREY3NkMxQ0ZBOEMwMjU0MDBGNTIwRTBBMDAzODFGQ0JERTg=",
                    "index": true
                  }
                ]
              }
            ]
          }
        }
      }
    },
    "events": {
      "tx.hash": [
        "F30CCD5DCDB98F876698D82B17A003CB9ED8E20F59807242B116A3BD1322D6B6"
      ],
      "tx.height": [
        "1922"
      ],
      "tx.type": [
        "transfer"
      ],
      "tx.sender": [
        "49BC2730BDE90C19F7896D7D3B829A503C75E352"
      ],
      "tx.receiver": [
        "EA17BDF76C1CFA8C025400F520E0A00381FCBDE8"
      ],
      "tx.addrpair": [
        "49BC2730BDE90C19F7896D7D3B829A503C75E352EA17BDF76C1CFA8C025400F520E0A00381FCBDE8"
      ],
      "tm.event": [
        "Tx"
      ]
    }
}
```