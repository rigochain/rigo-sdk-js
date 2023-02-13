import Long from "long";

export function getNanoSecond(dt?: Date):Long {
    if (!dt) {
        dt = new Date()
    }
    return Long.fromNumber(dt.getTime()).mul(1000000) // its over Number.MAX_SAFE_...
}

export function fromNanoSecond(nsec: Long): Date {
    const tmstp = nsec.div(1000000).toNumber()
    return new Date(tmstp)
}
