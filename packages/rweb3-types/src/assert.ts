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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function assert(condition: any, msg?: string): asserts condition {
    if (!condition) {
        throw new Error(msg || 'condition is not truthy');
    }
}

export function assertDefined<T>(value: T | undefined, msg?: string): asserts value is T {
    if (value === undefined) {
        throw new Error(msg ?? 'value is undefined');
    }
}

export function assertDefinedAndNotNull<T>(
    value: T | undefined | null,
    msg?: string,
): asserts value is T {
    // eslint-disable-next-line no-null/no-null
    if (value === undefined || value === null) {
        throw new Error(msg ?? 'value is undefined or null');
    }
}
