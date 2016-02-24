require({
    paths: {
        'item': 'models/item',
        'section': 'models/section',
        'container': 'models/container',
        'factory': 'models/factory'
    }
});

require(['factory'], function (factory) {
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
    var newContainer = factory.getContainer(day);
    newContainer.addToDOM();
});