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
function get_detail_nhanvien(maso) {
		var link = link_server + "get_detail_nhanvien.php";
		var dataString = "maso="+maso;
		$.ajax({
			type: "GET",
			url: link,
			data: dataString,
			success: function(data) {	
				if (data.indexOf("<!-- Hosting24 Analytics Code -->")>0)
					data = data.substring(0, data.indexOf("<!-- Hosting24 Analytics Code -->"));
				data = JSON.parse(data);
				$('#s_maso').html(maso);
				$('#s_taikhoan').html(data['ur']);			
				$('#s_hoten').html(data['ten']);		
				$('#s_chucvu').html(data['chucvu']);
				if (data['quyenhan'] == '0') { 
					$('#s_quyenhan').html('Tất cả các quyền'); 
					$('#0').prop("checked", true);
					$("#cb_quyenhan input").prop("checked", true);
				} else {
					var array = data['quyenhan'].split(',');
					var s = '';
					$('#0').prop("checked", false);
					$("#cb_quyenhan input").prop("checked", false);
					for (var i in array) 
						if (array[i]!='') {
							$('#'+array[i]).prop("checked", true);
							s = s+ $('#'+array[i]).parent().find('span').html()+', ';

						} 
					s = s.substr(0, s.length-2);
					$('#s_quyenhan').html(s);
				}
				$('#maso').val(maso);
				$('#hoten').val(data['ten']);
				$('#taikhoan').val(data['ur']);
				$('#chucvu').val(data['machucvu']);
			},
			error: function (xhr, ajaxOptions, thrownError) {
					thongbao('Mạng có vấn đề, vui lòng thử lại!');
			} 
		});
}
function get_nhanvien() {
		var link = link_server + "get_nhanvien.php"; 
		$.ajax({
			type: "GET",
			url: link,
			success: function(data) {	
				if (data.indexOf("<!-- Hosting24 Analytics Code -->")>0)
					data = data.substring(0, data.indexOf("<!-- Hosting24 Analytics Code -->"));
				data = JSON.parse(data);
				var s = '';
				for (var i in data) {
					s += '<li data-ms="'+data[i]['maso']+'">'+data[i]['tennv']+'</li>';
				}
				$('#account-list').html(s);
			},
			error: function (xhr, ajaxOptions, thrownError) {
					thongbao('Mạng có vấn đề, vui lòng thử lại!');
			} 
		});
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
		var dataString = "maso="+maso+"&hoten="+hoten+"&ur="+taikhoan+"&pw="+matkhau
						+"&chucvu="+chucvu+"&quyenhan="+quyenhan;
		$.ajax({
			type: "POST",
			url: link,
			data: dataString,
			success: function(data) {	
				if (data.indexOf("<!-- Hosting24 Analytics Code -->")>0)
					data = data.substring(0, data.indexOf("<!-- Hosting24 Analytics Code -->"));
				data = JSON.parse(data);
				if (data['result'] == '1') {
					thongbao('Thêm thành công!');
					$("#tttk_edit").hide();
					$(".edit_icon").show();
				} else { thongbao('Thêm thất bại!');
				}
			},
			error: function (xhr, ajaxOptions, thrownError) {
			} 
		});
}
function edit_user(maso, hoten, taikhoan, matkhau, chucvu, quyenhan){
		var link = link_server + "edit_user.php"; 
		var dataString = "maso="+maso+"&hoten="+hoten+"&ur="+taikhoan+"&pw="+matkhau
						+"&chucvu="+chucvu+"&quyenhan="+quyenhan;
		$.ajax({
			type: "POST",
			url: link,
			data: dataString,
			success: function(data) {	
				if (data.indexOf("<!-- Hosting24 Analytics Code -->")>0)
					data = data.substring(0, data.indexOf("<!-- Hosting24 Analytics Code -->"));
				data = JSON.parse(data);
				if (data['result'] == '1') {
					thongbao('Thay đổi thông tin thành công!');
					$("#tttk_edit").hide();
					$(".edit_icon").show();
				} else { thongbao('Thay đổi thông tin thất bại!');
				}
			},
			error: function (xhr, ajaxOptions, thrownError) {
			} 
		});
}
function reset_input() {
		$('#maso').val('');
		$('#hoten').val('');
		$('#taikhoan').val('');
		$('#matkhau').val('');
		$('#chucvu').val('');
		$('#0').prop("checked", false);
		$("#cb_quyenhan input").prop("checked", false);
}