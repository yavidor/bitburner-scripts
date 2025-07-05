import type { NS } from "../NetscriptDefinitions.d.ts"
type accessScript = { executable: string, func: (host: string) => boolean }
function getAccessToServer(target: string, scripts: accessScript[]) {
    for (const script of scripts) {
        script.func(target);
    }
}
export async function main(ns: NS) {
    const scriptName = "nuke-available.ts"
    const targets = ns.scan();
    ns.print(targets.length);
    const portScripts: accessScript[] = [{ executable: "BruteSSH.exe", func: ns.brutessh }, { executable: "FTPCrack.exe", func: ns.ftpcrack }, { executable: "relaySMTP.exe", func: ns.relaysmtp }, { executable: "HTTPWorm.exe", func: ns.httpworm }, { executable: "SQLInject.exe", func: ns.sqlinject }
    ]
    const availbleScripts = portScripts.filter(script => ns.fileExists(script.executable))

    for (let i = 0; i < targets.length; i++) {
        const target = targets[i];
        if (ns.getServerNumPortsRequired(target) > availbleScripts.length) {
            ns.printf("Server %s sucks", target);
            targets.splice(targets.indexOf(target), 1)
            i--;
        } else {
            if (!ns.hasRootAccess(target)) {
                getAccessToServer(target, availbleScripts)
                ns.nuke(target)
            }
        }
    }
    for (const target of targets) {
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
