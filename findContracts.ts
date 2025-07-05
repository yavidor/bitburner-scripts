import type { NS } from "@ns"
import { getHosts as getHosts } from "./utils"
export async function main(ns: NS) {
    const hosts = getHosts(ns)
    for (const host of hosts) {
        const contracts = ns.ls(host, ".cct")
        if (contracts.length > 0) {
            ns.tprint(`${host} -> ${contracts.join()}`)
        }
    }
}
