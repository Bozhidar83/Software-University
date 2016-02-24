define(['section'], function(Section) {
    return (function () {
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

            var section = new Section(sectionTitle);
            if (this._sections === undefined) {
                this._sections = [];
            }

            var sectionTitles = this._sections.map(function (f) {
                return f._title;
            });

            if (sectionTitles.indexOf(section._title) > -1) {
                sectionTitleObject.value = '';
                throw new Error("That section already exists!");
            }

            this._sections.push(section);
            section.addToDOM();

            // Clear input field
            sectionTitleObject.value = '';
        }

        return Container;
    })();
});