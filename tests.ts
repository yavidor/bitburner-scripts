import type { NS } from "@ns";
import { getRouteToHost } from "./utils";
export async function main(ns: NS) {
    // const host = ns.args[0] as string
    const rout = getRouteToHost(ns, "home", "avmnite-02h");
    ns.tprint(rout);
}
