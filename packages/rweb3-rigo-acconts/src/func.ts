import { RWeb3Account } from './types';
import { PrvKey, PubKey } from './tx/types';

export const create = (): RWeb3Account => {
    const prvKey = new PrvKey();
    return privateKeyToAccount(prvKey);
};

export const privateKeyToAccount = (prvKey: PrvKey): RWeb3Account => {
    const pubKey = new PubKey(prvKey);

    return {
        address: pubKey.toAddress().toHex(),
        prvKey: prvKey,
        pubKey: pubKey,
        privateKey: prvKey.export().toHex(),
    };
};
