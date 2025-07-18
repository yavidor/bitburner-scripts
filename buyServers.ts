import { NS } from "@ns";

export async function main(ns: NS) {
    let counter = 0;
    for (let i = 20; i > 0; i--) {
        const ram = 2 ** i;
        ns.print(`A server with ${ram}GB ram costs ${ns.formatNumber(ns.getPurchasedServerCost(ram))}$`);
        while (
            ns.getPlayer().money > ns.getPurchasedServerCost(ram) &&
            ns.getPurchasedServers().length < ns.getPurchasedServerLimit()
        ) {
            if (ns.getPurchasedServers().length == ns.getPurchasedServerLimit()) {
                break;
            }
            counter++;
            ns.purchaseServer(`pserv-${ns.getPurchasedServers().length}`, ram);
            await ns.sleep(100);
        }
        ns.print(`Bought ${counter} nodes`);
    }
}
