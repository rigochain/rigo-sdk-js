# Rigo SDK for JavaScript


## 시작하려면

```plantuml

import rweb3 from '@rigochain/rweb3';

let rweb3 = new RWeb3("https://rpc1.testnet.rigochain.io");
// let rweb3 = new RWeb3("wss://rpc1.testnet.rigochain.io") 

rweb3.rigo.netInfo().then(function(result) {
        console.log(result);
    });

setTimeout(async function() {
    let response = await rweb3.rigo.netInfo();
}, 1000);


```
블록체인을 활용하는 모든 애플리케이션 또는 서비스는 블록체인 네트워크와 연결하여 다양한 정보를 요청하고 응답을 받아 처리하는 방식으로 구현됩니다.  
RIGO 노드는 이러한 기능을 제공하기 위해 HTTP/JSONRPC 기반의 서버 시스템을 포함하고 있으며,
지갑, 블록 탐색기 등 다양한 애플리케이션과 서비스의 개발에 활용될 수 있습니다.  
그러나 RIGO 노드가 제공하는 RPC를 직접 호출하는 것은 일부 경우에 매우 번거로울 수 있습니다.
이는 블록체인 네트워크에 트랜잭션을 제출하려는 경우에 해당합니다.  
프로토콜을 통해 거래 전달을 위해 생성 및 적절한 방식(Protobuf v3)으로 인코딩한 후 JSONRPC 요청으로 보내야 하며,
RIGO 노드를 포함한 모든 서비스/응용 프로그램에서 올바르게, 결정적으로, 일관되게 매치되어야 하는 과정을 필요로 합니다.

이처럼, RIGO 노드와의 통신을 포함하여 모든 응용 프로그램과 서비스가 공통으로 구현해야 하는 모듈 또는 함수 집합은 JavaScript 환경에서 사용할 수 있는 라이브러리로 정의될 수 있습니다.
`rigo-sdk-js`의 구현은 Javascript 환경에서 사용할 수 있는 라이브러리입니다.

---

# 요약

* [rweb3](rweb3/README_kr.md)
* [rweb3-provider](rweb3-provider/README_kr.md)
* [rweb3-rigo](rweb3-rigo/README_kr.md)
* [rweb3-rigo-accounts](rweb3-rigo-accounts/README_kr.md)
* [rweb3-utils](rweb3-utils/README_kr.md)

## 특징


### Rpc Method List [rigo_rpc_methods](rweb3/rigo_rpc_methods_kr.md)

정해진 높이나 식별자를 가진 특정 블록에 대한 정보를 가져옵니다.

- **health** : Rigo Chain의 운영 건강 상태 및 준비 상태를 확인하여 모든 구성 요소가 예상대로 작동하는지 확인합니다.

- **status** : 현재의 작동 메트릭스와 상태를 포함한 Rigo Chain의 포괄적인 상태 보고서를 가져옵니다.

- **netInfo** : 연결된 피어, IP 주소, 그 외 관련 데이터를 포함한 네트워크에 관한 자세한 정보를 제공합니다.

- **blockchain** : minHeight와 maxHeight 매개변수에 기반을 둔 블록체인 정보 범위를 가져옵니다.

- **block** : 특정 블록에 대한 정보를 가져옵니다.

- **blockByHash** : 고유한 블록 해시를 사용하여 자세한 블록 정보를 가져올 수 있게 합니다.

- **blockResults** : 특정 블록의 트랜잭션과 관련된 결과 및 결과를 가져옵니다.

- **commit** : 특정 높이에서의 블록에 대한 커밋 데이터(서명 및 검증자 같은 것)를 가져옵니다.

- **validators** : 높이, 페이지네이션, 필터링과 같은 특정 기준에 따라 현재 검증자를 나열합니다.

- **genesis** : 체인의 첫 블록인 생성 블록에 대한 자세한 데이터를 제공합니다.

- **genesisChunked** : 데이터 크기 제약이 있는 시스템에 유용한, 생성 블록 데이터를 더 작고, 관리하기 쉬운 청크로 제공합니다.

- **dumpConsensusState** : Rigo Chain의 현재 합의 상태를 스냅샷 또는 덤프로 제공합니다.

- **consensusState** : 현재 사용 중인 합의 메커니즘의 상태를 가져옵니다.

- **consensusParams** : 주어진 높이에서 합의를 지배하는 특정 매개변수를 가져옵니다.

- **unconfirmedTxs** : 아직 확인되지 않은 트랜잭션을 지정한 제한까지 나열합니다.

- **txSearch** : 특정 기준과 인자에 따른 고급 거래 쿼리를 허용합니다.

- **tx** : 고유한 해시를 사용하여 트랜잭션의 자세한 정보를 가져옵니다.

- **contractAddrFromTx** : 특정 트랜잭션 해시와 관련된 계약 주소를 결정하고 가져옵니다.

- **abciInfo** : 사용 중인 Application BlockChain Interface (ABCI)에 대한 정보를 제공합니다.

- **abciQuery** : 사용자가 ABCI를 사용하여 특정 쿼리를 실행하도록 허용합니다.

- **checkTx** : 거래를 검증하여 송신 전에 합법성 및 설정된 규칙을 준수하는지 확인합니다.

- **numUnconfirmedTxs** : 방송되었으나 아직 확인 대기 중인 거래의 총 수를 가져옵니다.

- **broadcastEvidence** : 네트워크의 악의적인 활동이나 위반에 관련된 증거를 방송하는 것을 허용합니다.

- **broadcastTxSync** : 거래를 즉시 네트워크에 방송하고 동기적으로 응답을 기다립니다.

- **broadcastTxAsync** : 즉각적인 응답을 기다리지 않고 거래를 네트워크에 전송하여 방송합니다.

- **broadcastTxCommit** : 거래를 방송하고 블록에 커밋되기를 기다립니다.

- **broadcastRawTxSync** : 원시(비표준 형식) 거래를 즉시 동기적으로 방송합니다.

- **broadcastRawTxAsync** : 원시 거래를 비동기 방송을 위해 전송합니다.

- **broadcastRawTxCommit** : 원시 거래를 방송하고 블록에 커밋되기를 기다립니다.

- **delegatee** : 네트워크의 특정 위임자에 대한 정보를 가져옵니다.

- **rule** : 체인 내에 설정된 규칙이나 지배 원칙을 가져옵니다.

- **getAccount** : 특정 계정에 대한 자세한 데이터를 제공합니다. 이 데이터에는 잔액, 거래, 그외 연관된 데이터가 포함됩니다.

- **proposals** : 네트워크 내에서 제기된 현재 및 과거 제안을 나열합니다.

- **stakes** : 검증자의 지분 및 보상을 포함한 지분량에 대한 정보를 가져옵니다.

- **vmCall** : 가상 머신에 각 호출을 실행하여 스마트 계약 실행과 같은 작업을 허용합니다.

- **subscribe** : 웹소켓 제공자를 사용하는 사람들에게 한정하여 쿼리를 기반으로 특정 이벤트나 데이터 변화를 구독하도록 허용합니다.

- **subscribeNewBlock** : 새롭게 채굴되거나 생성된 블록에 대한 실시간 업데이트와 구독을 제공합니다. 웹소켓 제공자 사용자에게 한정되어 있습니다.

- **subscribeNewBlockHeader** : 구독자에게 새 블록 헤더에 대한 즉시 업데이트를 제공합니다. 가벼운 클라이언트와 웹소켓 제공자 사용자에게 유용합니다.

- **subscribeTx** : 사용자가 특정 거래 또는 모든 네트워크 거래에 대한 실시간 업데이트를 받을 수 있도록 허용합니다. 웹소켓 제공자 사용자에게 한정되어 있습니다.


### Node Provider ([rweb3-provider](3%20rweb3-provider/README_kr.md))

`rweb3-provider`는 `web3.js`의 제공자 기능에서 영감을 받아 Rigo 노드와의 연결을 설정하고 관리하는 모듈입니다.


### Account management ([rweb3-rigo-accounts](5%20rweb3-rigo-accounts/README_kr.md))

`rweb3-rigo-accounts`는 rweb3 생태계 내에서 Rigo 계정 작업, 예를 들어 생성, 관리, 및 트랜잭션 서명 처리를 처리하는 모듈입니다.



### Utils ([rweb3-utils](7%20rweb3-utils/README_kr.md))

`rweb3-utils`는 rweb3 생태계 내의 유틸리티 모듈로, Rigo 관련 작업과 개발을 간소화하기 위해 도우미 함수와 도구들의 컬렉션을 제공합니다.


### Types ([rweb3-types](6%20rweb3-types/README_kr.md))

`rweb3-types`는 Rigo 개발 과정에서 사용되는 데이터 구조와 타입을 정의하고 관리하는 rweb3 생태계의 모듈로, 일관성과 호환성을 보장합니다.
