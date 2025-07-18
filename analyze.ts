import type { NS } from "@ns";
export async function main(ns: NS) {
  const args = ns.flags([["help", false]]);
  const server = ns.args[0] as string;
  if (args.help || !server) {
    ns.tprint("This script does a more detailed analysis of a server.");
    ns.tprint(`Usage: run ${ns.getScriptName()} SERVER`);
    ns.tprint("Example:");
    ns.tprint(`> run ${ns.getScriptName()} n00dles`);
    return;
  }
  const ram = [ns.getServerMaxRam(server), ns.getServerUsedRam(server)];
  const money = ns.getServerMoneyAvailable(server);
  const maxMoney = ns.getServerMaxMoney(server);
  const minSec = ns.getServerMinSecurityLevel(server);
  const sec = ns.getServerSecurityLevel(server);
  ns.tprint(`

${server}:
    RAM        : ${ram[1]} / ${ram[0]} (${(ram[1] / ram[0]) * 100}%)
    $          : ${ns.nFormat(money, "$0.000a")} / ${ns.nFormat(maxMoney, "$0.000a")} (${((money / maxMoney) * 100).toFixed(2)}%)
    security   : ${minSec.toFixed(2)} / ${sec.toFixed(2)}
    growth     : ${ns.getServerGrowth(server)}
    hack time  : ${ns.tFormat(ns.getHackTime(server))}
    grow time  : ${ns.tFormat(ns.getGrowTime(server))}
    weaken time: ${ns.tFormat(ns.getWeakenTime(server))}
    grow x2    : ${ns.growthAnalyze(server, 2).toFixed(2)} threads
    grow x3    : ${ns.growthAnalyze(server, 3).toFixed(2)} threads
    grow x4    : ${ns.growthAnalyze(server, 4).toFixed(2)} threads
    hack 10%   : ${(0.1 / ns.hackAnalyze(server)).toFixed(2)} threads
    hack 25%   : ${(0.25 / ns.hackAnalyze(server)).toFixed(2)} threads
    hack 50%   : ${(0.5 / ns.hackAnalyze(server)).toFixed(2)} threads
    hackChance : ${(ns.hackAnalyzeChance(server) * 100).toFixed(2)}%
`);
}
