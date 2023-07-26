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

import Long from "long";

export function getNanoSecond(dt?: Date):Long {
    if (!dt) {
        dt = new Date()
    }
    return Long.fromNumber(dt.getTime()).mul(1000000) // its over Number.MAX_SAFE_...
}

export function fromNanoSecond(nsec: Long): Date {
    const tmstp = nsec.div(1000000).toNumber()
    return new Date(tmstp)
}
