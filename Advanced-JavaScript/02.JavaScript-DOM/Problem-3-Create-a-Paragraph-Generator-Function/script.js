function createParagraph(id, text){
    var parentElement = document.getElementById(id);

    var paragraph = document.createElement('p');
    var paragraphText = document.createTextNode(text);
    paragraph.appendChild(paragraphText);
    parentElement.appendChild(paragraph);
}

createParagraph('wrapper', 'THIS IS TEST PARAGRAPH');