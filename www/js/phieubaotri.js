function get_phieubaotri(i){
	var link = link_server + "get_phieubaotri.php";
	var dataString = 'giaidoan='+i;
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
					s = s + '<li data-ms="' +data[i]['ms'] + '">' + data[i]['ten'] + '</li>';
				}
				$('#dsbb').html(s);
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
function kq_giamsat(i){
	if (i==1) return "Đạt"; else return "Không đạt.";
}
function get_detail_phieubaotri(id,gd,ten){
	var link = link_server + "get_detail_phieubaotri.php";
	var dataString = 'id='+id+'&gd='+gd;
	$.ajax({
		type: "GET",
		url: link,
		data: dataString,
		success: function(data) {	
			if (data.indexOf("<!-- Hosting24 Analytics Code -->")>0)
				data = data.substring(0, data.indexOf("<!-- Hosting24 Analytics Code -->"));
				data = JSON.parse(data);
				var s = '';
				if (gd == 1) {
					s = '<p> <span style="float:left">Người yêu cầu: '+data['nguoiyeucau']+'</span> '+
						'<span style="float:right; margin-right:20px">Ngày yêu cầu:'+ get_Date(date['ngayyeucau'])+'  </span></p>'+
                		'</br><p style="clear:both"> <span style="float:left">Tên thiết bị:'+ ten +'</span>'+ 
						'<span style="float:right; margin-right:20px">Đặt tại: '+data['dattai']+'</span></p></br>'+
                		'<p style="clear:both"> Mã hiệu: '+data['matb']+'</p>'+                
                		'<p><span style="width:190px; display:block; float:left">Tình trạng hư hỏng:</span>'+ 
						'<input type="text" id="tinhtrang" class="input" style="width:60%"/></p>'+
                		'<p> <span style="width:190px; display:block; float:left"> Nguyên nhân hư hỏng:</span>'+ 
						'<input type="text" id="nguyennhan" class="input" style="width:60%"/></p>'+
                		'<p><span style="width:190px; display:block; float:left">Phương án sửa chữa:</span>'+
                		'<textarea type="text" id="phuongan" class="input" style="width:60%; resize:none; height:80px"></textarea></p>'+
                		'<p><span>Người lập phương án:'+localStorage.getItem('ten')+'</span></p>';
				} else if (gd == 2) {
					s = '<p> <span style="float:left">Người yêu cầu: '+data['nguoiyeucau']+'</span> '+
						'<span style="float:right; margin-right:20px">Ngày yêu cầu:'+ get_Date(data['ngayyeucau'])+'  </span></p>'+
                		'</br><p style="clear:both"> <span style="float:left">Tên thiết bị:'+ ten +'</span>'+ 
						'<span style="float:right; margin-right:20px">Đặt tại: '+data['dattai']+'</span></p></br>'+
                		'<p style="clear:both"> Mã hiệu: '+data['matb']+'</p>'+                
                		'<p>Tình trạng hư hỏng: '+data['tinhtranghuhong']+'</p>'+
                		'<p>Nguyên nhân hư hỏng: '+data['nguyennhanhuhong']+'</p>'+
                		'<p>Phương án sửa chữa: '+data['phuongansuachua']+'</p>'+
                		'<p>Người lập phương án: '+data['nguoilapphuongan']+'</p>'+
                		'<p>Ngày lập phương án: '+get_Date(data['ngaylapphuongan'])+'</p>'+
                		'<p>Người duyệt phương án:'+localStorage.getItem('ten')+'</p>';
				} else if (gd == 3) {
					s = '<p> <span style="float:left">Người yêu cầu: '+data['nguoiyeucau']+'</span> '+
						'<span style="float:right; margin-right:20px">Ngày yêu cầu:'+ get_Date(data['ngayyeucau'])+'  </span></p>'+
                		'</br><p style="clear:both"> <span style="float:left">Tên thiết bị:'+ ten +'</span>'+ 
						'<span style="float:right; margin-right:20px">Đặt tại: '+data['dattai']+'</span></p></br>'+
                		'<p style="clear:both"> Mã hiệu: '+data['matb']+'</p>'+                
                		'<p>Tình trạng hư hỏng: '+data['tinhtranghuhong']+'</p>'+
                		'<p>Nguyên nhân hư hỏng: '+data['nguyennhanhuhong']+'</p>'+
                		'<p>Phương án sửa chữa: '+data['phuongansuachua']+'</p>'+
                		'<p>Người lập phương án: '+data['nguoilapphuongan']+'</p>'+
                		'<p>Ngày lập phương án: '+get_Date(data['ngaylapphuongan'])+'</p>'+
                		'<p>Người duyệt phương án:'+data['nguoiduyetphuongan']+'</p>'+
						'<p>Ngày duyệt phương án:'+data['ngayduyetphuongan']+'</p>'+
						'<p style="clear:both"> <span style="float:left">Ngày bắt đầu sửa chữa:'+data['ngaybatdau']+'</span>'+
						'<span style="float:right; margin-right:20px">Người sửa chữa: '+localStorage.getItem('ten')+'</span></p>';
				}  else if (gd == 4) {
					s = '<p> <span style="float:left">Người yêu cầu: '+data['nguoiyeucau']+'</span> '+
						'<span style="float:right; margin-right:20px">Ngày yêu cầu:'+ get_Date(data['ngayyeucau'])+'  </span></p>'+
                		'</br><p style="clear:both"> <span style="float:left">Tên thiết bị:'+ ten +'</span>'+ 
						'<span style="float:right; margin-right:20px">Đặt tại: '+data['dattai']+'</span></p></br>'+
                		'<p style="clear:both"> Mã hiệu: '+data['matb']+'</p>'+                
                		'<p>Tình trạng hư hỏng: '+data['tinhtranghuhong']+'</p>'+
                		'<p>Nguyên nhân hư hỏng: '+data['nguyennhanhuhong']+'</p>'+
                		'<p>Phương án sửa chữa: '+data['phuongansuachua']+'</p>'+
                		'<p>Người lập phương án: '+data['nguoilapphuongan']+'</p>'+
                		'<p>Ngày lập phương án: '+get_Date(data['ngaylapphuongan'])+'</p>'+
                		'<p>Người duyệt phương án:'+data['nguoiduyetphuongan']+'</p>'+
						'<p>Ngày duyệt phương án:'+data['ngayduyetphuongan']+'</p>'+
						'<p style="clear:both"> <span style="float:left">Ngày bắt đầu sửa chữa:'+get_Date(data['ngaybatdau'])+'</span>'+
						'<span style="float:right; margin-right:20px">Người sửa chữa: '+ data['nguoisuachua']+'</span></p>'+
						'<p style="clear:both">Ngày kết thúc sửa chữa:'+ get_Date(data['ngayketthuc']) +'</p>'+
               			'<p><label for="ketqua">Kết quả giám sát: </label> <input type="checkbox" name="ketqua"/> </p>'+
						'<p><span style="float:left">Người giám sát: '+localStorage.getItem('ten')+'</span></p>';
				}  else if (gd == 5) {
					s = '<p> <span style="float:left">Người yêu cầu: '+data['nguoiyeucau']+'</span> '+
						'<span style="float:right; margin-right:20px">Ngày yêu cầu:'+ get_Date(data['ngayyeucau'])+'  </span></p>'+
                		'</br><p style="clear:both"> <span style="float:left">Tên thiết bị:'+ ten +'</span>'+ 
						'<span style="float:right; margin-right:20px">Đặt tại: '+data['dattai']+'</span></p></br>'+
                		'<p style="clear:both"> Mã hiệu: '+data['matb']+'</p>'+                
                		'<p>Tình trạng hư hỏng: '+data['tinhtranghuhong']+'</p>'+
                		'<p>Nguyên nhân hư hỏng: '+data['nguyennhanhuhong']+'</p>'+
                		'<p>Phương án sửa chữa: '+data['phuongansuachua']+'</p>'+
                		'<p>Người lập phương án: '+data['nguoilapphuongan']+'</p>'+
                		'<p>Ngày lập phương án: '+get_Date(data['ngaylapphuongan'])+'</p>'+
                		'<p>Người duyệt phương án:'+data['nguoiduyetphuongan']+'</p>'+
						'<p>Ngày duyệt phương án:'+data['ngayduyetphuongan']+'</p>'+
						'<p style="clear:both"> <span style="float:left">Ngày bắt đầu sửa chữa:'+get_Date(data['ngaybatdau'])+'</span>'+
						'<span style="float:right; margin-right:20px">Người sửa chữa: '+ data['nguoisuachua']+'</span></p>'+
						'<p style="clear:both">Ngày kết thúc sửa chữa:'+ get_Date(data['ngayketthuc']) +'</p>'+
               			'<p>Kết quả giám sát:'+ kq_giamsat(data['dat'])+'</p>'+
						'<p><span style="float:left">Người giám sát: '+data['nguoigiamsat']+'</span></p>'+
						'<p style="clear:both"> <span style="float:left">Người duyệt: '+localStorage.getItem('ten')+'</span>';
				}
				$("#info").html(s);
			},
		error: function (xhr, ajaxOptions, thrownError) {
			thongbao('Mạng có vấn đề, vui lòng thử lại!');
		} 
	});
}