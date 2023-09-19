# rweb3-utils random

## randomBytes 함수

`randomBytes` 함수는 바이트 크기가 주어진 무작위 바이트 배열을 반환합니다.

__매개변수:__

- `size (Number)`: 반환되는 무작위 바이트 배열의 크기

__반환:__

- `Uint8Array`: 생성된 무작위 바이트 배열

__예시__

```javascript
console.log(rweb3.utils.randomBytes(32));
//출력: Uint8Array(32) [
// 93, 172, 226,  32,  33, 176, 156, 156,
// 182,  30, 240,   2,  69,  96, 174, 197,
// 33, 136, 194, 241, 197, 156, 110, 111,
// 66,  87,  17,  88,  67,  48, 245, 183
//]
```

## randomHex 함수

`randomHex` 함수는 문자열 크기가 주어진 무작위 16진수 문자열을 반환합니다.

__매개변수:__

- `byteSize (Number)`: 반환되는 무작위 16진수 문자열의 크기

__반환:__

- `String`: 무작위 16진수 문자열

__예시__

```javascript
console.log(RWeb3.utils.randomHex(32));
//출력: 0x139f5b88b72a25eab053d3b57fe1f8a9dbc62a526b1cb1774d0d7db1c3e7ce9e
```