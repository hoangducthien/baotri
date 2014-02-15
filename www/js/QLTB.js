var title = [['Mã thiết bị', 'Tên thiết bị', 'Nơi đặt','Loại thiết bị', 'Trạng thái', 'Kiểu dáng', 'Hãng sản xuất', 'Nước sản xuất', 
			'Lô sản xuất', 'Năm sản xuất', 'Thời gian bắt đầu sử dụng'], ['Mã loại thiết bị', 'Tên thiết bị'],['Mã loại chi tiết', 
			'Tên chi tiết', 'Thời gian bảo trì', 'Level', 'Thuộc loại thiết bị']];										
			
var id_t = [['ms','ten','noidat','loaitb','trangthai','kieudang','hangsx','nuocsx','losx','namsx','thoigiansd'],
			['ms','ten'],['ms','ten','thoigianbaotri','level','tb']];

var currentID, mode, state, num_count, num_page;

function getColumn(title, content, id){
	var s = '<div class="column_item"><div class="column_header decorate_text">' + title + '</div>'+
	'<div class="column_content" style="display:none" data-s="'+id+'">' + content + '</div>'+
	'<div class="column_edit"><textarea style="resize:none" id="'+id+'">' + content + '</textarea></div></div>';
	return s;
}

function getColumn2(title, content, id){
	var s = '<div class="column_item"><div class="column_header decorate_text">' + title + '</div>'+
	'<div class="column_content" data-s="'+id+'">' + content + '</div>'+
	'<div class="column_edit"  style="display:none"><textarea style="resize:none" id="'+id+'">' + content + '</textarea></div></div>';
	return s;
}

function getTable(k){
	var s = '';
	for (i = 0; i< title[k].length; i++){
		if (mode == 'add') s += getColumn(title[k][i], '',id_t[k][i]); else
		if (mode == 'edit') s += getColumn2(title[k][i], '',id_t[k][i]);
	}
	return s;
}

function check_date(s){
	if (s.search('/')>0) var s = s.split('/'); 
	else if (s.search('-')>0) var s = s.split('-');
	var date = parseInt(s[0]);
		month = parseInt(s[1]);
		year = parseInt(s[2]); 
	if ((month<=12) && (month>=1))
	 if (year>=0)
	 	if ((date<=getDaysInMonth(month,year)) && (date>=1)) return true;
	thongbao('Ngày không hợp lệ.');
	return false;
}

function get_Time(s){
	if (s.search('/')>0) var s = s.split('/'); 
	else if (s.search('-')>0) var s = s.split('-');
	var date = parseInt(s[0]);
		month = parseInt(s[1]);
		year = parseInt(s[2]); 
	var d = new Date(year,month,date);
	return d.getTime();
}

function check_null() {
	if (currentID == 1) {
		if ($('#ms').val() == '') return false; 
		if ($('#ten').val() == '') return false; 
		if ($('#noidat').val() == '') return false; 
		if ($('#loaitb').val() == '') return false; 
		if ($('#trangthai').val() == '') return false;
		if ($('#kieudang').val() == '') return false;  
		if ($('#hangsx').val() == '') return false; 
		if ($('#nuocsx').val() == '') return false;
		if ($('#losx').val() == '') return false;
		if ($('#namsx').val() == '') return false;
		if ($('#thoigiansd').val() == '') return false;
		else {
			if (!check_date($('#thoigiansd').val())) return false;
		}
	} else if (currentID == 2) {
		if ($('#ms').val() == '') return false; 
		if ($('#ten').val() == '') return false; 
	} else if (currentID == 3) {
		if ($('#ms').val() == '') return false; 
		if ($('#ten').val() == '') return false; 
		if ($('#thoigianbaotri').val() == '') return false;
		if ($('#level').val() == '') return false;
		if ($('#tb').val() == '') return false;  
	}
	return true;
}

function add() {
	var dataString = {};
	if (currentID == 1) {
		dataString['ms'] = $('#ms').val(); 
		dataString['ten'] = $('#ten').val(); 
		dataString['noidat'] = $('#noidat').val();
		dataString['loaitb'] = $('#loaitb').val(); 
		dataString['trangthai'] = $('#trangthai').val(); 
		dataString['kieudang'] = $('#kieudang').val(); 
		dataString['hangsx'] = $('#hangsx').val(); 
		dataString['nuocsx'] = $('#nuocsx').val(); 
		dataString['losx'] = $('#losx').val(); 
		dataString['namsx'] = $('#namsx').val(); 
		dataString['thoigiansd'] = get_Time($('#thoigiansd').val()); 
		
		$('[data-s="ms"]').html($('#ms').val());
		$('[data-s="ten"]').html($('#ten').val());
		$('[data-s="noidat"]').html($('#noidat').val());
		$('[data-s="loaitb"]').html($('#loaitb').val());
		$('[data-s="trangthai"]').html($('#trangthai').val());
		$('[data-s="kieudang"]').html($('#kieudang').val());
		$('[data-s="hangsx"]').html($('#hangsx').val());
		$('[data-s="nuocsx"]').html($('#nuocsx').val());
		$('[data-s="losx"]').html($('#losx').val());
		$('[data-s="namsx"]').html($('#namsx').val());
		$('[data-s="thoigiansd"]').html($('#thoigiansd').val());
		
	} else if (currentID == 2) {
		dataString['ms'] = $('#ms').val(); 
		dataString['ten'] = $('#ten').val(); 
		
		$('[data-s="ms"]').html($('#ms').val());
		$('[data-s="ten"]').html($('#ten').val());
	} else if (currentID == 3) {
		dataString['ms'] = $('#ms').val(); 
		dataString['ten'] = $('#ten').val(); 
		dataString['thoigianbaotri'] = $('#thoigianbaotri').val(); 
		dataString['level'] = $('#level').val();
		dataString['tb'] = $('#tb').val(); 
		
		$('[data-s="ms"]').html($('#ms').val());
		$('[data-s="ten"]').html($('#ten').val());
		$('[data-s="thoigianbaotri"]').html($('#thoigianbaotri').val());
		$('[data-s="level"]').html($('#level').val());
		$('[data-s="tb"]').html($('#tb').val());
	}
	dataString['type'] = currentID;
	var jsonString = JSON.stringify(dataString);
		link = link_server + "add_component.php";	
	$.ajax({
		type: "GET",
		url: link,
		data: {data:jsonString},
		success: function(data) {	
				if (data.indexOf("<!-- Hosting24 Analytics Code -->")>0)
					data = data.substring(0, data.indexOf("<!-- Hosting24 Analytics Code -->"));
				data = JSON.parse(data);
				if (data['r'] == 1) thongbao('Thao tác thành công.'); else thongbao('Thao tác thất bại.\n Vui lòng kiểm tra thông tin đã nhập.');
			},
		error: function (xhr, ajaxOptions, thrownError) {
			thongbao('Mạng có vấn đề, vui lòng thử lại!');
		} 
	});
}

function get_list_component(page) {
	var dataString = 'type='+currentID+'&page='+page;
		link = link_server + "get_list_component.php";	
	$.ajax({
		type: "GET",
		url: link,
		data: dataString,
		success: function(data) {
				$('#left .loading').hide();
				$('#ds_comp').show();	
				if (data.indexOf("<!-- Hosting24 Analytics Code -->")>0)
					data = data.substring(0, data.indexOf("<!-- Hosting24 Analytics Code -->"));
				data = JSON.parse(data);
				var s = '';
				for (var i in data) {
					s += '<li data-ms="'+data[i]['ms']+'">'+data[i]['ten']+'</li>';
				}
				$('#ds_comp').html(s);
			},
		error: function (xhr, ajaxOptions, thrownError) {
			$('#left .loading').hide();
			$('#ds_comp').show();
			thongbao('Mạng có vấn đề, vui lòng thử lại!');
		} 
	});
}

function get_detail_component(ms, ten) {
	if (currentID == 2) {
			$('#ms').val(ms); 
			$('#ten').val(ten); 
					
			$('[data-s="ms"]').html(ms);
			$('[data-s="ten"]').html(ten);
	} else {
	var dataString = 'ms='+ms+'&type='+currentID;
		link = link_server + "get_detail_component.php";	
	$.ajax({
		type: "GET",
		url: link,
		data: dataString,
		success: function(data) {	
				if (data.indexOf("<!-- Hosting24 Analytics Code -->")>0)
					data = data.substring(0, data.indexOf("<!-- Hosting24 Analytics Code -->"));
				data = JSON.parse(data);
				var s = '';
				if (currentID == 1) {
					$('#ms').val(ms); 
					$('#ten').val(ten); 
					$('#noidat').val(data['noidat']);
					$('#loaitb').val(data['loaitb']); 
					$('#trangthai').val(data['trangthai']); 
					$('#kieudang').val(data['kieudang']); 
					$('#hangsx').val(data['hangsx']); 
					$('#nuocsx').val(data['nuocsx']); 
					$('#losx').val(data['losx']); 
					$('#namsx').val(data['namsx']);
					var date = new Date(parseInt(data['thoigiansd'])); 
						s_date = date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();
					$('#thoigiansd').val(s_date); 
					
					$('[data-s="ms"]').html(ms);
					$('[data-s="ten"]').html(ten);
					$('[data-s="noidat"]').html(data['noidat']);
					$('[data-s="loaitb"]').html(data['loaitb']);
					$('[data-s="trangthai"]').html(data['trangthai']);
					$('[data-s="kieudang"]').html(data['kieudang']);
					$('[data-s="hangsx"]').html(data['hangsx']);
					$('[data-s="nuocsx"]').html(data['nuocsx']);
					$('[data-s="losx"]').html(data['losx']);
					$('[data-s="namsx"]').html(data['namsx']);
					$('[data-s="thoigiansd"]').html(s_date);
					
				} else if (currentID == 3) {
					$('#ms').val(ms.substring(ms.search('.')+1,ms.length-ms.search('.'))); 
					$('#ten').val(ten); 
					$('#thoigianbaotri').val(data['ThoiGianBaoTri']); 
					$('#level').val(data['Level']);
					$('#tb').val(ms.substring(0,ms.search('.'))); 
					
					$('[data-s="ms"]').html(ms.substring(ms.search('.')+1,ms.length-ms.search('.')));
					$('[data-s="ten"]').html(ten);
					$('[data-s="thoigianbaotri"]').html(data['ThoiGianBaoTri']);
					$('[data-s="level"]').html(data['Level']);
					$('[data-s="tb"]').html(ms.substring(0,ms.search('.')));
				}
			},
		error: function (xhr, ajaxOptions, thrownError) {
			thongbao('Mạng có vấn đề, vui lòng thử lại!');
		} 
	});
	}
}

function get_count_component() {
	alert(currentID);
	var dataString = 'type='+currentID;
	    link = link_server + 'get_count_component.php';
	$.ajax({
		type: "GET",
		url: link,
		data: dataString,
		success: function(data) {	
				if (data.indexOf("<!-- Hosting24 Analytics Code -->")>0)
					data = data.substring(0, data.indexOf("<!-- Hosting24 Analytics Code -->"));
				data = JSON.parse(data);
				num_count = parseInt(data['count']);
				num_page = parseInt(num_count/30);
				alert(num_count);
				alert(num_page);
				if (num_count % 30 > 0)
					num_page++;
				if (num_page > 1){
					if (num_page < 2){
						$('#page3').hide();
					}
					$('#page').show();
				}				
				return num_page;
			},
		error: function (xhr, ajaxOptions, thrownError) {			
			thongbao('Mạng có vấn đề, vui lòng thử lại!');
			return 0;
		} 
	});
}