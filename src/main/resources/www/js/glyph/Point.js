define(

function() {
	
	var Point = function(x, y) {
		this._x = x; 
		this._y = y;
	}
	
	Point.prototype.getX = function() {
		return this._x;
	}
	
	Point.prototype.getY = function() {
		return this._y;
	}
	
	return Point;
	
});