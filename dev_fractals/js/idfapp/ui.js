IDFAPP.UI = function (core) {
    this.core = core;
    this.scene = this.core.view3d.scene;
    this.events_wrapper = this.core.params.events_wrapper;

    if (this.events_wrapper) {
        this.events_wrapper.addEventListener('click', this, false);
        this.events_wrapper.addEventListener('mouseover', this, false);
        this.events_wrapper.addEventListener('keyup', this, false);
        this.events_wrapper.addEventListener('change', this, false);
    }

   
};



IDFAPP.UI.prototype = {
	handleEvent: function(evt) {
		var action = IDFAPP.getEventAction(evt, 'evt-action');

		if (action != null) {
			switch(evt.type) {
				case 'click':
				    switch (action.type) {
			        case 'activate-tools':
			            break;
				    }
					break;
				case 'keyup':
					switch(action.type) {
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
    },
};
