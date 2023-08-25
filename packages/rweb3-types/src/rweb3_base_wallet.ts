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
// TODO : Wallet 작업 필요함
import { HexString } from './primitives_types.js';

export type Cipher = 'aes-128-ctr' | 'aes-128-cbc' | 'aes-256-cbc';

export type CipherOptions = {
    salt?: Uint8Array | string;
    iv?: Uint8Array | string;
    kdf?: 'scrypt' | 'pbkdf2';
    dklen?: number;
    c?: number; // iterrations
    n?: number; // cpu/memory cost
    r?: number; // block size
    p?: number; // parallelization cost
};

export type ScryptParams = {
    dklen: number;
    n: number;
    p: number;
    r: number;
    salt: Uint8Array | string;
};
export type PBKDF2SHA256Params = {
    c: number; // iterations
    dklen: number;
    prf: 'hmac-sha256';
    salt: Uint8Array | string;
};

export type KeyStore = {
    crypto: {
        cipher: Cipher;
        ciphertext: string;
        cipherparams: {
            iv: string;
        };
        kdf: 'pbkdf2' | 'scrypt';
        kdfparams: ScryptParams | PBKDF2SHA256Params;
        mac: HexString;
    };
    id: string;
    version: 3;
    address: string;
};

export interface Web3BaseWalletAccount {
    [key: string]: unknown;

    readonly address: string;
    readonly privateKey: string;
    readonly signTransaction: (tx: any) => Promise<{
        readonly messageHash: HexString;
        readonly r: HexString;
        readonly s: HexString;
        readonly v: HexString;
        readonly rawTransaction: HexString;
        readonly transactionHash: HexString;
    }>;
    readonly sign: (data: Record<string, unknown> | string) => {
        readonly messageHash: HexString;
        readonly r: HexString;
        readonly s: HexString;
        readonly v: HexString;
        readonly message?: string;
        readonly signature: HexString;
    };
    readonly encrypt: (password: string, options?: Record<string, unknown>) => Promise<KeyStore>;
}

export interface Web3AccountProvider<T> {
    privateKeyToAccount: (privateKey: string) => T;
    create: () => T;
    decrypt: (
        keystore: KeyStore | string,
        password: string,
        options?: Record<string, unknown>,
    ) => Promise<T>;
}

export abstract class Web3BaseWallet<T extends Web3BaseWalletAccount> extends Array<T> {
    protected readonly _accountProvider: Web3AccountProvider<T>;

    public constructor(accountProvider: Web3AccountProvider<T>) {
        super();
        this._accountProvider = accountProvider;
    }

    public abstract create(numberOfAccounts: number): this;

    public abstract add(account: T | string): this;

    public abstract get(addressOrIndex: string | number): T | undefined;

    public abstract remove(addressOrIndex: string | number): boolean;

    public abstract clear(): this;

    public abstract encrypt(
        password: string,
        options?: Record<string, unknown>,
    ): Promise<KeyStore[]>;

    public abstract decrypt(
        encryptedWallet: KeyStore[],
        password: string,
        options?: Record<string, unknown>,
    ): Promise<this>;

    public abstract save(password: string, keyName?: string): Promise<boolean | never>;

    public abstract load(password: string, keyName?: string): Promise<this | never>;
}
