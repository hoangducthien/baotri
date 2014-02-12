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
				$('#ttbt .loading').hide();
				$('.add_icon').show();
			},
		error: function (xhr, ajaxOptions, thrownError) {
			thongbao('Mạng có vấn đề, vui lòng thử lại!');
		} 
	});
}
