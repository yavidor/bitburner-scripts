import type { NS } from "@ns"
export async function main(ns: NS) {
    const host = ns.args[0] as string
    while (true) {
        const timeToSleep = Math.max(ns.getGrowTime(host), ns.getWeakenTime(host), ns.getHackTime(host))
        ns.tprint((timeToSleep / 1000) + 20)
        ns.exec("copy-script.js", 'home')
        await ns.sleep(timeToSleep + 20)
    }
}
