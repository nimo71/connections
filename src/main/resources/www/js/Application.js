window.application = window.application || {};
window.util = window.util || {};
window.util.collections = window.util.collections || {};

(function(application, collections, $) {
	
   	var stage = new Kinetic.Stage({
    	container: "container",
   		width: $(window).width(), 
    	height: $(window).height()
  	});

  	var layer = new Kinetic.Layer();
	
  	var centreStageX = stage.getWidth() / 2;
	var centreStageY = stage.getHeight() / 2;
	
	var loginBtn = new application.glyph.RoundButton(centreStageX - 200, centreStageY + 100, "Log In");
	var loginForm = new application.form.LoginForm();
	loginForm.onLogin(function(email, password) {
		alert("Logging in with: email="+ email +" and password="+ password +".");
		loginForm.hide();
	});
	loginBtn.onClick(function(ev) {
		loginForm.show();
	});	
	loginBtn.onTouchend(function(touch) {
		loginForm.show();
	});

	var registerBtn = new application.glyph.RoundButton(centreStageX + 200, centreStageY + 100, "Register");
//	var registrationForm = new appliction.form.RegistrationForm();
//	registrationForm.onRegister(function(email, confirmEmail, password, confirmPassword) {
//		alert("Registering with: email=" + email + ", confirmEmail=" + confirmEmail + ", password=" + password + ", and confirmPassword=" + confirmPassword);
//		registrationForm.hide();
//	});
//	registrationForm.onClick(function(ev) {
//		registrationForm.show();
//	});	
//	registrationForm.onTouchend(function(touch) {
//		registrationForm.show();
//	});
	
	
	var cxnsBtn = new application.glyph.RoundButton(centreStageX, centreStageY - 100, "Cxns");
	
	var glyphs = collections.List.empty()
		.cons(loginBtn)
		.cons(registerBtn)
		.cons(cxnsBtn)
		.cons(new application.glyph.Connection(cxnsBtn, loginBtn))
		.cons(new application.glyph.Connection(cxnsBtn, registerBtn));
	
	glyphs.foreach(function(glyph) {
		glyph.draw(layer);
	});
	
	stage.add(layer);

}( window.application, window.util.collections, jQuery ));