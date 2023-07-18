export interface RWeb3ConfigOptions {
}

export abstract class RWeb3Config implements RWeb3ConfigOptions {

    public config: RWeb3ConfigOptions = {
        handleRevert: false,
        defaultAccount: undefined,
        defaultBlock: 'latest'
    };

    public constructor(options?: Partial<RWeb3ConfigOptions>) {
        this.setConfig(options ?? {});
    }

    public setConfig(options: Partial<RWeb3ConfigOptions>) {
        // TODO: Improve and add key check
        Object.assign(this.config, options);
    }
}
