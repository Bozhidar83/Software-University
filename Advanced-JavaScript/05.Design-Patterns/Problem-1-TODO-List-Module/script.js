if (!Object.create) {
    Object.create = function (proto) {
        function F() {
        }

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

var todoModule = (function () {
    var sectionCount = 0;

    // Item class
    var Item = (function () {
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

    // Section class
    var Section = (function () {
        function Section(title) {
            this._title = title;
            this._items = [];
            this._id = sectionCount++;
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
                var item = new todoModule.Item(itemContent);
                if(this._items === undefined){
                    this._items = [];
                }

                var itemNames = this._items.map(function(f){
                    return f._content;
                });
                if(itemNames.indexOf(item._content) > -1){
                    throw new Error("That task already exists!");
                }
                this._items.push(item);
                item.addToDOM.call(sectionItems);
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

    // Container class
    var Container = (function () {
        function Container(dayOfWeek) {
            this._dayOfWeek = dayOfWeek;
            this._sections = [];
        }

        Container.prototype.addToDOM = function () {
            var parentElement = document.getElementById('wrapper');
            var containerDiv = document.createElement('div');

            // Container title
            var containerTitle = document.createElement('h1');
            var todoWordInTitle = document.createElement("span");
            todoWordInTitle.innerText = "TODO";
            containerTitle.innerHTML = this._dayOfWeek + " " + todoWordInTitle.outerHTML + " List";

            // Container list sections div
            var containerContent = document.createElement('div');
            containerContent.id = "sections-container";
            containerContent.style.border = "1px solid black";
            var noSectionElement = document.createElement('p');
            containerContent.appendChild(noSectionElement);

            // Add new section div
            var addNewSectionDiv = document.createElement('div');
            addNewSectionDiv.id = "add-new-section-container";
            var inputElement = document.createElement('input');
            inputElement.type = "text";
            inputElement.title = "Title";
            inputElement.placeholder = "Title...";
            inputElement.id = "section-title";
            var addSectionButton = document.createElement('button');
            addSectionButton.innerText = "New Section";
            addSectionButton.id = "add-section-button";
            addSectionButton.addEventListener('click', addSection);
            addNewSectionDiv.appendChild(inputElement);
            addNewSectionDiv.appendChild(addSectionButton);

            containerDiv.appendChild(containerTitle);
            containerDiv.appendChild(containerContent);
            containerDiv.appendChild(addNewSectionDiv);

            parentElement.appendChild(containerDiv);
        };

        // Private methods
        function addSection() {
            var sectionTitleObject = document.getElementById('section-title');
            var sectionTitle = sectionTitleObject.value;
            if (sectionTitle === "") {
                throw new Error("Section must have a title!");
            }

            var section = new todoModule.Section(sectionTitle);
            if (this._sections === undefined) {
                this._sections = [];
            }

            var sectionTitles = this._sections.map(function (f) {
                return f._title;
            });

            if (sectionTitles.indexOf(section._title) > -1) {
                throw new Error("That section already exists!");
            }

            this._sections.push(section);
            section.addToDOM();
        }

        return Container;
    })();

    return {
        Container: Container,
        Section: Section,
        Item: Item
    }
})();

// Add get 'day name' method to Date object
(function () {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    Date.prototype.getDayName = function () {
        return days[this.getDay()];
    };
})();

// Run the application
var now = new Date();
var day = now.getDayName();
var newContainer = new todoModule.Container(day);
newContainer.addToDOM();