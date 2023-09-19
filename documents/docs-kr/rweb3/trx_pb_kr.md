# rweb3 trx pb

## Protobuf 패키지

현재 protobuf 패키지는 "types"라는 이름으로 제공됩니다.

## Protobuf 메시지

1. TrxProto - 버전, 시간, nonce, 보내는 사람, 받는 사람, 금액, 가스, 유형, 페이로드, sig 등 다양한 필드를 가지고 있습니다.
2. TrxPayloadStakingProto - 중요한 필드를 포함하고 있지 않습니다.
3. TrxPayloadUnstakingProto - txHash라는 단일 필드를 포함합니다.
4. TrxPayloadExecContractProto - Code라는 하나의 필드를 포함합니다.
5. TrxPayloadProposalProto - 메시지, startVotingHeight, votingBlocks, optType, options 등 여러 필드를 포함합니다.
6. TrxPayloadVotingProto - txHash 및 choice 필드를 포함합니다.
7. TrxPayloadContractProto - data라는 하나의 필드를 포함합니다.

## Protobuf 메시지 인코딩 및 디코딩

각 protobuf 메시지에 대한 인코딩 및 디코딩 함수는 각각의 메시지 문서에 명시되어 있습니다.

## Protobuf 메시지 JSON 변환

각 protobuf 메시지는 JSON 데이터를 메시지로 변환하거나 메시지의 데이터를 JSON으로 변환하는 함수를 가지고 있습니다.

## 도움이 되는 함수들

이진 데이터의 읽기 및 쓰기를 최적화하기 위해 base64 문자열을 바이트 배열로 변환하고 그 반대의 변환을 수행하는 도움이 되는 함수들이 있습니다.

## 브라우저 호환성

다양한 환경에 대한 전역 변수 참조가 설정되어 있습니다: modern 브라우저에 대한 globalThis, 웹 및 서비스 워커에 대한 self, 브라우저에서 window, Node.js에서는 global.

## Long.js 라이브러리

Long.js 라이브러리는 JavaScript가 53비트 정수만 지원하기 때문에 64비트 정수를 처리하는데 사용됩니다. Long.js 라이브러리의 구현이 예상과 다르다면, 올바른 구현으로 덮어씁니다.

## 유틸리티 함수들

설정 값이 있는지 없는지 확인하고 TypeScript로 타입 안전성을 제공하는 유틸리티 함수들이 있습니다.