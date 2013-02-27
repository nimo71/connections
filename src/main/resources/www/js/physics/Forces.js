define(
[
 	"util/collections/HashMap", 
 	"util/collections/List", 
 	"physics/Force"
],
function(HashMap, List, Force) {

	var Forces = function() {
		this._map = new HashMap();
	}
	
	Forces.prototype.put = function(body, force) {
		var currentValues = (!this._map.containsKey(body)) ? 
			List.empty() : this._map.value(body);
		
		this._map.put(body, currentValues.cons(force));
	}
	
	Forces.prototype.value = function(body) {
		var noForce = new Force(0, 0, 0);
		
		if (!this._map.containsKey(body)) {
			return noForce;
		};
		
		var totalForce =  this._map.value(body).foldLeft(noForce, function(accForce, force) {
			return accForce.add(force);
		});

		this._map.put(body, List.empty().cons(totalForce));
		
		return totalForce;
	}
	
	return Forces;
});