import type { NS } from "@ns"
import { getAccessToServer, getBestTarget, getHosts } from "./utils";

export async function main(ns: NS) {
    const scriptName = "nuke-available.js"
    const hosts = getHosts(ns);
    ns.print(hosts.length);
    for (let i = 0; i < hosts.length; i++) {
        const target = hosts[i]
        if (!getAccessToServer(ns, target)) {
            hosts.splice(hosts.indexOf(target), 1)
            i--
        }
    }
    ns.print(hosts.length);
    const target = getBestTarget(ns);
    for (const host of hosts) {
        if (!ns.fileExists(scriptName, host)) {
            ns.scp(scriptName, host);
        }
        const runInfo = ns.getRunningScript(scriptName, host, ...hosts)
        if (runInfo != null) {
            ns.print(`Script is already running at ${host}`);
            continue;
        }
        const freeMemory = ns.getServerMaxRam(host) - ns.getServerUsedRam(host)
        const neededMemory = ns.getScriptRam(scriptName)
        const possibleThreads = Math.floor(freeMemory / neededMemory)
        if (freeMemory > neededMemory) {
            ns.exec(scriptName, host, possibleThreads, target);
            // ns.exec(scriptName, target, possibleThreads, target);
            // ns.exec(scriptName, target, possibleThreads, "max-hardware");
        }
    }
}
