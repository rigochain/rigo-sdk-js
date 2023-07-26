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


import { parseBaseType } from '../utils.js';

export const isValidEthBaseType = (type: string): boolean => {
	const { baseType, baseTypeSize } = parseBaseType(type);

	if (!baseType) {
		return false;
	}

	if (baseType === type) {
		return true;
	}

	if ((baseType === 'int' || baseType === 'uint') && baseTypeSize) {
		if (!(baseTypeSize <= 256 && baseTypeSize % 8 === 0)) {
			return false;
		}
	}

	if (baseType === 'bytes' && baseTypeSize) {
		if (!(baseTypeSize >= 1 && baseTypeSize <= 32)) {
			return false;
		}
	}

	return true;
};
