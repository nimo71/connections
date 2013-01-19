window.application = window.application || {};
window.application.glyph = window.application.glyph || {};

(function( glyph, $ ) {
	
	glyph.RoundButton = function(x, y, text) {
		glyph.Glyph.call( this, x, y );
		this.text = text;
		
		this.circle = new Kinetic.Circle({
			x: this.x,
			y: this.y,
			radius: 50,
			stroke: 'grey', 
			strokeWidth: 1
		});
		
		this.loginText = new Kinetic.Text({
	        x: this.x,
	        y: this.y,
	        text: this.text,
	        fontSize: 30,
	        fontFamily: 'Calibri',
	        fill: 'grey'
	    });
		
		this.loginText.setOffset({
	        x: this.loginText.getWidth() / 2, 
	        y: this.loginText.getHeight() / 2
	    });
	} 
	
	glyph.RoundButton.prototype = Object.create( glyph.Glyph.prototype );
	glyph.RoundButton.prototype.constructor = glyph.RoundButton;
	
	glyph.RoundButton.prototype.onClick = function( clickHandler ) {
		this.circle.on("click", clickHandler)
	}
	
	glyph.RoundButton.prototype.draw = function(layer) {
		layer.add(this.loginText);
		layer.add(this.circle);	
	}
	
}( window.application.glyph, jQuery ));