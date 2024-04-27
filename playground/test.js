"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function main() {
    const arr = [1, 2, 3, 4, 5];
    const mutated = arr.reduce((acc, curr) => {
        return acc + curr;
    });
    console.log("TETSS");
    console.log(arr);
    console.log(mutated);
}
main();
