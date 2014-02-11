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
				$("#right_top .list_p").show();
				$("#right_top .loading").hide();
				$(".alert_icon").show();
			},
		error: function (xhr, ajaxOptions, thrownError) {
			thongbao('Mạng có vấn đề, vui lòng thử lại!');
		} 
	});
}