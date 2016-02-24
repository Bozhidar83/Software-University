console.log("Problem 4. Adding numbers:");

//function add(number){
//    var sum = number;
//
//    function addNumber(increment){
//        sum += increment;
//
//        return addNumber;
//    }
//
//    addNumber.toString = function(){
//        return sum;
//    };
//
//    return addNumber;
//}

var add = (function () {
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

//console.log(+add(1));
//console.log(+add(2)(3));
//console.log(+add(1)(1)(1)(1)(1));
//console.log(+add(1)(0)(-1)(-1));

var addTwo = add(2);
//console.log(addTwo);
//console.log(+addTwo(3));
console.log(+addTwo(3)(5));




