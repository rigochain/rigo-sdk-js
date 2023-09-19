# rweb3-utils uuid

---

## API 메소드 - uuidV4

이 함수는 버전 4 (랜덤) UUID를 생성하는 데 사용됩니다. 이 함수는 [uuid](https://github.com/uuidjs/uuid/blob/main/src/v4.js#L5) 패키지를 기반으로 합니다.

### 서명

```typescript
export const uuidV4 = (): string
```

### 반환

형식이 `xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx`인 버전 4 UUID

### 예시

```ts
console.log(rweb3.utils.uuidV4());
> "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed"
```

---

### 기반 로직

uuidV4 함수는 `randomBytes` 함수를 사용하여 16바이트 랜덤 세트를 생성합니다.

7번째 바이트는 그 상위 니블(반바이트)이 `4`로 설정되어 버전 4 UUID를 나타냅니다. 이는 관련 사양의 4.1.3절에 따릅니다.

9번째 바이트는 그 상위 니블이 `8`로 설정되어 버전 4 UUID의 변형을 나타냅니다. 이 조작은 관련 사양의 4.4절에 따릅니다.

마지막으로, 함수는 결과 바이트를 16진수 문자열로 변환하고 그것을 `xxxxxxxx-xxxx-4xxx-yyyy-xxxxxxxxxxxx`의 전통적인 UUID 형식으로 포맷합니다. 여기서 각 'x'는 랜덤 16진수 숫자이고 'y'는 조작된 9번째 바이트에서의 16진수 숫자입니다.

**린터가 두 개의 명시적 바이트 조작을 무시하도록 설정되어 있는지 확인하세요. 이 작업은 앞서 언급된 기능을 위해 필요하고 의도된 것입니다.**