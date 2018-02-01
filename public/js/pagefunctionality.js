$(document).ready(function(){
    $('a[href^="#"]').on('click', function(event){
        if ($('.navbar-toggle').is(':visible')){
            hidesidebar();
        }
        var target=$(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            var scrolloffset=target.offset().top-(2*$('.navbar').height())+10;
            var scrolltarget=scrolloffset>0?scrolloffset:0;
            if ($(window).scrollTop()!=scrolltarget)
            $('html, body').stop().animate({
                scrollTop: scrolltarget
            }, 700);
        }
    });

    $(window).bind('scroll', function(){
        $('.bgbanner').css('margin-top', $(window).scrollTop() * - 0.3);
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
        $('#contactform .formnotify').fadeOut();
        $('.formerror').fadeOut();
        $('.formpass').fadeOut();
        $(this).parent().parent().removeClass("has-error has-success");
        $("#"+$(this).attr('id')+"error").remove();
    });

    validations['name']=[valtract,stdlength,nospecial];
    validations['college']=[valtract,colempty,max128];
    validations['email']=[valtract,empty,max64,emailvalidate];
    validations['message']=[valtract,empty,max512];

    $('body').on('blur', '#contactform .form-control', function(){
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

var colleges = [
    {
        codename: 'drait',
        shortname: 'Dr. AIT',
        fullname: 'Dr. Ambedkar Institute of Technology'
    },
    {
        codename: 'nhce',
        shortname: 'NHCE',
        fullname: 'New Horizon College of Engineering'
    },
    {
        codename: 'pesu',
        shortname: 'PESU',
        fullname: 'PES University'
    },
]

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
};

var slidesidebar=function(){
    $('#navbar').animate({
        marginLeft: '0px'
    }, 200);
};
var hidesidebar=function(){
    $('#navbar').animate({
        marginLeft: '100vw'
    }, 200);
};

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
};

var startClub=function(event){
    event.preventDefault();
    $('#message').val('Hello,\n\nI like the initiative that WorkFrame is taking and would really appreciate it if you would consider involving my college as a part of the organization.\n\nThanks');
    $('.formnotify').css('display','inline-block');
    $('html, body').stop().animate({
        scrollTop: $('.formnotify').offset().top-$('.navbar').height()-20
    }, 700);
};

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
};

var showSlackInvite=function(event, college) {
    var popup = '.noinvite';
    if (college) {
        collobj = colleges[college - 1];
        popup = '.wfinvite';
        $("#wfinviteimage").attr('src', 'assets/images/dp/' + collobj.codename + '.jpg');
        $("#wfinvitetext").html('WorkFrame ' + collobj.shortname);
        $("#wfinvitecodename").html(collobj.codename);
    }
    event.preventDefault();
    if (window.grecaptcha) {
        $(popup).css("display", "block");
        $(".overlay").css("display", "block");
        $(popup).animate({opacity: 1}, 500);
        $(".overlay").animate({opacity: 0.5}, 500);
       recaptchaCallback('srecaptcha');
       recaptchaCallback('wrecaptcha');
    }
};
var hideSlackInvite=function() {
    $(".slackinvitebox").animate({opacity: 0}, 500, function() {
        $(".slackinvitebox").css("display", "none");
        $(".srecaptcha").html("");
        $(".wrecaptcha").html("");
    });
    $(".overlay").animate({opacity: 0}, 500, function() {
        $(".overlay").css("display", "none");
    });
};

//Stuff for Google anaylytics
(function(i,s,o,g,r,a,m){
    i['GoogleAnalyticsObject']=r;
    i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments);
    };
    i[r].l=1*new Date();
    a=s.createElement(o);
    m=s.getElementsByTagName(o)[0];
    a.async=1;
    a.src=g;
    m.parentNode.insertBefore(a,m);
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-97829457-1', 'auto');
ga('send', 'pageview');
