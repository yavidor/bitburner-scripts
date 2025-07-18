import type { NS } from "@ns";
import { getHosts, getRouteToHost } from "./utils";
export async function main(ns: NS) {
    const hosts = getHosts(ns);
    for (const host of hosts) {
        const contracts = ns.ls(host, ".cct");
        if (contracts.length > 0) {
            for (const contract of contracts) {
                ns.tprint(
                    `${contract}: ${getRouteToHost(ns, "home", host).join(" -> ")}`,
                );
            }
        }
    }
}
