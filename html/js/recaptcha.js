var recaptchaResponse=function(response){
	if (isvalidated()){
		$.post('/recaptcha.php', {response: response, name: $("#name").val(), email: $("#email").val(), college: $("#college").val(), message: $("#message").val()}, function(result){
			console.log(response);
			console.log(result);
			if (result.success){
				console.log('pass');
			}
			else{
				console.log('fail');
			}
		});
	}
	else{
		$('#formerror').html('Your form has errors that need to be resolved.');
		$('#formerror').fadeIn();
		grecaptcha.reset();
	}
}

var recaptchaCallback=function(){
	var widget=grecaptcha.render('recaptcha', {
		sitekey: '6Le3jCITAAAAAHbgLHizHXcm8pV2wUycC-J2W0xm',
		callback: recaptchaResponse,
		theme: 'light'
	});
}