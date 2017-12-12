$message = $('#loginFormMessage');
$message.show = function(status,message){
	this.find('strong[id="status"]').text(status);
	this.find('span[id="message"]').text(message);
	this.css('display','block');
	
};
$message.hidden = function(){
	this.css('display','none');
};
$message.hidden();

function showMessage(status,message){
	$message.show(status,message);
}

function ValidatorLoginForm() {
	var userName = $('#userNameInput').val();
	var userPassword = $('#userPasswordInput').val();
	
	if(userName.length > 0 && userPassword.length > 0){
		var $form = $('#loginForm');
		$message.hidden();
		$message.css('display','none');
		
		$.ajax({
				url: '/login/auth',
				type: 'POST',
				dataType: "JSON",
				data: { "action": "Login", "userName": userName, "userPassword" : userPassword }
			}).done(function(data){
				if(data.status===200){
					location = '/';					
				}
				else {
					showMessage(data.status,data.message);
				}
			}).fail(function(xhr, status, error){
				console.log(xhr, status, error);
				showMessage(data.status,data.error);
			});
	}
	else {
		//
	}
}
$('#idLogInBtn').click(ValidatorLoginForm);
