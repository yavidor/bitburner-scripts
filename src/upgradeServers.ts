import type { NS } from "@ns";

export async function main(ns: NS) {
    const servers = ns.getPurchasedServers();
    for (const server of servers) {
        for (let n = 20; n > Math.log2(ns.getServerMaxRam(server)); n--) {
            const price = ns.getPurchasedServerUpgradeCost(server, 2 ** n);
            const money = ns.getPlayer().money;
            if (money >= price) {
                const currRam = ns.getServerMaxRam(server);
                ns.upgradePurchasedServer(server, 2 ** n);
                ns.tprint(`Upgraded ${server} from ${ns.formatRam(currRam)} to ${ns.formatRam(2 ** n)}`);
            }
        }
    }
}
