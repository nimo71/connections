var application = (function() {
   	var stage = new Kinetic.Stage({
    	container: 'container',
   		width: $(window).width(), 
    	height: $(window).height()
  	});

  	var layer = new Kinetic.Layer();
	
  	
  	var centreStageX = stage.getWidth() / 2;
	var centreStageY = stage.getHeight() / 2;
	
	var circle = new Kinetic.Circle({
		x: centreStageX,
		y: centreStageY,
		radius: 50,
		stroke: 'grey', 
		strokeWidth: 1
	});
	
	var loginText = new Kinetic.Text({
        x: centreStageX,
        y: centreStageY,
        text: 'Login',
        fontSize: 30,
        fontFamily: 'Calibri',
        fill: 'grey'
    });
	
	var offsetLoginTextX = loginText.getWidth() / 2;
	var offsetLoginTextY = loginText.getHeight() / 2;
	
	loginText.setOffset({
        x: loginText.getWidth() / 2, 
        y: loginText.getHeight() / 2
    });
	
	// add the shape to the layer
	layer.add(circle);	
	layer.add(loginText);
	
	// add the layer to the stage
	stage.add(layer);

})();