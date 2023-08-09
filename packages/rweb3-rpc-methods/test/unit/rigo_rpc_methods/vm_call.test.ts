import {RWeb3RequestManager} from 'rweb3-core';

import {rigoRpcMethods} from '../../../src/index';
import {Bytes} from "rweb3-utils";

describe('vmCall', () => {

    let requestManagerSendSpy: jest.Mock;
    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager('http://127.0.0.1:8545');
        requestManagerSendSpy = jest.fn();
        requestManager.send = requestManagerSendSpy;
    });

    it('should call requestManager.send with vmCall method', async () => {

        let addr = '0x1234';
        let to = '0x1234';
        let height = 1;
        let data = '0x1234';

        await rigoRpcMethods.vmCall(requestManager, addr, to, height, data);

        if (!addr.startsWith('0x')) {
            addr = '0x' + addr;
        }
        if (!to.startsWith('0x')) {
            to = '0x' + to;
        }

        expect(requestManagerSendSpy).toHaveBeenCalledWith({
            method: 'vm_call',
            params: {
                addr: addr,
                to: to,
                height: height.toString(10),
                data: Buffer.from(Bytes.fromHex(data)).toString('base64'),
            },
        });
    });
});