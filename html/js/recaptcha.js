var recaptchaResponse=function(response){
	if (isvalidated()){
		$.post('/recaptcha.php', {response: response, name: $("#name").val(), email: $("#email").val(), college: $("#college").val(), message: $("#message").val()}, function(result){
			console.log(result);
			if (result.success){
				console.log('pass');
			}
			else{
				console.log('fail');
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