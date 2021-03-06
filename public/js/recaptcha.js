var widgetmap = {};

var recaptchaResponse=function(cid) {
	if (cid == 'recaptcha') {
		return function(response) {
			if (isvalidated()){
				$('#contactform .loader').css('display', 'block');
				$.post('/contactformrecaptcha', {response: response, name: $("#name").val(), email: $("#email").val(), college: $("#college").val(), message: $("#message").val()}, function(result){
					$('#contactform .loader').css('display', 'none');
					if (result && result.success){
						$('#contactform .formpass').fadeIn().css('display','inline-block');
						$('html, body').stop().animate({
							scrollTop: $('#contactform .formpass').offset().top-$('.navbar').height()-20
						}, 700);
						$('#contactform .form-control').each(function(){
							$(this).val('');
						});
						setTimeout(function(){
							$('#contactform .formpass').fadeOut();
						},3000);
						grecaptcha.reset(widgetmap[cid]);
					}
					else{
						if (result.errormsg){
							if (result.nofix){
								$('#contactform .formerror').html('Something went wrong. If you know of an alternate way to reach the developers, tell them about this error. You can also check the console log for more details.');
								console.log('Backend error while submitting contact form: '+result.errormsg);
								$('#contactform .formerror').fadeIn().css('display','inline-block');
								$('html, body').stop().animate({
									scrollTop: $('#contactform .formerror').offset().top-$('.navbar').height()-20
								}, 700);
								grecaptcha.reset(widgetmap[cid]);
							}
							else{
								$('#contactform .formerror').html(result.errormsg);
								$('#contactform .formerror').fadeIn().css('display','inline-block');
								$('html, body').stop().animate({
									scrollTop: $('#contactform .formerror').offset().top-$('.navbar').height()-20
								}, 700);
								grecaptcha.reset(widgetmap[cid]);
							}
						}
						else{
							$('#contactform .formerror').html('You did not answer the captcha right. Try again.');
							$('#contactform .formerror').fadeIn().css('display','inline-block');
							$('html, body').stop().animate({
								scrollTop: $('#contactform .formerror').offset().top-$('.navbar').height()-20
							}, 700);
							grecaptcha.reset(widgetmap[cid]);
						}
					}
				});
			}
			else{
				$('#contactform .formerror').html('Your form has errors that need to be resolved.');
				$('#contactform .formerror').fadeIn().css('display','inline-block');
				$('html, body').stop().animate({
					scrollTop: $('#contactform .formerror').offset().top-$('.navbar').height()-20
				}, 700);
				grecaptcha.reset(widgetmap[cid]);
			}
		};
	} else if (cid == 'srecaptcha' || cid == 'wrecaptcha') {
		return function(response) {
			$('.slackinvitebox .loader').css('display', 'block');
			$('.slackinvitebox .formnotify').fadeOut();
			$.post('/slackinviterecaptcha', {response: response, email: (cid == 'srecaptcha' ? $("#slackemail").val() : $("#wfemail").val()), college: (cid == 'srecaptcha' ? false : $("#wfinvitecodename").html())}, function(result){
				$('.slackinvitebox .loader').css('display', 'none');
				if (result && result.success){
					$('.slackinvitebox .formpass').fadeIn().css('display','inline-block');
					$('#slackemail').val('');
					grecaptcha.reset(widgetmap[cid]);
				}
				else{
					if (result.errormsg){
						if (result.nofix){
							$('.slackinvitebox .formerror').html('Something went wrong. If you know of an alternate way to reach the developers, tell them about this error. You can also check the console log for more details.');
							console.log('Backend error while submitting slack invite request: '+result.errormsg);
							$('.slackinvitebox .formerror').fadeIn().css('display','inline-block');
							grecaptcha.reset(widgetmap[cid]);
						}
						else{
							$('.slackinvitebox .formerror').html(result.errormsg);
							$('.slackinvitebox .formerror').fadeIn().css('display','inline-block');
							grecaptcha.reset(widgetmap[cid]);
						}
					}
					else{
						$('.slackinvitebox .formerror').html('You did not answer the captcha right. Try again.');
						$('.slackinvitebox .formerror').fadeIn().css('display','inline-block');
						grecaptcha.reset(widgetmap[cid]);
					}
				}
			});
		};
	} else {
		console.log('https://i.imgur.com/stwYVhF.jpg');
	}
}

var recaptchaCallback=function(captchaid){
	if (!captchaid) {
		captchaid = 'recaptcha';
	}
	var widgetid = grecaptcha.render(captchaid, {
		sitekey: '6Le3jCITAAAAAHbgLHizHXcm8pV2wUycC-J2W0xm',
		callback: recaptchaResponse(captchaid),
		theme: 'light'
	});
	widgetmap[captchaid] = widgetid;
}
