window.application = window.application || {};
window.application.form = window.application.form || {};

(function( form, $ ) {
	
	
	form.LoginForm = function() {
		this.loginBackground = $("#loginBackground");
		this.loginForm = $("#loginForm");
		this.loginButton = $("#loginForm button");
		this.emailInput = $("#email");
		this.passwordInput = $("#password");
		
		var loginFormTop = $("#container").height() / 2 - $("#loginForm").height() / 2;
		var loginFormLeft = $("#container").width() / 2 - $("#loginForm").width() / 2;
		
		this.loginForm.css({
		    "position": "absolute",
		    "top": loginFormTop +"px",
		    "left": loginFormLeft +"px"
		});
		
	}
	
	form.LoginForm.prototype.show = function() {
		this.loginBackground.fadeTo("fast", 0.5);
		this.loginForm.fadeIn("fast");	
	}
	
	form.LoginForm.prototype.hide = function() {
		this.loginForm.fadeOut("slow");	
		this.loginBackground.fadeOut("slow");
	}
	
	form.LoginForm.prototype.onLogin = function(loginListener) {
		function createLoginCallback(emailInput, passwordInput, listener) {
			return function() {
				if (listener) {
					listener(emailInput.val(), passwordInput.val());
				}
				else {
					alert("No login listener!!"); // TODO: Log to the console here!!!
				}
				return false;
			}
		}	
		this.loginButton.click( createLoginCallback(this.emailInput, this.passwordInput, loginListener) );
	}
	
} ( window.application.form, jQuery ));