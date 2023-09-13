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
import { Contract } from '../../src';
import erc20Json from '../fixtures/erc20-abi.json';
import { getTestProposalAccountPrivateKey, getTestWsServer } from './e2e_utils';
import WebsocketProvider from '@rigo/rweb3-providers-ws';
import { privateKeyToAccount, RWeb3Account } from '@rigo/rweb3-rigo-accounts';

describe('deploy test', () => {
    it('deploy function', (done) => {
        const erc20Contract = new Contract(erc20Json);
        erc20Contract.setProvider(new WebsocketProvider(getTestWsServer()));

        const rweb3account: RWeb3Account = privateKeyToAccount(getTestProposalAccountPrivateKey());

        erc20Contract
            .deploy(
                '60806040523480156200001157600080fd5b506040518060400160405280601381526020017f4241452053554e4720444f4e4720544f4b454e000000000000000000000000008152506040518060400160405280600381526020017f425344000000000000000000000000000000000000000000000000000000000081525081600390816200008f9190620004ba565b508060049081620000a19190620004ba565b505050620000c3336c01431e0fae6d7217caa0000000620000c960201b60201c565b620006bc565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036200013b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620001329062000602565b60405180910390fd5b6200014f600083836200023660201b60201c565b806002600082825462000163919062000653565b92505081905550806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040516200021691906200069f565b60405180910390a362000232600083836200023b60201b60201c565b5050565b505050565b505050565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680620002c257607f821691505b602082108103620002d857620002d76200027a565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302620003427fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8262000303565b6200034e868362000303565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b60006200039b620003956200038f8462000366565b62000370565b62000366565b9050919050565b6000819050919050565b620003b7836200037a565b620003cf620003c682620003a2565b84845462000310565b825550505050565b600090565b620003e6620003d7565b620003f3818484620003ac565b505050565b5b818110156200041b576200040f600082620003dc565b600181019050620003f9565b5050565b601f8211156200046a576200043481620002de565b6200043f84620002f3565b810160208510156200044f578190505b620004676200045e85620002f3565b830182620003f8565b50505b505050565b600082821c905092915050565b60006200048f600019846008026200046f565b1980831691505092915050565b6000620004aa83836200047c565b9150826002028217905092915050565b620004c58262000240565b67ffffffffffffffff811115620004e157620004e06200024b565b5b620004ed8254620002a9565b620004fa8282856200041f565b600060209050601f8311600181146200053257600084156200051d578287015190505b6200052985826200049c565b86555062000599565b601f1984166200054286620002de565b60005b828110156200056c5784890151825560018201915060208501945060208101905062000545565b868310156200058c578489015162000588601f8916826200047c565b8355505b6001600288020188555050505b505050505050565b600082825260208201905092915050565b7f45524332303a206d696e7420746f20746865207a65726f206164647265737300600082015250565b6000620005ea601f83620005a1565b9150620005f782620005b2565b602082019050919050565b600060208201905081810360008301526200061d81620005db565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000620006608262000366565b91506200066d8362000366565b925082820190508082111562000688576200068762000624565b5b92915050565b620006998162000366565b82525050565b6000602082019050620006b660008301846200068e565b92915050565b6115df80620006cc6000396000f3fe608060405234801561001057600080fd5b50600436106100cf5760003560e01c806342966c681161008c57806395d89b411161006657806395d89b4114610226578063a457c2d714610244578063a9059cbb14610274578063dd62ed3e146102a4576100cf565b806342966c68146101be57806370a08231146101da57806379cc67901461020a576100cf565b806306fdde03146100d4578063095ea7b3146100f257806318160ddd1461012257806323b872dd14610140578063313ce56714610170578063395093511461018e575b600080fd5b6100dc6102d4565b6040516100e99190610d6b565b60405180910390f35b61010c60048036038101906101079190610e26565b610366565b6040516101199190610e81565b60405180910390f35b61012a610389565b6040516101379190610eab565b60405180910390f35b61015a60048036038101906101559190610ec6565b610393565b6040516101679190610e81565b60405180910390f35b6101786103c2565b6040516101859190610f35565b60405180910390f35b6101a860048036038101906101a39190610e26565b6103cb565b6040516101b59190610e81565b60405180910390f35b6101d860048036038101906101d39190610f50565b610402565b005b6101f460048036038101906101ef9190610f7d565b610416565b6040516102019190610eab565b60405180910390f35b610224600480360381019061021f9190610e26565b61045e565b005b61022e61047e565b60405161023b9190610d6b565b60405180910390f35b61025e60048036038101906102599190610e26565b610510565b60405161026b9190610e81565b60405180910390f35b61028e60048036038101906102899190610e26565b610587565b60405161029b9190610e81565b60405180910390f35b6102be60048036038101906102b99190610faa565b6105aa565b6040516102cb9190610eab565b60405180910390f35b6060600380546102e390611019565b80601f016020809104026020016040519081016040528092919081815260200182805461030f90611019565b801561035c5780601f106103315761010080835404028352916020019161035c565b820191906000526020600020905b81548152906001019060200180831161033f57829003601f168201915b5050505050905090565b600080610371610631565b905061037e818585610639565b600191505092915050565b6000600254905090565b60008061039e610631565b90506103ab858285610802565b6103b685858561088e565b60019150509392505050565b60006012905090565b6000806103d6610631565b90506103f78185856103e885896105aa565b6103f29190611079565b610639565b600191505092915050565b61041361040d610631565b82610b04565b50565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6104708261046a610631565b83610802565b61047a8282610b04565b5050565b60606004805461048d90611019565b80601f01602080910402602001604051908101604052809291908181526020018280546104b990611019565b80156105065780601f106104db57610100808354040283529160200191610506565b820191906000526020600020905b8154815290600101906020018083116104e957829003601f168201915b5050505050905090565b60008061051b610631565b9050600061052982866105aa565b90508381101561056e576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105659061111f565b60405180910390fd5b61057b8286868403610639565b60019250505092915050565b600080610592610631565b905061059f81858561088e565b600191505092915050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600033905090565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036106a8576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161069f906111b1565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610717576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161070e90611243565b60405180910390fd5b80600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925836040516107f59190610eab565b60405180910390a3505050565b600061080e84846105aa565b90507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8114610888578181101561087a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610871906112af565b60405180910390fd5b6108878484848403610639565b5b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036108fd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108f490611341565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160361096c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610963906113d3565b60405180910390fd5b610977838383610cd1565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050818110156109fd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109f490611465565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610aeb9190610eab565b60405180910390a3610afe848484610cd6565b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610b73576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b6a906114f7565b60405180910390fd5b610b7f82600083610cd1565b60008060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015610c05576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610bfc90611589565b60405180910390fd5b8181036000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555081600260008282540392505081905550600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610cb89190610eab565b60405180910390a3610ccc83600084610cd6565b505050565b505050565b505050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610d15578082015181840152602081019050610cfa565b60008484015250505050565b6000601f19601f8301169050919050565b6000610d3d82610cdb565b610d478185610ce6565b9350610d57818560208601610cf7565b610d6081610d21565b840191505092915050565b60006020820190508181036000830152610d858184610d32565b905092915050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610dbd82610d92565b9050919050565b610dcd81610db2565b8114610dd857600080fd5b50565b600081359050610dea81610dc4565b92915050565b6000819050919050565b610e0381610df0565b8114610e0e57600080fd5b50565b600081359050610e2081610dfa565b92915050565b60008060408385031215610e3d57610e3c610d8d565b5b6000610e4b85828601610ddb565b9250506020610e5c85828601610e11565b9150509250929050565b60008115159050919050565b610e7b81610e66565b82525050565b6000602082019050610e966000830184610e72565b92915050565b610ea581610df0565b82525050565b6000602082019050610ec06000830184610e9c565b92915050565b600080600060608486031215610edf57610ede610d8d565b5b6000610eed86828701610ddb565b9350506020610efe86828701610ddb565b9250506040610f0f86828701610e11565b9150509250925092565b600060ff82169050919050565b610f2f81610f19565b82525050565b6000602082019050610f4a6000830184610f26565b92915050565b600060208284031215610f6657610f65610d8d565b5b6000610f7484828501610e11565b91505092915050565b600060208284031215610f9357610f92610d8d565b5b6000610fa184828501610ddb565b91505092915050565b60008060408385031215610fc157610fc0610d8d565b5b6000610fcf85828601610ddb565b9250506020610fe085828601610ddb565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061103157607f821691505b60208210810361104457611043610fea565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061108482610df0565b915061108f83610df0565b92508282019050808211156110a7576110a661104a565b5b92915050565b7f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760008201527f207a65726f000000000000000000000000000000000000000000000000000000602082015250565b6000611109602583610ce6565b9150611114826110ad565b604082019050919050565b60006020820190508181036000830152611138816110fc565b9050919050565b7f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b600061119b602483610ce6565b91506111a68261113f565b604082019050919050565b600060208201905081810360008301526111ca8161118e565b9050919050565b7f45524332303a20617070726f766520746f20746865207a65726f20616464726560008201527f7373000000000000000000000000000000000000000000000000000000000000602082015250565b600061122d602283610ce6565b9150611238826111d1565b604082019050919050565b6000602082019050818103600083015261125c81611220565b9050919050565b7f45524332303a20696e73756666696369656e7420616c6c6f77616e6365000000600082015250565b6000611299601d83610ce6565b91506112a482611263565b602082019050919050565b600060208201905081810360008301526112c88161128c565b9050919050565b7f45524332303a207472616e736665722066726f6d20746865207a65726f20616460008201527f6472657373000000000000000000000000000000000000000000000000000000602082015250565b600061132b602583610ce6565b9150611336826112cf565b604082019050919050565b6000602082019050818103600083015261135a8161131e565b9050919050565b7f45524332303a207472616e7366657220746f20746865207a65726f206164647260008201527f6573730000000000000000000000000000000000000000000000000000000000602082015250565b60006113bd602383610ce6565b91506113c882611361565b604082019050919050565b600060208201905081810360008301526113ec816113b0565b9050919050565b7f45524332303a207472616e7366657220616d6f756e742065786365656473206260008201527f616c616e63650000000000000000000000000000000000000000000000000000602082015250565b600061144f602683610ce6565b915061145a826113f3565b604082019050919050565b6000602082019050818103600083015261147e81611442565b9050919050565b7f45524332303a206275726e2066726f6d20746865207a65726f2061646472657360008201527f7300000000000000000000000000000000000000000000000000000000000000602082015250565b60006114e1602183610ce6565b91506114ec82611485565b604082019050919050565b60006020820190508181036000830152611510816114d4565b9050919050565b7f45524332303a206275726e20616d6f756e7420657863656564732062616c616e60008201527f6365000000000000000000000000000000000000000000000000000000000000602082015250565b6000611573602283610ce6565b915061157e82611517565b604082019050919050565b600060208201905081810360008301526115a281611566565b905091905056fea2646970667358221220f8b355259afd1cc9b99186e33a8ed61220330cfc97e3065fa6857814969e8cb764736f6c63430008120033',
                [],
                rweb3account,
            )
            .send()
            .then((res) => {
                console.log(res);
                done();
            })
            .catch((err) => {
                console.log(err);
            });
    });
});
