import { NS } from "@ns";

function getMaxThreads(ns: NS, cost: number): number {
    return Math.max(Math.floor(ns.self().threads / Math.ceil(cost)), 1);
}

export async function main(ns: NS) {
    const action = ns.args[0];
    const target = ns.args[1] as string;
    const waitTime = ns.args[2] as number;
    let availableRam = 1;
    switch (action) {
        case "hack":
            availableRam = getMaxThreads(ns, 0.1);
            ns.print(availableRam);
            await ns.hack(target, { threads: availableRam, additionalMsec: waitTime });
            break;
        case "weaken":
            availableRam = getMaxThreads(ns, 0.15);
            ns.print(availableRam);
            await ns.weaken(target, { threads: availableRam, additionalMsec: waitTime });
            break;
        case "grow":
            availableRam = getMaxThreads(ns, 0.15);
            ns.print(availableRam);
            await ns.grow(target, { threads: availableRam, additionalMsec: waitTime });
            break;
        default:
            ns.tprint(
                `MotherFucker tried to pass ${action} instead of hack|weaken|grow, too bad it won't run on ${target} now...`,
            );
            break;
    }
}
