type TestData = [any, any];
export const testData: TestData[] = [

    [
        {
            query: 'block.height < 1000 AND valset.changed > 0',
            page: 1,
            per_page: 10,
            order_by: 'asc'
        },
        {
            height: '10818',
            txs_results: null,
            begin_block_events: null,
            end_block_events: null,
            validator_updates: null,
            consensus_param_updates: null
        }
    ]
];
