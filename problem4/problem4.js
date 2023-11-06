//Using basic loop
//Comment: Bad way, hight complexity, but still run for big n
//Complexity: O(n)
function sum_to_n_a(n) {
    var sum = 0;
    for (var i = 1; i <= n; i++) {
        sum = sum + i;
    }
    return sum;
}
//Using arithmetic average
//Comment: Best perfomance, complexity not increase for big n
//Complexity: O(1)
function sum_to_n_b(n) {
    return n * ((n + 1) / 2);
}
//Using recursion
//Comment: Still ok for small n, but not for big n
//Complexity: O(log n)
function sum_to_n_c(n) {
    if (n === 1) {
        return 1;
    }
    return n + sum_to_n_c(n - 1);
}
var n = 1000000000;

console.time("time basic loop");
console.log("basic loop", sum_to_n_a(n));
console.timeEnd("time basic loop");

// console.time("time arithmetic average");
// console.log("arithmetic average", sum_to_n_b(n));
// console.timeEnd("time arithmetic average");

// console.time("time recursion");
// console.log("recursion", sum_to_n_c(n));
// console.timeEnd("time recursion");
