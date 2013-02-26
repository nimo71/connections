define(
function() {
	
	var Force = function(x, y) {
		this._fx = x; 
		this._fy = y;
	}
	
	Force.acting = function(from, to, magnitude) {
		var theta = from.angle(to);
		var q = from.quadrant(to);
		var cax = magnitude * Math.cos(theta) * ((q === 4 || q === 1) ? 1 : -1);
		var cay = magnitude * Math.sin(theta) * ((q === 4 || q === 3) ? -1 : 1);
		return new Force(cax, cay);
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