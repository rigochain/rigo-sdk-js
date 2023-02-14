# Overview

이 문서는 ARCANEX Blockhcain 의 Block Explorer 인 **ArcaScan** 에 대한 구성 요구사항 및 기능 요구사항에 대하여 기술한다.

```plantuml
@startuml
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Component.puml

Container_Ext(browser, "Browser")
System_Boundary(explorer, "Block Explorer") {
    Container(fe, "FrontEnd")
    Container(be, "BackEnd") {
        Component(bzl, "Biz. Logic")
        Component(sdk, "SDK")
    }
    
    Container(db, "Database")
}
Container(node, "ARCANEX Node")

BiRel_R(browser, fe, "Request", "HTTP/HTTPS")
Rel_D(fe, bzl, "API", "")
Rel_R(bzl, sdk, "API", "")
Rel_D(bzl, db, "CRUD", "")
BiRel_R(sdk, node, "RPC", "HTTP/JSONRPC, Websocket")
@enduml
```

ArcaScan 은 ARCANEX 네트워크에서 생성되는 블록, 트랜잭션 그리고 계정 관련 상태 정보를
실시간으로 사용자에게 제공하기 위한 웹 서비스 시스템이다.  

일반적인 Block Explorer 시스템은 블록체인 노드에 접속하여 필요한 정보를 획득 하고, 
이를 적절한 구조로 변형하여 Database 에 저장하고,
사용자로 부터 요청을 수신하였을 때, 이 Database 에 저장된 정보를 조회 하여 응답을 구성한다.  
ArcaScan 은 이벤트 구독 방식으로 ARCANEX 네트워크에서 발생하는 정보를 획득 한다.
ARCANEX 노드로 Websocket 연결을 생성하고, 
이 연결을 통해 [이벤트 쿼리문](../../subscriber.md#event-query)을 포함한 구독 요청 메시지를 전송함으로서 실시간으로 이벤트를 수신 할 수 있다.
이벤트 구독 대한 자세한 사항은 [Event Subscribe](../../subscriber.md)를 참조한다.

이벤트 구독을 통해 수신된 정보는 현재 시점에 대한 정보로 제한된다. (과거 이벤트 정보 수신 불가)  
따라서 과거 시점에 발생한 정보를 조회 하기 위해서는 ARCANEX 노드가 제공하는 RPC 호출을 통해 해당 정보를 획득해야 한다.
ARCANEX RPC 호출을 위한 API 에 대한 자세한 정보는 [ACNet](../../acnet.md) 를 참조한다.



```plantuml
@startuml

!theme cerulean
hide footbox
skinparam ArrowThickness 1
skinparam BackgroundColor white
skinparam participant<<Extern>> {
  BackgroundColor lightblue
}

actor "User" as user
box "ArcaScan"
participant "ArcaScan\nFrontEnd" as fe
participant "ArcaScan\nBackEnd" as be
database "ArcaScan\nDB" as db
participant "arcanex-sdk-js" as sdk
end box

participant "ARCANEX\nNode" as node<<Extern>>


== Event 구독 요청 Context ==

be -> sdk: call subscribing to `NewBlock` events
sdk -> node: subscribing to `NewBlock` events

|||

== Event 수신 Context ==

loop "subscribing to events"
node --> be: event
be --> db: apply event
be --> fe: notify event
fe --> user: update ui (e.g. update block list)
end loop

|||
|||
|||

== 사용자 요청 처리 Context ==

user -> fe: query block by height h
activate fe
fe -> be: request block[h]
activate be
be -> db: read block[h]
activate db
return block[h]
return block[h]
return rendering block details of block[h]
@enduml
```

## Synchronization

### History Synchronization

ArcaScan 이 최초 구동 또는 재구동될 때, 
ArcaScan 의 DB 와 ARCANEX 블록체인은 동기화 되지 않은 상태이다.  
ArcaScan 의 DB 는 블록번호 `bn0` 까지의 정보를 적용한 상태인데,  
ARCANEX 블록체인은 이미 블록번호 `bn1` 까지 생성된 상황이 가능하다.  
때문에 ArcaScan 는 구동 시작시, 
DB에 반영된 마지막 블록 번호(`bn0`)와 
현재 ARCANEX 블록체인의 마지막 블록 번호(`bn1`) 를 조회 하여,
그 사이에 발생한 모든 블록 정보가 DB에 반영(동기화) 되도록 해야 한다.

```plantuml
@startuml

!theme cerulean
hide footbox
skinparam ArrowThickness 1
skinparam BackgroundColor white
skinparam participant<<Extern>> {
  BackgroundColor lightblue
}

box "ArcaScan"
participant "ArcaScan\nFrontEnd" as fe
participant "ArcaScan\nBackEnd" as be
database "ArcaScan\nDB" as db
participant "arcanex-sdk-js" as sdk
end box

participant "ARCANEX\nNode" as node<<Extern>>



par "이벤트 구독"
be -> sdk: call subscribing to event
sdk -> node: subscribing to events of `NewBlock`
end
|||
|||
|||
be -> db: bn0 <- last block height
be -> node: bn1 <- last block height
be -> node: blocks <- query blocks between bn0 + 1 and bn1
be -> db: apply blocks
@enduml
```

!!! note
    ArcaScan 이 구동되지 않은 시간동안 생성된 블록에 대한 정보는 이벤트 구독 방식으로 획득이 불가능하고,
    [블록 관련 RPC 호출을 수행하는 ACNet의 API](../../acnet.md#block)를 호출 하는 것으로만 획득이 가능하다.  
    블록 관련 이벤트 구독 요청 및 응답은 [Block Event](../../subscriber.md#block-event) 를 참조한다.

!!! note
    DB에 반영된 마지막 블록 번호가 `m` 이고, ARCANEX 블록체인의 마지막 블록 번호가 `n, (n>m)` 으로 조회 되었을 경우, 
    블록 `n`까지 블록을 조회 하여 이를 DB에 반영하는 사이에 ARCANEX 네트워크에서 블록 `n+1` 이 생성될 가능성이 있다.  
    이벤트 구독 요청을 먼저 해 두지 않은 경우, 블록 `n+1`은 DB에 적용될 기회를 영원히 잃게 된다.   
    이벤트 구독 요청을 하여 블록 `n+1`을 수신하였더라도, 이를 DB에 반영하는 것은 블록 `n` DB 반영 이후가 되어야 한다.

### Runtime Synchronization



## Block

ArcaScan은 실시간으로 ARCANEX 네트워크에서 생성되는 블록 정보를 구독하여 DB에 저장하고,
이를 이용하여 아래의 사용자 요청을 수행한다.


### Blok Height

최신 블록 번호(Block Height) 가 실시간으로 표시 된다.  
이는 블록 생성 이벤트를 수신할 때 마다 이벤트에 포함된 블록 번호로 사용자 브라우저의 화면을 업데이트 하도록 구현 한다. 

### Block List

블록 번호 역순으로 블록 목록이 20개 단위로 페이징 처리 되어 표시된다.
사용자 브라우저에 최근 블록 목록이 표시되어 있는 경우, 블록 생성 이벤트가 수신될 때 마다 업데이트 되어야 한다.

하나의 블록당 표시되어야 하는 최소 정보는 다음과 같다.

- 블록 번호
- 블록 해시
- 블록 생성 시간
- 블록이 포함하는 트랜잭션 개수

`블록 번호` 와 `블록 해시` 를 선택할 경우, 해당 블록 상세 정보 (Block Detail) 화면 으로 이동 한다.


### Block Detail

블록 상세 정보를 보여 준다.
블록을 조회 할 경우, 다음과 같은 응답을 수신한다.
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
        "txs": []
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

위 응답값 중 최소 다음의 정보가 표시되어야 한다.

- `block.header.height` : 블록 번호
- `block_id.hash`: 블록 해시
- `block.header.version.block` : 블록 버전
- `block.header.chain_id` : 체인 ID
- `block.header.time` : 블록 생성 시간
- `block.header.proposer_address` : 블록 제안자 주소 (Block proposer's address)
- `block.data.txs` : 트랜잭션 목록 (트랜잭션 해시 목록)
- `block.last_commit.hegith` : 이전 블록 번호
- `block.last_commit.block_id.hash` : 이전 블록 해시

### Block Search

Block Explorer 가 제공하는 검색창을 통하여 Block 을 조회할 수 있다.

- By Hash  
블록의 해시값으로 해당 블록을 조회 한다.
조회 결과는 `Block Detail` 화면으로 출력한다.

- By Height
블록 번호로 해당 블록을 조회 한다.
조회 결과는 `Block Detail` 화면으로 출력한다.
 


## Transactions

### Transaction List

- by block height
- by account address

### Transaction Search

- by txhash

## Account
 - by address
 
## Validators

- validators at now
- total delegatees at now
- vaidators at the block height

## Governance

- proposal list at now
- proposal list at the block height
- proposal details (+ voting status and result)