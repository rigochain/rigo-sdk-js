type TestData = [any, any];
export const testData: TestData[] = [

    [
        {},
        {
            node_info: {
                protocol_version: { p2p: '8', block: '11', app: '72057594275268382' },
                id: '097c840d46dd4f343321a44f5de5608c961f0cc1',
                listen_addr: 'tcp://0.0.0.0:26656',
                network: 'devnet0',
                version: '0.34.20',
                channels: '40202122233038606100',
                moniker: 'yd-sun-20',
                other: { tx_index: 'on', rpc_address: 'tcp://0.0.0.0:26657' }
            },
            sync_info: {
                latest_block_hash: '2C8F15F6AFC8FCC789A7AA801ECC74FBB792FC38C3CC969C7D8572BD9D75DCEC',
                latest_app_hash: '40F9110FBAC3FAF351D2A181E0C3B5CD0C9C9D7DEDB5074049AFF659AA5CAF9E',
                latest_block_height: '3433784',
                latest_block_time: '2023-08-10T02:33:05.936352699Z',
                earliest_block_hash: 'CF9106A409331835C9D85280DD5FB60ADDCFAE532C9E2C3CE5BFDA050E597933',
                earliest_app_hash: '3819024FBAA3F205DCF84209568ED7E5343D2798A879AEFAD7EF8683342B46E9',
                earliest_block_height: '1',
                earliest_block_time: '2023-06-14T05:58:07.426462288Z',
                catching_up: false
            },
            validator_info: {
                address: '735DC3FC8BCCFD7810BCC14DB49234C1BCE7758B',
                pub_key: {
                    type: 'tendermint/PubKeySecp256k1',
                    value: 'A/AV2ZiRERgkTb1n7e3Q2Fm+1F4YhxG/4CNxVHmrdcUU'
                },
                voting_power: '91000051'
            }
        }
    ]
];
