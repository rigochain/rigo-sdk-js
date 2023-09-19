# HttpProvider

## 시작하기
```Typscript
import { HttpProvider } from '@rigochain/rweb3-types';
const provider = new HttpProvider('http://localhost:8545');

let rweb3 = new RWeb3(provider);

또는

let rweb3 = new RWeb3();
rweb3.setProvider(provider);
```

### 개요

이 모듈은 웹3 API 명세를 사용한 통신을 허용하는 HTTP Provider를 제공합니다. 요청 처리와 간편한 클라이언트 URL 관리 기능이 포함되어 있습니다.

### Import 문

`HttpProvider` 클래스와 `HttpProviderOptions`은 import 문을 통해 접근할 수 있습니다:

```javascript
import HttpProvider, { HttpProviderOptions } from '<module-path>';
```

### 클래스 정의: HttpProvider

`HttpProvider` 클래스는 인스턴스 생성 시 `clientUrl`과 선택적으로 `httpProviderOptions`을 입력받습니다:

```javascript
let httpProviderInstance = new HttpProvider(clientUrl, httpProviderOptions);
```

### 멤버 변수

- `clientUrl`: 클라이언트 URL을 나타내는 문자열입니다.
- `httpProviderOptions`: `HttpProviderOptions` 타입으로 지정된 설정 객체입니다.

### 멤버 함수

1. `request(payload: RWeb3APIPayload<API, Method>, requestOptions?: RequestInit)`

   제공된 RWeb3 API 페이로드 및 선택적 요청 옵션을 기반으로 HTTP 요청을 보냅니다.

   응답이 성공적이지 않으면 `ResponseError`를 발생시킵니다.

   사용 예:

   ```javascript
    let response = await httpProviderInstance.request(payload, requestOptions);
   ```

2. `getClientUrl()`

   초기화된 `clientUrl` 문자열을 반환합니다.

   사용 예:

   ```javascript
    let clientUrl = httpProviderInstance.getClientUrl();
   ```

### Exports

`HttpProvider` 클래스와 `HttpProviderOptions` 타입은 모듈 수준에서 내보내집니다:

```javascript
export { HttpProvider, HttpProviderOptions };
```
