import type { NS } from "@ns";

function DFS(
  ns: NS,
  y: number,
  x: number,
  rows: number,
  columns: number,
  ways: number = 0,
): number {
  if (y >= rows || x >= columns) {
    return 0;
  }
  if (y == rows - 1 && x == columns - 1) {
    return 1;
  }
  return (
    ways +
    DFS(ns, y + 1, x, rows, columns, ways) +
    DFS(ns, y, x + 1, rows, columns, ways)
  );
}

export async function main(ns: NS) {
  const [rows, columns] = (ns.args[0] as string)
    .slice(1, (ns.args[0] as string).length - 1)
    .split(",")
    .map((x) => parseInt(x));
  ns.tprint(DFS(ns, 0, 0, rows, columns));
}
