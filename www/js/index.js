function initialize() {
	$.mobile.allowCrossDomainPages = true;
	$.support.cors = true;
	$.mobile.phonegapNavigationEnabled = true;	
	document.addEventListener("backbutton", function(){return false;}, false);
}

function onDeviceReady() {
    initialize();
}
function onload(){
	document.addEventListener("deviceready",onDeviceReady,false);
}

function check_login(ur, pw) {
	var link = link_server + "check_login.php";
	var dataString = "ur="+ur+"&pw="+pw;
	$.ajax({
		type: "POST",
		url: link,
		data: dataString,
		success: function(data) {	
			if (data.indexOf("<!-- Hosting24 Analytics Code -->")>0)
				data = data.substring(0, data.indexOf("<!-- Hosting24 Analytics Code -->"));
				data = JSON.parse(data);
				if (data['result'] == 1) {  
					localStorage.setItem('ms',data['ms']);
					localStorage.setItem('ten',data['ten']);
					localStorage.setItem('qh',data['qh']);
					localStorage.setItem('ur',ur);
					window.location.href = "menu.html";
				}				
				else {
					$('.loading').hide();	
					$('#login_area').show();
					thongbao('Vui lòng kiểm tra lại thông tin tài khoản/mật khẩu.');
				}				
			},
		error: function (xhr, ajaxOptions, thrownError) {
			$('.loading').hide();	
			$('#login_area').show();
			thongbao('Mạng có vấn đề, vui lòng thử lại!');
		} 
	});
}		