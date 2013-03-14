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
		
		describe("angle", function() {
			
			it ("returns 0 when from and to on the x axis, and to.x > from.x", function() {
				var from = new Point(0, 0);
				var to = new Point(100, 0);
				
				expect(from.angle(to)).toEqual(0);
			});			
			
			it ("returns pi / 4 when from on the origin and to at 100, 100", function() {
				var from = new Point(0, 0);
				var to = new Point(100, 100);
				
				expect(from.angle(to)).toEqual(Math.PI / 4);
			});
			
			it ("returns pi / 2 when from and to on the y axis, and to.y > from.y", function() {
				var from = new Point(0, 0);
				var to = new Point(0, 100);
				
				expect(from.angle(to)).toEqual(Math.PI / 2);
			});
			
			it ("returns 3 * pi / 4 when from on the origin and to at -100, 100", function() {
				var from = new Point(0, 0);
				var to = new Point(-100, 100);
				
				expect(from.angle(to)).toEqual(3 * Math.PI / 4);
			});
			
			it ("returns pi when from and to on the x axis, and to.x < from.x", function() {
				var from = new Point(0, 0);
				var to = new Point(-100, 0);
				
				expect(from.angle(to)).toEqual(Math.PI);
			});
		});
    }
);
 