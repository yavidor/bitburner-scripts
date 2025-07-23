import type { NS } from "@ns";

function getMaxSubArray(arr: number[]): number {
    let maxSum = arr[0];
    for (let lower = 0; lower < arr.length; lower++) {
        for (let higher = arr.length - 1; higher >= lower; higher--) {
            const subArr = [];
            for (let index = lower; index <= higher; index++) {
                subArr.push(arr[index]);
            }
            //Get the sum of the subarray
            const currSum = subArr.reduce((prev, curr) => prev + curr, 0);
            maxSum = Math.max(maxSum, currSum);
        }
    }
    return maxSum;
}

export async function main(ns: NS) {
    const arr = ns.args
        .join("")
        .split(",")
        .map((x) => parseInt(x));
    ns.tprint(arr);
    ns.tprint(getMaxSubArray(arr));
}
