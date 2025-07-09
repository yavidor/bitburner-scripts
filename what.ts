import type { NS } from "@ns"
export async function main(ns: NS) {
    ns.tprint(2 / ns.getServerMaxMoney("CSEC"))
}
