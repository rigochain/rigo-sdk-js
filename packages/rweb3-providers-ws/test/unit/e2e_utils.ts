import secrets from '../../../../.secrets.json';

export const getDevServer = (): string => {
    return secrets.DEVNET.HTTP;
}

export const getDevWsServer = (): string => {
    return secrets.DEVNET.WS;
}