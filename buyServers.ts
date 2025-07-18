import { NS } from "@ns"

export async function main(ns: NS) {
    const money = ns.getPlayer().money;
    while (money > 440_000) {
        ns.purchaseServer("pserv-", 64)
        await ns.sleep(10 * 1000);
    }
}
