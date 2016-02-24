"use strict";

function startsWith(substring){
    return this.indexOf(substring) === 0;
}

String.prototype.startsWith = startsWith;

function endsWith(substring){
    var substringLength = substring.length;
    if(substringLength > this.length){
        throw Error("The length of the substring is bigger than searched string!");
    }

    var substractedSubstring = this.slice(this.length - substringLength);

    return substring === substractedSubstring;
}

String.prototype.endsWith = endsWith;

function left(count){
    if (count < this.length) {
        return this.slice(0, count);
    }

    return this.toString();
}

String.prototype.left = left;

function right(count){
    if (count < this.length){
        return this.slice(this.length - count);
    }

    return this.toString();
}

String.prototype.right = right;

function padLeft(count, character){
    var arr = Array.apply(null,Array(count)).map(function () {
        return character || " "});

    return arr.join("") + this;
}

String.prototype.padLeft = padLeft;

function padRight(count, character){
    var arr = Array.apply(null,Array(count)).map(function () {
        return character || " "});

    return this + arr.join("");
}

String.prototype.padRight = padRight;

function repeat(count){
    var string = this;
    var arr = Array.apply(this,Array(count)).map(function () {return string});

    return arr.join("");
}

String.prototype.repeat = repeat;

var example = "This is an example string used only for demonstration purposes.";

// Test: 'startsWith' extension method
console.log("Extension method: 'startsWith'");
console.log(example.startsWith("This"));
console.log(example.startsWith("this"));
console.log(example.startsWith("other"));
console.log();

// Test: 'endsWith'  extension method
console.log("Extension method: 'endsWith'");
console.log(example.endsWith("poses."));
console.log(example.endsWith ("example"));
console.log(example.startsWith("something else"));
console.log();

// Test: 'left' extension method
console.log("Extension method: 'left'");
console.log(example.left(9));
console.log(example.left(90));
console.log();

// Test: 'right' extension method
console.log("Extension method: 'right'");
console.log(example.right(9));
console.log(example.right(90));
console.log();

// Combinations must also work
var example = "abcdefgh";
console.log("Combinations test:");
console.log(example.left(5).right(2));
console.log();

// Test: 'padLeft' extension method
var hello = "hello";
console.log("Extension method: 'padLeft'");
console.log(hello.padLeft(5));
console.log(hello.padLeft(10));
console.log(hello.padLeft(5, "."));
console.log(hello.padLeft(10, "."));
console.log(hello.padLeft(2, "."));
console.log();

// Test: 'padRight' extension method
console.log("Extension method: 'padRight'");
console.log(hello.padRight(5));
console.log(hello.padRight(10));
console.log(hello.padRight(5, "."));
console.log(hello.padRight(10, "."));
console.log(hello.padRight(2, "."));
console.log();

// Test: 'repeat' extension method
var character = "*";
console.log("Extension method: 'repeat'");
console.log(character.repeat(5));
// Alternative syntax
console.log("~".repeat(3));
console.log();


// Another combination
console.log("Combinations test:");
console.log("*".repeat(5));
console.log("*".repeat(5).padLeft(10, "-").padRight(15, "+"));
