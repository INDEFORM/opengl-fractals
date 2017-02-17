Testing.BaseTestCase = function (name, desc) {
    this._name = name || "Unnamed test";
    this._description = desc || "No description";
};

Testing.BaseTestCase.prototype = {
    getName: function () {
        return this._name;
    },
    getDescription() {
        return this._description;
    },
    getCase: function (assert) {
        throw "Must be overriden by superceding class.";
    }
};