import {AbciInfo, ResponseData} from 'rweb3-types';

type TestData = [ResponseData<AbciInfo>];

export const testData: TestData[] = [

    [
        {
            "response": {
                "version": "0.17.0",
                "app_version": "72057594050421542",
                "last_block_height": "3379500",
                "last_block_app_hash": "yNh9fTdyyLY/+y4jbV7bVRztWCtzmW906AUt8wEysqA="
            }
        }
    ]
];
