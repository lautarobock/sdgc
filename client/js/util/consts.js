(function(exports) {

	exports.League = {
		Status: {
			PLANNING: {id: 'PLANNING',name: 'En Plan'},
			RUNNING: {id:'RUNNING',name:'En Curso'},
			FINISHED: {id:'FINISHED', name: 'Finalizado'},
			asList: function() {
				return [exports.League.Status.PLANNING,exports.League.Status.RUNNING, exports.League.Status.FINISHED];
			}
		}
	};

    exports.Match = {
        Status: {
            PLANNING: {id: 'PLANNING',name: 'En Plan'},
            RUNNING: {id:'READY',name:'Confirmado'},
            FINISHED: {id:'FINISHED', name: 'Finalizado'}
        }
    };

})(typeof exports === 'undefined'? this['consts'] = {} : exports );