function spiralize(matrix) {
    const spiral = [];
    let xLoops = 1,
        yLoops = 1,
        x = 0,
        y = 0,
        width = matrix[0].length - 1,
        height = matrix.length - 1;
    const directions = [
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1],
    ];
    while (y !== height || x !== width) {
        for (const direction of directions) {
            xLoops += direction[0] == 0 ? 0 : 1;
            yLoops += direction[1] == 0 ? 0 : 1;
            width = direction[0] >= 0 ? matrix[0].length - xLoops : xLoops;
            height = direction[1] >= 0 ? matrix.length - yLoops : yLoops;
            console.log(`\nx: ${x}\ny: ${y}\nwidth: ${width}\nheight: ${height}\ndirection: ${direction}`);
            while (y !== height && x !== width) {
                x += direction[0];
                y += direction[1];
                console.log(y, x, "a");
                console.log(height, width, "b");
                spiral.push(matrix[y][x]);
            }
        }
    }
    return spiral;
}

export async function main() {
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
    console.log(spiralize(matrix));
}
main();
