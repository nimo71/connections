window.application = window.application || {};
window.application.physics = window.application.physics || {};

(function(physics, List, HashMap) {
	
	
	physics.Physics = function(center) {	
		this._bodies = List.empty();
		this._centralAttractor = center;
		this._forces = new HashMap();
	};
	
	physics.Physics.prototype.addBody =  function(body) {
		this._bodies = this._bodies.cons(body);
	};
			
	physics.Physics.prototype.addAllBodies = function(allBodies) {
		this._bodies = this._bodies.consAll(allBodies);
	};
		
	physics.Physics.prototype.removeBody = function(body) {
		this._bodies = this._bodies.remove(body);
	};
			
	physics.Physics.prototype.equilibrium = function() {
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
	};
			
	physics.Physics.prototype.applyForces = function() {
					
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
				forces.put(body, new physics.Force(cax, cay));
			});
		};
		
		centralAttraction(this._centralAttractor);
	};
		
	physics.Physics.prototype.moveBodies = function() {
		var forces = this._forces;
		this._bodies.foreach(function(body) {
			var toX = body.getX() + forces.get(body).getX();
			var toY = body.getY() + forces.get(body).getY();
			body.move(toX, toY);
		});
	};
		
	physics.Physics.prototype.clearForces = function() {
		this._forces = new HashMap();  
	};
	
	
	/** 
	 * Force TODO: Move to its own file...
	 */
	physics.Force = function(x, y) {
		this._fx = x; 
		this._fy = y;
	}
	
	physics.Force.prototype.getX = function() { 
		return this._fx; 
	}
		
	physics.Force.prototype.getY = function() { 
		return this._fy; 
	}
		
	physics.Force.prototype.add = function(f) {
		var rx = f.getX() + this._fx;
		var ry = f.getY() + this._fy;
		return new physics.Force(rx, ry);
	}

}( 
	window.application.physics, 
	window.util.collections.List, 
	window.util.collections.HashMap ));