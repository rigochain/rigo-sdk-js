import secrets from '../../../../.secrets.json';

export const getDevServer = (): string => {
    return secrets.DEVNET.HTTP;
};

export const getDevWsServer = (): string => {
    return secrets.DEVNET.WS;
};

export const getTestServer = (): string => {
    return secrets.TESTNET.HTTP;
};

export const getTestWsServer = (): string => {
    return secrets.TESTNET.WS;
};
