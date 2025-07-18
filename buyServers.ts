import { NS } from "@ns"

export async function main(ns: NS) {
    const ram = ns.args.length > 0 ? ns.args[0] as number : 64;
    ns.print(`A server with ${ram}GB ram costs ${ns.formatNumber(ns.getPurchasedServerCost(ram))}$`);
    let counter = 0;
    while (ns.getPlayer().money > ns.getPurchasedServerCost(ram) && ns.getPurchasedServers().length < ns.getPurchasedServerLimit()) {
        counter++;
        ns.purchaseServer(`pserv-${ns.getPurchasedServers().length}`, ram)
        await ns.sleep(100);
    }
    ns.print(`Bought ${counter} nodes`)
}
