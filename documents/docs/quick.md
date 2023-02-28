## Quick Start

### Prerequisite

```bash
$ node -v
v19.5.0
```

```bash
$ npm -v
9.4.1
```

```bash
$ protoc --version
libprotoc 3.21.4
```

!!! note
    `protoc` 가 없을 경우, `brew install protobuf` 로 protobuf 최신 버전을 설치한다.

### Browserify

```bash
git clone https://github.com/rigochain/rigo-sdk-js.git
cd rigo-sdk-js
npm install
gulp
```

```html
<script type='text/javascript' src='./dist/rigo.min.js'></script>
```

### NodeJS

```bash
npm i rigo-sdk-js
```
