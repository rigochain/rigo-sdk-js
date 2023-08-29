// import RWeb3 from '../src/rpc/rweb3';
// import fs from 'fs';
// import Account from '../src/account/account';
// import Bytes from '../src/utils/bytes';
// import BN from 'bn.js';
//
// const rweb3 = new RWeb3('http://192.168.252.60:26657');
// deloyTest().then(() => console.log('deploy end'));
// executeTest().then(() => console.log('execute end'));
// queryTest().then(() => console.log('query end'));
// getContractAddressTest().then(() => console.log('get contract address end'));
// async function executeTest() {
//     const keyBytes = Bytes.fromHex(
//         '2b14bf840ade828e8548a993307050e4d96cb2a580fdfd63d8e40c5cee1e3deb',
//     );
//     const importUser: Account = await Account.Import('contractTest', '1234', keyBytes, '1234');
//     await rweb3.syncAccount(importUser);
//
//     const jsonInterface = JSON.parse(fs.readFileSync('./erc20_test_contract.json', 'utf-8'));
//     const contract = rweb3.createContract(
//         jsonInterface.abi,
//         'fd4d3b0f16c74cd236ad8761309d51ef92ca880b',
//     );
//     const result = await contract.execute(importUser, 'transfer', [
//         '280057599c3975537bb8ad42343078d879384436',
//         BigInt('100'),
//     ]);
//     console.log(result);
// }
//
// async function deloyTest() {
//     const keyBytes = Bytes.fromHex(
//         '2b14bf840ade828e8548a993307050e4d96cb2a580fdfd63d8e40c5cee1e3deb',
//     );
//     const importUser: Account = await Account.Import('contractTest', '1234', keyBytes, '1234');
//     await rweb3.syncAccount(importUser);
//
//     const jsonInterface = JSON.parse(fs.readFileSync('./erc20_test_contract.json', 'utf-8'));
//     const contract = rweb3.createContract(jsonInterface.abi);
//
//     const result = await contract.deploy(importUser, jsonInterface.bytecode, ['testToken', 'TST']);
//     console.log(result);
// }
//
// async function queryTest() {
//     const keyBytes = Bytes.fromHex(
//         '2b14bf840ade828e8548a993307050e4d96cb2a580fdfd63d8e40c5cee1e3deb',
//     );
//     const importUser: Account = await Account.Import('contractTest', '1234', keyBytes, '1234');
//     await rweb3.syncAccount(importUser);
//
//     const jsonInterface = JSON.parse(fs.readFileSync('./erc20_test_contract.json', 'utf-8'));
//     const contract = rweb3.createContract(
//         jsonInterface.abi,
//         'fd4d3b0f16c74cd236ad8761309d51ef92ca880b',
//     );
//     const result = await contract.query(importUser, 'balanceOf', [
//         '280057599c3975537bb8ad42343078d879384436',
//     ]);
//     //const result = await contract.query(importUser, 'name');
//     console.log(result);
//     console.log(new BN(result.value.returnData, 16).toString());
// }
//
// async function getContractAddressTest() {
//     const contract = rweb3.createContract();
//     const addr = await contract.getContractAddress(
//         '58CCD2E88047D44D9C79496ED6A31E9A49E26FF1CDE2B3268F0555107081B347',
//     );
//     console.log(addr);
// }
