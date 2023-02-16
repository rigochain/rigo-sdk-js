# Data structures

## NewBlock event

```json
{
  "block_id": {
    "hash": "18711607956F44E83677F90D1BEEDCD5EA44BB27CBFB382A4DA64EE06189343D",
    "parts": {
      "total": 1,
      "hash": "F1D3B921EFD098157598A810DC6CB0C04D3AA475B293D23F15B1FC2073C44774"
    }
  },
  "block": {
    "header": {
      "version": {
        "block": "11",
        "app": "4294967296"
      },
      "chain_id": "localnet",
      "height": "79040",
      "time": "2023-02-13T04:56:07.98802Z",
      "last_block_id": {
        "hash": "6021C2A2CD2438FF61CE476B76D97997E6AE19AB30BCDE40C4BB7137F53AC30E",
        "parts": {
          "total": 1,
          "hash": "2F35010188F2F313F00B9374E329A71249ECDEEBA5E5ADBD2BDAE386DC3101B2"
        }
      },
      "last_commit_hash": "BA6B2B6E9A4603C86F5DDE683E63C48DC3EBD83EEBEB63D1D70DE694443884C5",
      "data_hash": "E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855",
      "validators_hash": "FE36DFA0965A3207F370004FD5A35B0D9CFE22C1E5EC6282B11E0A078E022C11",
      "next_validators_hash": "FE36DFA0965A3207F370004FD5A35B0D9CFE22C1E5EC6282B11E0A078E022C11",
      "consensus_hash": "048091BC7DDC283F77BFBF91D73C44DA58C3DF8A9CBC867405D8B7F3DAADA22F",
      "app_hash": "0E1AD984FD0FE8A1B2C4B0D23A610C9787F56D563BF8157C188E99BA4064D852",
      "last_results_hash": "E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855",
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
      "height": "79039",
      "round": 0,
      "block_id": {
        "hash": "6021C2A2CD2438FF61CE476B76D97997E6AE19AB30BCDE40C4BB7137F53AC30E",
        "parts": {
          "total": 1,
          "hash": "2F35010188F2F313F00B9374E329A71249ECDEEBA5E5ADBD2BDAE386DC3101B2"
        }
      },
      "signatures": [
        {
          "block_id_flag": 2,
          "validator_address": "8DC41A86B91EB88D82489C4D037AE9FFCA65CFBF",
          "timestamp": "2023-02-13T04:56:07.98802Z",
          "signature": "fZSeqx8Ut+6yfoPl3bN5uX8hCF7p8i9H1a73EyOcdExH70SYmmqiybdFym64kImk2oW868R+8lI/ulYj3Uu0Xg=="
        }
      ]
    }
  }
}
```


## NewBlockHeader event

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

## Transaction

### Trx

```ts
interface Trx {
  hash?: string;
  version?: number;
  time?: Date;
  nonce?: number;
  from: string;
  to: string;
  amount: string;
  gas: string;
  type?: number;
  payload?: object|TrxPayloadUndelegating;
  sig?: string;
}
```

### Protobuf messages

```protobuf
message TrxProto {
  uint32 version = 1;
  int64 time = 2;
  uint64 nonce = 3;
  bytes from = 4;
  bytes to = 5;
  bytes _amount = 6;
  bytes _gas = 7;
  int32 type = 8;
  bytes _payload = 9;
  bytes sig = 10;
}

message TrxPayloadStakingProto {}

message TrxPayloadUnstakingProto {
  bytes tx_hash = 1;
}

message TrxPayloadExecContractProto {
  bytes _code = 1;
}

message TrxPayloadProposalProto {
  string message = 1;
  int64 start_voting_height = 2;
  int64 voting_blocks = 3;
  int32 opt_type = 4;
  repeated bytes options = 5;
}

message TrxPayloadVotingProto {
  bytes tx_hash = 1;
  int32 choice = 2;
}
```

### ARCANEX Wallet Format (AWF)
```json
{
  "version": "1",
  "address": "8DC41A86B91EB88D82489C4D037AE9FFCA65CFBF",
  "algo": "secp256k1",
  "cp": {
    "ca": "aes-256-cbc",
    "ct": "zL2fwrCM4gqlkqL8UZuCCP02oJpjNtKiN9+A30naJhguHYlL+BiPqWYz90r/QHpU",
    "ci": "Pz7lnrRweRJRY5n7so0/0g=="
  },
  "dkp": {
    "ka": "pbkdf2",
    "kh": "sha256",
    "kc": "20205",
    "ks": "zfJuR9h9pD3iB9OGDUCw5pJP5xZWxKtb41iJTGhHBeQ=",
    "kl": "32"
  }
}
```

- `version`:
- `address`: 계정 주소.
- `algo`: ECDSA curve 이름. (현재는 무조건 'secp256k1' 사용)
- `cp`: Private Key 암호화 알고리즘 및 암호화 결과.
  - `ca`: Private key 암호화시 사용한 대칭키 암호화 알고리즘.
  - `ct`: Private key 를 암호화 하고 이를 다시 base64로 인코딩한 값.
  - `ci`: Private key 암호화시 사용한 IV의 base64로 인코딩된 값.
- `dkp`: Private Key 암호화시 사용한 암호화키 유도를 위한 정보.  
사용자 입력 비밀번호 기반 암호화키 유도 방식으로 암호화 된 경우 필요하다.
모바일 디바이스의 보안 영역을 통해 암호화 키를 관리할 경우, 필요 없을 수 있다.
  - `ka`: 대칭키 유도 알고리즘.
  - `kh`: 대팅키 유도에 사용한 해시 알고리즘.
  - `kc`: 해시 반복 횟수.
  - `ks`: 키유도시 사용된 salt 의 base64 인코딩 값.
  - `kl`: 바이트 단위의 키 길이.