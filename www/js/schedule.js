var listtb;
function get_thietbi() {
	var link = link_server + "get_thietbi.php";	
	$.ajax({
		type: "GET",
		url: link,
		success: function(data) {	
				if (data.indexOf("<!-- Hosting24 Analytics Code -->")>0)
					data = data.substring(0, data.indexOf("<!-- Hosting24 Analytics Code -->"));
				listtb = JSON.parse(data);				
				$('.add_icon').show();
			},
		error: function (xhr, ajaxOptions, thrownError) {
			thongbao('Mạng có vấn đề, vui lòng thử lại!');
		} 
	});
}
function tao_lichbaotri() {
	var s = '';
	var k =0 ;
	for (var i in listtb) {
		var tam = '';
		k = 0;
		tam = listtb[i]['ms'] + ':';
		$('.'+listtb[i]['ms']).each(function(){
			if ($(this).is(':checked')){
				k = 1;
				tam += $(this).attr('data-d')+',';
			}
		})
		tam = tam.substr(0,tam.length-1);
		tam +=';';
		if (k == 1) s += tam;
	}
	s = s.substr(0,s.length-1);
	return s;
}
function set_lichbaotri() {
	var link = link_server + "set_lichbaotri.php";	
	var dataString = 'ms='+$('#from_2').val()+'&chitiet='+tao_lichbaotri()+'&nguoilap='+localStorage.getItem('ten');
	$.ajax({
		type: "POST",
		url: link,
		data: dataString,
		success: function(data) {	
				if (data.indexOf("<!-- Hosting24 Analytics Code -->")>0)
					data = data.substring(0, data.indexOf("<!-- Hosting24 Analytics Code -->"));
				data = JSON.parse(data);
				if (data['r'] == 1) thongbao('Thao tác thành công.'); else thongbao('Thao tác thất bại.');
				get_lichbaotri();
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
				$('#danhsachbaotri').html(s);				
			},
		error: function (xhr, ajaxOptions, thrownError) {
			thongbao('Mạng có vấn đề, vui lòng thử lại!');
		} 
	});
}
function getDaysInMonth(m, y) {						
  	return /8|3|5|10/.test(--m)?30:m==1?(!(y%4)&&y%100)||!(y%400)?29:28:31;
}
function check_date(d) {
	var date = new Date();
		d_2 = new Date(date.getFullYear(), date.getMonth(), date.getDate());	
		d_1 = d_2.getTime();
	if (d < d_1) return "disabled"; else return;
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
				$('#table_schedule').html('');
				$("#ttbt .time").show();
				$('#table_schedule').show();			
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
										s += '<td><input type="checkbox" checked data-d="'+ date.getTime()
										+'" '+check_date(date.getTime())+' class="'+ listtb[k]['ms'] +'"/></td>';
										break;
									}
								}
								if (kt == 1) break;
							}
						}
						if (kt == 0) s += '<td><input type="checkbox" '+check_date(date.getTime())+' data-d="'+ date.getTime()
										+'" class="'+ listtb[k]['ms'] +'"/></td>';
					}
					s += '</tr>';
				}
				s += '</table>';
				$('#table_schedule').html(s);
				$('#div_btn').show();	
			},
		error: function (xhr, ajaxOptions, thrownError) {
			thongbao('Mạng có vấn đề, vui lòng thử lại!');
		} 
	});
}
function update_lichbaotri() {
	var link = link_server + "update_lichbaotri.php";	
	var dataString = 'ms='+$('#from_2').val()+'&chitiet='+tao_lichbaotri()+'&nguoilap='+localStorage.getItem('ten');
	$.ajax({
		type: "POST",
		url: link,
		data: dataString,
		success: function(data) {	
				if (data.indexOf("<!-- Hosting24 Analytics Code -->")>0)
					data = data.substring(0, data.indexOf("<!-- Hosting24 Analytics Code -->"));
				data = JSON.parse(data);
				if (data['r'] == 1) thongbao('Thao tác thành công.'); else thongbao('Thao tác thất bại.');
				get_lichbaotri();
			},
		error: function (xhr, ajaxOptions, thrownError) {
			thongbao('Mạng có vấn đề, vui lòng thử lại!');
		} 
	});
}
function check_lichbaotri(id, month, year,T) {
	var link = link_server + "check_lichbaotri.php";
	var dataString = 'ID='+id+'&T='+T;
	$.ajax({
		type: "GET",
		url: link,
		data: dataString,
		success: function(data) {	
				if (data.indexOf("<!-- Hosting24 Analytics Code -->")>0)
					data = data.substring(0, data.indexOf("<!-- Hosting24 Analytics Code -->"));
				data = JSON.parse(data);
				if (data['r'] == 1)
					show_lichbaotri(month,year); 
				else if (data['r'] == 0) {
					thongbao('Đã có lịch bảo trì ở tháng này.');
					$('#table_schedule').html('');
					$('#div_btn').hide();
				} else if (data['r'] == -1) {
					thongbao('Bạn chưa nhập lịch bảo trì cho những tháng trước đây');
					$('#table_schedule').html('');
					$('#div_btn').hide();
				}
			},
		error: function (xhr, ajaxOptions, thrownError) {
			thongbao('Mạng có vấn đề, vui lòng thử lại!');
		} 
	});
}
function show_lichbaotri(month,year) {
	var now = new Date();
	var days = getDaysInMonth(parseInt(month) + 1, year);				
	var i;
	var s = '<table class="tb_lbt" ><tr><td class="tenthietbi">Tên thiết bị</td>';
	for (i = 1; i <= days; i++){
		s += '<td>'+i+'</td>';
	}		
	s += '</tr>';
	var n_date = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	for (var k in listtb){
		s += '<tr><td id="'+ listtb[k]['ms'] +'">' + listtb[k]['ten'] + '</td>';
		for (i = 1; i <= days; i++){
			var date = new Date(year, month, i);
			if (date.getTime() >= n_date.getTime()) 
				s += '<td><input type="checkbox"  data-d="'+ date.getTime()
				+'" class="'+ listtb[k]['ms'] +'"/></td>';
			else s += '<td><input type="checkbox"  disabled data-d="'+ date.getTime()
				+'" class="'+ listtb[k]['ms'] +'"/></td>';
		}
		s += '</tr>';
	}
	s += '</table>';
	$('#table_schedule').html(s);
	$('#div_btn').show();	
}