/*
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
*/
export function uint8ArrayConcat(...parts: Uint8Array[]): Uint8Array {
    const length = parts.reduce((prev, part) => {
        const agg = prev + part.length;
        return agg;
    }, 0);
    const result = new Uint8Array(length);
    let offset = 0;
    for (const part of parts) {
        result.set(part, offset);
        offset += part.length;
    }
    return result;
}

/**
 * Returns true if the two passed Uint8Arrays have the same content
 */
export function uint8ArrayEquals(a: Uint8Array, b: Uint8Array): boolean {
    if (a === b) {
        return true;
    }

    if (a.byteLength !== b.byteLength) {
        return false;
    }

    for (let i = 0; i < a.byteLength; i += 1) {
        if (a[i] !== b[i]) {
            return false;
        }
    }

    return true;
}

export function hexStringToUint8Array(hexString: string): Uint8Array {
    if (hexString.length % 2 !== 0) {
        throw new Error('Invalid hex string');
    }

    const arrayBuffer = new Uint8Array(hexString.length / 2);

    for (let i = 0; i < hexString.length; i += 2) {
        const byteValue = parseInt(hexString.substr(i, 2), 16);
        if (isNaN(byteValue)) {
            throw new Error('Invalid hex string');
        }
        arrayBuffer[i / 2] = byteValue;
    }

    return arrayBuffer;
}
