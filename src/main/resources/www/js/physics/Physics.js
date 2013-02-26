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
			var magnitude = 3;
			bodies.foreach(function(body) {
				forces.put(body, Force.acting(body.getPosition(), c, magnitude));
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