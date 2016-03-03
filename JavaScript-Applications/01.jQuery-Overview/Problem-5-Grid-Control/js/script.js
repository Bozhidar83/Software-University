$(document).ready(function () {
    function makeNewRow(data, columnHTMLType) {
        var i,
            newRow = $('<tr>'),
            length = data.length;

        for (i = 0; i < length; i++) {
            $(columnHTMLType)
                .text(data[i])
                .appendTo(newRow);
        }

        return newRow;
    }

    $.fn.grid = function () {
        this.addHeader = function (data) {
            var newRow = makeNewRow(data, '<th>');
            this.find('thead').empty().append(newRow);

            return this;
        };

        this.addRow = function (data) {
            var newRow = makeNewRow(data, '<td>');
            this.find('tbody').append(newRow);

            return this;
        };

        return this
            .empty()
            .append('<thead>')
            .append('<tbody>');
    };

    // test grid functionality
    $('#myGrid')
        .grid()
        .addHeader(['First Name', 'Last Name', 'Age'])
        .addRow(['Bay', 'Ivan', 50])
        .addRow(['Kaka', 'Penka', 26]);
}());