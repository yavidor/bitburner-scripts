import type { NS } from "@ns"
import { getBestTarget, getHosts } from "./utils";
const calculateAvailableRAM = (ns: NS, host: string, scriptName: string) => Math.floor((ns.getServerMaxRam(host) - ns.getServerUsedRam(host)) / Math.max(1, ns.getScriptRam(scriptName, host)));

async function runAction(ns: NS, host: string, scriptName: string, action: "hack" | "weaken" | "grow", target: string) {
    const availableRam = calculateAvailableRAM(ns, host, scriptName)
    ns.scp(scriptName, host);
    await ns.sleep(1);
    ns.print(`host: ${host} has ${availableRam}`)
    if (availableRam > 0) {
        ns.exec(scriptName, host, availableRam, action, target);
    }
}
export async function main(ns: NS) {
    const start = Date.now();
    const target = ns.args.length > 0 ? ns.args[0] as string : getBestTarget(ns);
    const hosts = ["home", ...getHosts(ns), ...ns.getPurchasedServers()];
    const scriptName = "HWG.js"
    ns.disableLog("getServerMaxRam")
    ns.disableLog("getServerUsedRam")
    ns.disableLog("exec")
    ns.disableLog("getServerMinSecurityLevel")
    while (ns.getServerSecurityLevel(target) > ns.getServerMinSecurityLevel(target)) {
        for (const host of hosts) {
            await runAction(ns, host, scriptName, "weaken", target)
        }
        await ns.sleep(ns.getWeakenTime(target))
    }

    while (ns.getServerMoneyAvailable(target) < ns.getServerMaxMoney(target)) {
        for (let i = 0; i < 3; i++) {
            for (const host of hosts) {
                await runAction(ns, host, scriptName, "grow", target)
            }
            await ns.sleep(ns.getGrowTime(target) + 5000)
        }

        for (const host of hosts) {
            await runAction(ns, host, scriptName, "weaken", target)

        }
        await ns.sleep(ns.getWeakenTime(target) + 5000)

    }
    const end = Date.now();
    ns.print(`Prepping ${target} took ${(end - start) * 1000 * 60} minutes`)
}
