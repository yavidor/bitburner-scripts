import { NS } from "@ns";

function calculateMaxProfit(prices: number[]): number {
    return 0;
}

export async function main(ns: NS) {
    const input = (ns.args[0] as string).split(",").map((num) => parseInt(num));
    ns.tprint(calculateMaxProfit(input));
}
