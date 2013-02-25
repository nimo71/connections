define(
[
 	"glyph/Glyph", 
 	"vendor/kinetic"
],		
function(Glyph, Kinetic) {
		
	var Connection = function(from, to) {
		this._from = from; 
		this._to = to;
		
		var start = from.connectionPoint(to);
		var end = to.connectionPoint(from);
		
		this._line = new Kinetic.Line({
			stroke: 'grey', 
			strokeWidth: 1,
			points: [ start.getX(), start.getY(), end.getX(), end.getY() ]
		});
	}
	
	Connection.prototype = Object.create( Glyph.prototype );
	Connection.prototype.constructor = Connection;
	
	Connection.prototype.addToLayer = function(layer) {
		layer.add(this._line);
	}
	
	Connection.prototype.update = function() {
		var start = this._from.connectionPoint(this._to);
		var end = this._to.connectionPoint(this._from);
		this._line.setPoints([start.getX(), start.getY(), end.getX(), end.getY()]);
	}
		
	return Connection;
});