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
					s = s + '<li data-ms="' +data[i]['ms'] + '">' + data[i]['ten'] + '</li>';
				}
				$('#dstb_list_1').html(s);
			},
		error: function (xhr, ajaxOptions, thrownError) {
			thongbao('Mạng có vấn đề, vui lòng thử lại!');
		} 
	});
}
function get_chitiet_baotri(ms){
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
				var s = '';
				for (var i in data) { 
						if ((data[i]['level'] == 1) || (data[i]['level'] == 0)) {
							lv1 = data[i]['ms'];
							s = s + '<li data-ms="' +data[i]['ms'] + '" data-T="' +data[i]['T'] +'">' 
							+ data[i]['ten'] + '</li>'; 
						} else 
						if (data[i]['level'] == 2) {
							lv2 = data[i]['ms'];
							s = s + '<li data-ms="' +data[i]['ms'] + '" class="lv2" data-T="' +data[i]['T']+ '">' 
							+ data[i]['ten'] + '</li>'; 
						}else
							s = s + '<li data-ms="' +data[i]['ms'] + '" class="lv3" data-T="' +data[i]['T']+ '">' 
							+ data[i]['ten'] + '</li>'; 
				}
				$('#dstb_list_2').html(s);
			},
		error: function (xhr, ajaxOptions, thrownError) {
			thongbao('Mạng có vấn đề, vui lòng thử lại!');
		} 
	});
}
function get_info_baotri(){

}