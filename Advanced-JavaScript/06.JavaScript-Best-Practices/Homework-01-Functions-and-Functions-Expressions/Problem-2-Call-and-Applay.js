console.log("Problem 2. Call() and Apply():");

function printArgsInfo(){
    "use strict";

    var length = arguments.length,
        i;

    if (length){
        console.log("No arguments passed!");
    }

    for(i = 0; i < length; i++){
        if(arguments[i] instanceof Array){
            console.log(arguments[i] + " (array)");
        } else {
            console.log(arguments[i] + " (" + typeof arguments[i] + ")");
        }
    }
}

printArgsInfo.call(null);
printArgsInfo.call(null, 1, 2, 8);
printArgsInfo.call(null, 1, NaN, undefined);

console.log();
printArgsInfo.apply(null);
printArgsInfo.apply(null, [1, 5]);