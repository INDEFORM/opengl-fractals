/* global IDFAPP */

IDFAPP.Controls = function () {
    this._keysState = {
        ArrowUp: false,
        ArrowDown: false,
        ArrowLeft: false,
        ArrowRight: false
    };

    this._inverseKeys = {
        ArrowUp: "ArrowDown",
        ArrowDown: "ArrowUp",
        ArrowLeft: "ArrowRight",
        ArrowRight: "ArrowLeft"
    };

    this._actionStack = [];

    document.body.addEventListener("keydown", this, false);
    document.body.addEventListener("keyup", this, false);
    document.body.addEventListener("keypress", this, false);
};

IDFAPP.Controls.prototype = {
    _handleKeyDown: function (key) {
        if (this._keysState[key] !== undefined) {
            if (this._inverseKeys[key] !== undefined) {
                this._keysState[key] = this._keysState[this._inverseKeys[key]] === false;
            } else {
                this._keysState[key] = true;
            }
        }
    },
    _handleKeyUp: function (key) {
        if (this._keysState[key] !== undefined)
            this._keysState[key] = false;
    },
    _handleKeypress: function (key) {
        switch (key) {
            case "+":
                this._actionStack.push({type: "fractal", action: "increment"});
                break;
            case "-":
                this._actionStack.push({type: "fractal", action: "decrement"});
                break;
        }
    },
    handleEvent: function (evt) {
        switch (evt.type) {
            case "keydown":
                this._handleKeyDown(evt.key);
                break;
            case "keyup":
                this._handleKeyUp(evt.key);
                break;
            case "keypress":
                this._handleKeypress(evt.key);
                break;
        }
    },
    getState: function () {
        return this._keysState;
    },
    getActionStack: function () {
        return this._actionStack;
    }
};