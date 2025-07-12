import type { NS } from "@ns"
import { getHosts } from "./utils";
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
    const start = Date.now();
    const target = ns.args[0] as string;
    const hosts = ["home", ...getHosts(ns)];
    const scriptName = "HWG.js"
    ns.disableLog("getServerMaxRam")
    ns.disableLog("getUsedMaxRam")
    while (ns.getServerSecurityLevel(target) > ns.getServerMinSecurityLevel(target)) {
        for (const host of hosts) {
            runAction(ns, host, scriptName, "weaken", target)
        }
        await ns.sleep(ns.getWeakenTime(target))
    }
    while (ns.getServerMoneyAvailable(target) < ns.getServerMaxMoney(target)) {
        for (const host of hosts) {
            runAction(ns, host, scriptName, "grow", target)
        }
        ns.tprint("&")
        await ns.sleep(ns.getGrowTime(target))
        ns.tprint("Hello??")


        for (const host of hosts) {
            runAction(ns, host, scriptName, "weaken", target)
        }
        await ns.sleep(ns.getWeakenTime(target))

    }
    const end = Date.now();
    ns.tprint(`Prepping ${target} took ${(end - start) * 1000 * 60} minutes`)
}
