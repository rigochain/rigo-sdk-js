import { AbiCoder } from '@ethersproject/abi';
import type { BigNumber } from '@ethersproject/bignumber';

const ethersAbiCoder = new AbiCoder((_, value) => {
    if ((value as BigNumber)?._isBigNumber) {
        return (value as BigNumber).toBigInt();
    }

    // Because of tye type def from @ethersproject/abi
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    return value;
});

export default ethersAbiCoder;
