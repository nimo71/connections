window.application = window.application || {};
window.application.glyph = window.application.glyph || {};

(function( glyph ) {
	
	glyph.Glyph = function(x, y) {
		var gx = x; 
		var gy = y; 
		
		this.getX = function() { 
			return gx; 
		};
		
		this.getY = function() { 
			return gy; 
		};
		
		window.application.touch.Touch.addListener(this);
	}
	
	glyph.Glyph.prototype.onTouchend = function(touchendHandler) {
		this.touchendHandler = touchendHandler;
	}
	
	glyph.Glyph.prototype.contains = function(x, y) {
		return false;
	}
	
	glyph.Glyph.getPosition = function() {
		return new glyph.Point(this.getX(), this.getY());
	}
	
}( window.application.glyph ));
