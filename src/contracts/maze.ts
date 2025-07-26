import type { NS } from "@ns";
type Direction = "U" | "D" | "R" | "L";
function BFS(ns: NS, maze: number[][], x: number, y: number, visited: number[][]): Direction[] {
    const options: { dy: number; dx: number; direction: Direction }[] = [
        { dy: -1, dx: 0, direction: "U" },
        { dy: 1, dx: 0, direction: "D" },
        { dy: 0, dx: 1, direction: "R" },
        { dy: 0, dx: -1, direction: "L" },
    ];
    const queue: [number, number, Direction[]][] = [[0, 0, []]];
    let counter = 1;
    const enrichedMaze: Direction[][][] = [[[]]];
    for (let i = 0; i < maze.length; i++) {
        enrichedMaze[i] = [];
        for (let j = 0; j < maze[i].length; j++) {
            enrichedMaze[i][j] = [];
        }
    }
    visited[y][x] = 1;
    while (queue.length > 0 && counter < 1000) {
        let [qy, qx] = queue.shift() ?? [-1, -1];
        if (qy == -1 && qx == -1) {
            return enrichedMaze[0][0];
        }

        if (qy == maze.length && qx == maze[0].length) {
            return enrichedMaze[qy][qx];
        }
        for (const { dy, dx, direction } of options) {
            qy += dy;
            qx += dx;
            ns.print(`qy:${qy}\nqx:${qx}\ndirection:${direction}`);
            if (
                qy >= 0 &&
                qy < maze.length &&
                qx >= 0 &&
                qx < maze[0].length &&
                maze[qy][qx] == 0 &&
                visited[qy][qx] == 0
            ) {
                visited[qy][qx] = 1;
                enrichedMaze[qy][qx] = [...enrichedMaze[qy - dy][qx - dx], direction];
                queue.unshift([qy, qx, enrichedMaze[qy][qx]]);
            }
            qy -= dy;
            qx -= dx;
        }
        counter++;
    }
    ns.print("***", enrichedMaze[maze.length - 1][maze[0].length - 1]);
    for (let i = 0; i < maze.length; i++) {
        ns.print(visited[i].reduce((acc, cur) => `${acc},${cur}`, "").slice(1));
    }
    ns.print(counter);
    for (let i = 0; i < maze.length; i++) {
        ns.print(enrichedMaze[i].reduce((acc, cur) => `${acc},${cur.length}`, "").slice(1));
    }
    return enrichedMaze[maze.length - 1][maze[0].length - 1];
}

export async function main(ns: NS) {
    const maze = [
        [0, 0, 1, 0, 1, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 1, 0, 1],
        [0, 0, 0, 0, 0, 0, 1, 1, 0],
        [1, 0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0, 0],
    ];

    const visited: number[][] = [];
    for (let i = 0; i < maze.length; i++) {
        visited[i] = [];
        for (let j = 0; j < maze[i].length; j++) {
            visited[i][j] = 0;
        }
    }
    const stack = BFS(ns, maze, 0, 0, visited);
    ns.tprint(stack.join(""));
}
