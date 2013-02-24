window.application = window.application || {};
window.application.physics = window.application.physics || {};

(function(physics) {
	
	physics.Force = function(x, y) {
		this._fx = x; 
		this._fy = y;
	}
	
	physics.Force.prototype.getX = function() { 
		return this._fx; 
	}
		
	physics.Force.prototype.getY = function() { 
		return this._fy; 
	}
		
	physics.Force.prototype.add = function(f) {
		var rx = f.getX() + this._fx;
		var ry = f.getY() + this._fy;
		return new physics.Force(rx, ry);
	}

}( window.application.physics ));