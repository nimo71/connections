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
					var dy = from.getY() - to.getY();
					var dx = to.getX() - from.getX();
					return Math.atan(dy / dx);
				}
				
				var magnitude = 10;
				
				bodies.foreach(function(body) {
					var theta = angle(body.getPosition(), c);
					var cax = magnitude * Math.cos(theta);
					var cay = magnitude * Math.sin(theta);
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