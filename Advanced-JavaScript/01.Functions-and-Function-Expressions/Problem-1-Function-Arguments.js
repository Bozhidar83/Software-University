console.log("Problem 1. Function Arguments:");

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

console.log("Test #1:");
printArgsInfo(2, 3, 2.5, -110.5564, false);

console.log("\nTest #2:");
printArgsInfo(null, undefined, "", 0, [], {});

console.log("\nTest #3:");
printArgsInfo([1, 2], ["string", "array"], ["single value"]);

console.log("\nTest #4:");
printArgsInfo("some string", [1, 2], ["string", "array"], ["mixed", 2, false, "array"], {name: "Peter", age: 20});

console.log("\nTest #5:");
printArgsInfo([[1, [2, [3, [4, 5]]]], ["string", "array"]]);