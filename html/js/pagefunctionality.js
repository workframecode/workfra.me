$(document).ready(function(){
	$(window).bind('scroll', function(){
		$('#bgbanner').css('margin-top', $(window).scrollTop() * - 0.3);
		if (!$('.navbar-toggle').is(':visible')){ //Roughly translates to (if not mobile view)
			$('#backdrop').css('margin-bottom', $(window).scrollTop() * - 1.1);
			$('#backdrop').css('opacity', 1-($(window).scrollTop()/($('#wfcontent').offset().top-(2*$('.navbar').height()))));
		}
		
		if ($(window).scrollTop() > 0){
			if (!$('.navbar').hasClass('navdown'))
				swapbar(true);
		}
		else{
			if ($('.navbar').hasClass('navdown'))
				swapbar(false);
		}
		
		if ($(window).scrollTop() >= ($('#wfcontent').offset().top-(2*$('.navbar').height()))){
			if ($('.navbar-brand .logo').css('opacity')=='0'){
				$('.navbar-brand .logo').animate({
					opacity: '1.0'
				}, 200);
			}
		}
		else{
			if ($('.navbar-brand .logo').css('opacity')=='1'){
				$('.navbar-brand .logo').animate({
					opacity: '0.0'
				}, 200);
			}
		}
	});
	
	$(window).resize(function(){
		if ($('.navbar-toggle').is(':visible')){ //Roughly translates to (if not mobile view)
			$('#navbar').css('marginLeft', '100vw');
		}
		else{
			$('#navbar').css('marginLeft', '0');
		}
	});
});

var swapbar=function(fromdefault){
	if (fromdefault){
		$('.navbar').animate({
			backgroundColor: '#ffffff',
			boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.7)'
		}, 200);
		$('.navbar').addClass('navdown');
	}
	else{
		$('.navbar').animate({
			backgroundColor: 'transparent',
			boxShadow: '0 0 0'
		}, 200);
		$('.navbar').removeClass('navdown');
	}
}

var slidesidebar=function(){
	$('#navbar').animate({
		marginLeft: '0px'
	}, 200);
}
var hidesidebar=function(){
	$('#navbar').animate({
		marginLeft: '100vw'
	}, 200);
}

var startclub=function(){
	console.log("Scroll to query form with the message field filled out.");
}

var captchapass=function(){

}

var captchafail=function(){

}
