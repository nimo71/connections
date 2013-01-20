window.application = window.application || {};
window.application.touch = window.application.touch || {};

(function(touch) {
	
	var listeners = new Array();
	
	touch.Touch = {
			
		addListener: function(listener) {
			listeners.push(listener);
		}, 
		
		removeListener: function(listener) {
			var index = instance.listeners.indexOf(listener)
			if (index > -1) {
				this.listeners.splice(index, 1);
			}
		} 
	}
	
	document.addEventListener('touchstart', function(e) {
//		e.preventDefault();
		listeners.forEach(function(listener) {
			if (listener.touchstart) listener.touchstart(e);
		});
		return false;
	}, false);
	
	document.addEventListener('touchmove', function(e) {
//		e.preventDefault();
		listeners.forEach(function(listener) {
			if (listener.touchmove) listener.touchmove(e);
		});
		return false;
	}, false);
	
	document.addEventListener('touchend', function(e) {
//		e.preventDefault();
		listeners.forEach(function(listener) {
			if (listener.touchend) listener.touchend(e);
		});
		return false;
	}, false);
	
	document.addEventListener('touchcancel', function(e) {
//		e.preventDefault();
		listeners.forEach(function(listener) {
			if (listener.touchcancel) listener.touchcancel(e);
		});
		return false;
	}, false);
	
} (window.application.touch));


