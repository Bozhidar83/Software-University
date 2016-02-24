console.log("Problem 07. DOM Manipulation:");

var domModule = (function(){
    "use strict";

    var getElement = function(selector){
        return document.querySelector(selector);
    };

    function appendChild(parent, child){
        if (!(parent instanceof Element)) {
            parent = getElement(parent);
        }

        if (!parent) {
            throw new ReferenceError("Parent element is invalid or could not be found!");
        }

        if (!(child instanceof Element)){
            child = getElement(child);
        }

        if (!child) {
            throw new ReferenceError("Child element is invalid or could not be found!");
        }

        parent.appendChild(child);
    }

    function removeChild(parent, child){
        if (!(parent instanceof Element)) {
            parent = getElement(parent);
        }

        if (!parent) {
            throw new ReferenceError("Parent element is invalid or could not be found!");
        }

        if (!(child instanceof Element)){
            child = getElement(child);
        }

        if (!child) {
            throw new ReferenceError("Child element is invalid or could not be found!");
        }

        parent.removeChild(child);
    }

    function retrieveElements(selector) {
        return document.querySelectorAll(selector);
    }

    function addHandler(elements, eventType, eventHandler) {
        var i;

        if (!(elements instanceof Element) && !Array.isArray(elements)){
            elements = retrieveElements(elements);
        }

        if (!elements) {
            throw new ReferenceError("Element(s) requested could not be found!");
        }

        for (i in elements){
            if (elements[i] instanceof HTMLElement){
                elements[i].addEventListener(eventType, eventHandler, false);
            }
        }
    }

    return {
        appendChild: appendChild,
        removeChild: removeChild,
        addHandler: addHandler,
        retrieveElements: retrieveElements
    }
})();

var liElement = document.createElement("li");
// Appends a list item to ul.birds-list
domModule.appendChild(liElement,".birds-list");
// Removes the first li child from the bird list
domModule.removeChild("ul.birds-list","li:first-child");
// Adds a click event to all bird list items
domModule.addHandler("li.birds", 'click', function(){ alert("I'm a bird!") });
// Retrives all elements of class "bird"
var elements = domModule.retrieveElements(".bird");