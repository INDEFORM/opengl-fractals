Testing = this.Testing || {};

Testing.BaseTestCase = function (name) {
    this._name = name || "Unnamed test";
};

Testing.BaseTestCase.prototype = {
    getName: function () {
        return this._name;
    },
    getCase: function (assert) {
        throw "Must be overriden by superceding class.";
    }
};