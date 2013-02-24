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
				return new collections.List(tail.head(), collections.List.empty());
			}
			return tail;
		}
		
		this.cons = function(val) {
			if (this.isEmpty()) {
				return new collections.List(val, collections.List.empty())
			}
			return new collections.List(val, tail.cons(head) );
		}
		
		this.consAll = function(vals) { 
			var thisList = this;
			vals.foreach(function (val) {
				thisList = thisList.cons(val);
			});
			return thisList;
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
		
		this.remove = function(val) {
			if (this.head() === val) {
				return this.tail();
			}
			else {
				tail = this.tail().remove(val);
				return this;
			}
		}
		
		this.filter = function(matcher) {
			if (this.isEmpty()) {
				return collections.List.empty();
			}
			if (matcher(this.head())) {
				return new collections.List(this.head(), this.tail().filter(matcher));
			}
			return this.tail().filter(matcher);
		}
	}
	
	collections.List.empty = function() {
		return new collections.List(undefined, undefined);
	}
	
}(window.util.collections)); 