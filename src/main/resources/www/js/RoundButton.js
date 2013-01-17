window.application = window.application || {};
window.application.glyph = window.application.glyph || {};

(function( glyph ) {
	
	glyph.RoundButton = function(x, y, text) {
		glyph.Glyph.call( this, x, y );
		this.text = text;
	} 
	glyph.RoundButton.prototype = Object.create( glyph.Glyph.prototype );
	glyph.RoundButton.prototype.constructor = glyph.RoundButton;
	
	glyph.RoundButton.prototype.draw = function(layer) {
		
		var circle = new Kinetic.Circle({
			x: this.x,
			y: this.y,
			radius: 50,
			stroke: 'grey', 
			strokeWidth: 1
		});
		
		var loginText = new Kinetic.Text({
	        x: this.x,
	        y: this.y,
	        text: this.text,
	        fontSize: 30,
	        fontFamily: 'Calibri',
	        fill: 'grey'
	    });
		
		loginText.setOffset({
	        x: loginText.getWidth() / 2, 
	        y: loginText.getHeight() / 2
	    });
		
		layer.add(circle);	
		layer.add(loginText);
	}
	
}( window.application.glyph ));
