function get_thietbi() {
	var link = link_server + "get_thietbi.php";
	$.ajax({
		type: "GET",
		url: link,
		success: function(data) {	
			if (data.indexOf("<!-- Hosting24 Analytics Code -->")>0)
				data = data.substring(0, data.indexOf("<!-- Hosting24 Analytics Code -->"));
				data = JSON.parse(data);
				var s = '';
				for (var i in data) {
					if (data[i]['tt'] == 1)
					s = s + '<li data-ms="' +data[i]['ms'] + '">' + data[i]['ten'] + '</li>';
				}
				$('#dstb_list_1').html(s);
			},
		error: function (xhr, ajaxOptions, thrownError) {
			thongbao('Mạng có vấn đề, vui lòng thử lại!');
		} 
	});
}
function get_Date(i){
	var d = new Date(Number(i));
	return d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear();
}
function get_thietbi_info(ms) {
	var link = link_server + "get_thietbi_info.php";
	var dataString = 'ms=' + ms;
	$.ajax({
		type: "GET",
		url: link,
		data: dataString,
		success: function(data) {	
			if (data.indexOf("<!-- Hosting24 Analytics Code -->")>0)
				data = data.substring(0, data.indexOf("<!-- Hosting24 Analytics Code -->"));
				data = JSON.parse(data);
				$('#vitri').html(data['vitri']);
				$('#ms').html(ms);
				$('#ten').html(data['tentb']);
				$('#loaitb').html(data['loaitb']);
				$('#sodk').html(data['sodk']);
				$('#kieudang').html(data['kieudang']);
				$('#hangsx').html(data['hangsx']);
				$('#nuocsx').html(data['nuocsx']);
				$('#lo').html(data['losx']);
				$('#namsx').html(data['namsx']);
				$('#namsd').html(get_Date(data['namsd']));
				$("#right_top .list_p").show();
				$("#right_top .loading").hide();
				$(".alert_icon").show();
			},
		error: function (xhr, ajaxOptions, thrownError) {
			thongbao('Mạng có vấn đề, vui lòng thử lại!');
		} 
	});
}
function baohu(ms,ten,vitri){
	var link = link_server + "baohu.php";
	var dataString = 'ms=' + ms + '&ten=' + ten + '&vitri=' + vitri + '&nguoiyeucau=' + localStorage.getItem('ten');
	$.ajax({
		type: "GET",
		url: link,
		data: dataString,
		success: function(data) {	
			if (data.indexOf("<!-- Hosting24 Analytics Code -->")>0)
				data = data.substring(0, data.indexOf("<!-- Hosting24 Analytics Code -->"));
				data = JSON.parse(data);
				if (data['r'] == 1) {
					$("#right_top .list_p").hide();
					thongbao('Báo hư thành công');
					get_thietbi();	
				} else thongbao('Báo hư thất bại');
				
			},
		error: function (xhr, ajaxOptions, thrownError) {
			thongbao('Mạng có vấn đề, vui lòng thử lại!');
		} 
	});
}