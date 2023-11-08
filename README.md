# Javascript SDK for RIGO

`rigo-sdk-js` is Javascript SDK for RIGO blockhcain network.

## Prerequisite

To build use typescript compiler,

```bash
npm install yarn -g
```

To generate typescript sources for protobuf messages,

```bash
brew install protobuf
```

To compile typescript sources,

```bash
node -v
v19.5.0
```

```bash
npm -v
9.4.1
```

## Usages

### nodejs

```bash
git clone https://github.com/rigochain/rigo-sdk-js.git
cd rigo-sdk-js
npm install

npm run build 
```js


### Browserify

```bash
git clone https://github.com/rigochain/rigo-sdk-js.git
cd rigo-sdk-js
npm install

# web build uses ems. So, pre-build is required.
npm run build 
npm run build:web
```

```html

<script type="text/javascript" src="./dist/rigo.min.js"></script>
```

### NodeJS

```bash
npm i rigo-sdk-js
```

---

### Documentation / API-Document 

You can find documents at english https://rigolabs.gitbook.io/rigo-sdk-js/docs-en

You can find documents at koran https://rigolabs.gitbook.io/rigo-sdk-js/docs-kr

## License
```
Copyright 2023 All Rigo Chain Developers

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```