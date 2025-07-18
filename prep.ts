import type { NS } from "@ns"
import { getBestTarget, getHosts } from "./utils";
const calculateAvailableRAM = (ns: NS, host: string, scriptName: string) => Math.floor((ns.getServerMaxRam(host) - ns.getServerUsedRam(host)) / Math.max(1, ns.getScriptRam(scriptName, host)));

async function runAction(ns: NS, host: string, scriptName: string, action: "hack" | "weaken" | "grow", target: string): Promise<number> {
    const availableRam = calculateAvailableRAM(ns, host, scriptName)
    const fileExists = ns.fileExists(scriptName, host)
    ns.scp(scriptName, host);
    if (!fileExists) {
        await ns.sleep(1000);
    }
    ns.print(`host: ${host} has ${availableRam}`)
    if (availableRam > 0) {
        ns.exec(scriptName, host, availableRam, action, target);
        return availableRam;
    }
    return 0;
}
export async function main(ns: NS) {
    const start = Date.now();
    const target = ns.args.length > 0 ? ns.args[0] as string : getBestTarget(ns);
    const scriptName = "HWG.js"
    ns.disableLog("getServerMaxRam")
    ns.disableLog("getServerUsedRam")
    ns.disableLog("exec")
    ns.disableLog("getServerMinSecurityLevel")
    while (ns.getServerSecurityLevel(target) > ns.getServerMinSecurityLevel(target)) {
        const hosts = ["home", ...getHosts(ns), ...ns.getPurchasedServers()];
        for (const host of hosts) {
            await runAction(ns, host, scriptName, "weaken", target)
        }
        await ns.sleep(ns.getWeakenTime(target))
    }
    while (ns.getServerMoneyAvailable(target) < ns.getServerMaxMoney(target)) {
        const hosts = ["home", ...getHosts(ns), ...ns.getPurchasedServers()];
        for (let i = 0; i < 3; i++) {
            if (ns.getServerMoneyAvailable(target) === ns.getServerMaxMoney(target)) {
                ns.tprint("FInished")
                break;
            }
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
    ns.print(`Prepping ${target} took ${(end - start) / 1000 / 60} minutes`)
}
