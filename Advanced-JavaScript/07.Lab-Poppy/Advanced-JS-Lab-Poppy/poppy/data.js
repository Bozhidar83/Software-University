// TODO: Implement popup function constructors
if (!Object.create) {
    Object.create = function (proto) {
        function F() {}
        F.prototype = proto;
        return new F();
    };
}

if (!Function.prototype.extends) {
    Function.prototype.extends = function (parent) {
        this.prototype = Object.create(parent.prototype);
        this.prototype.constructor = this;
    };
}

var popups = (function() {
    function Popup(title, message) {
        if (this.constructor === Popup) {
            throw new Error("Cannot instantiate abstract class!");
        }

        this.title = title;
        this.message = message;
        this.timeout = 5000;
    }

    function Success(title, message) {
        Popup.call(this, title, message);
        this.position = 'bottomLeft';
        this.autoHide = true;
        this.type = 'success';
    }
    Success.extends(Popup);

    function Info(title, message) {
        Popup.call(this, title, message);
        this.position = 'topLeft';
        this.closeButton = true;
        this.type = 'info';
    }
    Info.extends(Popup);

    function Error(title, message) {
        Popup.call(this, title, message);
        this.position = 'topRight';
        this.type = 'error';
    }
    Error.extends(Popup);

    function Warning(title, message, callback) {
        Popup.call(this, title, message);
        this.type = 'warning';
        this.position = 'bottomRight';
        this.callback = callback;
    }
    Warning.extends(Popup);

    return {
        createSuccess: function(title, message) {
            return {
                _popupData: new Success(title, message)
            }
        },
        createInfo: function(title, message) {
            return {
                _popupData: new Info(title, message)
            }
        },
        createError: function(title, message) {
            return {
                _popupData: new Error(title, message)
            }
        },
        createWarning: function(title, message, callback) {
            return {
                _popupData: new Warning(title, message, callback)
            }
        }
    }
})();