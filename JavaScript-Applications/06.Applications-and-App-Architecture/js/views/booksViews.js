var app = app || {};

app.booksViews = (function () {
    function showAllBooks(selector, data) {
        $.get('templates/books.html', function (templ) {
            var rendered = Mustache.render(templ, data);
            $(selector).html(rendered);
            $('#add-book').on('click', function(e) {
                Sammy(function () {
                    this.trigger('redirectUrl', {url:'#/addNewBook'});
                })
            });

            $('.b-delete').on('click', function(e) {
                var parentId = $(this).parent().parent().attr('id');
                Sammy(function() {
                    this.trigger('redirectUrl', {url: '#/books/' + parentId});
                })
            });

            $('.b-edit').on('click', function(e) {
                var parentId = $(this).parent().parent().attr('id');
                Sammy(function() {
                    this.trigger('redirectUrl', {url: '#/editBook/' + parentId, name: 'pesho'});
                })
            });

            $('#logout').on('click', function(e) {
                Sammy(function() {
                    this.trigger('redirectUrl', {url:'#/logout'});
                })
            })
        })
    }

    function showAddNewBook(selector) {
        $.get('templates/addNewBook.html', function (templ) {
            $(selector).html(templ);
            $('#add-new-book').on('click', function() {
                var title = $('#b-title').val();
                var author = $('#b-author').val();
                var isbn = $('#b-isbn').val();
                Sammy(function () {
                    this.trigger('add-new-book', {title: title, author: author, isbn: isbn});
                });
            })
        })
    }

    function showEditBook(selector, data) {
        $.get('templates/editBook.html', function (templ) {
            var output = Mustache.render(templ, data);
            $(selector).html(output);

            $('#edit-book').on('click', function() {
                var title = $('#b-edit-title').val();
                if (!title) {
                    throw new Error('Book title should not be empty.')
                }

                var author = $('#b-edit-author').val();
                if (!author) {
                    throw new Error('Book author should not be empty.')
                }

                var isbn = $('#b-edit-isbn').val();
                if (!isbn) {
                    isbn = 'N/A';
                }

                var id = location.hash.substring(location.hash.lastIndexOf('/') + 1);

                Sammy(function () {
                    this.trigger('edit-book', {id: id, title: title, author: author, isbn: isbn});
                });
            })
        })
    }

    return {
        load: function () {
            return {
                showAllBooks: showAllBooks,
                showAddNewBook: showAddNewBook,
                showEditBook: showEditBook
            }
        }
    }
}());