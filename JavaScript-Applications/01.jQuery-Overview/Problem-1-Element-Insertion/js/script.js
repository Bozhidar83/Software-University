$(document).ready(function () {
    // Test
    var selector = $('#test');
    var elementP = $('<p>').text('This paragraph is added after Test Div.');
    addElementAfter(selector, elementP);

    var anotherP = $('<p>').text('This paragraph is added before Test Div.');
    addElementBefore(selector, anotherP);

    var fakeSelector = $('#something');
    addElementAfter(fakeSelector, elementP); // throws error: invalid selector

    var fakeElement = $('<asd>');
    addElementBefore(selector, fakeElement); // throws error: invalid element
});

var validHtmlTags = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base',
    'bdi', 'bdo', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col',
    'colgroup', 'data', 'datalist', 'dd', 'del', 'dfn', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset',
    'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hr',
    'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main',
    'map', 'mark', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p',
    'param', 'pre', 'progress', 'q', 'rb', 'rp', 'rt', 'rtc', 'ruby', 's', 'samp', 'script', 'section', 'select',
    'small', 'source', 'span', 'strong', 'style', 'sub', 'sup', 'table', 'tbody', 'td', 'template', 'textarea',
    'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr'];

function addElementBefore (selector, element) {
    // validate selector
    hasSelectedElement(selector);

    // validate element
    isValidElement(element);

    var selectedElement = $(selector);
    selectedElement.before(element);
}

function addElementAfter (selector, element) {
    // validate selector
    hasSelectedElement(selector);

    // validate element
    isValidElement(element);

    var selectedElement = $(selector);
    selectedElement.after(element);
}

// Validation functions
function hasSelectedElement(selector) {
    var element = $(selector);
    if (!element.length) {
        throw new Error('No selected element!');
    }
}

function isValidElement(element) {
    var elementIndex = $.inArray(element[0].localName, validHtmlTags);
    if (elementIndex < 0) {
        throw new Error('Invalid element');
    }
}