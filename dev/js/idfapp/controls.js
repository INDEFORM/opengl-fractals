/* global IDFAPP */

IDFAPP.Controls = function () {
    this._keysState = {
        ArrowUp: false,
        ArrowDown: false,
        ArrowLeft: false,
        ArrowRight: false
    };

    this._inverseKey = {
        ArrowUp: "ArrowDown",
        ArrowDown: "ArrowUp",
        ArrowLeft: "ArrowRight",
        ArrowRight: "ArrowLeft"
    };

    document.body.addEventListener("keydown", this, false);
    document.body.addEventListener("keyup", this, false);
};

IDFAPP.Controls.prototype = {
    _handleKeyDown: function (key) {
        if (this._keysState[key] !== undefined) {
            if (this._inverseKey[key] !== undefined) {
                this._keysState[key] = this._keysState[this._inverseKey[key]] === false;
            } else {
                this._keysState[key] = true;
            }
        }
    },
    _handleKeyUp: function (key) {
        if (this._keysState[key] !== undefined)
            this._keysState[key] = false;
    },
    handleEvent: function (evt) {
        //console.log(evt);
        switch (evt.type) {
            case "keydown":
                this._handleKeyDown(evt.key);
                break;
            case "keyup":
                this._handleKeyUp(evt.key);
                break;
        }
    },
    getState: function () {
        return this._keysState;
    }
};