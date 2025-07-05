import type { NS } from "@ns"
import { getAccessToServer, getHosts } from "./utils";

export async function main(ns: NS) {
    const scriptName = "nuke-available.ts"
    const targets = getHosts(ns);
    ns.print(targets.length);
    for (const target of targets) {
        if (!getAccessToServer(ns, target)) {
            continue
        }
        if (!ns.fileExists(scriptName, target)) {
            ns.scp(scriptName, target);
        }
        const runInfo = ns.getRunningScript(scriptName, target, ...targets)
        if (runInfo != null) {
            ns.print(`Script is already running at ${target}`);
            continue;
        }
        const freeMemory = ns.getServerMaxRam(target) - ns.getServerUsedRam(target)
        const neededMemory = ns.getScriptRam(scriptName)
        const possibleThreads = Math.floor(freeMemory / neededMemory)
        if (freeMemory > neededMemory) {
            ns.exec(scriptName, target, possibleThreads, ...targets);
        }
    }
}
