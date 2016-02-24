console.log("Problem 2. Call() and Apply():");

function printArgsInfo(){
    if (arguments.length === 0){
        console.log("No arguments passed!");
    }

    for(var i = 0; i < arguments.length; i++){
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