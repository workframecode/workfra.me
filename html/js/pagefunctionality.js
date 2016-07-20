$(document).ready(function(){
	$('a[href^="#"]').on('click', function(event){
		var target=$(this.getAttribute('href'));
		if (target.length) {
			event.preventDefault();
			var scrolloffset=target.offset().top-(2*$('.navbar').height());
			var scrolltarget=scrolloffset>0?scrolloffset:0;
			if ($(window).scrollTop()!=scrolltarget)
			$('html, body').stop().animate({
				scrollTop: scrolltarget
			}, 700);
		}
	});
	
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
		
		var activetab=$('.tablink')[0];
		$('.tablink').each(function(){
			if ($(this.getAttribute('href')).offset().top-(2*$('.navbar').height())<=$(window).scrollTop()){
				activetab=this;
			}
		});
		setactivetab(activetab);
	});
	
	$(window).resize(function(){
		if ($('.navbar-toggle').is(':visible')){ //Roughly translates to (if mobile view)
			$('#navbar').css('marginLeft', '100vw');
			$('#backdrop').css('margin-bottom', '0');
			$('#backdrop').css('opacity', '1');
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

var setactivetab=function(tab){
	if (!$(tab).parent().hasClass('activetab')){
		$('.activetab>a').animate({
			backgroundColor: 'rgba(0,0,0,0.0)'
		},200);
		$('.activetab').removeClass('activetab');
		$(tab).parent('li').addClass('activetab');
		$('.activetab>a').animate({
			backgroundColor: 'rgba(0,0,0,0.3)'
		},200);
	}
}

var startclub=function(){
	console.log("Scroll to query form with the message field filled out.");
}

var captchapass=function(){

}

var captchafail=function(){

}
