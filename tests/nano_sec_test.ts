import {hrtime} from "node:process";

function getNanoTime(): bigint {
    const tm = hrtime.bigint()
    return tm
}

function getNanoTime0(): number {
    const tm = hrtime()
    return tm[0] * 1000000000 + tm[1]
}
function getMilliSeconds(): number {
    return Date.now()
}

console.log(hrtime())
console.log(getMilliSeconds().toString(10))
console.log(getNanoTime().toString(10))
console.log(getNanoTime0().toString(10))
console.log(Number.MAX_SAFE_INTEGER)
