export {};
declare global {
    interface Window {
        PrvKey: any; // 👈️ turn off type checking
        PubKey: any;
        ACNRPC: any;
        ACNEvent: any;
        Account: any;
        TrxBuilder: any;
        LocalSto: any;
        SessSto: any;
        Bytes: any;
        Time: any;
        Utils: any;


    }
}
