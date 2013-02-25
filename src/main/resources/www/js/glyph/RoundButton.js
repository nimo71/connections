define(
[
	"vendor/kinetic", 
	"Touch",
    "glyph/Glyph", 
    "glyph/Point"
],
function(Kinetic, Touch, Glyph, Point) {
		
	var hashCode = 0; 
	
	var RoundButton = function(x, y, text) {
		Glyph.call( this, x, y );
		this._text = text;
		
		this._hashCode = hashCode++;
		
		this._circle = new Kinetic.Circle({
			x: x,
			y: y,
			radius: 50,
			stroke: 'grey', 
			strokeWidth: 1
		});
		
		this._text = new Kinetic.Text({
	        x: x,
	        y: y,
	        text: text,
	        fontSize: 20,
	        fontFamily: 'Calibri',
	        fill: 'grey'
	    });
		
		this._text.setOffset({
	        x: this._text.getWidth() / 2, 
	        y: this._text.getHeight() / 2
	    });
	} 
	
	RoundButton.prototype = Object.create( Glyph.prototype );
	RoundButton.prototype.constructor = RoundButton;
	
	RoundButton.prototype.onClick = function(clickHandler) {
		this._circle.on("click", clickHandler)
	}
	
	RoundButton.prototype.addToLayer = function(layer) {
		layer.add(this._text);
		layer.add(this._circle);	
	}
	
	RoundButton.prototype.update = function() {
		// do nothing
	}
	
	RoundButton.prototype.touchend = function(e) {
		var touch = e.changedTouches[0];
		if (this.contains(touch.clientX, touch.clientY)) {
			this.touchendHandler(touch);
		}
	}
	
	RoundButton.prototype.contains = function(x, y) {
		var dx = x - this._circle.getX();
		var dy = this._circle.getY() - y;
		
		return Math.sqrt((dx * dx) + (dy * dy)) <= this._circle.getRadius();
	}
	
	RoundButton.prototype.connectionPoint = function(to) {
		var circleX = this._circle.getX();
		var circleY = this._circle.getY();
		
		var posDx = to.getX() - circleX;
		var posDy = circleY - to.getY(); 
		
		var circleRadius = this._circle.getRadius();
		var theta = Math.atan(posDy / posDx);
		
		var dx = circleRadius * Math.cos(theta) 
					* ((posDx > 0) ? 1 : -1);
		
		var dy = circleRadius * Math.sin(theta) 
					* ((posDx > 0) ? -1 : 1) ;
		
		var x = circleX + dx;
		var y = circleY + dy;
		
		return new Point(x, y);
	}
	
	RoundButton.prototype.move = function(toX, toY) {
		this._x = toX; 
		this._y = toY;
		this._circle.setPosition(toX, toY);
		this._text.setPosition(toX, toY);
	};
	
	RoundButton.prototype.hashCode = function() {
		return this._hashCode;
	}
		
	return RoundButton;
});