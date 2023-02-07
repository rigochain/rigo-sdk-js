# Overview

This document describes the JavaScript SDK for ARCANEX.

## Sources and compiles

```bash
git clone https://github.com/arcanexio/arcanex-sdk-js.git
cd arcanex-sdk-js
npm install
gulp
```

위와 같이 수행하면

## NodeJS

## Browserify

```bash
npm install
```

```bash
gulp
```

```html
<script type='text/javascript' src='arcanex.js'></script>
```

---

## RPC API

'arcanex-sdk-js' 는 ARCANEX 노드가 제공하는 JSONRPC 를 호출하는 API 집합을 제공한다.
이에 대한 자세한 사항은 [RPC](./acnet.md) 를 참고한다.

---

## Event Subscription

'arcanex-sdk-js' 는 ARCANEX 네트워크에서 발생하는 다양한 이벤트를 websocket 을 사용하여 실시간 구독하기 위한 API 집합을 제공한다.
이에 대한 자세한 사항은 [Event Subscription](./subscriber.md)를 참고한다.