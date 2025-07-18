import type { NS } from "@ns";

export async function main(ns: NS) {
    const arr = ns.args
        .join("")
        .split(",")
        .map((x) => parseInt(x));
    ns.tprint(arr);
    ns.tprint(getMaxSubArray(arr));
}
function getMaxSubArray(
    arr: number[],
    start: number = 0,
    end: number = arr.length - 1,
    index: number = 0,
): number {
    if (index >= end) {
        return arr[index];
    }
    return Math.max(
        arr[index] + getMaxSubArray(arr, start, end, index + 1),
        arr[index] + getMaxSubArray(arr, start, end - 1, index + 1),
    );
}
