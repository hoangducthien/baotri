// JavaScript Document	
	var link_server = "http://localhost/baotri_server/";	
	var isShow = false;
	function popupDialog(title, w, h, content){
		var x = $(window).width();
		var y = $(window).height();		
		if (isShow){
			$('.dialog_title p').html(title);
			$('.dialog_content').html(content);
		} else {
			var html = "<div class='dialog' id='dialog'><div class='dialog_title'><p>" + title + "</p><div class='btn_close' onclick='dismissDialog()'></div></div>";
			html += "<div class='dialog_content'>" + content + "</div></div>";	
			$('body').append(html);
		}
		$('.dialog').css("width", w);
		$('.dialog_title p').css("width", w);
		$('.dialog').css("height", h);
		$('.dialog').css("top", (y - h)/2);
		$('.dialog').css("left", (x - w)/2);
		$('.dialog').show(300);
		isShow = true;
	}
	
	function dismissDialog(){
		$(".dialog").hide(300);
	}


	

