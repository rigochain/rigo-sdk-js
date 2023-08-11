import secrets from '../../../../.secrets.json';

export const getDevServer = (): string => {
    return secrets.DEVNET.HTTP;
}