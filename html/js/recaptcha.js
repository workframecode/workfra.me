var recaptchaResponse=function(response){
	if (isvalidated()){
		$.post('/recaptcha.php', {response: response, name: $("#name").val(), college: $("#college").val(), message: $("#message").val()}, function(result){
			if (result.success){
				captchapass();
			}
			else{
				captchafail();
			}
		});
	}
}

var recaptchaCallback=function(){
	var widget=grecaptcha.render('recaptcha', {
		sitekey: '6Le3jCITAAAAAHbgLHizHXcm8pV2wUycC-J2W0xm',
		callback: recaptchaResponse,
		theme: 'light'
	});
}