var link_server = "http://localhost/baotri_server/";
function add_user(maso, hoten, taikhoan, matkhau, chucvu, quyenhan){
		var link = link_server + "add_user"; 
		var dataString = "maso="+maso+"&hoten="+hoten+"&ur="+taikhoan+"&pw="+hex_md5(matkhau)
						+"&chucvu="+chucvu+"&quyenhan="+quyenhan;
		$.ajax({
			type: "POST",
			url: link,
			data: dataString,
			success: function(data) {	
			},
			error: function (xhr, ajaxOptions, thrownError) {
			} 
		});
}
function login(username, password) {
		var ur = username;
		var pw = hex_md5(password);
		var link = link_server + "login.php?"+"username="+ur+"&password="+pw;
		$.ajax({
			type: "GET",
			url: link,
			success: function(data) {	
			},
			error: function (xhr, ajaxOptions, thrownError) {
			} 
		});
}
function get_equip(){
		var link = link_server + "get_equip.php";
		$.ajax({
			type: "GET",
			url: link,
			success: function(data) {	
			},
			error: function (xhr, ajaxOptions, thrownError) {;
			} 
		});
}
function get_equip_detail(){
		var link = link_server + "get_equip_detail.php";
		$.ajax({
			type: "GET",
			url: link,
			success: function(data) {	
			},
			error: function (xhr, ajaxOptions, thrownError) {
			} 
		});
}
function get_detail_info(){
		var link = link_server + "get_detail_info.php";
		$.ajax({
			type: "GET",
			url: link,
			success: function(data) {	
			},
			error: function (xhr, ajaxOptions, thrownError) {
			} 
		});
}
function get_equip_condition(){
		var link = link_server + "get_equip_condition.php";
		$.ajax({
			type: "GET",
			url: link,
			success: function(data) {	
			},
			error: function (xhr, ajaxOptions, thrownError) {
			} 
		});
}
function set_detail_info(){
		var link = link_server + "set_equip_condition.php";
		$.ajax({
			type: "POST",
			url: link,
			data: dataString,
			success: function(data) {	
			},
			error: function (xhr, ajaxOptions, thrownError) {
			} 
		});
}