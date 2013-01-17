(function(application) {
	
   	var stage = new Kinetic.Stage({
    	container: 'container',
   		width: $(window).width(), 
    	height: $(window).height()
  	});

  	var layer = new Kinetic.Layer();
	
  	var centreStageX = stage.getWidth() / 2;
	var centreStageY = stage.getHeight() / 2;
	
	var loginButton = new application.glyph.RoundButton(centreStageX, centreStageY, 'Login');
	
	loginButton.draw(layer);

	loginButton.onClick(function(ev) {
		alert("click!!");
	});
	
	stage.add(layer);

}( window.application = window.application || {} ));