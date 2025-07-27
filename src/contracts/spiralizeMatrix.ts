import { NS } from "@ns";

function spiralize(ns: NS, matrix: number[][]): number[] {
    const spiral: number[] = [];
    let height = matrix.length,
        width = matrix[0].length,
        x = 0,
        y = 0;
    const directions = [
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1],
    ];
    while (y !== height || x !== width) {
        ns.tprint(`\nx: ${x}\ny: ${y}\nwidth: ${width}\nheight: ${height}`);
        for (const direction of directions) {
            ns.tprint(direction);
            width -= Math.abs(direction[0]);
            height -= Math.abs(direction[1]);
            while (y !== matrix.length - height && y !== height && x !== width && x !== matrix[0].length - width) {
                x += direction[0];
                y += direction[1];
                ns.tprint(matrix[y][x]);
                spiral.push(matrix[y][x]);
            }
        }
    }
    return spiral;
}

export async function main(ns: NS) {
    // const matrix = [
    //     [22, 2, 34, 48, 35, 4, 28, 20, 18, 11, 22, 40, 45],
    //     [47, 13, 18, 16, 23, 6, 30, 44, 18, 5, 13, 21, 8],
    //     [20, 38, 44, 35, 14, 21, 40, 6, 14, 1, 45, 35, 1],
    //     [42, 42, 8, 46, 26, 13, 1, 47, 40, 12, 37, 41, 40],
    //     [3, 4, 24, 35, 32, 2, 37, 24, 22, 46, 19, 21, 38],
    //     [17, 30, 45, 12, 35, 9, 33, 11, 12, 35, 37, 21, 5],
    //     [8, 20, 4, 10, 21, 28, 26, 3, 4, 26, 34, 43, 22],
    //     [18, 5, 16, 31, 35, 18, 49, 24, 19, 49, 19, 20, 27],
    //     [43, 27, 43, 49, 32, 28, 45, 48, 46, 21, 22, 39, 24],
    //     [34, 27, 34, 1, 7, 17, 6, 44, 43, 11, 18, 50, 21],
    //     [42, 50, 14, 2, 30, 1, 49, 44, 32, 32, 4, 30, 41],
    // ];
    const matrix = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
    ];
    ns.tprint(spiralize(ns, matrix));
}
