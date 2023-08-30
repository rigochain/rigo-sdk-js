type TestData = [any, any];

export const testData: TestData[] = [

    [
        {}
        ,
        {
            "listening": true, "listeners": ["Listener(@)"], "n_peers": "1", "peers": [{
                "node_info": {
                    "protocol_version": {"p2p": "8", "block": "11", "app": "72057594275268382"},
                    "id": "a1c4ad6436f3253ad4da84babca187ac882b20c0",
                    "listen_addr": "tcp://0.0.0.0:26656",
                    "network": "devnet0",
                    "version": "0.34.20",
                    "channels": "40202122233038606100",
                    "moniker": "yd-sun-11",
                    "other": {"tx_index": "on", "rpc_address": "tcp://0.0.0.0:26657"}
                }, "is_outbound": false, "connection_status": {
                    "Duration": "243343963246234",
                    "SendMonitor": {
                        "Start": "2023-08-07T08:49:06.8Z",
                        "Bytes": "228535292",
                        "Samples": "658672",
                        "InstRate": "30",
                        "CurRate": "29",
                        "AvgRate": "939",
                        "PeakRate": "14400",
                        "BytesRem": "0",
                        "Duration": "243343960000000",
                        "Idle": "3340000000",
                        "TimeRem": "0",
                        "Progress": 0,
                        "Active": true
                    },
                    "RecvMonitor": {
                        "Start": "2023-08-07T08:49:06.8Z",
                        "Bytes": "210317490",
                        "Samples": "554394",
                        "InstRate": "0",
                        "CurRate": "2",
                        "AvgRate": "864",
                        "PeakRate": "13280",
                        "BytesRem": "0",
                        "Duration": "243343960000000",
                        "Idle": "3340000000",
                        "TimeRem": "0",
                        "Progress": 0,
                        "Active": true
                    },
                    "Channels": [{
                        "ID": 48,
                        "SendQueueCapacity": "1",
                        "SendQueueSize": "0",
                        "Priority": "5",
                        "RecentlySent": "0"
                    }, {
                        "ID": 64,
                        "SendQueueCapacity": "1000",
                        "SendQueueSize": "0",
                        "Priority": "5",
                        "RecentlySent": "0"
                    }, {
                        "ID": 32,
                        "SendQueueCapacity": "100",
                        "SendQueueSize": "0",
                        "Priority": "6",
                        "RecentlySent": "0"
                    }, {
                        "ID": 33,
                        "SendQueueCapacity": "100",
                        "SendQueueSize": "0",
                        "Priority": "10",
                        "RecentlySent": "0"
                    }, {
                        "ID": 34,
                        "SendQueueCapacity": "100",
                        "SendQueueSize": "0",
                        "Priority": "7",
                        "RecentlySent": "0"
                    }, {
                        "ID": 35,
                        "SendQueueCapacity": "2",
                        "SendQueueSize": "0",
                        "Priority": "1",
                        "RecentlySent": "216"
                    }, {
                        "ID": 56,
                        "SendQueueCapacity": "1",
                        "SendQueueSize": "0",
                        "Priority": "6",
                        "RecentlySent": "0"
                    }, {
                        "ID": 96,
                        "SendQueueCapacity": "10",
                        "SendQueueSize": "0",
                        "Priority": "5",
                        "RecentlySent": "0"
                    }, {
                        "ID": 97,
                        "SendQueueCapacity": "10",
                        "SendQueueSize": "0",
                        "Priority": "3",
                        "RecentlySent": "0"
                    }, {"ID": 0, "SendQueueCapacity": "10", "SendQueueSize": "0", "Priority": "1", "RecentlySent": "4"}]
                }, "remote_ip": "192.168.252.51"
            }]
        }
    ]
];
