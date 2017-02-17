/* global IDFAPP */

IDFAPP.UI = function (core) {
    this._core = core;
    this._scene = this._core.getView3d().getScene();
    this._evtWrapper = this._core.getParams().events_wrapper;

    if (this._evtWrapper) {
        this._evtWrapper.addEventListener('click', this, false);
        this._evtWrapper.addEventListener('mouseover', this, false);
        this._evtWrapper.addEventListener('keyup', this, false);
        this._evtWrapper.addEventListener('change', this, false);
    }
};



IDFAPP.UI.prototype = {
    handleEvent: function (evt) {
        var action = IDFAPP.getEventAction(evt, 'evt-action');

        if (action !== null) {
            switch (evt.type) {
                case 'click':
                    switch (action.type) {
                        case 'activate-tools':
                            break;
                    }
                    break;
                case 'keyup':
                switch (action.type) {
                    case 'text-area':
                        break;
                }
                case 'change':
                    switch (action.type) {
                        case 'text-spacing':
                            break;
                    }
                    break;
                case 'mouseover':
                    break;
            }
        }
    }
};
