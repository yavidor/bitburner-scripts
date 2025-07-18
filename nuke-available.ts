import type { NS } from "@ns";
async function hackTarget(ns: NS, target: string): Promise<number> {
    if (ns.hackAnalyzeChance(target) < 0.5) {
        return 0;
    }
    if (
        ns.getServerMinSecurityLevel(target) <
        ns.getServerSecurityLevel(target) * 0.9
    ) {
        await ns.weaken(target);
        return 0;
    }
    if (ns.getServerMaxMoney(target) > ns.getServerMoneyAvailable(target)) {
        await ns.grow(target);
        return 0;
    }
    const result = await ns.hack(target);
    ns.printf("Hacking server %s gave %d dollars", target, result);
    return result;
}

export async function main(ns: NS) {
    const targets = ns.args;
    while (true) {
        for (const target of targets) {
            if (typeof target == "string") {
                await hackTarget(ns, target);
            } else {
                ns.exit();
            }
        }
    }
}
