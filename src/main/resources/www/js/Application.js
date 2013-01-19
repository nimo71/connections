window.application = window.application || {};

(function(application, $) {
	
   	var stage = new Kinetic.Stage({
    	container: "container",
   		width: $(window).width(), 
    	height: $(window).height()
  	});

  	var layer = new Kinetic.Layer();
	
  	var centreStageX = stage.getWidth() / 2;
	var centreStageY = stage.getHeight() / 2;
	
	var loginButton = new application.glyph.RoundButton(centreStageX, centreStageY, "Log In");
	
	loginButton.draw(layer);
	
	var loginForm = new application.form.LoginForm();
	loginForm.onLogin(function(email, password) {
		alert("Logging in with: email="+ email +" and password="+ password +".");
		loginForm.hide();
	});
	
	loginButton.onClick(function(ev) {
		loginForm.show();
	});

	stage.add(layer);

}( window.application, jQuery ));