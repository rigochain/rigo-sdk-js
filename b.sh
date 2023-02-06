#!/usr/bin/env bash
echo "Compile proto files..."
protoc \
    --plugin="./node_modules/.bin/protoc-gen-ts_proto" \
    --ts_proto_out="./src/proto" \
    -I src/proto trx.proto

echo "Compile & browserify typescript files..."
browserify src/index.ts -p [ tsify --noImplicitAny ] -t [ babelify --presets [ @babel/preset-env ] ] > dist/arcanex.min.js
