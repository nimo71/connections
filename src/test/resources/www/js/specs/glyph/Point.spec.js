define(['glyph/Point'],
    function(Point) {

		describe("quadrant", function() {
			
			it("returns 1 when to has = x and = y", function() {
				var from = new Point(0, 0);
				var to = new Point(0, 0);
				
				expect(from.quadrant(to)).toEqual(1);
			});
			
			it("returns 1 when to has > x and > y", function() {
				var from = new Point(0, 0);
				var to = new Point(10, 10);
				
				expect(from.quadrant(to)).toEqual(1);
			});

			it("returns 2 when to has < x and > y", function() {
				var from = new Point(0, 0);
				var to = new Point(-10, 10);
				
				expect(from.quadrant(to)).toEqual(2);
			});
			
			it("returns 3 when to has < x and < y", function() {
				var from = new Point(0, 0);
				var to = new Point(-10, -10);
				
				expect(from.quadrant(to)).toEqual(3);
			});
			
			it("returns 4 when to has > x and < y", function() {
				var from = new Point(0, 0);
				var to = new Point(-10, -10);
				
				expect(from.quadrant(to)).toEqual(3);
			});
			
		});
    }
);
 