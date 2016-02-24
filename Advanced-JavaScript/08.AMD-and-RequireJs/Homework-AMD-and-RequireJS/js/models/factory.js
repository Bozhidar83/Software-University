define(['item', 'section', 'container'], function(Item, Section, Container) {
    return (function() {
        function getContainer(dayOfWeek) {
            return new Container(dayOfWeek);
        }

        function getSection(title) {
            return new Section(title);
        }

        function getItem(content) {
            return new Item(content);
        }

        return {
            getContainer: getContainer,
            getSection: getSection,
            getItem: getItem
        };
    })();
});
