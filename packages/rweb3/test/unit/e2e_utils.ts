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
import secrets from '../../../../.secrets.json';

export const getDevServer = (): string => {
    return secrets.DEVNET.HTTP;
};

export const getDevWsServer = (): string => {
    return secrets.DEVNET.WS;
};

export const getDevAccountAddress = (): string => {
    return secrets.DEVNET.ACCOUNT.address;
};

export const getDevAccountPrivateKey = (): string => {
    return secrets.DEVNET.ACCOUNT.privateKey;
};

export const getTestServer = (): string => {
    return secrets.TESTNET.HTTP;
};

export const getTestWsServer = (): string => {
    return secrets.TESTNET.WS;
};

export const getTestAccountAddress = (): string => {
    return secrets.TESTNET.ACCOUNT.address;
};

export const getTestAccountPrivateKey = (): string => {
    return secrets.TESTNET.ACCOUNT.privateKey;
};
