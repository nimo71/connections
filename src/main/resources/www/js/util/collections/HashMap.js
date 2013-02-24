window.util = window.util || {};
window.util.collections = window.util.collections || {};

(function(collections) {
	
	collections.HashMap = function() {
		this._buckets = {};
	};
	
	collections.HashMap.prototype.put = function(key, value) {
		this._buckets[key.hashCode()] = value;
	};
	
	collections.HashMap.prototype.get = function(key) {
		return this._buckets[key.hashCode()];
	};

}(window.util.collections));