$(document).ready(function () {
    var router = Sammy(function(){
        var selector = '#greeting-message';

        this.get('/#/', function() {
            $(selector).html('');
        });

        this.get('/#/Sam', function() {
            $(selector).html('Hello, ' + getCurrentRouteName(this.path) + '!');
        });

        this.get('/#/Bob', function() {
            $(selector).html('Hello, ' + getCurrentRouteName(this.path) + '!');
        });

        this.get('/#/Nakov', function() {
            $(selector).html('Hello, ' + getCurrentRouteName(this.path) + '!');
        });

        this.get('/#/Pesho', function() {
            $(selector).html('Hello, ' + getCurrentRouteName(this.path) + '!');
        });
    });

    router.run('/#/');

    function getCurrentRouteName(path) {
        var lastSlashIndex = path.lastIndexOf('/'),
            routeName = path.substring(lastSlashIndex + 1);

        return routeName;
    }
});