define(
function() {
	
	var HashMap = function() {
		this._buckets = {};
	}
	
	HashMap.prototype.put = function(key, value) {
		this._buckets[key.hashCode()] = value;
	}
	
	HashMap.prototype.get = function(key) {
		return this._buckets[key.hashCode()];
	}
	
	return HashMap;

});