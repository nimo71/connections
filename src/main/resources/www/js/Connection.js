window.application = window.application || {};
window.application.glyph = window.application.glyph || {};

(function(glyph) {
	
	glyph.Connection = function(from, to) {
		this.start = from.connectionPoint(to);
		this.end = to.connectionPoint(from);
		
		this.line = new Kinetic.Line({
			stroke: 'grey', 
			strokeWidth: 1,
			points: [ this.start.x, this.start.y, this.end.x, this.end.y ]
		});
	}
	glyph.Connection.prototype = Object.create( glyph.Glyph.prototype );
	glyph.Connection.prototype.constructor = glyph.Connection;
	
	glyph.Connection.prototype.draw = function(layer) {
		layer.add(this.line);
	}
	
}( window.application.glyph ));