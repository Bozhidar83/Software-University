define(['item'], function (Item) {
    var id = 0;
    return (function () {
        function Section(title) {
            this._title = title;
            this._items = [];
            this._id = ++id;
        }

        Section.prototype.addToDOM = function () {
            var parentElement = document.getElementById('sections-container');
            var section = document.createElement('div');
            section.id = this._id;

            var sectionItemsContainer = document.createElement('div');
            sectionItemsContainer.style.border = "1px solid black";

            var sectionTitle = document.createElement('h3');
            sectionTitle.innerText = this._title;
            var sectionItems = document.createElement('ul');

            sectionItemsContainer.appendChild(sectionTitle);
            sectionItemsContainer.appendChild(sectionItems);

            var addItemContainer = document.createElement('div');
            addItemContainer.className = "add-item-container";
            var addItemInput = document.createElement('input');
            addItemInput.type = "text";
            addItemInput.placeholder = "Add item...";
            addItemInput.id = this._id + "-add-item-input";
            var addItemButton = document.createElement('button');
            addItemButton.innerText = "+";
            addItemButton.id = this._id + "-button";
            addItemButton.onclick = function () {
                var itemContent = addItemButton.previousElementSibling.value;
                checkForEmptyInput(itemContent);
                var item = new Item(itemContent);
                if(this._items === undefined){
                    this._items = [];
                }

                var itemNames = this._items.map(function(f){
                    return f._content;
                });
                if(itemNames.indexOf(item._content) > -1){
                    addItemButton.previousElementSibling.value = '';
                    throw new Error("That task already exists!");
                }
                this._items.push(item);
                item.addToDOM.call(sectionItems);

                // Clear input field
                addItemButton.previousElementSibling.value = '';
            };
            addItemContainer.appendChild(addItemInput);
            addItemContainer.appendChild(addItemButton);

            section.appendChild(sectionItemsContainer);
            section.appendChild(addItemContainer);

            parentElement.appendChild(section);
        };

        // Private methods
        function checkForEmptyInput(input) {
            if (!input) {
                throw new Error("Task content is requited!");
            }
        }

        return Section;
    })();
});