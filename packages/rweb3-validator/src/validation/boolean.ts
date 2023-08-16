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

import {ValidInputTypes} from '../types.js';
import {isHexStrict} from './string.js';

export const isBoolean = (value: ValidInputTypes) => {
    if (!['number', 'string', 'boolean'].includes(typeof value)) {
        return false;
    }

    if (typeof value === 'boolean') {
        return true;
    }

    if (typeof value === 'string' && !isHexStrict(value)) {
        return value === '1' || value === '0';
    }

    if (typeof value === 'string' && isHexStrict(value)) {
        return value === '0x1' || value === '0x0';
    }

    if (typeof value === 'number') {
        return value === 1 || value === 0;
    }

    return false;
};


export const isBooleanOrEmpty = (value: ValidInputTypes) => {
    if (value === '') {
        return true;
    }

    return isBoolean(value);
}