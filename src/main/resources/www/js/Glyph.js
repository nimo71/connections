window.application = window.application || {};
window.application.glyph = window.application.glyph || {};

(function( glyph ) {
	
	glyph.Glyph = function(x, y) {
		this.x = x;
		this.y = y;
		
		window.application.touch.Touch.addListener(this);
	}
	
	glyph.Glyph.prototype.onTouchend = function(touchendHandler) {
		this.touchendHandler = touchendHandler;
	}
	
	glyph.Glyph.prototype.contains = function(x, y) {
		return false;
	}
	
}( window.application.glyph ));
