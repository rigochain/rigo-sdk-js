import { RWeb3 } from '../../../src';
import { getDevServer } from '../e2e_utils';
import { BlockchainResponse } from 'rweb3-types';

describe('blockchain check ', () => {
    let devServerRWeb3Instance: RWeb3;

    beforeAll(() => {
        devServerRWeb3Instance = new RWeb3(getDevServer());
    });

    it('should call rweb3 with devServerRWeb3Instance.blockchain method success return', async () => {
        let blockchainResponse: BlockchainResponse = await devServerRWeb3Instance.rigo.blockchain();
        console.log(blockchainResponse);
    });
});
