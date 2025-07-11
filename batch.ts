import type { NS } from "@ns"
import { getBestTarget, getHosts } from "./utils";

const calculateAvailableRAM = (ns: NS, host: string, scriptName: string) => Math.floor((ns.getServerMaxRam(host) - ns.getServerUsedRam(host)) / Math.max(1, ns.getScriptRam(scriptName, host)));



function runAction(ns: NS, host: string, scriptName: string, action: "hack" | "weaken" | "grow", target: string) {
    const availableRam = calculateAvailableRAM(ns, host, scriptName)
    if (!ns.fileExists(scriptName, host)) {
        ns.scp(scriptName, host);
    }
    if (availableRam > 0) {
        ns.exec(scriptName, host, availableRam, action, target);
    }

}
export async function main(ns: NS) {
    const hosts = getHosts(ns);
    const target = getBestTarget(ns);
    const scriptName = "HWGW.js"

    while (true) {
        for (const host of hosts) {
            runAction(ns, host, scriptName, "hack", target)
        }
        await ns.sleep(ns.getHackTime(target) + 5000)

        for (const host of hosts) {
            runAction(ns, host, scriptName, "weaken", target);
        }
        await ns.sleep(ns.getWeakenTime(target) + 5000)

        for (const host of hosts) {

            runAction(ns, host, scriptName, "grow", target)
        }
        await ns.sleep(ns.getGrowTime(target) + 5000)

        for (const host of hosts) {
            runAction(ns, host, scriptName, "weaken", target);
        }
        await ns.sleep(ns.getWeakenTime(target))
    }
}
