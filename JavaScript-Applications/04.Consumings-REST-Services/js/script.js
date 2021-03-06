$(document).ready(function () {
    var $errorMessage, $successMessage, resourceUrl;

    resourceUrl = 'https://baas.kinvey.com/appdata/kid_bk8SKwG-k-/books';
    $successMessage = $('.messages .success');
    $errorMessage = $('.messages .error');

    $.ajaxSetup({
        headers: {
            'Authorization': 'Basic cGVzaG86MTIzNDU=', // Generated by username = 'pesho', password = '12345'
            'Content-Type': 'application/json'
        }
    });

    loadBooks();

    // Add book
    $('#btn-add-book').on('click', function() {
        if (!$('#b-title').val()) {
            throw new Error('Book title is required!');
        }

        if (!$('#b-author').val()) {
            throw new Error('Book author is required!');
            return;
        }

        var book = {
            title: $('#b-title').val(),
            author: $('#b-author').val(),
            isbn: $('#b-isbn').val()
        };
        addBook(book);
    });

    // Delete book
    $('#books-container').on('click', 'button.b-delete', function() {
        var bookId = $(this).parent().parent().attr('id');
        deleteBook(bookId);
    });

    // Edit book
    $('#books-container').on('click', 'button.b-edit', function () {
        var bookId = $(this).parent().parent().attr('id');
        var title = $(this).prev().prev().prev();
        var author = $(this).prev().prev();
        var isbn = $(this).prev();
        var editedBook = {
            title: title.val() || $(this).parent().prev().prev().prev().prev().text(),
            author: author.val() || $(this).parent().prev().prev().prev().text(),
            isbn: isbn.val() || $(this).parent().prev().prev().text()
        };

        editBook(editedBook, bookId);

        title.val('');
        author.val('');
        isbn.val('');
    });

    function loadBooks () {
        $.ajax({
            url: resourceUrl,
            method: 'GET',
            contentType: 'application/json',
            success: function (data) {
                var book, $bookList, i, len;
                $bookList = $('<div/>').addClass('books-list');
                $('<div />')
                    .addClass('books-header')
                    .append($('<div />').text('Title'))
                    .append($('<div />').text('Author'))
                    .append($('<div />').text('ISBN'))
                    .append($('<div />').text('Delete book'))
                    .append($('<div />').text('Edit book'))
                    .appendTo($bookList);
                for (i = 0, len = data.length; i < len; i++) {
                    book = data[i];
                    var currentRow = $('<div id="'+ book._id + '"/>')
                        .addClass('books-row')
                        .append($('<div />').text(book.title))
                        .append($('<div />').text(book.author));
                    if (book.isbn) {
                        currentRow.append($('<div />').text(book.isbn));
                    } else {
                        currentRow.append($('<div />').text('N/A'));
                    }

                    currentRow.append('<div><button class="b-delete">Delete</button></div>');
                    currentRow.append('<div><input class="b-edit-title" placeholder="Title..."/>' +
                        '<input class="b-edit-author" placeholder="Author..."/>' +
                        '<input class="b-edit-isbn" placeholder="ISBN..."/>' +
                        '<button class="b-edit">Edit</button></div>');
                    currentRow.appendTo($bookList);
                }
                $('#books-container').html($bookList);
            },
            error: function (err) {
                $errorMessage
                    .html("Error happened: " + err)
                    .show()
                    .fadeOut(5000);
            }
        });
    }

    function addBook (data) {
        return $.ajax({
            url: resourceUrl,
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function (data) {
                $successMessage
                    .html('' + data.title + ' successfully added')
                    .show()
                    .fadeOut(5000);
                loadBooks();
                $('#b-title').val('');
                $('#b-author').val('');
                $('#b-isbn').val('');
            },
            error: function (err) {
                $errorMessage
                    .html('Error happened: ' + err)
                    .show()
                    .fadeOut(5000);
            }
        });
    }

    function deleteBook (id) {
        return $.ajax({
            url: resourceUrl + '/' + id,
            type: 'DELETE',
            headers: {
                'Authorization': 'Basic cGVzaG86MTIzNDU=', // Generated by username = 'pesho', password = '12345'
                'X-Kinvey-API-Version': '2',
                'Content-Type': 'null'
            },
            success: function (data) {
                $successMessage
                    .html('Book successfully deleted')
                    .show()
                    .fadeOut(5000);
                loadBooks();
            },
            error: function (err) {
                $errorMessage
                    .html('Error happened: ' + err.toString())
                    .show()
                    .fadeOut(5000);
            }
        });
    }

    function editBook (book, id) {
        return $.ajax({
            url: resourceUrl + '/' + id,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(book),
            success: function (data) {
                $successMessage
                    .html('' + data.title + ' successfully edited')
                    .show()
                    .fadeOut(5000);
                loadBooks();
            },
            error: function (err) {
                $errorMessage
                    .html('Error happened: ' + err.toString())
                    .show()
                    .fadeOut(5000);
            }
        })
    }
});