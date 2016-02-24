console.log("Problem 3. Test the value of This:");

function testContext(){
    console.log(this);
}

console.log("Test #1: Global context");
testContext();

console.log("\nTest #2: Inside another function");
function outerFunction(){
    return testContext();
}

outerFunction();

console.log("\nTest #3: As an object");
var obj = {
    info: "Object context"
};

// used context is of Object 'obj'
testContext.call(obj);

// create new context
var a = new testContext();

