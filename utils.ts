import type { NS } from "@ns"
type accessScript = { executable: string, func: (host: string) => boolean }

export function getHosts(ns: NS): string[] {
    const hosts: Set<string> = new Set();
    const queue = ns.scan();
    while (queue.length > 0) {
        const host = queue.shift() ?? "";
        hosts.add(host)
        for (const neighbors of ns.scan(host)) {
            if (!hosts.has(neighbors)) {
                queue.unshift(neighbors)
            }
        }
    }
    hosts.delete("home")
    return [...hosts]
}
export function getAccessToServer(ns: NS, target: string): boolean {
    const portScripts: accessScript[] = [{ executable: "BruteSSH.exe", func: ns.brutessh }, { executable: "FTPCrack.exe", func: ns.ftpcrack }, { executable: "relaySMTP.exe", func: ns.relaysmtp }, { executable: "HTTPWorm.exe", func: ns.httpworm }, { executable: "SQLInject.exe", func: ns.sqlinject }
    ]
    const availbleScripts = portScripts.filter(script => ns.fileExists(script.executable))

    if (ns.getServerNumPortsRequired(target) > availbleScripts.length) {
        return false;
    }
    if (!ns.hasRootAccess(target)) {
        for (const script of availbleScripts) {
            script.func(target);
        }
        return ns.nuke(target)
    }
    return true
}

