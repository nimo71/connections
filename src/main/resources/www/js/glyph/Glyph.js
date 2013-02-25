define(
[
 	"Touch", 
 	"glyph/Point"
],
function( Touch, Point ) {
	
	var Glyph = function(x, y) {
		this._x = x; 
		this._y = y; 
		Touch.addListener(this);
	}
	
	Glyph.prototype.onTouchend = function(touchendHandler) {
		this.touchendHandler = touchendHandler;
	}
	
	Glyph.prototype.contains = function(x, y) {
		return false;
	}
	
	Glyph.prototype.move = function(toX, toY) {
		this._x = toX; 
		this._y = toY;
	}

	Glyph.prototype.getX = function() {
		return this._x; 
	}
	
	Glyph.prototype.getY = function() {
		return this._y; 
	}
	
	Glyph.prototype.getPosition = function() {
		return new Point(this._x, this._y);
	}
	
	return Glyph; 
});
