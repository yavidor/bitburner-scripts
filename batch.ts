import type { NS } from "@ns"
import { getBestTarget, getHosts } from "./utils";

const calculateAvailableRAM = (ns: NS, host: string, scriptName: string) => Math.floor((ns.getServerMaxRam(host) - ns.getServerUsedRam(host)) / Math.max(1, ns.getScriptRam(scriptName, host)));


export async function main(ns: NS) {
    const hosts = getHosts(ns);
    const target = getBestTarget(ns);
    const scriptName = "HWG.js"

    for (const host of hosts) {
        const availableRam = calculateAvailableRAM(ns, host, scriptName)
        ns.tprint(`${host} -> ${availableRam}: weaken`);
        // if (!ns.fileExists(scriptName, host)) {
        ns.scp(scriptName, host);
        // }
        ns.exec(scriptName, host, availableRam, "weaken", target);
    }
    await ns.sleep(ns.getWeakenTime(target) + 5000)

    for (const host of hosts) {
        const availableRam = calculateAvailableRAM(ns, host, scriptName);
        ns.tprint(`${host} -> ${availableRam}`);
        ns.exec(scriptName, host, availableRam, "hack", target);

    }

    await ns.sleep(ns.getHackTime(target) + 5000)
    for (const host of hosts) {
        const availableRam = calculateAvailableRAM(ns, host, scriptName)
        ns.exec(scriptName, host, availableRam, "grow", target);
    }

    await ns.sleep(ns.getGrowTime(target) + 5000)
    for (const host of hosts) {
        const availableRam = calculateAvailableRAM(ns, host, scriptName)
        ns.exec(scriptName, host, availableRam, "weaken", target);
    }

    await ns.sleep(ns.getWeakenTime(target))
}
