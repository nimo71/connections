window.application = window.application || {};
window.application.physics = window.application.physics || {};

(function(physics, List) {
	
	var bodies = List.empty();
	
	physics.Physics = {	
			
		addBody : function(body) {
			bodies.cons(body);
			this.action();
		}, 
		
		removeBody : function(body) {
			bodies.remove(body);
			this.action();
		},
		
		// apply forces to each body repeatedly until equilibrium
		action : function() {
		}

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
	}
	
}( window.application.physics, window.util.collections.List ));