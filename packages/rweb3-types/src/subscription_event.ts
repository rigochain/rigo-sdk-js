export interface SubscriptionEvent {
    readonly query: string;
    readonly data: {
        readonly type: string;
        readonly value: any;
    };
}
