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
