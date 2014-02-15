var currentID;
var	listtb;
function get_thietbi() {
	var link = link_server + "get_thietbi.php";	
	$.ajax({
		type: "GET",
		url: link,
		success: function(data) {	
				if (data.indexOf("<!-- Hosting24 Analytics Code -->")>0)
					data = data.substring(0, data.indexOf("<!-- Hosting24 Analytics Code -->"));
				listtb = JSON.parse(data);				
			},
		error: function (xhr, ajaxOptions, thrownError) {
			thongbao('Mạng có vấn đề, vui lòng thử lại!');
		} 
	});
}	
	
function get_Date(i){
	if (i==0) return '';
	var d = new Date(Number(i));
	return d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear();
}

function get_list_phieubaotri(){
	var link = link_server + "get_list_phieubaotri.php";
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
				$('#list_1').html(s);
			},
		error: function (xhr, ajaxOptions, thrownError) {
			thongbao('Mạng có vấn đề, vui lòng thử lại!');
		} 
	});
}

function get_lichbaotri() {
	var link = link_server + "get_lichbaotri.php";	
	$.ajax({
		type: "GET",
		url: link,
		success: function(data) {	
				if (data.indexOf("<!-- Hosting24 Analytics Code -->")>0)
					data = data.substring(0, data.indexOf("<!-- Hosting24 Analytics Code -->"));
				data = JSON.parse(data);
				var s = '';
				for (var i in data) s += '<li>' + data[i]['ms'] + '</li>';
				$('#list_1').html(s);				
			},
		error: function (xhr, ajaxOptions, thrownError) {
			thongbao('Mạng có vấn đề, vui lòng thử lại!');
		} 
	});
}

function get_list_thietbi() {
	var link = link_server + "get_thietbi.php";	
	$.ajax({
		type: "GET",
		url: link,
		success: function(data) {	
				if (data.indexOf("<!-- Hosting24 Analytics Code -->")>0)
					data = data.substring(0, data.indexOf("<!-- Hosting24 Analytics Code -->"));
				data = JSON.parse(data);
				var s = '';
				for (var i in data) s += '<li data-ms="'+data[i]['ms']+'">' + data[i]['ten'] + '</li>';
				$('#list_1').html(s);				
			},
		error: function (xhr, ajaxOptions, thrownError) {
			thongbao('Mạng có vấn đề, vui lòng thử lại!');
		} 
	});
}

function get_chitiet(ms) {
	var link = link_server + "get_chitiet.php";
		dataString = "ms="+ms;	
	$.ajax({
		type: "GET",
		url: link,
		data: dataString,
		success: function(data) {	
				if (data.indexOf("<!-- Hosting24 Analytics Code -->")>0)
					data = data.substring(0, data.indexOf("<!-- Hosting24 Analytics Code -->"));
				data = JSON.parse(data);
				var s = '';
				for (var i in data) { 
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
				$('#dschitiet').html(s);				
			},
		error: function (xhr, ajaxOptions, thrownError) {
			thongbao('Mạng có vấn đề, vui lòng thử lại!');
		} 
	});
}


function get_lichbaotri_detail(ms) {
	var link = link_server + "get_lichbaotri_detail.php";
	var dataString = 'ms='+ms;	
	$.ajax({
		type: "GET",
		url: link,
		data: dataString,
		success: function(data) {
				if (data.indexOf("<!-- Hosting24 Analytics Code -->")>0)
					data = data.substring(0, data.indexOf("<!-- Hosting24 Analytics Code -->"));
				data = JSON.parse(data);
				$('#info_lichbaotri').html('');			
				var t = ms.split('/');
				var month = t[0];
				var year = t[1];
				var days = getDaysInMonth(month, year);
				var d_lich = data['chitiet'].split(';');
				$('#from_2').val(ms);
				var i;
				var s = '<table class="tb_lbt" ><tr><td class="tenthietbi">Tên thiết bị</td>';
				for (i = 1; i <= days; i++){
					s += '<td>'+i+'</td>';
				}		
				s += '</tr>';
				for (var k in listtb){
					s += '<tr><td id="'+ listtb[k]['ms'] +'">' + listtb[k]['ten'] + '</td>';
					for (i = 1; i <= days; i++){
						var date = new Date(year, parseInt(month) - 1 , i);
						kt = 0;						
						for (var j in d_lich) {
							var str_kt = d_lich[j].split(':');
							if (str_kt[0] == listtb[k]['ms']) {
								var sstr_kt = str_kt[1].split(',');
								for (var jj in sstr_kt) {
									if (date.getTime() == parseInt(sstr_kt[jj])){
										kt = 1;
										s += '<td>X</td>';
										break;
									}
								}
								if (kt == 1) break;
							}
						}
						if (kt == 0) s += '<td></td>';
					}
					s += '</tr>';
				}
				s += '</table>';
				$('#info_lichbaotri').html(s);	
			},
		error: function (xhr, ajaxOptions, thrownError) {
			thongbao('Mạng có vấn đề, vui lòng thử lại!');
		} 
	});
}

function get_logbaotri(ms) {
	var dataString = "ms="+ms;
	var link = link_server + "get_logbaotri.php";
	$.ajax({
		type: "GET",
		url: link,
		data: dataString,
		success: function(data) {	
				if (data.indexOf("<!-- Hosting24 Analytics Code -->")>0)
					data = data.substring(0, data.indexOf("<!-- Hosting24 Analytics Code -->"));
				data = JSON.parse(data);
				var s = '';
				for (var i in data) 
				 s='<div class="sukienbaotri" style="border-bottom:1px solid #ccc">'+
                            '<p> Mã bảo trì: '+data[i]['id']+'</p>'+
                            '<p>Ngày bảo trì: '+get_Date(data[i]['ngay'])+'</p>'+
                            '<p>Người thực hiện: '+data[i]['nguoithuchien']+'</p>'+      
                            '</p>'+
                            '<p> Thao tác bảo trì: '+data[i]['congviec']+
                            '</p>'+                        
                            '<p>Ghi chú: </p>'+	               
                        '</div>';
				$('#log_baotri').html(s);				
			},
		error: function (xhr, ajaxOptions, thrownError) {
			thongbao('Mạng có vấn đề, vui lòng thử lại!');
		} 
	});
}

function dat(i) {
	if (i==0) return "Không đạt"; else return "Đạt";
}
function get_phieubaotri(ms) {
	var dataString = "ms="+ms;
	var link = link_server + "get_phieubaotri_detail.php";
	$.ajax({
		type: "GET",
		url: link,
		data: dataString,
		success: function(data) {	
				if (data.indexOf("<!-- Hosting24 Analytics Code -->")>0)
					data = data.substring(0, data.indexOf("<!-- Hosting24 Analytics Code -->"));
				data = JSON.parse(data);
				var s = '';
				 
				 s='<p> <span style="float:left">Người yêu cầu: '+data['nguoiyeucau']+' </span>'+ 
				 '<span style="float:right; margin-right:20px">Ngày yêu cầu: '+get_Date(data['ngayyeucau'])+' </span></p>'+
                '</br>'+
                '<p style="clear:both"> <span style="float:left">Tên thiết bị:'+data['tentb']+' </span>'+
				'<span style="float:right; margin-right:20px">Đặt tại: '+data['dattai']+' </span></p>'+
             	'</br>'+
                '<p style="clear:both"> Mã hiệu: '+data['matb']+'</p>'+                
                '<p>Tình trạng hư hỏng: '+data['tinhtranghuhong']+'</p>'+
                '<p>Nguyên nhân hư hỏng: '+data['nguyennhanhuhong']+'</p>'+
                '<p>Phương án sửa chữa: '+data['phuongansuachua']+'</p>'+
                '<p>Người lập phương án: '+data['nguoilapphuongan']+'</p>'+
                '<p>Ngày lập phương án: '+get_Date(data['ngaylapphuongan'])+'</p>'+
                '<p>Người duyệt phương án: '+data['nguoiduyetphuongan']+'</p>'+
                '<p>Ngày duyệt phương án: '+get_Date(data['ngayduyetphuongan'])+'</p>'+
                '<p>Kết quả sửa chữa: '+data['ketquasuachua']+'</p>'+
                '<p style="clear:both"> <span style="float:left">Ngày bắt đầu sửa chữa: '+get_Date(data['ngaybatdau'])+'</span>'+
				'<span style="float:right; margin-right:20px">Người sửa chữa: '+data['nguoisuachua']+'</span></p>'+
                '</br>'+
                '<p style="clear:both">Ngày kết thúc sửa chữa: '+get_Date(data['ngayketthuc'])+'</p>'+
                '<p>Kết quả giám sát: '+dat(data['dat'])+'</p>'+
				'<p> <span style="float:left">Người giám sát: '+data['nguoigiamsat']+'</span>'+
				'<span style="float:right; margin-right:20px">Ngày giám sát: '+get_Date(data['ngaygiamsat'])+'</span></p>'+
                '</br>'+
                '<p style="clear:both"> <span style="float:left">Người duyệt: '+data['nguoiduyetbb']+' </span>'+
				'<span style="float:right; margin-right:20px">Ngày duyệt:  '+get_Date(data['ngayduyetbb'])+'</span></p>';
				if (data['giaidoan'] == 7) s+='<p>Người huỷ biên bản: '+data['nguoihuy']+'</p>'+
												'<p>Nguyên nhân huỷ: '+data['nguyennhan']+'</p>';
				$('#step_1').html(s);				
			},
		error: function (xhr, ajaxOptions, thrownError) {
			thongbao('Mạng có vấn đề, vui lòng thử lại!');
		} 
	});
}