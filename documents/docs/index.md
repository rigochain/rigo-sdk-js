## Overview

```plantuml
@startuml
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Component.puml

Container_Boundary(app, "Application") {
    Component(app0, "Components of application", "js")
    Component(sdk, "rigo-sdk-js", "js")

    Rel_U(sdk, app0, "Events", "Push events from RIGO Node")
    Rel_D(app0, sdk, "Call APIs", "Query, Tx publishing and Subscribing to events from RIGO network ...")
}
Container(node, "RIGO Node")
Rel_R(sdk, node, "RPC", "HTTP/JSONRPC")
Rel_L(node, sdk, "Events", "Websocket")
@enduml
```

블록체인을 활용하는 모든 응용 프로그램 또는 서비스는 블록체인 네트워크와 연결되어 다양한 정보를 요청하고 이에 대한 응답을 수신/처리 함으로서 구현 된다.  
RIGO 노드는 이러한 기능을 제공하기 위하여 HTTP/JSONRPC 기반의 서버 시스템을 포함하고 있으며, 
이를 활용하여 월렛, 블록 탐색기(Block Explorer) 등과 같은 다양한 응용 프로그램 및 서비스를 개발 할 수 있다.  
그러나 RIGO 노드가 제공하는 RPC를 직접 호출하는 것은 경우에 따라 매우 번거로운 작업이 될 수도 있다. 
블록체인 네트워크에 트랜잭션을 제출 하기 위한 작업과 같은 경우가 그러하다.    
트랜잭션을 제출하기 위해서는 우선 트랜잭션을 생성하고 이를 적절한 방식(Protobuf v3) 으로 인코딩 한 후, JSONRPC 요청으로 포함하여 전송하여야 하는데,
여기에는 RIGO 노드를 포함하여 모든 서비스/응용 프로그램에서 공통적으로 그리고 결정론적으로 정확하게 일치 되어야 과정이 포함된다.

이와 같이 RIGO 노드와의 통신을 포함하여 모든 응용 프로그램 및 서비스가 공통적으로 구현해야할 모듈 또는 기능 집합을
Javascript 환경에서 사용할 수 있는 라이브러리 형태로 구현한 것이 `rigo-sdk-js` 이다.

`rigo-sdk-js` 는 RIGO 노드로의 JSONRPC 요청과 이에 대한 응답 수신을 통해 다음과 같은 기능을 수행하는 API 집합을 제공한다.

---

## Features

### Account management

- `Account` 생성
- `Account` 가져오기
- `Account` 내보내기

Account 관련 기능에 대한 자세한 사항은 [Account](api/account.md) 를 참조 한다.

### Query state
블록체인에 기록된 다음과 같은 정보를 조회 한다.

- 블록 및 트랜잭션.
- 계정의 잔액 및 nonce.
- Validator 계정 목록 및 지분 정보.
- 위임 받은 계정 목록 및 지분 정보.
- 거버넌스 규칙.

조회 기능에 대한 보다 자세한 사항은 [RWeb3 API](api/rweb3.md) 를 참고한다.

### Build and send transactions

특정 기능을 수행하는 트랜잭션을 구성하고 블록체인 네트워크에 제출 한다.  
현재 RIGO 에서 제공하는 트랜잭션 종류는 다음과 같다.

- Transfer
- Staking
- Unstaking
- Governance Rule Proposal
- Voting to proposal

트랜잭션 발행에 대한 보다 자세한 사항은 [TrxBuilder API](api/trxbuilder.md) 를 참고한다.

### Subscribing to events

RIGO 네트워크에서 발생되는 상태 변경 사항을 이벤트 구독 형식으로 수신할 수 있다.  
이벤트 구독은, RIGO 노드와 websocket 연결 생성, 구독 조건을 명시한 쿼리문 전송 으로 이루어지고,  
구독 조건에 맞는 이벤트 발생시 websocket 연결을 통해 실시간으로 해당 이벤트를 수신 할 수 있다.

`rigo-sdk-js` 는 RIGO 네트워크에서 발생하는 다양한 이벤트의 실시간 구독을 위한 API 를 제공한다.
이에 대한 자세한 사항은 [Event API](api/subscriber.md)를 참고한다.