import type { NS } from "@ns";
import { getBestTarget, getHosts } from "./utils";
const calculateAvailableRAM = (ns: NS, host: string, scriptName: string) =>
    Math.floor((ns.getServerMaxRam(host) - ns.getServerUsedRam(host)) / Math.max(1, ns.getScriptRam(scriptName, host)));

async function runAction(
    ns: NS,
    host: string,
    scriptName: string,
    action: "hack" | "weaken" | "grow",
    target: string,
): Promise<number> {
    const availableRam = calculateAvailableRAM(ns, host, scriptName);
    const fileExists = ns.fileExists(scriptName, host);
    ns.scp(scriptName, host);
    if (!fileExists) {
        await ns.sleep(5000);
    }
    ns.print(`host: ${host} has ${availableRam}`);
    if (availableRam > 0) {
        //If running on home keep half the ram available for other uses
        ns.exec(scriptName, host, host === "home" ? Math.floor(availableRam * 0.9) : availableRam, action, target);
        return availableRam;
    }
    return 0;
}
export async function main(ns: NS) {
    const start = Date.now();
    const target = ns.args.length > 0 ? (ns.args[0] as string) : getBestTarget(ns);
    ns.tprint(target);
    const scriptName = "HWG.js";
    ns.disableLog("getServerMaxRam");
    ns.disableLog("getServerUsedRam");
    ns.disableLog("exec");
    ns.disableLog("getServerMinSecurityLevel");
    while (ns.getServerSecurityLevel(target) > ns.getServerMinSecurityLevel(target)) {
        const hosts = ["home", ...getHosts(ns), ...ns.getPurchasedServers()];
        for (const host of hosts) {
            await runAction(ns, host, scriptName, "weaken", target);
        }
        await ns.sleep(ns.getWeakenTime(target));
    }
    while (ns.getServerMoneyAvailable(target) < ns.getServerMaxMoney(target)) {
        const hosts = ["home", ...getHosts(ns), ...ns.getPurchasedServers()];
        let counter = 0;
        for (const host of hosts) {
            counter += await runAction(ns, host, scriptName, "grow", target);
        }
        ns.print(`Running "grow" with ${counter} threads`);
        await ns.sleep(ns.getGrowTime(target) + 5000);

        for (const host of hosts) {
            await runAction(ns, host, scriptName, "weaken", target);
            ns.print(`Running "weaken" with ${counter} threads`);
        }
        await ns.sleep(ns.getWeakenTime(target) + 5000);
    }
    const end = Date.now();
    ns.print(`Prepping ${target} took ${(end - start) / 1000 / 60} minutes`);
    ns.print("Running batch.js");
    ns.exec("batch.js", "home", undefined, target);
}
