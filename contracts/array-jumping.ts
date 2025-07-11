import { NS } from "@ns";
function canJump(ns: NS, arr: number[], pos: number): boolean {
    ns.tprint(`${pos}, ${arr[pos]}`)
    if (pos == 0) {
        return true;
    }
    for (let i = 0; i < pos; i++) {
        if (arr[i] + i == pos && canJump(ns, arr, i) == true) {
            return true;
        }
    }
    return false;
}
export async function main(ns: NS) {
    const arr = [1, 0, 7, 0, 6, 7, 0, 0, 10, 0, 9, 7, 4, 7, 0, 1, 8, 0, 9, 10];
    ns.tprint(canJump(ns, arr, arr.length - 1) ? 1 : 0)
}
