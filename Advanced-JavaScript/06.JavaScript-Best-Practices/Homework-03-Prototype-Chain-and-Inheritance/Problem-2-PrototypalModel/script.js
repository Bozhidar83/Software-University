if (!Object.create) {
    Object.create = function (proto) {
        function F() {}
        F.prototype = proto;
        return new F();
    };
}

var shapeModule = (function() {
    var Shape = {
        init: function (color){
            this._color = color;
        },
        toString: function(){
            return "Color: " + this._color;
        }
    };

    // Create 'class' Circle
    var Circle = Object.create(Shape);
    Circle.init = function(centerX, centerY, radius, color){
        this._centerX = centerX;
        this._centerY = centerY;
        this._radius = radius;
        Shape.init.call(this, color);

        return this;
    };
    Circle.toString = function(){
        var output = "Circle: ";
        output += "Center: O(" + this._centerX + ", " + this._centerY + "), ";
        output += "Radius: " + this._radius + ", ";
        output += "Color: " + Shape.toString.call(this);

        return output;
    };

    // Create 'class' Rectangle
    var Rectangle = Object.create(Shape);
    Rectangle.init = function(topLeftCornerX, topLeftCornerY, width, height, color){
        this._topLeftCornerX = topLeftCornerX;
        this._topLeftCornerY = topLeftCornerY;
        this._width = width;
        this._height = height;
        Shape.init.call(this, color);
    };
    Rectangle.toString = function(){
        var output = "Rectangle: ";
        output += "Top left corner: (" + this._topLeftCornerX + ", " + this._topLeftCornerY + "), ";
        output += "Width: " + this._width + ", ";
        output += "Height: " + this._height + ", ";
        output += Shape.toString.call(this);

        return output;
    };

    // Create 'class' Triangle
    var Triangle = Object.create(Shape);
    Triangle.init = function(pointAX, pointAY, pointBX, pointBY, pointCX, pointCY, color){
        this._pointAX = pointAX;
        this._pointAY = pointAY;
        this._pointBX = pointBX;
        this._pointBY = pointBY;
        this._pointCX = pointCX;
        this._pointCY = pointCY;
        Shape.init.call(this, color);
    };
    Triangle.toString = function(){
        var output = "Triangle: ";
        output += "Point A(" + this._pointAX + ", " + this._pointAY + "), ";
        output += "Point B(" + this._pointBX + ", " + this._pointBY + "), ";
        output += "Point C(" + this._pointCX + ", " + this._pointCY + "), ";
        output += Shape.toString.call(this);

        return output;
    };

    // Create 'class' Line
    var Line = Object.create(Shape);
    Line.init = function(pointAX, pointAY, pointBX, pointBY, color){
        this._pointAX = pointAX;
        this._pointAY = pointAY;
        this._pointBX = pointBX;
        this._pointBY = pointBY;
        Shape.init.call(this, color);
    };
    Line.toString = function(){
        var output = "Line: ";
        output += "Point A(" + this._pointAX + ", " + this._pointAY + "), ";
        output += "Point B(" + this._pointBX + ", " + this._pointBY + "), ";
        output += Shape.toString.call(this);

        return output;
    };

    // Create 'class' Segment
    var Segment = Object.create(Line);
    Segment.init = function(pointAX, pointAY, pointBX, pointBY, color){
        Line.init.call(this, pointAX, pointAY, pointBX, pointBY, color);
    };
    Segment.toString = function(){
        var output = "Segment: ";
        output += "Point A(" + this._pointAX + ", " + this._pointAY + "), ";
        output += "Point B(" + this._pointBX + ", " + this._pointBY + "), ";
        output += Shape.toString.call(this);

        return output;
    };

    return {
        Circle: Circle,
        Rectangle: Rectangle,
        Triangle: Triangle,
        Line: Line,
        Segment: Segment
    }
})();

// Test: create Circle
var circle = Object.create(shapeModule.Circle);
circle.init(4, 2, 5, "#885522");
console.log(circle.toString());

// Test: create Rectangle
var rectangle = Object.create(shapeModule.Rectangle);
rectangle.init(0, 2, 8, 5, "#BCBCBC");
console.log(rectangle.toString());

// Test: create Triangle
var triangle = Object.create(shapeModule.Triangle);
triangle.init(2, 2, 8, 11, 7, 5, "#BABABA");
console.log(triangle.toString());

// Test: create Line
var line = Object.create(shapeModule.Line);
line.init(10, 8, -6, 17, "557755");
console.log(line.toString());

// Test: create Segment
var segment = Object.create(shapeModule.Segment);
segment.init(0, -3, 4, 9, "000000");
console.log(segment.toString());