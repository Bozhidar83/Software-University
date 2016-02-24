function compose(a, b){
    return function (x, y){
        return a(b(x, y));
    }
}

function add(x, y) {
    return x + y;
}
function addOne(x) {
    return x + 1;
}
function square(x) {
    return x * x;
}

//var result = compose(addOne, square)(5);
//var result = compose(addOne, add)(5, 6);
//var result = compose(Math.cos, addOne)(-1);
//var result = compose(addOne, Math.cos)(-1);
//console.log(result);

var compositeFunction = compose(Math.sqrt, Math.cos);
console.log(compositeFunction(0.5));
console.log(compositeFunction(1));
console.log(compositeFunction(-1));
