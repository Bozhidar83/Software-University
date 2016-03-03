$(document).ready(function() {
    $('#submit').click(function() {
        var jsonString = $('#json-text').val();
        if (jsonString.indexOf('"') === 0 || jsonString.indexOf("'") === 0) {
            jsonString = jsonString.slice(1).slice(0, -1);
        }
        console.log(jsonString);
        var jsonArray = $.parseJSON(jsonString);

        var table = '<table><thead><tr><td>Manufacturer</td><td>Model</td><td>Year</td><td>Price</td><td>Class</td></tr></thead><tbody>';
        jsonArray.forEach(function(car) {
            table += '<tr><td>'+ car.manufacturer + '</td><td>'+ car.model +
                '</td><td>' + car.year + '</td><td>' + car.price + '</td><td>' +
                car.class + '</td></tr>';
        });
        table += '</tbody></table>';

        $('#wrapper').append(table);
    })
});