import { NS } from "@ns";
function findSumPossibilities(
    ns: NS,
    target: number,
    numbers: number[],
    possibilities: number = 0,
    sum: number = 0,
    numbb: number[],
): number {
    if (numbers.length == 0) {
        return 0;
    }

    if (sum === target) {
        return 1;
    }
    const curr = numbers.shift() ?? 0;
    let options = 0;
    for (let i = 0; i < Math.floor(target / curr); i++) {
        options += findSumPossibilities(ns, target, [...numbers], possibilities, sum + curr * i, [...numbb, curr]);
    }
    return possibilities + options;
}

export async function main(ns: NS) {
    const target = parseInt(ns.args[0] as string);
    const numbers = ns.args[1]
        .toString()
        .slice(1)
        .slice(0, (ns.args[1] as string).length - 1)
        .split(",")
        .map((num) => parseInt(num));
    ns.tprint(findSumPossibilities(ns, target, numbers, 0, 0, []));
}
