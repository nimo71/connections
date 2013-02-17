window.application = window.application || {};
window.application.glyph = window.application.glyph || {};

(function( glyph ) {
	
	glyph.Glyph = function(x, y) {
		this._x = x; 
		this._y = y; 
		window.application.touch.Touch.addListener(this);
	}
	
	glyph.Glyph.prototype.onTouchend = function(touchendHandler) {
		this.touchendHandler = touchendHandler;
	}
	
	glyph.Glyph.prototype.contains = function(x, y) {
		return false;
	}
	
	glyph.Glyph.prototype.move = function(toX, toY) {
		this._x = toX; 
		this._y = toY;
	};

	glyph.Glyph.prototype.getX = function() {
		return this._x; 
	};
	
	glyph.Glyph.prototype.getY = function() {
		return this._y; 
	};
	
	glyph.Glyph.prototype.getPosition = function() {
		return new glyph.Point(this._x, this._y);
	}
	
}( window.application.glyph ));
