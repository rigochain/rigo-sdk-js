# HttpProvider

### 개요
**@rigochain/rweb3**의 `provider`는 RIGO 네트워크와의 연결을 활성화하는 개체입니다. 트랜잭션을 보내고, 데이터를 쿼리하고,
네트워크의 여러 기능들과 상호 작용하려면 웹 애플리케이션을 `RIGO 노드`에 연결하는 것이 필요합니다. 아래 코드를 통해 `provider`를 통해 
`RIGO 노드`에 연결하는 예시를 설명합니다.

### 시작하기
```Typescript
import { RWeb3 } from '@rigochain/rweb3';
const rweb3 = new RWeb3('https://rpc1.testnet.rigochain.io');
```
또는
```Typescript
import { RWeb3, HttpProvider } from '@rigochain/rweb3';
const provider = new HttpProvider('https://rpc1.testnet.rigochain.io');
const rweb3 = new RWeb3(provider);
```
위 코드를 통해서 RIGO 노드와 상호 작용이 가능한 `@rigochain/rweb3`의 `provider`를 생성할 수 있습니다.

### provider 변경하기
```Typescript
import { RWeb3 } from '@rigochain/rweb3';
const rweb3 = new RWeb3('https://rpc1.testnet.rigochain.io');
rweb3.setProvider('https://rpc2.testnet.rigochain.io');
```

### httpProviderOptions
`HttpProvider`는 provider 생성 시 `provider URL`과 선택적으로 `httpProviderOptions`을 입력받습니다:

```Typescript
const httpProviderInstance = new HttpProvider(clientUrl, httpProviderOptions);
```

httpProviderOptions 인터페이스는 아래와 같습니다.
```Typescript
const httpProviderOptions = {
    providerOptions: {
        body: undefined,
        cache: 'force-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        integrity: 'foo',
        keepalive: true,
        method: 'GET',
        mode: 'same-origin',
        redirect: 'error',
        referrer: 'foo',
        referrerPolicy: 'same-origin',
        signal: undefined,
        window: undefined,
    } as RequestInit,
};
```
상세한 관련 내용은 [Microsoft github - RequestInit](https://microsoft.github.io/PowerBI-JavaScript/interfaces/_node_modules_typedoc_node_modules_typescript_lib_lib_dom_d_.requestinit.html)
페이지를 참고하세요.