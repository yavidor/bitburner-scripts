import type { NS } from "@ns"
import { getHosts } from "./utils"
export async function main(ns: NS) {
    const hosts = ["home", ...getHosts(ns), ...ns.getPurchasedServers()];
    for (const host of hosts) {
        ns.killall(host);
    }
}
