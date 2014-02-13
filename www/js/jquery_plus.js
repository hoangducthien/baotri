var y = $(window).height();
var x = $(window).width();
$(function(){ 
	$("#container").css("width",x); 
	$("#container").css("height",y);
	$('.mainloading').css('height', y - 35);
	$('.mainloading').css('width', x);
	$(".icon_click").on('click', function () {
		$(this).animate({top:"-=5"}, 100);
		$(this).animate({top:"+=5"}, 100);
	});
});