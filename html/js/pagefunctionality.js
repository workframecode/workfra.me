$(document).ready(function(){
	$('a[href^="#"]').on('click', function(event){
		if ($('.navbar-toggle').is(':visible')){
			hidesidebar();
		}
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
	
	$('.form-control').bind('input', function(event){
		$('#formnotify').fadeOut();
		$(this).parent().parent().removeClass("has-error has-success");
		$("#"+$(this).attr('id')+"error").remove();
	});
	
	validations['name']=[valtract,stdlength,nospecial];
	validations['college']=[valtract,colempty,max128];
	validations['email']=[valtract,empty,max64,emailvalidate];
	validations['message']=[valtract,empty,max512];
	
	$('body').on('blur', '.form-control', function(){
		$(this).parent().parent().removeClass("has-error has-success");
		$("#"+$(this).attr('id')+"error").remove();
		msg.val=validations[$(this).attr('id')][0]($(this).attr('id'));
		msg.elemid=$(this).attr('id');
		for (var i=1;i<validations[$(this).attr('id')].length;i++){
			validations[$(this).attr('id')][i](msg);
			if (msg.pass==false){
				$(this).parent().parent().addClass("has-error");
				$('<span class="error validating" id="'+$(this).attr('id')+'error">'+msg.error+'</span>').insertAfter($(this));
				break;
			}
		}
		if (msg.pass==true){
			$(this).parent().parent().addClass("has-success");
		}
		msg.pass=true;
		msg.error="";
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

var startclub=function(event){
	event.preventDefault();
	$('#message').val('Hello,\n\nI like the initiative that WorkFrame is taking and and would really appreciate it if you would consider involving my college as a part of the organization.\n\nThanks');
	$('#formnotify').css('display','inline-block');
	$('html, body').stop().animate({
		scrollTop: $('#contact').offset().top-(2*$('.navbar').height())
	}, 700);
}

var isvalidated=function(){	
	$(".validating").remove();
	$(".has-error").removeClass("has-error");
	$(".has-success").removeClass("has-success");
	outer:
	for (var key in validations){
		msg.val=validations[key][0](key);
		msg.elemid=key;
		for (var i=1;i<validations[key].length;i++){
			validations[key][i](msg);
			if (msg.pass==false){
				$("#"+key).parent().parent().addClass("has-error");
				$('<span class="error validating" id="'+key+'error">'+msg.error+'</span>').insertAfter($("#"+key));
				$("#"+key).focus();
				break outer;
			}
		}
		$("#"+key).parent().parent().addClass("has-success");
	}
	msg.pass=true;
	msg.error="";
	
	if ($(".error").length){ //Oops
		return false;
	}
	else{ //All clear
		return true;
	}
}