var app = app || {};

app.booksModel = (function () {
    function BooksModel(requester) {
        this._requester = requester;
        this.serviceUrl = requester.baseUrl + 'appdata/' + requester.appId + '/books';
    }

    BooksModel.prototype.getAllBooks = function () {
        return this._requester.get(this.serviceUrl, true);
    };

    BooksModel.prototype.addNewBook = function(data) {
        return this._requester.post(this.serviceUrl, data, true);
    };

    BooksModel.prototype.editBook = function(id, data) {
        return this._requester.put(this.serviceUrl + '/' + id, data, true);
    };

    BooksModel.prototype.deleteBook = function(id) {
        return this._requester.remove(this.serviceUrl + '/' + id, true);
    };

    return {
        load: function (requester) {
            return new BooksModel(requester);
        }
    }
}());