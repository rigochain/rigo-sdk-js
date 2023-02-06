export {};
declare global {
    interface Window {
        PrvKey: any; // 👈️ turn off type checking
        PubKey: any;
        ACNet: any;
        ACNetListener: any;
        Account: any;
        Trx: any;
        LocalSto: any;
        SessSto: any;
        Bytes: any;
        Time: any;
        Utils: any;


    }
}
