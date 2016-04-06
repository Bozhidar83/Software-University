var app = app || {};

app.booksController = (function () {
    function BooksController(model, viewBag) {
        this._model = model;
        this._viewBag = viewBag;
    }

    BooksController.prototype.loadAllBooks = function(selector) {
        var _this = this;

        if (!sessionStorage['sessionAuth']) {
            Sammy(function() {
                this.trigger('redirectUrl', {url: '#/login'});
            });

            return;
        }

        this._model.getAllBooks()
            .then(function(successData) {
                var result = {
                    books: []
                };

                successData.forEach(function(book) {
                    result.books.push({title: book.title, author: book.author, isbn: book.isbn, bookId: book._id});
                });

                _this._viewBag.showAllBooks(selector, result);
            })
    };

    BooksController.prototype.loadAddBookPage = function(selector) {
        if (!sessionStorage['sessionAuth']) {
            Sammy(function() {
                this.trigger('redirectUrl', {url: '#/login'});
            });

            return;
        }

        this._viewBag.showAddNewBook(selector)
    };

    BooksController.prototype.addNewBook = function(data) {
        var _this = this;
        this._model.addNewBook(data)
            .then(function() {
                Sammy(function () {
                    this.trigger('redirectUrl', {url: '#/books'});
                })
            })
    };

    BooksController.prototype.loadEditBookPage = function(selector) {
        if (!sessionStorage['sessionAuth']) {
            Sammy(function() {
                this.trigger('redirectUrl', {url: '#/login'});
            });

            return;
        }

        this._viewBag.showEditBook(selector)
    };

    BooksController.prototype.editBook = function(data) {
        var _this = this;
        this._model.editBook(data.id, data)
            .then(function() {
                Sammy(function() {
                    this.trigger('redirectUrl', {url: '#/books'})
                })
            }).done();
    };

    BooksController.prototype.deleteBook = function(id) {
        var _this = this;
        this._model.deleteBook(id)
            .then(function() {
                Sammy(function() {
                    this.trigger('redirectUrl', {url: '#/books'});
                })
            }, function(error) {
                console.log(error);
            })
    };

    return {
        load: function (model, viewBag) {
            return new BooksController(model, viewBag);
        }
    }
}());