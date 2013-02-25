define(
[
    "util/collections/List", 
    "util/collections/HashMap",
    "physics/Force"
],
function(List, HashMap, Force) {
	
	var Physics = function(center) {	
		this._bodies = List.empty();
		this._centralAttractor = center;
		this._forces = new HashMap();
	}
	
	Physics.prototype.addBody = function(body) {
		this._bodies = this._bodies.cons(body);
	}
			
	Physics.prototype.addAllBodies = function(allBodies) {
		this._bodies = this._bodies.consAll(allBodies);
	}
		
	Physics.prototype.removeBody = function(body) {
		this._bodies = this._bodies.remove(body);
	}
			
	Physics.prototype.equilibrium = function() {
		var eq = true;
		var forces = this._forces;
		this._bodies.foreach(function (body) {
			if (forces.get(body)) {
				eq = eq 
					&& Math.abs(forces.get(body).getX()) < 1 
					&& Math.abs(forces.get(body).getY()) < 1;
			}
		});
		return eq;
	}
			
	Physics.prototype.applyForces = function() {
					
		var bodies = this._bodies; 
		var forces = this._forces;
		
		function centralAttraction(c) {
			
			function angle(from, to) {
				var dy = Math.abs( to.getY() - from.getY() );
				var dx = Math.abs( to.getX() - from.getX() );
				if (dx === 0) return (Math.PI / 2);
				return Math.atan(dy / dx);
			};
			
			function quadrant(from, to) {
				var dy = to.getY() - from.getY();
				var dx = to.getX() - from.getX();
	
				if ((dx >= 0) && (dy >= 0)) return 1;
				if ((dx < 0) && (dy >= 0)) return 2;
				if ((dx < 0) && (dy < 0)) return 3;
				if ((dx >= 0) && (dy < 0)) return 4;
			};
			
			var magnitude = 2;
			
			bodies.foreach(function(body) {
				var b = body.getPosition();
				var theta = angle(b, c);
				var q = quadrant(b, c);
				var cax = magnitude * Math.cos(theta) * ((q === 4 || q === 1) ? 1 : -1);
				var cay = magnitude * Math.sin(theta) * ((q === 4 || q === 3) ? -1 : 1);
				forces.put(body, new Force(cax, cay));
			});
		};
		
		centralAttraction(this._centralAttractor);
	}
		
	Physics.prototype.moveBodies = function() {
		var forces = this._forces;
		this._bodies.foreach(function(body) {
			var toX = body.getX() + forces.get(body).getX();
			var toY = body.getY() + forces.get(body).getY();
			body.move(toX, toY);
		});
	}
		
	Physics.prototype.clearForces = function() {
		this._forces = new HashMap();  
	}
	
	return Physics;
		
});