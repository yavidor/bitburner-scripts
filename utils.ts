import type { NS } from "@ns"
type accessScript = { executable: string, func: (host: string) => boolean }
export function getHosts(ns: NS): string[] {
    const hosts: Set<string> = new Set();
    const queue = ["home"];
    while (queue.length > 0) {
        const host = queue.shift() ?? "";
        hosts.add(host)
        for (const neighbor of ns.scan(host)) {
            getAccessToServer(ns, neighbor)
            if (!hosts.has(neighbor) && getAccessToServer(ns, neighbor)) {
                queue.unshift(neighbor)
            }
        }
    }
    hosts.delete("home")
    return [...hosts]
}
export function getRouteToHost(ns: NS, host: string, target: string, path: string[] = ["home"]): string[] {
    if (host === target) {
        return path;
    }
    const neighbors = ns.scan(host)
    for (const neighbor of neighbors) {
        if (neighbor == host || path.includes(neighbor)) {
            continue
        }
        const attemptedPath = getRouteToHost(ns, neighbor, target, [...path, neighbor]);
        if (attemptedPath.length > 0) {
            return attemptedPath;
        }
    }
    return [];
}
function getAccessToServer(ns: NS, target: string): boolean {
    const portScripts: accessScript[] = [{ executable: "BruteSSH.exe", func: ns.brutessh }, { executable: "FTPCrack.exe", func: ns.ftpcrack }, { executable: "relaySMTP.exe", func: ns.relaysmtp }, { executable: "HTTPWorm.exe", func: ns.httpworm }, { executable: "SQLInject.exe", func: ns.sqlinject }
    ]
    const availableScripts = portScripts.filter(script => ns.fileExists(script.executable))
    // ns.tprint(`target: ${target}\nhasRoot: ${ns.hasRootAccess(target)}\nports: ${ns.getServerNumPortsRequired(target)}`)
    if (ns.getServerNumPortsRequired(target) > availableScripts.length) {
        return false;
    }
    if (!ns.hasRootAccess(target)) {
        for (const script of availableScripts) {
            script.func(target);
        }
        return ns.nuke(target)
    }
    return true
}

export function getMaxThreads(ns: NS, host: string, cost: number): number {
    return Math.max(Math.floor(Math.floor(ns.getServerMaxRam(host) - ns.getServerUsedRam(host)) / Math.ceil(cost)), 1)
}

export function getBestTarget(ns: NS): string {
    let maxWeight = 0;
    let bestTarget = "n00dles"
    const targets = getHosts(ns)
    for (const target of targets) {
        if (ns.getServerRequiredHackingLevel(target) < ns.getHackingLevel() / 2) {
            const currWeight = ns.getServerMaxMoney(target) / ns.getServerMinSecurityLevel(target);
            if (currWeight > maxWeight && ns.getServerMaxMoney(target) != 0) {
                maxWeight = currWeight;
                bestTarget = target;
            }
        }
    }
    return bestTarget;
}
