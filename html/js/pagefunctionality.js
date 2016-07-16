$(document).ready(function(){
	$(window).bind('scroll', function(){
		if ($(window).scrollTop() > 50){
			if (!$('.navbar').hasClass('navdown'))
				swapbar(true);
		}
		else{
			if ($('.navbar').hasClass('navdown'))
				swapbar(false);
		}
	});
});

var swapbar=function(fromdefault){
	$('.navbar').slideUp(200, function(){
		if (fromdefault){
			$('.navbar').addClass('navdown');
			$('.navbar-brand').html('<img src="images/banner-monochrome-black.png" height="20" width="100">');
		}
		else{
			$('.navbar').removeClass('navdown');
			$('.navbar-brand').html('<img src="images/banner-monochrome-white.png" height="20" width="100">');
		}
		$('.navbar').slideDown(200);
	});
}

var startclub=function(){
	console.log("Scroll to query form with the message field filled out.");
}

var captchapass=function(){
	
}

var captchafail=function(){
	
}