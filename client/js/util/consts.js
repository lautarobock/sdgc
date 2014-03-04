(function(exports) {

	exports.League = {
		Status: {
			PLANNING: {
                id: 'PLANNING',
                name: 'En Plan'
            },
			RUNNING: {id:'RUNNING',name:'En Curso'},
			FINISHED: {id:'FINISHED', name: 'Finalizado'}
		}
	};

})(typeof exports === 'undefined'? this['consts'] = {} : exports );