var app = app || {};

(function() {
    var router = Sammy(function() {
        var selector = $('#container');

        var requester = app.requester.config('kid_bk8SKwG-k-', 'd5b8aa7b40614bf0a6bcf26afca71bd2');

        var userViewBag = app.userViews.load();
        var booksViewBag = app.booksViews.load();

        var userModel = app.userModel.load(requester);
        var booksModel = app.booksModel.load(requester);

        var userController = app.userController.load(userModel, userViewBag);
        var booksController = app.booksController.load(booksModel, booksViewBag);

        this.get('#/', function() {
            this.redirect('#/login');
        });

        this.get('#/login', function() {
            userController.showLoginPage(selector);
        });

        this.get('#/logout', function() {
            userController.logout();
        });

        this.get('#/register', function() {
            userController.showRegisterPage(selector);
        });

        this.get('#/books', function() {
            booksController.loadAllBooks(selector);
        });

        this.get('#/addNewBook', function() {
            booksController.loadAddBookPage(selector);
        });

        this.get('#/editBook/:id', function() {
            booksController.loadEditBookPage(selector)
        });

        this.get('#/books/:id', function() {
            booksController.deleteBook(this.params['id'])
        });

        this.bind('redirectUrl', function(e, data) {
            this.redirect(data.url);
        });

        this.bind('login', function(e, data) {
            userController.login(data);
        });

        this.bind('register', function(e, data) {
            userController.register(data);
        });

        this.bind('add-new-book', function(e, data) {
            booksController.addNewBook(data);
        });

        this.bind('edit-book', function(e, data) {
            booksController.editBook(data)
        })
    });

    router.run('#/');
})();