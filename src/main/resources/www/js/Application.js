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
	
	var loginBtn = new application.glyph.RoundButton(centreStageX - 200, centreStageY, "Log In");
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

	var registerBtn = new application.glyph.RoundButton(centreStageX + 200, centreStageY, "Register");
	var cxnsBtn = new application.glyph.RoundButton(centreStageX, centreStageY, "Cxns");
	
	var glyphs = collections.List.empty()
		.cons(loginBtn)
		.cons(registerBtn)
		.cons(cxnsBtn)
		.cons(new application.glyph.Connection(cxnsBtn, loginBtn))
		.cons(new application.glyph.Connection(cxnsBtn, registerBtn));
	
	
	collections.List.empty().tail();
	collections.List.empty().cons(1).tail();
	collections.List.empty().cons(1).cons(2).tail();
	
	glyphs.foreach(function(glyph) {
		glyph.draw(layer);
	});
	
	stage.add(layer);

}( window.application, window.util.collections, jQuery ));