import type { NS } from "@ns";

function DFS(ns: NS, y: number, x: number, maze: number[][], ways: number = 0): number {
    // ns.tprint(`\nx: ${x}\ny: ${y}`);
    const rows = maze.length;
    const columns = maze[0].length;
    if (y >= rows || x >= columns || maze[y][x] == 1) {
        return 0;
    }
    if (y == rows - 1 && x == columns - 1) {
        return 1;
    }
    return ways + DFS(ns, y + 1, x, maze, ways) + DFS(ns, y, x + 1, maze, ways);
}

export async function main(ns: NS) {
    const maze1D = (ns.args[0] as string)
        .slice(1, (ns.args[0] as string).length - 1)
        .split(",")
        .map((cell) => parseInt(cell));
    const rowSize = Math.sqrt(maze1D.length);
    const maze: number[][] = [];
    for (let i = 0; i < rowSize; i++) {
        maze.push([]);
        for (let j = 0; j < rowSize; j++) {
            maze[i].push(maze1D[i * rowSize + j]);
        }
    }
    // const [rows, columns] = (ns.args[0] as string).slice(1, (ns.args[0] as string).length - 1).split(',').map(x => parseInt(x))
    // const maze = [
    //     [0, 0, 0, 0],
    //     [0, 0, 0, 0],
    //     [0, 0, 0, 1],
    //     [0, 0, 0, 0],
    //     [0, 0, 0, 0],
    //     [0, 0, 0, 0],
    // ];
    ns.tprint(DFS(ns, 0, 0, maze));
}
