# rweb3


## 사용법

RWeb3는 가져와야 하는 주요 클래스이며, `RWeb3Context`를 확장합니다.

```js
import { RWeb3 } from '@rigochain/rweb3'

const rweb3 = new RWeb3('지급자 url of rigo');

// 예상 사용법 (testnet)
// let rweb3 = new RWeb3("https://rpc1.testnet.rigochain.io");
// let rweb3 = new RWeb3("wss://rpc1.testnet.rigochain.io") 


// 계정들
let rweb3Account = rweb3.rigo.accounts.create();


// rpc 방법들
const blockResponse: BlockResponse = await rweb3.rigo.block();


// 계약들
const contract = new rweb3.rigo.Contract(abi, address);
const contractMethod = contract.methods.methodName();


```

RWeb3은 제공자 url로 초기화 되고, 없으면 콘솔에 경고가 기록됩니다 - "참고: rweb3.js가 제공자 없이 실행 중입니다. 네트워크와 상호 작용하려면 제공자를 전달해야 합니다!".

# 요약

* [rigo_rpc_methods](./rigo_rpc_methods_kr.md)
* [trx_pb_kr.md](./trx_pb_kr.md)

### 속성들

- `version` 현재 패키지의 버전입니다.
- `rigo` `RWeb3RigoInterface`의 인스턴스입니다.

- `utils` `@rigochain/rweb3-utils`의 인스턴스입니다.  [utils_kr.md](../rweb3-utils/README_kr.md)

### RWeb3RigoInterface

`RWeb3` 클래스의 `rigo` 속성은 다음 속성들을 공개합니다 - `계정들`, `계약` 그리고 `abi`.

- `계정들` 컨텍스트를 위한 계정을 초기화합니다.
- `계약` 계약 컨텍스트를 시작하는 생성자입니다.
- `abi` 스마트 계약을 위한 응용 프로그램 바이너리 인터페이스를 제공합니다.
