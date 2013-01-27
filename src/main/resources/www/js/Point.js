window.applcation = window.application || {};
window.application.glyph = window.application.glyph || {};

(function( glyph ) {
	
	glyph.Point = function(x, y) {
		var px = x; 
		var py = y;
		
		this.getX = function() {
			return px;
		}
		
		this.getY = function() {
			return py;
		}
	}
	
}( window.application.glyph ));