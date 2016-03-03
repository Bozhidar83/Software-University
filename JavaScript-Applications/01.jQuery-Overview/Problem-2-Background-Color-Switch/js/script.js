$(document).ready(function() {
    $('#paint').click(function() {
        var className = $('#class-name').val();

        // check for missing class name
        if (!className) {
            throw new Error('Missing class name!');
        }

        // check if class name exist on the page
        var allElements = $('.' + className);
        if  (!allElements.length) {
            throw new Error('No such class name!')
        }

        var color = $('#color').val();

        $('li.' + className).css("background-color", color);
    });
});