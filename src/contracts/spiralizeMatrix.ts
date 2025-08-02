import { NS } from "@ns";

function spiralize(matrix: number[][]): number[] {
    const spiral: number[] = [matrix[0][0]];
    let xUpper = matrix[0].length - 1,
        yUpper = matrix.length - 1,
        xLower = 0,
        yLower = 1,
        x = 0,
        y = 0;
    while (spiral.length < matrix[0].length * matrix.length) {
        while (x < xUpper) {
            x++;
            spiral.push(matrix[y][x]);
        }
        if (spiral.length >= matrix[0].length * matrix.length) {
            break;
        }
        xUpper--;
        while (y < yUpper) {
            y++;
            spiral.push(matrix[y][x]);
        }
        yUpper--;
        if (spiral.length >= matrix[0].length * matrix.length) {
            break;
        }
        while (x > xLower) {
            x--;
            spiral.push(matrix[y][x]);
        }
        xLower++;
        if (spiral.length >= matrix[0].length * matrix.length) {
            break;
        }
        while (y > yLower) {
            y--;
            spiral.push(matrix[y][x]);
        }
        yLower++;
    }
    return spiral;
}

export async function main(ns: NS) {
    const matrix = [
        [22, 2, 34, 48, 35, 4, 28, 20, 18, 11, 22, 40, 45],
        [47, 13, 18, 16, 23, 6, 30, 44, 18, 5, 13, 21, 8],
        [20, 38, 44, 35, 14, 21, 40, 6, 14, 1, 45, 35, 1],
        [42, 42, 8, 46, 26, 13, 1, 47, 40, 12, 37, 41, 40],
        [3, 4, 24, 35, 32, 2, 37, 24, 22, 46, 19, 21, 38],
        [17, 30, 45, 12, 35, 9, 33, 11, 12, 35, 37, 21, 5],
        [8, 20, 4, 10, 21, 28, 26, 3, 4, 26, 34, 43, 22],
        [18, 5, 16, 31, 35, 18, 49, 24, 19, 49, 19, 20, 27],
        [43, 27, 43, 49, 32, 28, 45, 48, 46, 21, 22, 39, 24],
        [34, 27, 34, 1, 7, 17, 6, 44, 43, 11, 18, 50, 21],
        [42, 50, 14, 2, 30, 1, 49, 44, 32, 32, 4, 30, 41],
    ];
    ns.tprint(`[${spiralize(matrix).join(", ")}]`);
}
