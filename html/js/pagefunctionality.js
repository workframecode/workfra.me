$(document).ready(function(){
	$(window).bind('scroll', function(){
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
	
	}
	else{

	}
}

var startclub=function(){
	console.log("Scroll to query form with the message field filled out.");
}

var captchapass=function(){

}

var captchafail=function(){

}
