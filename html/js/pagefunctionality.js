$(document).ready(function(){
	$(window).bind('scroll', function(){
		$('#bgbanner').css('margin-top', $(window).scrollTop() * - 0.3);
		$('#backdrop').css('margin-bottom', $(window).scrollTop() * - 1.1);
		$('#backdrop').css('opacity', 1-($(window).scrollTop()/($('#wfcontent').offset().top-(2*$('.navbar').height()))));
		
		if ($(window).scrollTop() > 0){
			if (!$('.navbar').hasClass('navdown'))
				swapbar(true);
		}
		else{
			if ($('.navbar').hasClass('navdown'))
				swapbar(false);
		}
		
		if ($(window).scrollTop() >= ($('#wfcontent').offset().top-$('.navbar').height())){
			if ($('#logo').css('opacity')=='0'){
				$('#logo').animate({
					opacity: '1.0'
				}, 200);
			}
		}
		else{
			if ($('#logo').css('opacity')=='1'){
				$('#logo').animate({
					opacity: '0.0'
				}, 200);
			}
		}
	});
});

var swapbar=function(fromdefault){
	console.log("debug");
	if (fromdefault){
		$('.navbar').animate({
			backgroundColor: '#ffffff',
			boxShadow: '0px 0px 20px 0px rgba(0,0,0,0.7)'
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

var startclub=function(){
	console.log("Scroll to query form with the message field filled out.");
}

var captchapass=function(){

}

var captchafail=function(){

}
