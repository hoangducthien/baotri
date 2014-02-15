// JavaScript Document	
	var link_server = "http://192.168.1.34/baotri_server/";	
	var quyenhan = ["Tất cả các quyền","Xem danh sách bảo trì","Báo hư","Xem biên bản sửa chữa","Xem kế hoạch bảo trì"
					,"Xem thông tin cá nhân","Quản lý thiết bị","Quản lý tài khoản","Xem báo cáo"];
	var time_baotri = [86400000,180000000,1800000000,5400000000,9000000000,18000000000,21600000000,43200000000,86400000000];
	var thaotac_baotri = {};
	thaotac_baotri['I'] = 'Kiểm tra, làm sạch, hiệu chỉnh hoặc thay thể';
	thaotac_baotri['I1'] = 'Có dùng khí nén để vệ sinh';
	thaotac_baotri['L'] = 'Bôi trơn';
	thaotac_baotri['R'] = 'Thay Thế';
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
		$('.dialog').css("padding-bottom", 10);
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
		popupDialog("Thông Báo", 300, 165, c);
	}
	function filter(selector, query, s) {  
			query = $.trim(query);
			query = query.replace(/ /gi, '|');  
			$(selector).each(function() {  
				if (s != '')
				var str = $(this).attr(s); 
				else var str = $(this).html();
				(str.search(new RegExp(query, "i")) < 0) ? $(this).hide(): $(this).show();  
			});  
	}

	function search_list(s1,s2) {
		$(s1+' li').addClass('visible');
		$(s2).keyup(function(event) {  
   			 if (event.keyCode == 27 || $(this).val() == '') {  
      				$(this).val('');  
              		$(s1+' li').show();  
   			 }  
    		else {
				filter(s1+' li', $(this).val(),'');
			}
    	});  	
	}
	function getDaysInMonth(m, y) {						
  		return /8|3|5|10/.test(--m)?30:m==1?(!(y%4)&&y%100)||!(y%400)?29:28:31;
	}
	
	
	
	var app = {
		// Application Constructor
		initialize: function() {			
			this.bindEvents();
		},
		// Bind Event Listeners
		//
		// Bind any events that are required on startup. Common events are:
		// 'load', 'deviceready', 'offline', and 'online'.
		bindEvents: function() {
			document.addEventListener('deviceready', this.onDeviceReady, false);
		},
		// deviceready Event Handler
		//
		// The scope of 'this' is the event. In order to call the 'receivedEvent'
		// function, we must explicity call 'app.receivedEvent(...);'
		onDeviceReady: function() {
			app.receivedEvent('deviceready');
		},
		// Update DOM on a Received Event
		receivedEvent: function(id) {				
			document.addEventListener("backbutton", function(){	
				if (location.href.indexOf('menu.html') > 0 || location.href.indexOf('index.html') > 0)			
					navigator.app.exitApp();
				else
					window.location.href="menu.html";
				return false;
			}, false);			
		}
	};
