define(
function() {
	
	var Force = function(x, y) {
		this._fx = x; 
		this._fy = y;
	}
	
	Force.acting = function(from, to, mass) {
		
		function limit(v, limit) {
			var val = v
			if (val > limit) val = limit;
			if (val < -limit) val = -limit;
			return val;
		}
		jj
		var distance = from.distance(to);
		if (distance === 0) {
			distance = 1; 
		}
		var theta = from.angle(to);
		var q = from.quadrant(to);
		
		/*    Quadrants
			  
			 	3 | 4
	           -------
	            2 | 1	
		 */
		var cay = (mass * Math.sin(theta) * ((q === 4 || q === 3) ? -1 : 1)) / (distance * distance);
		var cax = (mass * Math.cos(theta) * ((q === 3 || q === 2) ? -1 : 1)) / (distance * distance);
		
		cax = limit(cax, 20);
		cay = limit(cay, 20);
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