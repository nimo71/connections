window.application = window.application || {};
window.application.form = window.application.form || {};

(function( form, $ ) {
	
	form.LoginForm = function(html) {
		
		$("head").append("<link rel='stylesheet' href='css/loginForm.css'>");
		
		$.ajax({ type: "GET",   
		     url: "/loginForm.html",   
		     async: false,
		     success : function(html)
		     {
		    	 $("body").append(html);
		    	 $(html).hide();
		     }
		});
		
		this.loginBackground = $("#loginBackground");
		this.loginForm = $("#loginForm");
		this.loginButton = $("#loginForm button");
		this.emailInput = $("#email");
		this.passwordInput = $("#password");
	}
				
	form.LoginForm.prototype.show = function() {
		var loginFormTop = $("#container").height() / 2 - $("#loginForm").height() / 2;
		var loginFormLeft = $("#container").width() / 2 - $("#loginForm").width() / 2;
		
		this.loginForm.css({
		    "position": "absolute",
		    "display": "none",
		    "top": loginFormTop +"px",
		    "left": loginFormLeft +"px"
		});
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
				return false;
			}
		}	
		this.loginButton.click( createLoginCallback(this.emailInput, this.passwordInput, loginListener) );
	}
} ( window.application.form, jQuery ));