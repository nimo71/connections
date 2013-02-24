window.application = window.application || {};
window.application.physics = window.application.physics || {};

(function(physics, List) {
	
	
	physics.Physics = function(center) {	
		var bodies = List.empty();
		var centralAttractor = center
		var forces = {};

		this.addBody =  function(body) {
			bodies = bodies.cons(body);
		};
			
		this.addAllBodies = function(allBodies) {
			bodies = bodies.consAll(allBodies);
		};
		
		this.removeBody = function(body) {
			bodies = bodies.remove(body);
		};
			
		this.equilibrium = function() {
			var eq = true;
			bodies.foreach(function (body) {
				if (forces[body]) {
					eq = eq 
						&& Math.abs(forces[body].getX()) < 1 
						&& Math.abs(forces[body].getY()) < 1;
				}
			});
			return eq;
		};
			
		this.applyForces = function() {
					
			function centralAttraction(c) {
				
				function angle(from, to) {
					var dy = Math.abs( to.getY() - from.getY() );
					var dx = Math.abs( to.getX() - from.getX() );
					if (dx === 0) return (Math.PI / 2);
					return Math.atan(dy / dx);
				}
				
				function quadrant(from, to) {
					var dy = to.getY() - from.getY();
					var dx = to.getX() - from.getX();
					
					if ((dx >= 0) && (dy >= 0)) return 1;
					if ((dx < 0) && (dy < 0)) return 2;
					if ((dx < 0) && (dy >= 0)) return 3;
					if ((dx >= 0) && (dy < 0)) return 4;
				}
				
				var magnitude = 10;
				
				bodies.foreach(function(body) {
					var b = body.getPosition();
					var theta = angle(b, c);
					var q = quadrant(b, c);
					var cax = magnitude * Math.cos(theta) * ((q === 2 || q === 3) ? -1 : 1);
					var cay = magnitude * Math.sin(theta) * ((q === 3 || q === 4) ? -1 : 1);
					forces[body] = new physics.Force(cax, cay);
				});
			}
			centralAttraction(centralAttractor);
		};
		
		this.moveBodies = function() {
			bodies.foreach(function(body) {
				var toX = body.getX() + forces[body].getX();
				var toY = body.getY() + forces[body].getY();
				body.move(toX, toY);
			});
		};
		
		this.clearForces = function() {
			forces = {};  
		};
	}
	
	physics.Force = function(x, y) {
		var fx = x; 
		var fy = y;
		
		this.getX = function() { 
			return fx; 
		}
		
		this.getY = function() { 
			return fy; 
		}
		
		this.add = function(f) {
			var rx = f.getX() + fx;
			var ry = f.getY() + fy;
			return new physics.Force(rx, ry);
		}
	}
	
}( window.application.physics, window.util.collections.List ));