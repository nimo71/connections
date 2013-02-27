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

	Point.prototype.angle = function(to) {
		var dy = Math.abs( to.getY() - this.getY() );
		var dx = Math.abs( to.getX() - this.getX() );
		if (dx === 0) return (Math.PI / 2);
		return Math.atan(dy / dx);
	}
	
	Point.prototype.quadrant = function(to) {
		var dy = to.getY() - this.getY();
		var dx = to.getX() - this.getX();

		if ((dx >= 0) && (dy >= 0)) return 1;
		if ((dx < 0) && (dy >= 0)) return 2;
		if ((dx < 0) && (dy < 0)) return 3;
		if ((dx >= 0) && (dy < 0)) return 4;
	}
	
	Point.prototype.distance = function(to) {
		var dx = Math.abs(this.getX() - to.getX());
		var dy = Math.abs(this.getY() - to.getY());
		return Math.sqrt((dx * dx) + (dy * dy));
	}
	
	return Point;
	
});