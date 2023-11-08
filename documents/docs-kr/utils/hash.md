# rweb3-utils hash

## 목차
1. [함수들](#functions)
     1. [sha3](#sha3)
     2. [sha3Raw](#sha3raw)
     3. [keccak256Wrapper](#keccak256wrapper)
     4. [getType](#gettype)
     5. [elementaryName](#elementaryname)
     6. [solidityPack](#soliditypack)
     7. [processSolidityEncodePackedArgs](#processSolidityEncodePackedArgs)
     8. [encodePacked](#encodepacked)
     9. [soliditySha3](#soliditysha3)
     10. [soliditySha3Raw](#soliditysha3raw)
     11. [getStorageSlotNumForLongString](#getstorageslotnumforlongstring)

## 함수들

### sha3
이 함수는 입력의 Keccak-256 해시를 계산하고 16진수 문자열을 반환합니다.
입력: 바이트
출력: 문자열 또는 undefined

예시: 

```ts
    console.log(rweb3.utils.sha3('rweb3.js'));
    > 0x63667efb1961039c9bb0d6ea7a5abdd223a3aca7daa5044ad894226e1f83919a

    console.log(rweb3.utils.sha3(''));
    > undefined
```

### sha3Raw
이 함수는 입력의 sha3를 계산하지만, 비어있는 문자열이 전달된 경우에 null 대신 해시 값을 반환합니다.
입력: 바이트
출력: 문자열

예시: 

```ts
    console.log(rweb3.utils.sha3Raw('rweb3.js'));
    > 0x63667efb1961039c9bb0d6ea7a5abdd223a3aca7daa5044ad894226e1f83919a
    console.log(rweb3.utils.sha3Raw(''));
    > 0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470
```
      
### keccak256Wrapper
이 함수는 `string`과 `bigint`뿐만 아니라 `UInt8Array`를 해싱할 수 있도록 ethereum-cryptography/keccak256의 래퍼입니다.
입력: 바이트 | 숫자 | 문자열 | 읽기 전용 배열<number>
출력: 문자열

예시:
```ts
    console.log(rweb3.utils.keccak256Wrapper('rweb3.js'));
    > 0x63667efb1961039c9bb0d6ea7a5abdd223a3aca7daa5044ad894226e1f83919a
    console.log(rweb3.utils.keccak256Wrapper(1));
    > 0xc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc6
    console.log(rweb3.utils.keccak256Wrapper(0xaf12fd));
    > 0x358640fd4719fa923525d74ab5ae80a594301aba5543e3492b052bf4598b794c
```

### getType
타입과 값을 반환합니다.
입력: Sha3Input
출력: [문자열, 인코딩 타입들]

### elementaryName
uint나 int의 크기와 함께 타입을 반환합니다.
입력: 문자열
출력: 문자열

### solidityPack
크기와 타입에 기반한 값을 패딩합니다.
패딩된 값을 문자열로 반환합니다.
입력: 문자열, 인코딩 타입들
출력: 문자열

### processSolidityEncodePackedArgs
타입에 따라 주어진 강하게 패킹된 값을 문자열로 반환합니다.
입력: Sha3Input
출력: 문자열

### encodePacked
패킹된 인수를 16진수 문자열로 인코딩합니다.
입력: Sha3Input[]
출력: 문자열

### soliditySha3
이 함수는 주어진 값을 Solidity가 해시처럼 강하게 패킹합니다. 입력이 비어있다면 null을, 아니라면 해시 문자열을 반환합니다.
입력: Sha3Input
출력: 문자열 또는 undefined`

예시: 
```ts
    console.log([{ type: 'string', value: '31323334' }]);
    console.log(rweb3.utils.soliditySha3({ type: "string", value: "31323334" }));
    > 0xf15f8da2ad27e486d632dc37d24912f634398918d6f9913a0a0ff84e388be62b
```

### soliditySha3Raw
이 함수는 주어진 값을 Solidity가 해시처럼 강하게 패킹합니다. 입력이 비어있다면 `0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470`을, 아니라면 해시 문자열을 반환합니다.
입력: Sha3Input
출력: 문자열

예시: 
```ts
    console.log(rweb3.utils.soliditySha3Raw({ type: "string", value: "helloworld" }))
    > 0xfa26db7ca85ead399216e7c6316bc50ed24393c3122b582735e7f3b0f91b93f0
```

### getStorageSlotNumForLongString
계약에서 긴 문자열을 저장하기 위한 슬롯 번호를 얻습니다. 이 함수는 특히 getStorage 메소드에 유용합니다.
긴 문자열이 저장될 슬롯 번호를 반환합니다.
입력: 숫자 | 문자열
출력: 문자열