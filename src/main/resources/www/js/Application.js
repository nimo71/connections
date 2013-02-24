window.application = window.application || {};
window.util = window.util || {};
window.util.collections = window.util.collections || {};
window.util.collections.List = window.util.collections.List || {};
window.application.form.RegistrationForm = window.application.form.RegistrationForm || {};
window.application.form.LoginForm = window.application.form.LoginForm || {};
window.application.glyph.Point = window.application.glyph.Point || {};
window.application.glyph.Connection = window.application.glyph.Connection || {};
window.application.glyph.RoundButton = window.application.glyph.RoundButton || {}; 
window.application.physics.Physics = window.application.physics.Physics || {};

//shim layer for requestAnimationFrame with setTimeout fallback
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame =
          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout( 
            		function() { callback(currTime + timeToCall); },
            		timeToCall );
            
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());


(function(List,	RegistrationForm, LoginForm, Point, Connection, RoundButton, Physics, $) 
{
	var stage = new Kinetic.Stage({
    	container: "container",
   		width: $(window).width(), 
    	height: $(window).height()
  	});
	
  	var centreStageX = stage.getWidth() / 2;
	var centreStageY = stage.getHeight() / 2;

	function showLoginForm() {
		var loginForm = new LoginForm();
		loginForm.onLogin(function(email, password) {
			alert("Logging in with: email="+ email +" and password="+ password +".");
			loginForm.hide();
		});
		loginForm.show();
	}
	
	var loginBtn = new RoundButton(centreStageX - 200, centreStageY + 100, "Log In");
	loginBtn.onClick(function(ev) {
		showLoginForm();
	});	
	loginBtn.onTouchend(function(touch) {
		showLoginForm();
	});
	
	function showRegistrationForm() {		
		var registrationForm = new RegistrationForm();
		registrationForm.onRegister(function(email, confirmEmail, password, confirmPassword) {
			alert("Registering with: email=" + email + ", confirmEmail=" + confirmEmail + ", password=" + password + ", and confirmPassword=" + confirmPassword);
			registrationForm.hide();
		});	
		registrationForm.show();
	}
	
	var registerBtn = new RoundButton(centreStageX + 200, centreStageY + 100, "Register");
	registerBtn.onClick(function(ev) {
		showRegistrationForm();
	});	
	registerBtn.onTouchend(function(touch) {
		showRegistrationForm();
	});
	
	var cxnsBtn = new RoundButton(centreStageX, centreStageY - 100, "Cxns");
	
	var glyphs = List.empty()
		.cons(loginBtn)
		.cons(registerBtn)
		.cons(cxnsBtn)
		.cons(new Connection(cxnsBtn, loginBtn))
		.cons(new Connection(cxnsBtn, registerBtn));
	
	var center = new Point(centreStageX, centreStageY);
	var physics = new Physics(center);
	physics.addAllBodies(glyphs.filter(function(body) {
		return !(body instanceof Connection);
	}));

	function draw() {
		var layer = new Kinetic.Layer();
		glyphs.foreach(function(glyph) {
			glyph.draw(layer);
		});
		stage.add(layer);
	};

	(function animate() {
		draw();
		physics.applyForces();
		if (physics.equilibrium()) {
			if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
			return; 
		}
		physics.moveBodies();
		physics.clearForces();
		this.animationFrame = requestAnimationFrame( animate );
	})();
	
}( 		window.util.collections.List,
		window.application.form.RegistrationForm,
		window.application.form.LoginForm,
		window.application.glyph.Point,
		window.application.glyph.Connection,
		window.application.glyph.RoundButton,
		window.application.physics.Physics,
		jQuery ));