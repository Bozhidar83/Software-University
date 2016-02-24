define([], function() {
    return (function () {
        function Item(content) {
            this._content = content;
        }

        Item.prototype.addToDOM = function () {
            var parentElement = this;

            var itemContainer = document.createElement('li');
            var itemCheckBox = document.createElement('input');
            var itemText = document.createElement('label');
            var parentOfUl = parentElement.parentNode;
            var nextElement = parentOfUl.nextSibling;
            var inputElement = nextElement.getElementsByTagName("input")[0];
            itemText.innerText = inputElement.value;

            itemCheckBox.type = "checkbox";
            itemCheckBox.onclick = function () {
                if (itemCheckBox.checked == true) {
                    itemText.style.backgroundColor = '#00FF99';
                    itemCheckBox.style.backgroundColor = 'white';
                }
                else {
                    itemText.style.backgroundColor = '';
                }
            };

            itemContainer.appendChild(itemCheckBox);
            itemContainer.appendChild(itemText);
            parentElement.appendChild(itemContainer);
        };

        return Item;
    })();
});