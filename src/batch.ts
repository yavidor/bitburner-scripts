import type { NS } from "@ns";
import { getBestTarget, getHosts } from "./utils";

const calculateAvailableRAM = (ns: NS, host: string, scriptName: string) =>
    Math.floor((ns.getServerMaxRam(host) - ns.getServerUsedRam(host)) / Math.max(1, ns.getScriptRam(scriptName, host)));

function runAction(
    ns: NS,
    host: string,
    scriptName: string,
    ram: number,
    action: "hack" | "weaken" | "grow",
    target: string,
    waitTime: number,
) {
    ns.print(`host: ${host}\nram: ${ram}\naction: ${action}\nwaitTime: ${waitTime}`);
    ns.scp(scriptName, host);
    if (ram > 0) {
        ns.exec(scriptName, host, host === "home" ? Math.floor(ram * 0.9) : ram, action, target, waitTime);
    }
}
export async function main(ns: NS) {
    const hosts = ["home", ...getHosts(ns), ...ns.getPurchasedServers()];
    const target = ns.args.length > 0 ? (ns.args[0] as string) : getBestTarget(ns);
    const scriptName = "HWG.js";
    ns.disableLog("*");
    for (const host of hosts) {
        const availableRam = calculateAvailableRAM(ns, host, scriptName);
        const quarterRam = Math.floor(availableRam / 4);
        const weakenTime = ns.getWeakenTime(target);
        const growTime = ns.getGrowTime(target);
        const hackTime = ns.getHackTime(target);
        runAction(ns, host, scriptName, 20, "hack", target, weakenTime - hackTime);
        runAction(ns, host, scriptName, quarterRam, "weaken", target, 0);
        runAction(ns, host, scriptName, quarterRam, "grow", target, weakenTime - growTime);
        runAction(ns, host, scriptName, quarterRam, "weaken", target, 0);
    }
}
