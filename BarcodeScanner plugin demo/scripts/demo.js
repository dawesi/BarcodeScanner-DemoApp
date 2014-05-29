(function (global) {
    var DemoViewModel,
        app = global.app = global.app || {};

    DemoViewModel = kendo.data.ObservableObject.extend({

        scan: function () {
            if (!this.checkSimulator()) {
                alert('TODO (only encoding is implemented in the demo)');
            }
        },

        encode: function () {
            if (!this.checkSimulator()) {
                cordova.plugins.barcodeScanner.encode(
                    cordova.plugins.barcodeScanner.Encode.TEXT_TYPE,
                    "http://www.nytimes.com",
                    function (success) {}, // never called because an intent is used
                    function (fail) {alert("encoding failed: " + fail)}
                )
            }
        },

        encodeInline: function () {
            if (!this.checkSimulator()) {
                cordova.plugins.barcodeScanner.encodeInline(
                    cordova.plugins.barcodeScanner.Encode.TEXT_TYPE,
                    "http://www.nytimes.com",
                    function (success) {
                        document.getElementById('image').src = 'data:image/jpg;base64,'+success.RESULT;
                    },
                    function (fail) {alert("encoding failed: " + fail)}
                )
            }
        },

        checkSimulator: function() {
            if (cordova.plugins === undefined) {
                alert('Plugin not available. Are you running in the simulator?');
                return true;
            }
            return false;
        }
    });

    app.demoService = {
        viewModel: new DemoViewModel()
    };
})(window);