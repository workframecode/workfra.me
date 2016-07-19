$(document).ready(function(){
	$(window).bind('scroll', function(){
		$('#bgbanner').css('margin-top', $(window).scrollTop() * -.3);
		
		if ($(window).scrollTop() > 0){
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
	if (fromdefault){
		$('.navbar').animate({
			backgroundColor: '#ffffff',
			boxShadow: '0px 0px 20px 0px rgba(0,0,0,0.7)'
		}, 200, function(){
			$('.navbar').addClass('navdown');
		});
	}
	else{
		$('.navbar').animate({
			backgroundColor: 'transparent',
			boxShadow: 'none'
		}, 200, function(){
			$('.navbar').removeClass('navdown');
		});
	}
}

var startclub=function(){
	console.log("Scroll to query form with the message field filled out.");
}

var captchapass=function(){

}

var captchafail=function(){

}
