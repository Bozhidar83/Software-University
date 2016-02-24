console.log("Problem 4. Adding numbers:");

var add = (function () {
    "use strict";

    var sum = 0;

    function increment(number) {
        sum += number;
        return add;
    }

    increment.toString = function () {
        return sum;
    };

    return increment;
})();

//console.log(+add(1)); // Uncomment to test
//console.log(+add(2)(3)); // Uncomment to test
//console.log(+add(1)(1)(1)(1)(1)); // Uncomment to test
//console.log(+add(1)(0)(-1)(-1)); // Uncomment to test

var addTwo = add(2);
//console.log(addTwo);
//console.log(+addTwo(3));
console.log(+addTwo(3)(5));




