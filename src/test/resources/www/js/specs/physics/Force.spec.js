define([
    'glyph/Point',    
    'physics/Force'
],
function(Point, Force) {
	
		describe("acting", function() {
			
			it("creates a force from (0,0) to (10, 0) with mass 10", function() {
				var f = Force.acting(new Point(0, 0), new Point(10, 0), 10); 
				expect(f.getX()).toEqual(10 / 100);
				expect(f.getY()).toEqual(0);
			});
			
			it("creates a force from (0, 0) to (10, 10) with mass 10", function() {				
				var f = Force.acting(new Point(0, 0), new Point(10, 10), 10);
				
				var x = f.getX().toFixed(5);
				var y = f.getY().toFixed(5);
				expect(x).toEqual(y);
				
				expect(f.getX()).toBeGreaterThan(0);
				expect(f.getY()).toBeGreaterThan(0);
			});
			
			it("creates a force from (0, 0) to (0, 10) with mass 10", function() {
				var f = Force.acting(new Point(0, 0), new Point(0, 10), 10);
				expect(f.getX()).toBeLessThan(0.0000000001);
				expect(f.getY()).toEqual(10 / 100);
			});
			
			it("creates a force from (0, 0) to (-10, 10) with mass 10", function() {
				var f = Force.acting(new Point(0, 0), new Point(-10, 10), 10);
				
				var x = f.getX().toFixed(5);
				var y = f.getY().toFixed(5);
				expect(+x).toEqual(-y);
				
				expect(f.getX()).toBeLessThan(0);
				expect(f.getY()).toBeGreaterThan(0);
			});
			
			it("creates a force from (0, 0) to (-10, 0) with mass 10", function() {
				var f = Force.acting(new Point(0, 0), new Point(-10, 0), 10);
				expect(f.getX()).toEqual(-10 / 100);
				expect(f.getY()).toBeLessThan(0.0000000001);
			});
			
			it("creates a force from (0, 0) to (-10, -10) with mass 10", function() {
				var f = Force.acting(new Point(0, 0), new Point(-10, -10), 10);
				
				var x = f.getX().toFixed(5);
				var y = f.getY().toFixed(5);
				expect(x).toEqual(y);
				
				expect(f.getX()).toBeLessThan(0);
				expect(f.getY()).toBeLessThan(0);
			});
			
			it("creates a force from (0, 0) to (0, -10) with mass 10", function() {
				var f = Force.acting(new Point(0, 0), new Point(0, -10), 10);
				expect(f.getX()).toBeLessThan(0.0000000001);
				expect(f.getY()).toEqual(-10 / 100);
			});
			
			it("creates a force from (0, 0) to (10, -10) with mass 10", function() {
				var f = Force.acting(new Point(0, 0), new Point(10, -10), 10);
				
				var x = f.getX().toFixed(5);
				var y = f.getY().toFixed(5);
				expect(+x).toEqual(-y);
				
				expect(f.getX()).toBeGreaterThan(0);
				expect(f.getY()).toBeLessThan(0);
			});
		});
	
});