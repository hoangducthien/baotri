var info_chitiet = {};
var tb, ms_tb, ct, ms_ct, tt, currentDeviceID;
function get_thietbi() {
	$("#check_btn").hide();
	$("#check_btn_2").hide();
	$("#dstb_list_1").html('<div class="loading"><img src="images/ajax-loader.gif" /></div>');
	var w = $('#dstb_list_1').css('width');
	var h = $('#dstb_list_1').css('height');
	$('#dstb_list_1 .loading').css('width', w);
	$('#dstb_list_1 .loading').css('height', h);
	$("#dstb_list_2").html('');
	$("#ttcttb").hide();
	var link = link_server + "get_danhsachbaotri.php";
	$.ajax({
		type: "GET",
		url: link,
		success: function(data) {	
			if (data.indexOf("<!-- Hosting24 Analytics Code -->")>0)
				data = data.substring(0, data.indexOf("<!-- Hosting24 Analytics Code -->"));
			data = JSON.parse(data);
			var s = '';
			for (var i in data) {
				s = s + '<li data-ms="' +data[i]['ms'] + '">' + data[i]['ten'] + '</li>';
			}
			$('#dstb_list_1').html(s);	
			ms_tb = $('#dstb_list_1 li:first').attr('data-ms');
			tb = $('#dstb_list_1 li:first').html();
			$("#check_btn_2").show();
		},
		error: function (xhr, ajaxOptions, thrownError) {
			thongbao('Mạng có vấn đề, vui lòng thử lại!');
		} 
	});
}
function get_chitiet_baotri(ms){	
	$("#check_btn").hide();
	$("#dstb_list_2").html('<div class="loading"><img src="images/ajax-loader.gif" /></div>');
	var w = $('#dstb_list_2').css('width');
	var h = $('#dstb_list_2').css('height');
	$('#dstb_list_2 .loading').css('width', w);
	$('#dstb_list_2 .loading').css('height', h);
	$("#ttcttb").hide();
	var link = link_server + "get_chitiet_baotri.php";
	var dataString = 'ms=' + ms;
	$.ajax({
		type: "GET",
		url: link,
		data: dataString,
		success: function(data) {	
			if (data.indexOf("<!-- Hosting24 Analytics Code -->")>0)
				data = data.substring(0, data.indexOf("<!-- Hosting24 Analytics Code -->"));
				data = JSON.parse(data);
				info_chitiet = {};
				var s = '';
				for (var i in data) { 
						info_chitiet[data[i]['ms']] = data[i]['T'];
						if ((data[i]['level'] == 1) || (data[i]['level'] == 0)) {
							lv1 = data[i]['ms'];
							s = s + '<li data-ms="' +data[i]['ms'] + '" data-level="'+data[i]['level']+'" data-T='+data[i]['T']+'>' 
							+ data[i]['ten'] + '</li>'; 
						} else 
						if (data[i]['level'] == 2) {
							lv2 = data[i]['ms'];
							s = s + '<li data-ms="' +data[i]['ms'] + '" class="lv2" data-T='+data[i]['T']+'>' 
							+ data[i]['ten'] + '</li>'; 
						}else
							s = s + '<li data-ms="' +data[i]['ms'] + '" class="lv3" data-T=' +data[i]['T']+ '>' 
							+ data[i]['ten'] + '</li>'; 
				}
				$('#dstb_list_2').html(s);
				$('#dstb_list_2').show();				
			},
		error: function (xhr, ajaxOptions, thrownError) {
			thongbao('Mạng có vấn đề, vui lòng thử lại!');
		} 
	});
}
function set_logbaotri(){
	var link = link_server + "set_logbaotri.php";
	var dataString = {};
	dataString['macv'] = $('#s_thaotac').attr('class');
	dataString['ms'] = $('#s_ct').html();
	dataString['nguoithuchien'] = localStorage.getItem("ten");
	dataString['update'] = info_chitiet[$('#s_ct').html()];
	dataString['ghichu'] = $('#ghichu').val();
	var jsonString = JSON.stringify(dataString);
	$.ajax({
		type: "POST",
		url: link,
		data: {data:jsonString},
		success: function(data) {	
			$('.mainloading').hide();
			$('#left').show();
			$('#right').show();
			if (data.indexOf("<!-- Hosting24 Analytics Code -->")>0)
				data = data.substring(0, data.indexOf("<!-- Hosting24 Analytics Code -->"));
				data = JSON.parse(data);
				if (data['r'] == 1) {
					thongbao('Thao tác thành công.'); 
					$(".check_icon").hide();
					$("#dstb_list_2").html('<div class="loading"><img src="images/ajax-loader.gif" /></div>');
					var w = $('#dstb_list_2').css('width');
					var h = $('#dstb_list_2').css('height');
					$('#dstb_list_2 .loading').css('width', w);
					$('#dstb_list_2 .loading').css('height', h);
					$('#ttcttb').hide();			
					get_chitiet_baotri(ms_tb);
				} else thongbao('Thao tác thất bại.');
				get_chitiet_baotri(ms_tb);
			},
		error: function (xhr, ajaxOptions, thrownError) {
			$('.mainloading').hide();
			$('#left').show();
			$('#right').show();
			thongbao('Mạng có vấn đề, vui lòng thử lại!');
		} 
	});
}
function xacnhan() {
	$('.mainloading').show();
	$('#left').hide();
	$('#right').hide();
	dismissDialog();
	set_logbaotri();
}

function xacnhan2() {
	$('.mainloading').show();
	$('#left').hide();
	$('#right').hide();
	dismissDialog();
	var link = link_server + "complete_baotri.php";
	var dataString = 'ms=' + ms_tb;
	$.ajax({
		type: "GET",
		url: link,
		data: dataString,
		success: function(data) {	
			$('.mainloading').hide();
			$('#left').show();
			$('#right').show();
			get_thietbi();
			if (data.indexOf("<!-- Hosting24 Analytics Code -->")>0)
				data = data.substring(0, data.indexOf("<!-- Hosting24 Analytics Code -->"));
			data = JSON.parse(data);
			if (data['r']==1) thongbao('Thao tác thành công.'); else thongbao('Thao tác thất bại.');
		},
		error: function (xhr, ajaxOptions, thrownError) {
			$('.mainloading').hide();
			$('#left').show();
			$('#right').show();
			thongbao('Mạng có vấn đề, vui lòng thử lại!');
		} 
	});
}