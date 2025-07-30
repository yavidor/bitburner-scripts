function spiralize(matrix) {
    const spiral = [];
    let xUpper = matrix[0].length,
        yUpper = matrix.length,
        xLower = -1,
        yLower = 0,
        x = 0,
        y = 0;
    const directions = [
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1],
    ];
    while (spiral.length < matrix[0].length * matrix.length) {
        try {
            for (const direction of directions) {
                if (direction[0] == -1) {
                    xLower++;
                } else if (direction[0] == 1) {
                    xUpper--;
                } else if (direction[1] == -1) {
                    yLower++;
                } else if (direction[1] == 1) {
                    yUpper--;
                }
                console.log(
                    `\nx: ${x}\ny: ${y}\nxLower: ${xLower}\nyLower: ${yLower}\nxUpper: ${xUpper}\nyUpper: ${yUpper}\ndirection: ${direction}`,
                );
                while (y >= yLower && y <= yUpper && x >= xLower && x <= xUpper) {
                    spiral.push(matrix[y][x]);
                    x += direction[0];
                    y += direction[1];
                    console.log(x, y, "a");
                }
                spiral.pop();
                x -= direction[0];
                y -= direction[1];
            }
        } catch (e) {
            console.dir(spiral, { maxArrayLength: null });
            console.log(e);
            process.exit(11);
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
    // const matrix = [
    //     [1, 2, 3],
    //     [4, 5, 6],
    //     [7, 8, 9],
    // ];
    const matrix = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, 16],
    ];
    // console.log(spiralize(matrix).filter((x) => x !== undefined));
    console.log(spiralize(matrix));
}
main();
