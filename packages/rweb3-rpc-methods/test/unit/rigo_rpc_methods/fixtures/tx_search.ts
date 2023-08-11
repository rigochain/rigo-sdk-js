type TestData = [any, any];

export const testData: TestData[] = [

    [
        {
            query: "tx.height=1000",
            prove: false,
            page: 1,
            per_page: 10,
            order_by: "asc"
        }
        ,
        {"txs":[],"total_count":"0"}
    ]
];
