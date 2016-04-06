(function () {
    var serviceRootUrl = 'https://baas.kinvey.com/appdata/';
    var persister = app.data.get(serviceRootUrl);
    var controller = app.controller.get(persister);
    controller.load('#countries');
}());