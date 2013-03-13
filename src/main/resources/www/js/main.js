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
})();

requirejs.config({
    shim: {
        'vendor/kinetic': { // v4.3.0.min
            exports: 'Kinetic'
        }
    }
});

require([
     "jquery", 
     "form/LoginForm", 
     "form/RegistrationForm",
     "util/collections/List", 
     "glyph/Canvas",
     "glyph/Point", 
     "glyph/Connection", 
     "glyph/RoundButton", 
     "physics/Physics", 
     "lib/kinetic"
],     
function($, LoginForm, RegistrationForm, List, Canvas, Point, Connection, RoundButton, Physics, Kinetic) {
	
	var canvas = new Canvas();
	var centre = canvas.getCentre();
	
	function showLoginForm() {
		var loginForm = new LoginForm();
		loginForm.onLogin(function(email, password) {
			alert("Logging in with: email="+ email +" and password="+ password +".");
			loginForm.hide();
		});
		loginForm.show();
	}
	
	var loginBtn = new RoundButton(centre.getX(), centre.getY(), "Log In");
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
	
	var registerBtn = new RoundButton(centre.getX() + 100, centre.getY() + 100, "Register");
	registerBtn.onClick(function(ev) {
		showRegistrationForm();
	});	
	registerBtn.onTouchend(function(touch) {
		showRegistrationForm();
	});
	
	var cxnsBtn = new RoundButton(centre.getX(), centre.getY(), "Cxns");
	
	canvas
		//.add(loginBtn)
		.add(registerBtn)
		.add(cxnsBtn)
//		.add(new Connection(cxnsBtn, loginBtn))
		.add(new Connection(cxnsBtn, registerBtn));
	
	canvas.animateToEquilibrium();
});