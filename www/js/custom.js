// JavaScript Document	
	var link_server = "http://192.168.1.34/baotri_server/";	
	var quyenhan = ["Tất cả các quyền","Xem danh sách bảo trì","Báo hư","Xem biên bản sửa chữa","Xem kế hoạch bảo trì"
					,"Xem thông tin cá nhân","Quản lý thiết bị","Quản lý tài khoản","Xem báo cáo"];
	var time_baotri = [86400000,180000000,1800000000,5400000000,9000000000,18000000000,21600000000,43200000000,86400000000];
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
		$('.dialog').show();
		isShow = true;
	}
	
	function dismissDialog(){
		$(".dialog").hide();
	}

	function thongbao(content){
		var c = '<div style="margin-top:20px; text-align:center"><p>' + content + '</p><div style="text-align:center; margin-top:20px"><input type="button" value="OK" class="button" onclick="dismissDialog()"></div></div>';
		popupDialog("Thông Báo", 300, 145, c);
	}

	

