window.application = window.application || {};
window.application.glyph = window.application.glyph || {};

(function( glyph, $ ) {
	
	glyph.RoundButton = function(x, y, text) {
		glyph.Glyph.call( this, x, y );
		this.text = text;
		
		this.circle = new Kinetic.Circle({
			x: x,
			y: y,
			radius: 50,
			stroke: 'grey', 
			strokeWidth: 1
		});
		
		this.loginText = new Kinetic.Text({
	        x: x,
	        y: y,
	        text: this.text,
	        fontSize: 20,
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
	
	glyph.RoundButton.prototype.onClick = function(clickHandler) {
		this.circle.on("click", clickHandler)
	}
	
	glyph.RoundButton.prototype.draw = function(layer) {
		layer.add(this.loginText);
		layer.add(this.circle);	
	}
	
	glyph.RoundButton.prototype.touchend = function(e) {
		var touch = e.changedTouches[0];
		if (this.contains(touch.clientX, touch.clientY)) {
			this.touchendHandler(touch);
		}
	}
	
	glyph.RoundButton.prototype.contains = function(x, y) {
		var dx = x - this.circle.getX();
		var dy = this.circle.getY() - y;
		
		return Math.sqrt((dx * dx) + (dy * dy)) <= this.circle.getRadius();
	}
	
	glyph.RoundButton.prototype.connectionPoint = function(to) {
		var circleX = this.circle.getX();
		var circleY = this.circle.getY();
		
		var posDx = to.getX() - circleX;
		var posDy = circleY - to.getY(); 
		
		var circleRadius = this.circle.getRadius();
		var theta = Math.atan(posDy / posDx);
		
		var dx = circleRadius * Math.cos(theta) 
					* ((posDx > 0) ? 1 : -1);
		
		var dy = circleRadius * Math.sin(theta) 
					* ((posDx > 0) ? -1 : 1) ;
		
		var x = circleX + dx;
		var y = circleY + dy;
		
		return new glyph.Point(x, y);
	}
	
	
}( window.application.glyph, jQuery ));
