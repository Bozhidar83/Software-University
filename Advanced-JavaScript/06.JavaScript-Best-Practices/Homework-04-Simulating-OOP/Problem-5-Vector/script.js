var Vector = (function(){
    "use strict";

    function Vector(arr){
        if (!arr || arr.length === 0){
            throw Error("Vector should have valid coordinates!");
        }

        this._coordinates = arr;
        this.dimension = arr.length;
    }

    Vector.prototype.toString = function(){
        return "(" + this._coordinates.join(", ") + ")";
    };

    Vector.prototype.add = function(anotherVector){
        validateDimensions(this.dimension, anotherVector.dimension);

        var newVectorCoordinates = this._coordinates.map(function (number, index) {
            return number + anotherVector._coordinates[index];
        });

        return new Vector(newVectorCoordinates);
    };

    Vector.prototype.subtract = function(anotherVector){
        validateDimensions(this.dimension, anotherVector.dimension);

        var newVectorCoordinates = this._coordinates.map(function (number, index) {
            return number - anotherVector._coordinates[index];
        });

        return new Vector(newVectorCoordinates);
    };

    Vector.prototype.dot = function(anotherVector){
        validateDimensions(this.dimension, anotherVector.dimension);

        return multiplyTwoArrays(this._coordinates, anotherVector._coordinates);
    };

    Vector.prototype.norm = function(){
        return Math.sqrt(multiplyElementsInArray(this._coordinates));
    };

    // private functions
    function validateDimensions(dimension1, dimension2){
        if (dimension1 !== dimension2){
            throw Error("Vectors must have same dimensions!");
        }
    }

    function multiplyTwoArrays(firstArr, secondArr){
        var sum = 0;
        var length = firstArr.length;
        for (var i = 0; i < length; i++) {
            sum += firstArr[i] * secondArr[i];
        }

        return sum;
    }

    function multiplyElementsInArray(arr){
        var sum = 0;
        var length = arr.length;
        for (var i = 0; i < length; i++) {
            sum += arr[i] * arr[i];
        }

        return sum;
    }

    return Vector;
})();

// Test: print Vectors
console.log("Test 'toString' method: ");
var a = new Vector([1, 2, 3]);
var b = new Vector([4, 5, 6]);
var c = new Vector([1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
console.log(a.toString());
console.log(c.toString());
console.log();

// The following throw errors
//var wrong = new Vector();
//var anotherWrong = new Vector([]);


// Test: add two Vectors
console.log("Test 'add' method: ");
var result = a.add(b);
console.log(result.toString());
//a.add(c); // Error
console.log();

// Test: subtract two Vectors
console.log("Test 'subtract' method: ");
result = a.subtract(b);
console.log(result.toString());
//a.subtract(c); // Error
console.log();

// Test: multiply two Vectors
console.log("Test 'dot' method: ");
result = a.dot(b);
console.log(result.toString());
console.log();

// Test: norm Vector
console.log("Test 'norm' method: ");
console.log(a.norm());
console.log(b.norm());
console.log(c.norm());
console.log(a.add(b).norm());