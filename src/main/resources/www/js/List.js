window.util = window.util || {};
window.util.collections = window.util.collections || {};

(function(collections) {
	
	collections.List = function(head, tail) {
		
		this.head = function() { 
			return head; 
		}
		
		this.tail = function() {
			if (!tail || tail.isEmpty()) {
				return collections.List.empty();
			}
			if (tail.tail().isEmpty()) {
				return new collections.List(tail[0], collections.List.empty());
			}
			return new collections.List(tail[0], tail.slice(1));
		}
		
		this.cons = function(val) {
			if (this.isEmpty()) {
				return new collections.List(val, collections.List.empty())
			}
			return new collections.List(val, tail.cons(head) );
		}
		
		this.isEmpty = function() {
			return !head && !tail;
		}
		
		this.foreach = function(fn) {
			if (this.isEmpty()) {
				return;
			}
			fn(head);
			tail.foreach(fn);
		}
	}
	
	collections.List.empty = function() {
		return new collections.List(undefined, undefined);
	}
	
}(window.util.collections)); 