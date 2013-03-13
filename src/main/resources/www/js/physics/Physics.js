define(
[
    "util/collections/List", 
    "util/collections/HashMap",
    "physics/Force", 
    "physics/Forces"
],
function(List, HashMap, Force, Forces) {
	
	var Physics = function(center) {	
		this._bodies = List.empty();
		this._centralAttractor = center;
		this._forces = new Forces();
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
			if (forces.value(body)) {
				eq = eq 
					&& Math.abs(forces.value(body).getX()) < 0.1 
					&& Math.abs(forces.value(body).getY()) < 0.1;
			}
		});
		return eq;
	}
	
	/*
	 * Apply the central attraction to all bodies
	 *  
	 * Bodies should repel each other: 
	 * 	- for each body apply a repulsion force to all the other bodies
	 * 		- the repulsion force should be
	 *  
	 * Connected bodies should attract each other: 
	 * - for each connection on a body apply an attracting force to the connecting body. 
	 * 		- the attracting force should be equal to the (body mass) / (the square of the distance between the bodies). 
	 */
	Physics.prototype.applyForces = function() {
					
		var bodies = this._bodies; 
		var forces = this._forces;
		
		function centralAttraction(c) {
			var mass = 20000;
			bodies.foreach(function(body) {
				forces.put(body, Force.acting(body.getPosition(), c, mass));
			});
		};
		
		function bodiesRepel() {
			bodies.foreach(function(from) {
				bodies.foreach(function(to) {
					if (from === to) {
						return;
					};
					var fromPos = from.getPosition();
					var toPos = to.getPosition();
					var mass = 10000;
 					forces.put(to, Force.acting(toPos, fromPos, -mass)); 
				});
			});
		};
		
		centralAttraction(this._centralAttractor);
		bodiesRepel();
	}
		
	Physics.prototype.moveBodies = function() {
		var forces = this._forces;
		this._bodies.foreach(function(body) {
			var toX = body.getX() + forces.value(body).getX();
			var toY = body.getY() + forces.value(body).getY();
			body.move(toX, toY);
		});
	}
		
	Physics.prototype.clearForces = function() {
		this._forces = new HashMap();  
	}
	
	return Physics;
		
});