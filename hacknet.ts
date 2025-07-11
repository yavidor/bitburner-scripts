import type { NS } from "@ns"
type BuyPropertyFunc = (index: number, levels?: number) => boolean
type Property = { property: string, value: number, maxValue: number, buyPropertyFunc: BuyPropertyFunc, getUpgradeCostFunc: GetUpgradeCostFunc }
type GetUpgradeCostFunc = (index: number, levels?: number) => number
type Upgrade = { nodeNum: number, property: Property, price: number, levels: number };
function calculateProperty(property: Property, playerMoney: number, nodeNum: number): Pick<Upgrade, 'price' | 'levels'> {

    if (property.value < property.maxValue && playerMoney > property.getUpgradeCostFunc(nodeNum)) {
        let levels = 1;
        while (playerMoney > property.getUpgradeCostFunc(nodeNum, levels)) {
            levels++;
        }
        // return property.buyPropertyFunc(nodeNum, levels - 1);
        return ({
            price: property.getUpgradeCostFunc(nodeNum, levels - 1),
            levels: levels - 1
        })
    }
    return {
        price: Infinity,
        levels: 0
    }
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
        const upgrades: Upgrade[] = [];
        for (let i = 0; i < ns.hacknet.numNodes(); i++) {
            const node = ns.hacknet.getNodeStats(i);
            const properties: Property[] = [
                { property: "Level", value: node.level, maxValue: 200, buyPropertyFunc: ns.hacknet.upgradeLevel, getUpgradeCostFunc: ns.hacknet.getLevelUpgradeCost },
                { property: "Core", value: node.cores, maxValue: 16, buyPropertyFunc: ns.hacknet.upgradeCore, getUpgradeCostFunc: ns.hacknet.getCoreUpgradeCost },
                { property: "Ram", value: node.ram, maxValue: 64, buyPropertyFunc: ns.hacknet.upgradeRam, getUpgradeCostFunc: ns.hacknet.getRamUpgradeCost }
            ]
            for (const property of properties) {
                const playerMoney = ns.getPlayer().money;
                upgrades.push({ nodeNum: i, property, ...calculateProperty(property, playerMoney, i) })
            }
        }
        const chosenUpgrade = upgrades.sort((a, b) => b.levels - a.levels)[0];
        const res = chosenUpgrade.property.buyPropertyFunc(chosenUpgrade.nodeNum, chosenUpgrade.levels)

        if (res) {
            ns.tprint(`Upgraded ${chosenUpgrade.property.property} in node #${chosenUpgrade.nodeNum} #${chosenUpgrade.levels} levels to ${chosenUpgrade.property.value + chosenUpgrade.levels}`)
        }
        ns.tprint(`Finished loop #${counter}`)
    }
    ns.tprint("Done!")
}
