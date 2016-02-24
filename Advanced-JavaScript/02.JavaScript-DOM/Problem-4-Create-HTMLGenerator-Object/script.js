var HTMLGen = (function(){
    var parentElement = "";

    function createParagraph(id, text){
        parentElement = getParentElement(id);

        var paragraph = document.createElement('p');
        var paragraphText = document.createTextNode(text);
        paragraph.appendChild(paragraphText);

        parentElement.appendChild(paragraph);
    }

    function createDiv(id, divClass){
        parentElement = getParentElement(id);

        var div = document.createElement('div');
        div.className = divClass;

        parentElement.appendChild(div);
    }

    function createLink(id, text, url){
        parentElement = getParentElement(id);

        var link = document.createElement('a');
        var linkText = document.createTextNode(text);
        link.appendChild(linkText);
        link.href = url;

        parentElement.appendChild(link);
    }

    // private function
    function getParentElement(id){
        return document.getElementById(id);
    }

    return {
        createParagraph: createParagraph,
        createDiv: createDiv,
        createLink: createLink
    }
})();