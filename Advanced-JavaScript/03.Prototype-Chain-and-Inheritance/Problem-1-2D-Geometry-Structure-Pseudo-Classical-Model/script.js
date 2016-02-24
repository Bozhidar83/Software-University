if (!Object.create) {
    Object.create = function (proto) {
        function F() {}
        F.prototype = proto;
        return new F();
    };
}

if (!Object.prototype.extends) {
    Object.prototype.extends = function (parent) {
        this.prototype = Object.create(parent.prototype);
        this.prototype.constructor = this;
    };
}

var Shape = (function(){
    function Shape(color){
        this._color = color;
    }

    Shape.prototype.toString = function(){
        return "Color: " + this._color;
    };

    var Circle = (function(){
        function Circle(centerX, centerY, radius, color){
            this._centerX = centerX;
            this._centerY = centerY;
            if (isNumberValid(radius) || !isNumberPositive(radius)) {
                throw Error("Circle radius should be a positive number!");
            }

            this._radius = radius;
            Shape.call(this, color);
        }

        Circle.extends(Shape);
        Circle.prototype.toString = function(){
            var output = "Circle: ";
            output += "Center O(" + this._centerX + ", " + this._centerY + "), ";
            output += "Radius: " + this._radius + ", ";
            output += Shape.prototype.toString.call(this);

            return output;
        };

        return Circle;
    })();

    var Rectangle = (function(){
        function Rectangle(topLeftCornerX, topLeftCornerY, width, height, color){
            this._topLeftCornerX = topLeftCornerX;
            this._topLeftCornerY = topLeftCornerY;

            if (isNumberValid(width) || !isNumberPositive(width)) {
                throw Error("Rectangle width should be a positive number!");
            }

            if (isNumberValid(height) || !isNumberPositive(height)) {
                throw Error("Rectangle height should be a positive number!");
            }

            this._width = width;
            this._height = height;
            Shape.call(this, color);
        }

        return Rectangle;
    })();

    Rectangle.extends(Shape);
    Rectangle.prototype.toString = function(){
        var output = "Rectangle: ";
        output += "Corner A(" + this._topLeftCornerX + ", " + this._topLeftCornerY + "), ";
        output += "Width: " + this._width + ", ";
        output += "Height: " + this._height + ", ";
        output += Shape.prototype.toString.call(this);

        return output;
    };

    var Triangle = (function(){
        function Triangle(cornerAX, cornerAY, cornerBX, cornerBY, cornerCX, cornerCY, color){
            if (!isTriangleValid(cornerAX, cornerAY, cornerBX, cornerBY, cornerCX, cornerCY)) {
                throw Error("Can not be form valid triangle from given points!");
            }

            this._cornerAX = cornerAX;
            this._cornerAY = cornerAY;
            this._cornerBX = cornerBX;
            this._cornerBY = cornerBY;
            this._cornerCX = cornerCX;
            this._cornerCY = cornerCY;
            Shape.call(this, color);
        }

        return Triangle;
    })();

    Triangle.extends(Shape);
    Triangle.prototype.toString = function(){
        var output = "Triangle: ";
        output += "Corner A(" + this._cornerAX + ", " + this._cornerAY + "), ";
        output += "Corner B(" + this._cornerBX + ", " + this._cornerBY + "), ";
        output += "Corner C(" + this._cornerCX + ", " + this._cornerCY + "), ";
        output += Shape.prototype.toString.call(this);

        return output;
    };

    var Line = (function(){
        function Line(pointAX, pointAY, pointBX, pointBY, color){
            this._pointAX = pointAX;
            this._pointAY = pointAY;
            this._pointBX = pointBX;
            this._pointBY = pointBY;
            Shape.call(this, color);
        }

        return Line;
    })();

    Line.extends(Shape);
    Line.prototype.toString = function(){
        var output = "Line: ";
        output += "Point A(" + this._pointAX + ", " + this._pointAY + "), ";
        output += "Point B(" + this._pointBX + ", " + this._pointBY + "), ";
        output += Shape.prototype.toString.call(this);

        return output;
    };

    var Segment = (function(){
        function Segment(pointAX, pointAY, pointBX, pointBY, color){
            Line.call(this, pointAX, pointAY, pointBX, pointBY, color)
        }

        return Segment;
    })();

    Segment.extends(Line);
    Segment.prototype.toString = function(){
        var output = "Segment: ";
        output += "Point A(" + this._pointAX + ", " + this._pointAY + "), ";
        output += "Point B(" + this._pointBX + ", " + this._pointBY + "), ";
        output += Shape.prototype.toString.call(this);

        return output;
    };

    // "Private" functions
    function isNumberPositive(number){
        return number > 0;
    }

    function isNumberValid(number){
        return isNaN(number);
    }

    function distanceBetweenTwoPoints(pointAX, pointAY, pointBX, pointBY){
        var deltaX = pointBX - pointAX;
        var deltaY = pointBY - pointAY;

        return Math.sqrt((deltaX * deltaX) + (deltaY * deltaY));
    }

    function isTriangleValid(aX, aY, bX, bY, cX, cY){
        var sideA = distanceBetweenTwoPoints(aX, aY, bX, bY);
        var sideB = distanceBetweenTwoPoints(bX, bY, cX, cY);
        var sideC = distanceBetweenTwoPoints(aX, aY, cX, cY);

        if (sideA <= 0 || sideB <= 0 || sideC <= 0) {
            return false;
        }

        if (sideA + sideB <= sideC || sideA + sideC <= sideB || sideB + sideC <= sideA) {
            return false;
        }

        return true;
    }

    return {
        Circle: Circle,
        Rectangle: Rectangle,
        Triangle: Triangle,
        Line: Line,
        Segment: Segment
    }
})();

var circle = new Shape.Circle(3, 5, 2, "#AA00BB");
console.log(circle.toString());

var rectangle = new Shape.Rectangle(3, 5, 10, 12, "#009955");
console.log(rectangle.toString());

var triangle = new Shape.Triangle(1, 1, 3, 3, 10, 7, "#999999");
console.log(triangle.toString());

var line = new Shape.Line(1, 1, 5, 5, "#222222");
console.log(line.toString());

var segment = new Shape.Segment(0, 1, 2, 3, "#abcdef");
console.log(segment.toString());
