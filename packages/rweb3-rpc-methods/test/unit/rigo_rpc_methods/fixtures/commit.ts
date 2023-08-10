type TestData = [any, any];

export const testData: TestData[] = [

    [
        {
            height: 1,
        }
        ,
        {
            "signed_header": {
                "header": {
                    "version": {"block": "11", "app": "72057594275268382"},
                    "chain_id": "devnet0",
                    "height": "1",
                    "time": "2023-06-14T05:58:07.426462288Z",
                    "last_block_id": {"hash": "", "parts": {"total": 0, "hash": ""}},
                    "last_commit_hash": "E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855",
                    "data_hash": "E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855",
                    "validators_hash": "ABFD19C072132D34A201092B4D7E6459D25190F6A4B4512B916775718F1047BB",
                    "next_validators_hash": "ABFD19C072132D34A201092B4D7E6459D25190F6A4B4512B916775718F1047BB",
                    "consensus_hash": "048091BC7DDC283F77BFBF91D73C44DA58C3DF8A9CBC867405D8B7F3DAADA22F",
                    "app_hash": "3819024FBAA3F205DCF84209568ED7E5343D2798A879AEFAD7EF8683342B46E9",
                    "last_results_hash": "E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855",
                    "evidence_hash": "E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855",
                    "proposer_address": "735DC3FC8BCCFD7810BCC14DB49234C1BCE7758B"
                },
                "commit": {
                    "height": "1",
                    "round": 0,
                    "block_id": {
                        "hash": "CF9106A409331835C9D85280DD5FB60ADDCFAE532C9E2C3CE5BFDA050E597933",
                        "parts": {
                            "total": 1,
                            "hash": "B7D9ABBC615AA74406E8D14548A20780CA62D7C4E5629AE51CC40959C05E2155"
                        }
                    },
                    "signatures": [{
                        "block_id_flag": 2,
                        "validator_address": "735DC3FC8BCCFD7810BCC14DB49234C1BCE7758B",
                        "timestamp": "2023-06-14T05:58:41.860481166Z",
                        "signature": "H7RMiaecAM1muiqE9GqXNI16IgDetfHGHEozYrMJjvcTiFgOTroLgKor2lVBwQ1DQTub+lGJZA1xF+Qim91N0w=="
                    }]
                }
            }, "canonical": true
        }
    ]
];
