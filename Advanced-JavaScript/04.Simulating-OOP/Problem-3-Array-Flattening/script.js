function flatten(){
    var flattenArray = [];

    function traverseArray(arr){
        var arrayLength = arr.length;
        for(var i = 0; i < arrayLength; i++) {
            if(Array.isArray(arr[i])) {
                traverseArray(arr[i]);
            } else {
                flattenArray.push(arr[i]);
            }
        }
    }

    traverseArray(this);

    return flattenArray;
}

Array.prototype.flatten = flatten;

var array = [1, 2, 3, 4];
console.log(array); // Not modified
console.log(array.flatten());
console.log();

array = [1, 2, [3, 4], [5, 6]];
console.log(array); // Not modified
console.log(array.flatten());
console.log();

array = [0, ["string", "values"], 5.5, [[1, 2, true], [3, 4, false]], 10];
console.log(array); // Not modified
console.log(array.flatten());
console.log();

array = [1, 2, [3, 4], ['ivan', null], false, [true, {name: "Gosho", age: 15}, [-9, undefined, [2, 4]]]];
console.log(array); // Not modified
console.log(array.flatten());


