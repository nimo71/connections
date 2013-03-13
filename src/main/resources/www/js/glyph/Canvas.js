define(
[
 	"lib/kinetic", 
 	"util/collections/List",
 	"glyph/Point", 
 	"glyph/Connection", 
 	"physics/Physics"
],		
function(Kinetic, List, Point, Connection, Physics) {
	
	var Canvas = function() {
		this._stage = new Kinetic.Stage({
	    	container: "container",				// TODO: move the name of the mark up element out
	   		width: $(window).width(), 
	    	height: $(window).height()
	  	});
		
		this._layer = new Kinetic.Layer();
		this._stage.add(this._layer);
		this._glyphs = List.empty();
		this._physics = new Physics(this.getCentre());
	}
	
	Canvas.prototype.add = function(glyph) {
		this._glyphs = this._glyphs.cons(glyph);
		glyph.addToLayer(this._layer);
		
		if (!(glyph instanceof Connection)) { // TODO: the dependency on connection should be removed when introduced in physics
			this._physics.addBody(glyph);
		}
		return this;
	}
	
	Canvas.prototype.getCentre = function() {
		var centreX = this._stage.getWidth() / 2;
		var centreY = this._stage.getHeight() / 2;
		return new Point(centreX, centreY);
	}
	
	Canvas.prototype.draw = function() {
		this._glyphs.foreach(function(glyph) {
			glyph.update();
		});
		this._stage.draw();
	};
	
	Canvas.prototype.animateToEquilibrium = function() {
		this.draw();
		this._physics.applyForces();
		if (this._physics.equilibrium()) {
			alert("Reached Equilibrium!")
			if (this._animationFrame) cancelAnimationFrame(this._animationFrame);
			return; 
		}
		this._physics.moveBodies();
		this._physics.clearForces();
		var canvas = this;
		this._animationFrame = requestAnimationFrame(function() { canvas.animateToEquilibrium.call(canvas) });
	};
	
	return Canvas; 
});