var pokerapp;
(function (pokerapp) {
    var Sample = (function () {
        function Sample() {
        }
        Sample.prototype.hello = function (name) {
            return 'Hello ' + name;
        };
        return Sample;
    })();
    pokerapp.Sample = Sample;
})(pokerapp || (pokerapp = {}));
//# sourceMappingURL=sample.js.map