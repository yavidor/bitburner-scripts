import type { NS } from "@ns"
type BuyPropertyFunc = (arg1: number, arg2?: number) => boolean
type Property = { property: string, value: number, maxValue: number, buyPropertyFunc: BuyPropertyFunc, getUpgradeCostFunc: GetUpgradeCostFunc }
type GetUpgradeCostFunc = (arg1: number, arg2?: number) => number
function upgradeProperty(property: Property, playerMoney: number, nodeNum: number): boolean {

    if (property.value < property.maxValue && playerMoney > property.getUpgradeCostFunc(nodeNum)) {
        let levels = 1;
        while (playerMoney > property.getUpgradeCostFunc(nodeNum, levels)) {
            levels++;
        }
        return property.buyPropertyFunc(nodeNum, levels - 1);
    }
    return false
}
export async function main(ns: NS) {
    let counter = 0;
    const threshold = ns.args[0] as number
    const sleepSeconds = ns.args[1] as number
    while (counter < threshold) {
        counter++;
        await ns.sleep(sleepSeconds * 1000)
        const playerMoney = ns.getPlayer().money;
        if (ns.hacknet.getPurchaseNodeCost() < playerMoney) {
            const nodeNum = ns.hacknet.purchaseNode()
            ns.tprint(`Bought node #${nodeNum}`)
        }
        for (let i = 0; i < ns.hacknet.numNodes(); i++) {
            const node = ns.hacknet.getNodeStats(i);
            const properties: Property[] = [
                { property: "Level", value: node.level, maxValue: 200, buyPropertyFunc: ns.hacknet.upgradeLevel, getUpgradeCostFunc: ns.hacknet.getLevelUpgradeCost },
                { property: "Core", value: node.cores, maxValue: 16, buyPropertyFunc: ns.hacknet.upgradeCore, getUpgradeCostFunc: ns.hacknet.getCoreUpgradeCost },
                { property: "Ram", value: node.ram, maxValue: 64, buyPropertyFunc: ns.hacknet.upgradeRam, getUpgradeCostFunc: ns.hacknet.getRamUpgradeCost }
            ]
            for (const property of properties) {
                const playerMoney = ns.getPlayer().money;
                const res = upgradeProperty(property, playerMoney, i)
                if (res) {
                    ns.tprint(`Upgraded ${property.property} in node #${i} to ${property.value + 1}`)
                }
            }
        }
        ns.tprint(`Finished loop #${counter}`)
    }
    ns.tprint("Done!")
}
