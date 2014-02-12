function get_info() {
	var link = link_server + "get_detail_nhanvien.php";
	var dataString = "maso="+localStorage.getItem('ms');
	$.ajax({
		type: "GET",
		url: link,
		data: dataString,
		success: function(data) {	
				if (data.indexOf("<!-- Hosting24 Analytics Code -->")>0)
					data = data.substring(0, data.indexOf("<!-- Hosting24 Analytics Code -->"));
				data = JSON.parse(data);
				$('#hoten').html(data['ten']);
				$('#maso').html(localStorage.getItem('ms'));
				$('#chucvu').html(data['chucvu']);
				if (data['quyenhan'] == '0') $('#quyenhan').html('Tất cả các quyền'); 
				else {
					var array = data['quyenhan'].split(',');
					var s = '';
					for (var i in array) 
						if (array[i]!='') {
							s = s+ quyenhan[Number(array[i])]+', ';	
						} 
					s = s.substr(0, s.length-2);
					$('#quyenhan').html(s);					
				}
				$('.mainloading').hide();
				$('#right').show();				
			},
			error: function (xhr, ajaxOptions, thrownError) {
				thongbao('Mạng có vấn đề, vui lòng thử lại!');
			} 
	});
}

function change_pass(oldpw, newpw){
	var link = link_server + "change_pass.php";
	var dataString = "ms="+localStorage.getItem('ms')+"&ur="+localStorage.getItem('ur')
			+'&oldpw='+hex_md5(oldpw)+'&newpw='+hex_md5(newpw);
	$.ajax({
		type: "POST",
		url: link,
		data: dataString,
		success: function(data) {	
			if (data.indexOf("<!-- Hosting24 Analytics Code -->")>0)
				data = data.substring(0, data.indexOf("<!-- Hosting24 Analytics Code -->"));
				data = JSON.parse(data);
				if (data['result'] == 1) thongbao('Đổi mật khẩu thành công'); else thongbao('Đổi mật khẩu thất bại'); 
			},
			error: function (xhr, ajaxOptions, thrownError) {
				thongbao('Mạng có vấn đề, vui lòng thử lại!');
			} 
	});
}
function check_input(){
	if ($('#newpw').val() == '') return 0;
	if ($('#renewpw').val() == '') return 0;
	if ($('#oldpw').val() == '') return 0;
	return 1;
}