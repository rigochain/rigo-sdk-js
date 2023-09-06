﻿/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/

import { Filter } from 'web3-types';
import { hexToBytes } from 'ethereum-cryptography/utils';
import { ValidInputTypes } from '../../src/types';

export const validUintData: any[] = [
    '0x48',
    '0x123c',
    '0x0dec0518fa672a70027b04c286582e543ab17319fbdd384fa7bc8f3d5a542c0b',
    '1',
    1,
    BigInt(12),
];

// Using "null" value intentionally for validation
// eslint-disable-next-line no-null/no-null
export const invalidUintData: any[] = ['-0x48', '-12', -1, true, undefined, null, ''];

export const validUintDataWithSize: [any, number][] = [
    ['0x48', 8],
    ['0x123c', 16],
    ['0x0dec0518fa672a70027b04c286582e543ab17319fbdd384fa7bc8f3d5a542c0b', 256],
    ['1', 16],
    [1, 8],
    [0, 8],
    ['0x0', 8],
    ['0x1', 8],
    [BigInt(12), 64],
];

export const invalidUintDataWithSize: [any, number][] = [
    ['', 8],
    [-1, 8],
    ['-0x1233', 8],
    ['0x4812', 8],
    ['0x123ccdef', 16],
    ['0x0dec0518fa672a70027b04c286582e543ab17319fbdd384fa7bc8f3d5a542c0b', 8],
];

export const validUintDataWithAbiType: [any, string][] = [
    ['0x48', 'uint8'],
    ['0x123c', 'uint16'],
    ['0x0dec0518fa672a70027b04c286582e543ab17319fbdd384fa7bc8f3d5a542c0b', 'uint256'],
    ['1', 'uint16'],
    [1, 'uint8'],
    [BigInt(12), 'uint64'],
];

export const invalidUintDataWithAbiType: [any, string][] = [
    ['0x4812', 'uint8'],
    ['0x123ccdef', 'uint16'],
    ['0x0dec0518fa672a70027b04c286582e543ab17319fbdd384fa7bc8f3d5a542c0b', 'uint8'],
];

export const validIntData: any[] = [
    '-0x48',
    '-0x123c',
    '-0x0dec0518fa672a70027b04c286582e543ab17319fbdd384fa7bc8f3d5a542c0b',
    '-1',
    -1,
    BigInt(-12),
];

// Using "null" value intentionally for validation
// eslint-disable-next-line no-null/no-null
export const invalidIntData: any[] = [true, undefined, null];

export const validIntDataWithSize: [any, number][] = [
    ['-0x48', 8],
    ['-0x123c', 16],
    ['-0x0dec0518fa672a70027b04c286582e543ab17319fbdd384fa7bc8f3d5a542c0b', 256],
    ['-1', 16],
    [-1, 8],
    [BigInt(-12), 64],
];

export const invalidIntDataWithSize: [any, number][] = [
    ['-0x4812', 8],
    ['-0x123ccdef', 16],
    ['-0x0dec0518fa672a70027b04c286582e543ab17319fbdd384fa7bc8f3d5a542c0b', 8],
    [Number.MAX_SAFE_INTEGER + 1, 256],
];

export const validIntDataWithAbiType: [any, string][] = [
    ['0x48', 'int8'],
    ['0x123c', 'int16'],
    ['0x0dec0518fa672a70027b04c286582e543ab17319fbdd384fa7bc8f3d5a542c0b', 'int256'],
    ['-1', 'int16'],
    [-1, 'int8'],
    [BigInt(-12), 'int64'],
];

export const invalidIntDataWithAbiType: [any, string][] = [
    ['-0x4812', 'uint8'],
    ['-0x123ccdef', 'uint16'],
    ['-0x0dec0518fa672a70027b04c286582e543ab17319fbdd384fa7bc8f3d5a542c0b', 'uint8'],
];

export const validHexStrictDataWithNumber: [string, number | bigint][] = [
    ['0x48', 72],
    ['0x123c', 4668],
    [
        '0xdec0518fa672a70027b04c286582e543ab17319fbdd384fa7bc8f3d5a542c0b',
        BigInt('6297078121011128569053558207054331251192909352593326480842737114300118477835'),
    ],
    [
        '0xd115bffabbdd893a6f7cea402e7338643ced44a6',
        BigInt('1193664110518272216229793131906554422260021413030'),
    ],
    [
        '0x2C941171bD2A7aEda7c2767c438DfF36EAaFdaFc',
        BigInt('254497623817844434235817792799421766503337286396'),
    ],
    ['0x1', 1],
    ['0xcd', 205],
    ['-0xcd', -205],
];
export const validHexStrictDataWithUint8Array: [string, Uint8Array][] = [
    ['0x48', new Uint8Array([72])],
    ['0x123c', new Uint8Array([18, 60])],
    [
        '0xdec0518fa672a70027b04c286582e543ab17319fbdd384fa7bc8f3d5a542c0',
        new Uint8Array([
            0xde, 0xc0, 0x51, 0x8f, 0xa6, 0x72, 0xa7, 0x00, 0x27, 0xb0, 0x4c, 0x28, 0x65, 0x82,
            0xe5, 0x43, 0xab, 0x17, 0x31, 0x9f, 0xbd, 0xd3, 0x84, 0xfa, 0x7b, 0xc8, 0xf3, 0xd5,
            0xa5, 0x42, 0xc0,
        ]),
    ],
    [
        '0xd115bffabbdd893a6f7cea402e7338643ced44a6',
        new Uint8Array([
            0xd1, 0x15, 0xbf, 0xfa, 0xbb, 0xdd, 0x89, 0x3a, 0x6f, 0x7c, 0xea, 0x40, 0x2e, 0x73,
            0x38, 0x64, 0x3c, 0xed, 0x44, 0xa6,
        ]),
    ],
    ['0xcd', new Uint8Array([205])],
    ['0x', new Uint8Array([])],
    ['0x01', new Uint8Array([1])],
    [
        '0x2C941171bD2A7aEda7c2767c438DfF36EAaFdaFc',
        new Uint8Array([
            0x2c, 0x94, 0x11, 0x71, 0xbd, 0x2a, 0x7a, 0xed, 0xa7, 0xc2, 0x76, 0x7c, 0x43, 0x8d,
            0xff, 0x36, 0xea, 0xaf, 0xda, 0xfc,
        ]),
    ],
];

export const invalidHexStrictStringData: [string][] = [
    ['0x1'],
    ['-0x'],
    // ['-0x1'],
    ['0xdec0518fa672a70027b04c286582e543ab17319fbdd384fa7bc8f3d5a542c01'],
    ['I have 100£'],
];
export const validHexStrictData: any[] = [
    ...validHexStrictDataWithNumber.map((tuple) => tuple[0]),
    '-0xdec0518fa672a70027b04c286582e543ab17319fbdd384fa7bc8f3d5a542c0b',
    '0x',
    '0X',
];

export const invalidHexData: any[] = [
    'Heeäööä👅D34ɝɣ24Єͽ',
    '',
    '-',
    '-0x',
    'x',
    '0x0x',
    '0xH',
    'I have 100£',
    '\u0000',
    true,
    false,
    '0x407d73d8a49eeb85d32cf465507dd71d507100cG', // Invalid hex character "G"
    {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    () => {},
    undefined,
];

export const invalidHexStrictData: any[] = [
    ...invalidHexData,
    '45',
    '-45',
    '0',
    1,
    BigInt(12),
    BigInt(''),
    BigInt(-255),
    -42,
    4.2,
];

export const validHexData: any[] = [
    ...validHexStrictData,
    '45',
    '-45',
    '0',
    1,
    BigInt(12),
    BigInt(-255),
];

export const isHexStringData: any[] = [
    { in: ['0x0000000000000000000000000000000000000000'], out: true },
    { in: ['0x0000000000000000000000000000000000000000', false], out: true },
    { in: ['0x0000000000000000000000000000000000000000', 2], out: false },
    { in: ['0x0000000000000000000000000000000000000000', undefined], out: true },
    { in: ['0x0001', 2], out: true },
    { in: ['0x0001', 3], out: false },
    { in: ['0x0001', 1], out: false },
    { in: ['123abcdefg'], out: false },
    { in: ['1x12345'], out: false },
    { in: ['123'], out: false },
    { in: [123], out: false },
    // eslint-disable-next-line no-null/no-null
    { in: [null], out: false },
    { in: [false], out: false },
    { in: [{}], out: false },
];
export const isHexString8BytesData: any[] = [
    { in: ['0x0000000000000001', true], out: true },
    { in: ['0000000000000001', true], out: false },
    { in: ['0x0000000000000001', false], out: false },
    { in: ['0000000000000001', false], out: true },
    { in: [123, true], out: false },
    { in: [123, false], out: false },
    { in: [true, true], out: false },
    { in: [false, false], out: false },
    { in: [{}, true], out: false },
    { in: [{}, false], out: false },
];
export const isObjectData: any[] = [
    { in: 'asd', out: false },
    { in: [], out: false },
    { in: true, out: false },
    { in: false, out: false },
    { in: {}, out: true },
    // eslint-disable-next-line no-null/no-null
    { in: null, out: false },
    { in: undefined, out: false },
    { in: new Uint8Array([0x61, 0x73, 0x64]), out: false },
];
export const isHexString32BytesData: any[] = [
    { in: ['0x0000000000000000000000000000000000000000000000000000000000000001', true], out: true },
    { in: ['0000000000000000000000000000000000000000000000000000000000000001', true], out: false },
    {
        in: ['0x0000000000000000000000000000000000000000000000000000000000000001', false],
        out: false,
    },
    { in: ['0000000000000000000000000000000000000000000000000000000000000001', false], out: true },
    { in: [123, true], out: false },
    { in: [123, false], out: false },
    { in: [true, true], out: false },
    { in: [false, false], out: false },
    { in: [{}, true], out: false },
    { in: [{}, false], out: false },
];
export const isHexPrefixedData: any[] = [
    { in: '0x0000000000000000000000000000000000000000000000000000000000000001', out: true },
    { in: '0000000000000000000000000000000000000000000000000000000000000001', out: false },
];
export const validStringNumbersWithHex: [string, string][] = [
    ['72', '0x48'],
    ['4668', '0x123c'],
    [
        '6297078121011128569053558207054331251192909352593326480842737114300118477835',
        '0xdec0518fa672a70027b04c286582e543ab17319fbdd384fa7bc8f3d5a542c0b',
    ],
    [
        '1193664110518272216229793131906554422260021413030',
        '0xd115bffabbdd893a6f7cea402e7338643ced44a6',
    ],
    [
        '254497623817844434235817792799421766503337286396',
        '0x2C941171bD2A7aEda7c2767c438DfF36EAaFdaFc',
    ],
    ['1', '0x1'],
    ['205', '0xcd'],
    ['-205', '-0xcd'],
];

export const invalidStringNumbers: ValidInputTypes[] = [
    new Uint8Array([0x97, 0x98, 0x99]),
    new Uint8Array(hexToBytes('abcd')),
];
export const validCheckAddressCheckSumData: any[] = [
    '0xc1912fEE45d61C87Cc5EA59DaE31190FFFFf232d',
    '0x52908400098527886E0F7030069857D2E4169EE7',
    '0x8617E340B3D01FA5F11F306F4090FD50E238070D',
    '0x27b1fdb04752bbc536007a920d24acb045561c26',
    '0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed',
    '0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359',
    '0xdbF03B407c01E7cD3CBea99509d93f8DDDC8C6FB',
    '0xD1220A0cf47c7B9Be7A2E6BA89F429762e7b9aDb',
];

export const invalidCheckAddressCheckSumData: any[] = [
    '0xc1912fee45d61c87cc5ea59dae31190fffff232d',
    '0xd1220a0cf47c7b9be7a2e6ba89f429762e7b9adb',
    '0XD1220A0CF47C7B9BE7A2E6BA89F429762E7B9ADB',
    '1234',
    '0xa1b2',
];

export const validAddressData: any[] = [
    '0x344c56e8322d26a07b2b576789359565fa5d09d7',
    '0xc6d9d2cd449a754c494264e1809c50e34d64562b',
    'c6d9d2cd449a754c494264e1809c50e34d64562b',
    '0xE247A45c287191d435A8a5D72A7C8dc030451E9F',
    '0xe247a45c287191d435a8a5d72a7c8dc030451e9f',
    '0xE247A45C287191D435A8A5D72A7C8DC030451E9F',
    '0XE247A45C287191D435A8A5D72A7C8DC030451E9F',
    new Uint8Array(hexToBytes('0xE247A45C287191D435A8A5D72A7C8DC030451E9F')),
];

export const invalidAddressData: any[] = [
    ...invalidHexStrictData,
    '0x1',
    '0xE247a45c287191d435A8a5D72A7C8dc030451E9F', // Invalid checksum
    '-0x407d73d8a49eeb85d32cf465507dd71d507100c1',
];

export const validBloomData: any[] = [
    '0x00000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000008000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000010000000000000000000000000000000000010000000000402000000000000000000000020000010000000000000000000000000000000000000000000000000000000000000',
    '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
];

export const invalidBloomData: any[] = ['0x1100', '0x1212', 'test', 100];

export const validInBloomData: [string, string][] = [
    [
        '0x00000000200000000010000080000000000002000000000000000000000000000000000000020200000000000000000000800001000000000000000000200000000000000000000000000008000000800000000000000000000000000000000000000000020000000000000000000800000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000020000000000000000000080000000000000000000000100000000000000000000000002000000000001000080000000000000000000000000000000000020200010000000000000000000000000000000000000100000000000000000000000',
        '0x98afe7a8d28bbc88dcf41f8e06d97c74958a47dc',
    ],
    [
        '0x00000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000008000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000010000000000000000000000000000000000010000000000402000000000000000000000020000010000000000000000000000000000000000000000000000000000000000000',
        '0x6b175474e89094c44da98b954eedeac495271d0f',
    ],
    [
        '0x01000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000800000000000000000000000000010018000000000000000000000000000000000000000000000000000000000000000000000000000000400000000000000010000000000000000000002000000000080000000000000000000000000000000000000000001000000100000000000000000000000000000000000000000000400000000000000002000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000000000000000',
        '0xf411903cbc70a74d22900a5de66a2dda66507255',
    ],
];

export const invalidInBloomData: any[] = [
    [
        '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
        '0x98afe7a8d28bbc88dcf41f8e06d97c74958a47dc',
    ],
    [
        '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
        '0x6254B927ecC25DDd233aAECD5296D746B1C006B4',
    ],
    ['0x1100', '0x6254B927ecC25DDd233aAECD5296D746B1C006B4'],
    ['0x1212', '0x6254B927ecC25DDd233aAECD5296D746B1C006B4'],
    ['test', '0x6254B927ecC25DDd233aAECD5296D746B1C006B4'],
    [
        '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
        '0xhello',
    ],
    [0, '0x6254B927ecC25DDd233aAECD5296D746B1C006B4'],
    [
        // mix a and A
        '0xaA000000200000000010000080000000000002000000000000000000000000000000000000020200000000000000000000800001000000000000000000200000000000000000000000000008000000800000000000000000000000000000000000000000020000000000000000000800000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000020000000000000000000080000000000000000000000100000000000000000000000002000000000001000080000000000000000000000000000000000020200010000000000000000000000000000000000000100000000000000000000000',
        '0x98afe7a8d28bbc88dcf41f8e06d97c74958a47dc',
    ],
];

export const validUserEthereumAddressInBloomData: any[] = [
    [
        '0x00000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000002000000000000000000000000000000100000000000000082000000000080000000000000000000000000000000000000000000000002000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
        '0xdfd5293d8e347dfe59e90efd55b2956a1343963d',
    ],
];

export const invalidUserEthereumAddressInBloomData: any[] = [
    [
        '0x00000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000002000000000000000000000000000000100000000000000082000000000080000000000000000000000000000000000000000000000002000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
        '0xea674fdde714fd979de3edf0f56aa9716b898ec8',
    ],
    [
        '0x00000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000002000000000000000000000000000000100000000000000082000000000080000000000000000000000000000000000000000000000002000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
        '0xH1',
    ],
    [
        // mix a and A
        '0xaA000000200000000010000080000000000002000000000000000000000000000000000000020200000000000000000000800001000000000000000000200000000000000000000000000008000000800000000000000000000000000000000000000000020000000000000000000800000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000020000000000000000000080000000000000000000000100000000000000000000000002000000000001000080000000000000000000000000000000000020200010000000000000000000000000000000000000100000000000000000000000',
        '0x98afe7a8d28bbc88dcf41f8e06d97c74958a47dc',
    ],
];

export const validTopicData: any[] = [
    '0x0ce781a18c10c8289803c7c4cfd532d797113c4b41c9701ffad7d0a632ac555b',
];

export const invalidTopicData: any[] = [
    '0x0ce781a18c10c8289803c7c4cfd532d797113c4b41c9701ffad7d0a632ac55',
];

export const validTopicInBloomData: any[] = [
    [
        '0x00000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000040000000002000000000000000000000000000001000000000000000000000000000000',
        '0x0ce781a18c10c8289803c7c4cfd532d797113c4b41c9701ffad7d0a632ac555b',
    ],
];

export const invalidTopicInBloomData: any[] = [
    [
        '0x00000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000040000000002000000000000000000000000000001000000000000000000000000000000',
        '0x9de781a18c10c8289803c7c4cfd532d797113c4b41c9701ffad7d0a632ac5567',
    ],
];

export const validBigIntData: any[] = [BigInt('90071992547409911'), BigInt(42), BigInt('1337')];

export const invalidBigIntData: any[] = [3, '3', '3n'];

// Uses same data defined in isHexStrictValidData minus negative hex strings
export const validBlockNumberData: any[] = [
    '0x48',
    '0x123c',
    '0x0dec0518fa672a70027b04c286582e543ab17319fbdd384fa7bc8f3d5a542c0b',
    '0xd115bffabbdd893a6f7cea402e7338643ced44a6',
    '0x2C941171bD2A7aEda7c2767c438DfF36EAaFdaFc',
    '0x1',
    '0xcd',
    '1',
    0,
    12,
    '0',
    '0x0',
    '0x12',
];

export const invalidBlockNumberData: any[] = [
    '45a',
    '',
    BigInt(-255),
    -42,
    4.2,
    '-0xcd',
    '-0x0dec0518fa672a70027b04c286582e543ab17319fbdd384fa7bc8f3d5a542c0b',
];

export const validBlockTagData: string[] = ['latest', 'pending', 'earliest'];

export const invalidBlockTagData: any[] = [
    'User',
    '0xal',
    'EARLIEST',
    'LATEST',
    'PENDING',
    'UNKNOWN',
];

export const validHexString8Bytes: (string | [string, false])[] = [
    '0x0000000000000001',
    '0x00000000000c0ffe',
    '0x0000123098409924',
    ['0000000000000001', false],
    ['00000000000c0ffe', false],
    ['0000123098409924', false],
];

export const validHexString32BytesData: (string | [string, false])[] = [
    '0x22f30f0608f88c510de0016370f1525b330e5839026bdff93f9ceef24d2275e6',
    '0x63a01bba0d4f0ad913a241aed52f5c55807be35f554536abd1e451d4e6515b29',
    '0x687f28d48c22e9619b36776cf692501b3fc4e2143841efe3c7f45e49ea46b7f0',
    ['22f30f0608f88c510de0016370f1525b330e5839026bdff93f9ceef24d2275e6', false],
    ['63a01bba0d4f0ad913a241aed52f5c55807be35f554536abd1e451d4e6515b29', false],
    ['687f28d48c22e9619b36776cf692501b3fc4e2143841efe3c7f45e49ea46b7f0', false],
];

export const validBooleanData: any[] = [true, false, 1, 0, '1', '0', '0x0', '0x1'];

export const invalidBooleanData = invalidHexStrictData.filter(
    (data) => data !== 1 && data !== 0 && data !== '0' && data !== '1' && typeof data !== 'boolean',
);
export const isTopicData: any[] = [
    { in: '0x0000000000000000000000000000000000000000000000000000000000000000', out: true },
    { in: '0x000000000000000000000000000000000000000000000000000000000000001a', out: true },
    { in: '0x000000000000000000000000000000000000000000000000000000000000001A', out: true },
    { in: '0x00000000000000000000000000000000000000000000000000000000000001aA', out: false },
    { in: '0x00000000000000000000000000000000000000000000000000000000000000000', out: false },
    { in: '0x000000000000000000000000000000000000000000000000000000000000000', out: false },
    { in: 123, out: false },
    // eslint-disable-next-line no-null/no-null
    { in: null, out: false },
    { in: false, out: false },
    { in: {}, out: false },
];
export const isTopicInBloomData: any[] = [
    { in: [123, ''], out: false },
    // eslint-disable-next-line no-null/no-null
    { in: [null, ''], out: false },
    { in: [false, ''], out: false },
    { in: [{}, ''], out: false },
    {
        in: [
            '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
            123,
        ],
        out: false,
    },
    {
        in: [
            '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
            // eslint-disable-next-line no-null/no-null
            null,
        ],
        out: false,
    },
    {
        in: [
            '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
            false,
        ],
        out: false,
    },
    {
        in: [
            '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
            {},
        ],
        out: false,
    },
];
export const validFilterObjectData: Filter[] = [
    {
        fromBlock: '0xc0ff3',
    },
    {
        toBlock: '0xc0ff3',
    },
    {
        address: '0x98afe7a8d28bbc88dcf41f8e06d97c74958a47dc',
    },
    {
        address: [
            '0x98afe7a8d28bbc88dcf41f8e06d97c74958a47dc',
            '0xdfd5293d8e347dfe59e90efd55b2956a1343963d',
        ],
    },
    {
        topics: [
            '0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b',
            // Using "null" value intentionally for validation
            // eslint-disable-next-line no-null/no-null
            null,
            [
                '0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b',
                '0x0000000000000000000000000aff3454fce5edbc8cca8697c15331677e6ebccc',
            ],
        ],
    },
    {
        fromBlock: '0xc0ff3',
        toBlock: '0xc0ff3',
        address: [
            '0x98afe7a8d28bbc88dcf41f8e06d97c74958a47dc',
            '0xdfd5293d8e347dfe59e90efd55b2956a1343963d',
        ],
        topics: [
            '0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b',
            // Using "null" value intentionally for validation
            // eslint-disable-next-line no-null/no-null
            null,
            [
                '0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b',
                '0x0000000000000000000000000aff3454fce5edbc8cca8697c15331677e6ebccc',
            ],
        ],
    },
];

export const invalidFilterObjectData: any[] = [
    {
        fromBlock: '42a',
    },
    {
        toBlock: -42,
    },
    {
        address: '0x98',
    },
    {
        address: [
            '0x98afe7a8d28bbc88dcf41f8e06d97c74958a47dc',
            '0xdfd5293d8e347dfe59e90efd55b2956a1343963d',
            // Using "null" value intentionally for validation
            // eslint-disable-next-line no-null/no-null
            null,
        ],
    },
    {
        topics: [
            '0x00000000000000000000000',
            // Using "null" value intentionally for validation
            // eslint-disable-next-line no-null/no-null
            null,
            [
                '0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b',
                '0x0000000000000000000000000aff3454fce5edbc8cca8697c15331677e6ebccc',
            ],
        ],
    },
    {
        fromBlock: '0xc0ff3',
        toBlock: '0xc0ff3',
        address: [
            '0x98afe7a8d28bbc88dcf41f8e06d97c74958a47dc',
            '0xdfd5293d8e347dfe59e90efd55b2956a1343963d',
            42,
        ],
        topics: [
            '0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b',
            // Using "null" value intentionally for validation
            // eslint-disable-next-line no-null/no-null
            null,
            [
                '0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b',
                '0x0000000000000000000000000aff3454fce5edbc8cca8697c15331677e6ebccc',
            ],
        ],
    },
];

export const validBytesData: any[] = [
    '0x10',
    '0xafea',
    [2, 3, 255],
    new Uint8Array(hexToBytes('abce')),
    new Uint8Array([0x91, 0x92]),
];

export const validBytesDataWithSize: [any, number][] = [
    ['0x10', 1],
    [new Uint8Array(hexToBytes('abce')), 2],
];

export const invalidBytesDataWithSize: [any, number][] = [
    ['0x10', 2],
    [new Uint8Array(hexToBytes('abce')), 1],
];

export const validBytesDataWithAbiType: [any, string][] = [
    ['0x10', 'bytes1'],
    [new Uint8Array(hexToBytes('abce')), 'bytes2'],
];

export const invalidBytesDataWithAbiType: [any, string][] = [
    ['0x10', 'bytes2'],
    [new Uint8Array(hexToBytes('abce')), 'bytes1'],
];

export const invalidBytesData: any[] = [
    '0xT1',
    '1234',
    // odd length hex string
    '0x123',
    'hello',
    [1, 2, -3, 4, 5],
    [2, 3, 266],
    ['world'],
    '-0x12',
];

export const validEthTypeData: string[] = [
    'int',
    'uint',
    'int8',
    'int16',
    'int32',
    'int64',
    'int128',
    'int256',
    'string',
    'int[]',
    'int8[]',
    'int8[]',
    'uint8[]',
    'int[2]',
    'int8[2]',
    'uint[2]',
    'uint8[2]',
    'string[]',
    'bytes[]',
    'bytes[2]',
    'bytes10',
    'bytes1',
    'bool',
    'address',
    'address[]',
    'address[2]',
];

export const invalidEthTypeData: string[] = [
    'i',
    'int7',
    'int512',
    'int1024',
    'byte',
    'my-addresss',
    'boolean',
];

export const validCodePoints: [number, number][] = [
    [48, 0],
    [51, 3],
    [55, 7],
    [57, 9],
    [65, 10],
    [70, 15],
    [97, 10],
    [100, 13],
    [102, 15],
];

export const invalidCodePoints: number[] = [-100, -5, 0, 30, 58, 75, 90, 103, 200];

export const padLeftData: { padDigits: number; data: [ValidInputTypes, string][] } = {
    padDigits: 64,
    data: [
        [
            'dfd5293d8e347dfe59e90efd55b2956a1343963d',
            '000000000000000000000000dfd5293d8e347dfe59e90efd55b2956a1343963d',
        ],
        [
            '-0xdfd5293d8e347dfe59e90efd55b2956a1343963d',
            '-0x000000000000000000000000dfd5293d8e347dfe59e90efd55b2956a1343963d',
        ],
        [2, '0x0000000000000000000000000000000000000000000000000000000000000002'],
    ],
};

export const validNotBaseTypeData: { dataType: string; data: any }[] = [
    { dataType: 'hex', data: '0x000000000000000000000000dfd5293d8e347dfe59e90efd55b2956a1343963d' },
    { dataType: 'number', data: 42 },
    { dataType: 'blockNumber', data: 42 },
    { dataType: 'blockNumberOrTag', data: 'latest' },
    {
        dataType: 'filter',
        data: {
            fromBlock: 'latest',
            toBlock: 'latest',
        },
    },
    {
        dataType: 'bloom',
        data: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    },
];
