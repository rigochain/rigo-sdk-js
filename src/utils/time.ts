import Long from "long";

export function getNanoSecond():Long {
    return Long.fromNumber(Date.now()).mul(1000000) // its over Number.MAX_SAFE_...
}

export function fromNanoSecond(nsec: Long): number {
    return nsec.div(1000000).toNumber()
}


export function dateFromNano(nsec: string|Long):string {
    if (typeof nsec === 'string') {
        nsec = Long.fromString(nsec)
    }
    let msec = fromNanoSecond(nsec)
    return new Date(msec).toLocaleString();
}