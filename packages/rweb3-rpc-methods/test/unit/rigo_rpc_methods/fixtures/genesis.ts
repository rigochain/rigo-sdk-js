type TestData = [any, any];

export const testData: TestData[] = [

    [
        {}
        ,
        {
            "genesis": {
                "genesis_time": "2023-06-14T05:58:07.426462288Z",
                "chain_id": "devnet0",
                "initial_height": "1",
                "consensus_params": {
                    "block": {"max_bytes": "22020096", "max_gas": "-1", "time_iota_ms": "1000"},
                    "evidence": {
                        "max_age_num_blocks": "100000",
                        "max_age_duration": "172800000000000",
                        "max_bytes": "1048576"
                    },
                    "validator": {"pub_key_types": ["secp256k1"]},
                    "version": {"app_version": "1"}
                },
                "validators": [{
                    "address": "735DC3FC8BCCFD7810BCC14DB49234C1BCE7758B",
                    "pub_key": {
                        "type": "tendermint/PubKeySecp256k1",
                        "value": "A/AV2ZiRERgkTb1n7e3Q2Fm+1F4YhxG/4CNxVHmrdcUU"
                    },
                    "power": "10",
                    "name": ""
                }],
                "app_hash": "3819024FBAA3F205DCF84209568ED7E5343D2798A879AEFAD7EF8683342B46E9",
                "app_state": {
                    "assetHolders": [{
                        "address": "A4B669A210D23CBA482BAAF7F8312D5EEAE81D03",
                        "balance": "0x52b7d2dcc80cd2e4000000"
                    }, {
                        "address": "C4848054E3F389F8F22C7CC483CE815305006C75",
                        "balance": "0x52b7d2dcc80cd2e4000000"
                    }, {
                        "address": "387DE48998B18C6482E3F3C3F9A1205691D0D326",
                        "balance": "0x52b7d2dcc80cd2e4000000"
                    }, {
                        "address": "7FAA095DC06C04C574FD9D8ED80E6EB0A13ECFD5",
                        "balance": "0x52b7d2dcc80cd2e4000000"
                    }, {
                        "address": "9B25733D70419CAED0BAA22532D94394AF1EA1EF",
                        "balance": "0x52b7d2dcc80cd2e4000000"
                    }, {
                        "address": "80268AD343E02271D692C2C53B2F94BD34FC574D",
                        "balance": "0x52b7d2dcc80cd2e4000000"
                    }, {
                        "address": "15D662FF79112D5D0CC3BAB0F9E1ECAC46E81583",
                        "balance": "0x52b7d2dcc80cd2e4000000"
                    }, {
                        "address": "AB51265812285B0263B13883AA22380208A0487B",
                        "balance": "0x52b7d2dcc80cd2e4000000"
                    }, {
                        "address": "072EA71425ABCAA35F50430BC85FB30B8555AB73",
                        "balance": "0x52b7d2dcc80cd2e4000000"
                    }, {"address": "735DC3FC8BCCFD7810BCC14DB49234C1BCE7758B", "balance": "0x52b7d2dcc80cd2e4000000"}],
                    "govRule": {
                        "version": "1",
                        "maxValidatorCnt": "21",
                        "minValidatorStake": "0x5ca4ec2a79a7f67000000",
                        "rewardPerPower": "4756468797",
                        "lazyRewardBlocks": "2592000",
                        "lazyApplyingBlocks": "259200",
                        "gasPrice": "0x3b9aca00",
                        "minTrxFee": "0x38d7ea4c68000",
                        "minVotingPeriodBlocks": "259200",
                        "maxVotingPeriodBlocks": "2592000",
                        "minSelfStakeRatio": "50",
                        "maxUpdatableStakeRatio": "30",
                        "slashRatio": "50"
                    }
                }
            }
        }
    ]
];
