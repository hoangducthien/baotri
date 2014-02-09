function quyenhan_check(){
			var s = '';
			 if ($('#0').is(":checked") == true){
					return '0';
			} else 
				$("#cb_quyenhan input").each(function() {
                if ($(this).is(":checked") == true){
					s +=$(this).attr('id')+',';
				}
			});
			return s;
		}
function get_chucvu() {
		var link = link_server + "get_chucvu.php";
		
}
function check_input() {
		if ($('#maso').val() == '') return 'Mã Số';
		if ($('#hoten').val() == '') return 'Họ Tên';
		if ($('#taikhoan').val() == '') return 'Tài Khoản';
		if ($('#matkhau').val() == '') return 'Mật Khẩu';
		if ($('#chucvu').val() == '0') return 'Chức Vụ';
		if (quyenhan_check() == '') return 'Quyền Hạn';
		return '0';
}
function add_user(maso, hoten, taikhoan, matkhau, chucvu, quyenhan){
		var link = link_server + "add_user.php"; 
		var dataString = "maso="+maso+"&hoten="+hoten+"&ur="+taikhoan+"&pw="+hex_md5(matkhau)
						+"&chucvu="+chucvu+"&quyenhan="+quyenhan;
		alert(dataString);
		$.ajax({
			type: "POST",
			url: link,
			data: dataString,
			success: function(data) {	
				if (data.indexOf("<!-- Hosting24 Analytics Code -->")>0)
					data = data.substring(0, data.indexOf("<!-- Hosting24 Analytics Code -->"));
				data = JSON.parse(data);
				if (data['result'] == '1') {
					alert('Thêm thành công');
				} else {
					alert('Thao tác thất bại');
				}
			},
			error: function (xhr, ajaxOptions, thrownError) {
			} 
		});
}