var app = app || {};

app.data = function () {
    function Data(rootUrl) {
        this.countries = new Database(rootUrl + 'kid_bJKjEWCaRe/countries');
        this.towns = new Database(rootUrl + 'kid_bJKjEWCaRe/towns');
    }

    var Database = (function () {
        function Database(serviceUrl) {
            this.serviceUrl = serviceUrl;
        }

        Database.prototype.getAll = function (queryString, success, error) {
            return ajaxRequester.get(this.serviceUrl + queryString, success, error);
        };

        Database.prototype.add = function (data, success, error) {
            return ajaxRequester.post(this.serviceUrl, data, success, error);
        };

        Database.prototype.update = function (id, data, success, error) {
            return ajaxRequester.put(this.serviceUrl + '/' + id, data, success, error);
        };

        Database.prototype.remove = function (id, success, error) {
            return ajaxRequester.delete(this.serviceUrl + '/' + id, success, error);
        };

        return Database;
    }());

    return {
        get: function (rootUrl) {
            return new Data(rootUrl);
        }
    }
}();