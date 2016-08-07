var recaptchaResponse=function(response){
	if (isvalidated()){
		$('.loader').css('display', 'block');
		$.post('/server/recaptcha.php', {response: response, name: $("#name").val(), email: $("#email").val(), college: $("#college").val(), message: $("#message").val()}, function(result){
			$('.loader').css('display', 'none');
			if (result.success){
				$('#formpass').fadeIn().css('display','inline-block');
				$('html, body').stop().animate({
					scrollTop: $('#formpass').offset().top-$('.navbar').height()-20
				}, 700);
				$('.form-control').each(function(){
					$(this).val('');
				});
				setTimeout(function(){
					$('#formpass').fadeOut();
				},3000);
				grecaptcha.reset();
			}
			else{
				if (result.errormsg){
					if (result.nofix){
						$('#formerror').html('Something went wrong. If you know of an alternate way to reach the developers, tell them about this error. You can also check the console log for more details.');
						console.log('Backend error while submitting contact form: '+result.errormsg)
						$('#formerror').fadeIn().css('display','inline-block');
						$('html, body').stop().animate({
							scrollTop: $('#formerror').offset().top-$('.navbar').height()-20
						}, 700);
						grecaptcha.reset();
					}
					else{
						$('#formerror').html(result.errormsg);
						$('#formerror').fadeIn().css('display','inline-block');
						$('html, body').stop().animate({
							scrollTop: $('#formerror').offset().top-$('.navbar').height()-20
						}, 700);
						grecaptcha.reset();
					}
				}
				else{
					$('#formerror').html('You did not answer the captcha right. Try again.');
					$('#formerror').fadeIn().css('display','inline-block');
					$('html, body').stop().animate({
						scrollTop: $('#formerror').offset().top-$('.navbar').height()-20
					}, 700);
					grecaptcha.reset();
				}
			}
		});
	}
	else{
		$('#formerror').html('Your form has errors that need to be resolved.');
		$('#formerror').fadeIn().css('display','inline-block');
		$('html, body').stop().animate({
			scrollTop: $('#formerror').offset().top-$('.navbar').height()-20
		}, 700);
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
