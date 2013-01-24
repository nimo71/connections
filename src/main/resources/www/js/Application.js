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
	
	var loginButton = new application.glyph.RoundButton(centreStageX - 200, centreStageY, "Log In");
	var registerButton = new application.glyph.RoundButton(centreStageX + 200, centreStageY, "Register");
	var connectionsButton = new application.glyph.RoundButton(centreStageX, centreStageY, "Cxns");
	var connection1 = new application.glyph.Connection(connectionsButton, loginButton);
	var connection2 = new application.glyph.Connection(connectionsButton, registerButton);
	
	
	loginButton.draw(layer);
	registerButton.draw(layer);
	connectionsButton.draw(layer);
	connection1.draw(layer);
	connection2.draw(layer);
	
	var loginForm = new application.form.LoginForm();
	loginForm.onLogin(function(email, password) {
		alert("Logging in with: email="+ email +" and password="+ password +".");
		loginForm.hide();
	});
	
	loginButton.onClick(function(ev) {
		loginForm.show();
	});
	
	loginButton.onTouchend(function(touch) {
		loginForm.show();
	});

	stage.add(layer);

}( window.application, jQuery ));