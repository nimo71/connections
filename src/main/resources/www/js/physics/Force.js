define(
function() {
	
	var Force = function(x, y) {
		this._fx = x; 
		this._fy = y;
	}
	
	Force.prototype.getX = function() { 
		return this._fx; 
	}
		
	Force.prototype.getY = function() { 
		return this._fy; 
	}
		
	Force.prototype.add = function(f) {
		var rx = f.getX() + this._fx;
		var ry = f.getY() + this._fy;
		return new Force(rx, ry);
	}
	
	return Force;

});