var title = [['Mã thiết bị', 'Tên thiết bị', 'Nơi đặt','Loại thiết bị', 'Trạng thái', 'Kiểu dáng', 'Hãng sản xuất', 'Nước sản xuất', 
			'Lô sản xuất', 'Năm sản xuất', 'Thời gian bắt đầu sử dụng'], ['Mã loại thiết bị', 'Tên thiết bị'],['Mã loại chi tiết', 
			'Tên chi tiết', 'Level', 'Có chứa chi tiết con', '24h', '50h', '500h', '1500h', '2500h', '5000h', '6000h', '12000h', 'BD Mùa', 'Thuộc loại chi tiết', 'Thuộc loại thiết bị']];										
			
var id_t = [['ms','ten','noidat','loaitb','trangthai','kieudang','hangsx','nuocsx','losx','namsx','thoigiansd'],
			['ms','ten'],['ms','ten', 'level', 'hasChild', '24h', '50h', '500h', '1500h', '2500h', '5000h', '6000h', '12000h', 'BDMua', 'thuocloaict','tb']];

var currentID, mode, state, num_count, num_page, currentMS, currentName, left, right, dl_currentPage, currentPage = 1;;
var work = ['NULL', 'I', 'I1', 'L', 'R'];
var hasChild = ['Không', 'Có'];
var statusText = ["Ngừng hoạt động", "Hoạt động"];
var statusID = ['0', '1'];
var devicesTypeName = new Array();
var devicesTypeID = new Array();
var detailsTypeName = new Array();
var detailsTypeID = new Array();

function getColumn(title, content, id, num){
	var s;
	if (id == "thoigiansd"){
		s = '<div class="column_item"><div class="column_header decorate_text">' + title + '</div>'+
			'<div class="column_content" style="display:none" data-s="'+id+'">' + content + '</div>'+
			'<div class="column_edit"><input type="text" id="'+id+'" value="' + content + '"></div></div>';
	} else {
		if (num != 0 || mode == 'add'){
			s = '<div class="column_item"><div class="column_header decorate_text">' + title + '</div>'+
			'<div class="column_content" style="display:none" data-s="'+id+'">' + content + '</div>'+
			'<div class="column_edit"><textarea style="resize:none" id="'+id+'">' + content + '</textarea></div></div>';
		} else {
			s = '<div class="column_item"><div class="column_header decorate_text">' + title + '</div>'+
			'<div class="column_content" style="display:none" data-s="'+id+'">' + content + '</div>'+
			'<div class="column_edit"><textarea style="resize:none" id="'+id+'" disabled>' + content + '</textarea></div></div>';		
		}
	}
	return s;
}

function getColumn2(title, content, id, num){	
	var s;
	if (id == "thoigiansd"){
		s = '<div class="column_item"><div class="column_header decorate_text">' + title + '</div>'+
			'<div class="column_content" data-s="'+id+'">' + content + '</div>'+
			'<div class="column_edit" style="display:none"><input type="text" id="'+id+'" value="' + content + '"></div></div>';
	} else {
		if (num != 0 || mode == 'add'){
			s = '<div class="column_item"><div class="column_header decorate_text">' + title + '</div>'+
			'<div class="column_content" data-s="'+id+'">' + content + '</div>'+
			'<div class="column_edit"  style="display:none"><textarea style="resize:none" id="'+id+'">' + content + '</textarea></div></div>';
		} else {
			s = '<div class="column_item"><div class="column_header decorate_text">' + title + '</div>'+
			'<div class="column_content" data-s="'+id+'">' + content + '</div>'+
			'<div class="column_edit"  style="display:none"><textarea style="resize:none" id="'+id+'" disabled>' + content + '</textarea></div></div>';
		}
	}
	return s;
}

function getSelectList(array1, array2, value, id){	
	var s = "<ul id='"+id+"' class='selectable_list'>";	
	for (j = 0; j < array1.length; j++){		
		if ((value == "" && j == 0) || (value == array2[j])){			
			s += "<li id='"+array2[j]+"' class='selected_li'>"+ array1[j] +"</li>";			
		} else {
			s += "<li id='"+array2[j]+"'>"+ array1[j] +"</li>";
		}
	}
	s += "</ul>";
	return s;
}

function getColumnWithList(name, array1, array2, pos, id){
	var value = array1[pos];
	var content_id = array2[pos];
	var list = getSelectList(array1, array2, content_id, id);	
	var s = '<div class="column_item"><div class="column_header decorate_text">' + name + '</div>'+
			'<div class="column_content" style="display:none" data-s="'+id+'" id="'+content_id+'">' + value + '</div>'+
			'<div class="column_edit">' + list + '</div></div>';
	
	return s;
}

function getColumnWithList2(name, array1, array2, pos, id){
	var value = array1[pos];
	var content_id = array2[pos];
	var list = getSelectList(array1, array2, content_id, id);
	var s = '<div class="column_item"><div class="column_header decorate_text">' + name + '</div>'+
			'<div class="column_content" data-s="'+id+'" id="'+content_id+'">' + value + '</div>'+
			'<div class="column_edit"  style="display:none">' + list + '</div></div>';		
	return s;
}

function getColumnWithButton(name, id){
		
	var s = '<div class="column_item"><div class="column_header decorate_text">' + name + '</div>'+
			'<div class="column_content" style="display:none" data-s="'+id+'" > </div>'+
			'<div class="column_edit"> <p class="select_detail" onclick="showDialog(event)"> Chọn loại chi tiết </p></div></div>';
	
	return s;
}

function getColumnWithButton2(name, id){
		
	var s = '<div class="column_item"><div class="column_header decorate_text">' + name + '</div>'+
			'<div class="column_content" data-s="'+id+'" > </div>'+
			'<div class="column_edit" style="display:none"> <p class="select_detail" onclick="showDialog(event)"> Chọn loại chi tiết </p></div></div>';
	
	return s;
}

function getTable(k){
	var s = '';
	
	for (i = 0; i< title[k].length; i++){
		if (mode == 'add') {			
			if ((k == 0 && i == 3) || (k == 2 && i == 14)){				
				s += getColumnWithList(title[k][i], devicesTypeName, devicesTypeID, 0, id_t[k][i]);
			} else if (k == 2 && i > 3 && i < 13){
				s += getColumnWithList(title[k][i], work, work, 0, id_t[k][i]);
			} else if (k == 2 && i == 3){
				s += getColumnWithList(title[k][i], hasChild, statusID, 0, id_t[k][i]);
			}  else if (k == 0 && i == 4){
				s += getColumnWithList(title[k][i], statusText, statusID, 0, id_t[k][i]);
			} else if (k == 2 && i == 13){
				s += getColumnWithButton(title[k][i], id_t[k][i]);
			} else {
				s += getColumn(title[k][i], '',id_t[k][i], i); 
			}
		}
		else if (mode == 'edit') {
			if ((k == 0 && i == 3) || (k == 2 && i == 14)){				
				s += getColumnWithList2(title[k][i], devicesTypeName, devicesTypeID, 0, id_t[k][i]);
			}  else if (k == 0 && i == 4){
				s += getColumnWithList2(title[k][i], statusText, statusID, 0, id_t[k][i]);
			}else if (k == 2 && i == 3){
				s += getColumnWithList2(title[k][i], hasChild, statusID, 0, id_t[k][i]);
			} else if (k == 2 && i == 13){
				s += getColumnWithButton2(title[k][i], id_t[k][i]);
			} else if (k == 2 && i > 3 && i < 13){
				s += getColumnWithList2(title[k][i], work, work, 0, id_t[k][i]);
			} else {
				s += getColumn2(title[k][i], '',id_t[k][i], i); 
			}
		}
	}
	return s;
}

function check_date(s){
	if (s == "") return true;
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
	if (s == '') return 0;
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
		if ($('#ms').val() == '') return 'Mã số'; 
		if ($('#ten').val() == '') return 'Tên'; 								
		else {
			if (!check_date($('#thoigiansd').val())) return 'Thời gian sử dụng';
		}
	} else if (currentID == 2) {
		if ($('#ms').val() == '') return 'Mã số'; 
		if ($('#ten').val() == '') return 'Tên'; 
	} else if (currentID == 3) {
		if ($('#ms').val() == '') return 'Mã số'; 
		if ($('#ten').val() == '') return 'Tên'; 
		if ($('#thoigianbaotri').val() == '') return 'Thời gian bảo trì'; 				
		if ($('#level').val() == '') return 'Level'; 
	}
	return "";
}

function add() {
	$('.mainloading').show();
	$('#left').hide();
	$('#right').hide();
	var dataString = {};
	if (currentID == 1) {
		dataString['ms'] = $('#ms').val(); 
		dataString['ten'] = $('#ten').val(); 
		dataString['noidat'] = $('#noidat').val();
		dataString['loaitb'] = $('[data-s="loaitb"]').attr('id');
		dataString['trangthai'] = $('[data-s="trangthai"]').attr('id');
		dataString['kieudang'] = $('#kieudang').val(); 
		dataString['hangsx'] = $('#hangsx').val(); 
		dataString['nuocsx'] = $('#nuocsx').val(); 
		dataString['losx'] = $('#losx').val(); 
		dataString['namsx'] = $('#namsx').val(); 
		dataString['thoigiansd'] = get_Time($('#thoigiansd').val()); 
		
		$('.column_content[data-s="ms"]').html($('#ms').val());
		$('[data-s="ten"]').html($('#ten').val());
		$('[data-s="noidat"]').html($('#noidat').val());				
		$('[data-s="kieudang"]').html($('#kieudang').val());
		$('[data-s="hangsx"]').html($('#hangsx').val());
		$('[data-s="nuocsx"]').html($('#nuocsx').val());
		$('[data-s="losx"]').html($('#losx').val());
		$('[data-s="namsx"]').html($('#namsx').val());
		$('[data-s="thoigiansd"]').html($('#thoigiansd').val());
		
	} else if (currentID == 2) {
		dataString['ms'] = $('#ms').val(); 
		dataString['ten'] = $('#ten').val(); 
		
		$('.column_content[data-s="ms"]').html($('#ms').val());
		$('[data-s="ten"]').html($('#ten').val());
	} else if (currentID == 3) {
		
		dataString['tb'] = $('[data-s="tb"]').attr('id');
		var ss = $('[data-s="thuocloaict"]').attr('id');

		if (ss == "" || typeof ss == "undefined"){
			dataString['ms'] = dataString['tb'] + "." + $('#ms').val(); 
		} else {
			dataString['ms'] = ss + "." + $('#ms').val();
		}
		
		dataString['ten'] = $('#ten').val();
		dataString['hasChild'] = $('[data-s="hasChild"]').attr("id");
		
		dataString['thoigianbaotri'] = "";
		
		dataString['tenChiTietCha'] = $('[data-s="thuocloaict"]').html();
		if ($(".column_content").eq(4).html() != "NULL"){
			dataString['thoigianbaotri'] = $(".column_content").eq(4).html();
		}	

		for (d = 5; d < 13; d++){							
			dataString['thoigianbaotri'] += ",";
			if ($(".column_content").eq(d).html() != "NULL"){
				dataString['thoigianbaotri'] += $(".column_content").eq(d).html();
			}
		} 
		 
		dataString['level'] = $('#level').val();		
		
		$('.column_content[data-s="ms"]').html($('#ms').val());
		$('[data-s="ten"]').html($('#ten').val());		
		$('[data-s="level"]').html($('#level').val());
	}
	dataString['type'] = currentID;
	var jsonString = JSON.stringify(dataString);	
	link = link_server + "add_component.php";
	$.ajax({
		type: "GET",
		url: link,
		data: {data:jsonString},
		success: function(data) {	
				$('.mainloading').hide();
				$('#left').show();
				$('#right').show();
				if (data.indexOf("<!-- Hosting24 Analytics Code -->")>0)
					data = data.substring(0, data.indexOf("<!-- Hosting24 Analytics Code -->"));
				data = JSON.parse(data);
				if (data['r'] == 1){
					 thongbao('Thao tác thành công.');
					 $("#"+currentID).click();
				} else thongbao('Thao tác thất bại.\n Vui lòng kiểm tra thông tin đã nhập.');				
			},
		error: function (xhr, ajaxOptions, thrownError) {
			$('.mainloading').hide();
			$('#left').show();
			$('#right').show();
			thongbao('Mạng có vấn đề, vui lòng thử lại!');
		} 
	});
}



function getListDevicesType(){	
	
	var dataString = 'type=2&page='+1;
		link = link_server + "get_list_component.php";	
	$.ajax({
		type: "GET",
		url: link,
		data: dataString,
		success: function(data) {
				
				if (data.indexOf("<!-- Hosting24 Analytics Code -->")>0)
					data = data.substring(0, data.indexOf("<!-- Hosting24 Analytics Code -->"));
				data = JSON.parse(data);
				
				for (var i in data) {
					devicesTypeName.push(data[i]['ten']);
					devicesTypeID.push(data[i]['ms']);					
				}
				if (mode == "add"){
					showAdd();
				} else {
					if (currentID == 1){
						if ($(".column_content[data-s='ms']").html()!=""){ 
							$('#column').show();
							$('#right .loading').hide();
							$('.cross_icon').show();
							$('.edit_icon').show();
						} else {
							
							var id = $('[data-s="loaitb"]').attr('id');
							var index = devicesTypeID.indexOf(id);
							if (index > -1){
								$('[data-s="loaitb"]').html(devicesTypeName[index]);
							}
							$('#loaitb').parent().html(getSelectList(devicesTypeName, devicesTypeID, id, "loaitb"));
						}
					} else if (currentID == 3){
							
							$('#column').show();
							$('#right .loading').hide();
							$('.cross_icon').show();
							$('.edit_icon').show();
						
							var id = $('[data-s="tb"]').attr('id');

							var index = devicesTypeID.indexOf(id);
							if (index > -1){
								$('[data-s="tb"]').html(devicesTypeName[index]);
							}
							$('#tb').parent().html(getSelectList(devicesTypeName, devicesTypeID, id, "tb"));

					}
				}
				$(".selectable_list li").on('click', function(){
					$(this).parent().children().removeClass('selected_li');
					$(this).addClass('selected_li');	
					var id = $(this).parent().attr('id');
					$("[data-s='"+id+"']").html($(this).html());
					$("[data-s='"+id+"']").attr('id', $(this).attr('id'));
				});
			},
		error: function (xhr, ajaxOptions, thrownError) {
			$('#right .loading').hide();
			thongbao('Mạng có vấn đề, vui lòng thử lại!');
		} 
	});
}

function showAdd(){
	
	$('#column').show();
	$('#right .loading').hide();
	$('.cross_icon').show();
	$('.edit_icon').show();
	$('.edit_icon').addClass('checked');
	$('.edit_icon').show();	
	$('.column').show();			
	$('.column').html(getTable(currentID-1));
	$(".column_item").css("width", right/5 - 1);
	$(".selectable_list").css("width", right/5 - 5);	
	$(".select_detail").css("width", right/5 - 5);		
	$(".column_header").css("width", right/5 - 23);
	$(".column_content").css("width", right/5 - 14.5);
	$(".column_edit textarea").css("width", right/5 - 14.5);	
	$(".column_edit input").css("width", right/5 - 14.5);	
	$(".selectable_list li").on('click', function(){
		$(this).parent().children().removeClass('selected_li');
		$(this).addClass('selected_li');	
		var id = $(this).parent().attr('id');
		$("[data-s='"+id+"']").html($(this).html());
		$("[data-s='"+id+"']").attr('id', $(this).attr('id'));
	});
	$( "#thoigiansd" ).datepicker({ dateFormat: 'dd/mm/yy' });
}

function deleteDevicesType(){
	$(".select_detail").html("Chọn loại chi tiết");
	$("[data-s='thuocloaict']").attr('id', "");
	$("[data-s='thuocloaict']").html("");
	dismissDialog($('#container'));
}

function showDialog(e){
	e.stopPropagation();
	dl_currentPage = 1;	
	var dialog = '<div id="dialog_list"><div class="loading" style="width:300px; height:350px"><img src="images/ajax-loader.gif" /></div><ul class="liststyle" style="overflow: auto; display:none; width:300px; height:350px"></ul> </div>';
	dialog += "<div id='dl_page' > <a id='dl_first'>First</a> <a id='dl_pre'> <img src='img/cate_image_pg_back.png' /> </a><a class='selected_color page_num' id='dl_page1'> 1 </a> <a class='page_num' id='dl_page2'> 2 </a> <a class='page_num' id='dl_page3'> 3 </a><a id='dl_next'> <img src='img/cate_image_pg_next.png' /> </a><a id='dl_last'> Last </a></div>"
	dialog += '<div style="text-align:center"><input type="button" value="Xóa" class="button" onclick="deleteDevicesType()"></div>';
	popupDialog('Loại chi tiết', 300, 470, dialog);
	if (num_page < 1){		
		$('#dl_page').hide();
	}
	get_list_component_for_popup(1);
	$('#dl_first').on('click', function(){
				setPage(1);			
			});	
			
			$('#dl_pre').on('click', function(){
				dl_setPage(dl_currentPage - 1);			
			});
			
			$('#dl_next').on('click', function(){
				dl_setPage(dl_currentPage + 1);			
			});
			
			$('#dl_last').on('click', function(){
				dl_setPage(num_page);
			});
			
			$('#dl_page .page_num').on('click', function(){				
				dl_setPage(parseInt($(this).html()));			
			});								
	$("#container").on('click', function () {
		dismissDialog(this);
	});									
}
	function dl_setPage(page){
				dl_setPage(page, false);
			}
	
	function dl_setPage(page, check){
		
				if ((dl_currentPage != page && page > 0 && page <= num_page) || check){
					dl_currentPage = page;					
					get_list_component_for_popup(dl_currentPage);					
					var firstPage = dl_currentPage - 1;
					if (firstPage > 0){
						$('#dl_page .page_num').each(function() {
                            $(this).html(firstPage);
							$(this).removeClass('selected_color');
							firstPage++;							
                        });
						$('#dl_page2').addClass('selected_color');
					} else {
						$('#dl_page .page_num').each(function() {
                            $(this).html(firstPage+1);
							$(this).removeClass('selected_color');
							firstPage++;							
                        });
						$('#dl_page1').addClass('selected_color');
					}
					if (dl_currentPage == num_page){
						$('#dl_page3').hide();
					} else if (num_page > 2){
						$('#page3').show();
					}
				}	
			}
function get_list_component(page) {
	if (currentID == 2){						
		devicesTypeName.length = 0;
		devicesTypeID.length = 0;
	}
	$('#left .loading').show();
	$('#ds_comp').hide();	
	$('.column').html('');
	$('.edit_icon').removeClass('checked');
	$('.edit_icon').hide();
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

function get_list_component_for_popup(page) {
	$('#dialog_list ul').html("");
	$('#dialog_list ul').hide();
	$('#dialog_list .loading').show();
	var dataString = 'type=3&page='+page;
		link = link_server + "get_list_component.php";	
	$.ajax({
		type: "GET",
		url: link,
		data: dataString,
		success: function(data) {
				$('#dialog_list ul').show();
				$('#dialog_list .loading').hide();
				if (data.indexOf("<!-- Hosting24 Analytics Code -->")>0)
					data = data.substring(0, data.indexOf("<!-- Hosting24 Analytics Code -->"));
				data = JSON.parse(data);
				var s = '';
				for (var i in data) {
					s += '<li data-ms="'+data[i]['ms']+'">'+data[i]['ten']+'</li>';					
				}
				$('#dialog_list ul').html(s);
				$("#dialog_list li").on('click', function(){								
					$(".select_detail").html($(this).html());
					$("[data-s='thuocloaict']").attr('id', $(this).attr('data-ms'));
					$("[data-s='thuocloaict']").html($(this).html());
					dismissDialog($('#container'));
				});
			},
		error: function (xhr, ajaxOptions, thrownError) {
			$('#dialog_list ul').show();
			$('#dialog_list .loading').hide();
			thongbao('Mạng có vấn đề, vui lòng thử lại!');
		} 
	});
}

function get_detail_component(ms, ten) {
	if (currentID == 2) {
		$('#ms').val(ms); 
		$('#ten').val(ten); 
					
		$('.column_content[data-s="ms"]').html(ms);
		$('[data-s="ten"]').html(ten);
		$('#column').show();
		$('#right .loading').hide();
		$('.cross_icon').show();
		$('.edit_icon').show();	
	} else {
		if (devicesTypeName.length < 1){
			getListDevicesType();
		}
		$('#column').hide();
		$('#right .loading').show();
		$('.cross_icon').hide();
		$('.edit_icon').hide();		
		var dataString = 'ms='+ms+'&type='+currentID;
			link = link_server + "get_detail_component.php";	
		$.ajax({
			type: "GET",
			url: link,
			data: dataString,
			success: function(data) {
					if (devicesTypeName.length > 0){ 
						$('#column').show();
						$('#right .loading').hide();
						$('.cross_icon').show();
						$('.edit_icon').show();						
					}
					if (data.indexOf("<!-- Hosting24 Analytics Code -->")>0)
						data = data.substring(0, data.indexOf("<!-- Hosting24 Analytics Code -->"));
					data = JSON.parse(data);
					var s = '';
					if (currentID == 1) {
						$('#ms').val(ms); 
						$('#ten').val(ten); 
						$('#noidat').val(data['noidat']);						
						$('#loaitb').parent().html(getSelectList(devicesTypeName, devicesTypeID, data['loaitb'], "loaitb")); 						
						$('#trangthai').parent().html(getSelectList(statusText, statusID, data['trangthai'], "trangthai")); 						
						$('#kieudang').val(data['kieudang']); 
						$('#hangsx').val(data['hangsx']); 
						$('#nuocsx').val(data['nuocsx']); 
						$('#losx').val(data['losx']); 
						$('#namsx').val(data['namsx']);
						var date = new Date(parseInt(data['thoigiansd'])); 
							s_date = date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();
						$('#thoigiansd').val(s_date); 
						
						$('.column_content[data-s="ms"]').html(ms);
						$('[data-s="ten"]').html(ten);
						$('[data-s="noidat"]').html(data['noidat']);
						$('[data-s="loaitb"]').attr('id', data['loaitb']);
						var index = devicesTypeID.indexOf(data['loaitb']);
						if (index > -1){
							$('[data-s="loaitb"]').html(devicesTypeName[index]);
						}
						
						$('[data-s="trangthai"]').attr('id', data['trangthai']);
						var index2 = statusID.indexOf(data['trangthai']);						
						if (index2 > -1){
							$('[data-s="trangthai"]').html(statusText[index2]);
						}
												
						$('[data-s="kieudang"]').html(data['kieudang']);
						$('[data-s="hangsx"]').html(data['hangsx']);
						$('[data-s="nuocsx"]').html(data['nuocsx']);
						$('[data-s="losx"]').html(data['losx']);
						$('[data-s="namsx"]').html(data['namsx']);
						$('[data-s="thoigiansd"]').html(s_date);
						
					} else if (currentID == 3) {						
						$('.column_content[data-s="ms"]').html(ms.substring(ms.lastIndexOf('.') + 1,ms.length));
						$('#ten').val(ten); 
						$('#ms').val(ms.substring(ms.lastIndexOf('.') + 1,ms.length));
						
						
						var arr = data['thoigianbaotri'].split(",");																		
						$('#hasChild').parent().html(getSelectList(hasChild, statusID, data['hasChild'], "hasChild"));
						if (data['tenChiTietCha'] != ""){ 	
							$('.select_detail').html(data['tenChiTietCha']);
						} else {
							$('.select_detail').html("Chọn loại chi tiết");
						}
						$('#level').val(data['level']);
						var idDevices = ms.substring(0,ms.indexOf('.'));

						$('#tb').parent().html(getSelectList(devicesTypeName, devicesTypeID, idDevices, "tb"));
						
						$('[data-s="hasChild"]').attr('id', data['hasChild']);
						var index2 = statusID.indexOf(data['hasChild']);						
						if (index2 > -1){
							$('[data-s="hasChild"]').html(hasChild[index2]);
						}
												
						$('[data-s="ten"]').html(ten);
						
						$('[data-s="thuocloaict"]').html(data['tenChiTietCha']);
						if (data['tenChiTietCha'] != ""){
							$('[data-s="thuocloaict"]').attr('id', ms.substring(0, ms.lastIndexOf('.')));												
						}
						for (d = 0; d < arr.length; d++){							
							$(".column_content").eq(d+4).html(arr[d]);														
							$(".column_content").eq(d+4).attr('id', arr[d]);
							$(".column_edit").eq(d+4).html(getSelectList(work, work, arr[d], id_t[2][d+4]));
						}
						
						if (data['hasChild'] == 1){
							$('.column_content[data-s="hasChild"]').html(hasChild[1]);
							$('.column_content[data-s="hasChild"]').attr('id', '1');
						} else{
							$('.column_content[data-s="hasChild"]').html(hasChild[0]);
							$('.column_content[data-s="hasChild"]').attr('id', '0');
						}
						$('[data-s="level"]').html(data['level']);
						$('[data-s="tb"]').attr('id', idDevices);

						var index = devicesTypeID.indexOf(idDevices);
						if (index > -1){
							$('[data-s="tb"]').html(devicesTypeName[index]);
						}
						
					}
					$(".selectable_list").css("width", right/5 - 5);	
					$(".selectable_list li").on('click', function(){
						$(this).parent().children().removeClass('selected_li');
						$(this).addClass('selected_li');	
						var id = $(this).parent().attr('id');
						$("[data-s='"+id+"']").html($(this).html());
						$("[data-s='"+id+"']").attr('id', $(this).attr('id'));
					});
				},
			error: function (xhr, ajaxOptions, thrownError) {
				$('#right .loading').hide();
				thongbao('Mạng có vấn đề, vui lòng thử lại!');
			} 
		});
	}
}

function get_count_component() {
	$("#page").hide();
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
				if (num_count % 30 > 0)
					num_page++;
				if (num_page > 1){
					if (num_page < 2){
						$('#page3').hide();
						$('#dl_page3').hide();
					}
					$('#page').show();
					$('#dl_page').show();
				}				
				return num_page;
			},
		error: function (xhr, ajaxOptions, thrownError) {			
			thongbao('Mạng có vấn đề, vui lòng thử lại!');
			return 0;
		} 
	});
}

function update(){	
	$('.mainloading').show();
	$('#left').hide();
	$('#right').hide();
	var dataString = {};
	dataString['re_ms'] = currentMS;
	if (currentID == 1) {
		dataString['ms'] = $('#ms').val(); 
		dataString['ten'] = $('#ten').val(); 
		dataString['noidat'] = $('#noidat').val();
		dataString['loaitb'] = $('[data-s="loaitb"]').attr('id');
		dataString['trangthai'] = $('[data-s="trangthai"]').attr('id');
		dataString['kieudang'] = $('#kieudang').val(); 
		dataString['hangsx'] = $('#hangsx').val(); 
		dataString['nuocsx'] = $('#nuocsx').val(); 
		dataString['losx'] = $('#losx').val(); 
		dataString['namsx'] = $('#namsx').val(); 
		dataString['thoigiansd'] = get_Time($('#thoigiansd').val()); 
		
		$('.column_content[data-s="ms"]').html($('#ms').val());
		$('[data-s="ten"]').html($('#ten').val());
		$('[data-s="noidat"]').html($('#noidat').val());
				
		$('[data-s="kieudang"]').html($('#kieudang').val());
		$('[data-s="hangsx"]').html($('#hangsx').val());
		$('[data-s="nuocsx"]').html($('#nuocsx').val());
		$('[data-s="losx"]').html($('#losx').val());
		$('[data-s="namsx"]').html($('#namsx').val());
		$('[data-s="thoigiansd"]').html($('#thoigiansd').val());
		
	} else if (currentID == 2) {
		dataString['ms'] = $('#ms').val(); 
		dataString['ten'] = $('#ten').val(); 
		
		$('.column_content[data-s="ms"]').html($('#ms').val());
		$('[data-s="ten"]').html($('#ten').val());
	} else if (currentID == 3) {
		
		dataString['tb'] = $('[data-s="tb"]').attr('id');
		var index = devicesTypeID.indexOf(dataString['tb']);
			if (index > -1){
				dataString['ten_tb'] = devicesTypeName[index];
		}
		var ss = $('[data-s="thuocloaict"]').attr('id');
		if (ss == "" || typeof ss == "undefined"){
			dataString['ms'] = dataString['tb'] + "." + $('#ms').val(); 
		} else {
			dataString['ms'] = ss + "." + $('#ms').val();
		}
		
		dataString['ten'] = $('#ten').val();
		dataString['hasChild'] = $('[data-s="hasChild"]').attr("id");
		
		dataString['tenChiTietCha'] = $('[data-s="thuocloaict"]').html();
		
		dataString['thoigianbaotri'] = "";
			
		if ($(".column_content").eq(4).html() != "NULL"){
			dataString['thoigianbaotri'] = $(".column_content").eq(4).html();
		}

		for (d = 5; d < 13; d++){							
			dataString['thoigianbaotri'] += ",";
			if ($(".column_content").eq(d).html() != "NULL"){
				dataString['thoigianbaotri'] += $(".column_content").eq(d).html();
			}
		} 
		 
		dataString['level'] = $('#level').val();		
		
		$('.column_content[data-s="ms"]').html($('#ms').val());
		$('[data-s="ten"]').html($('#ten').val());		
		$('[data-s="level"]').html($('#level').val());
		
	}
	dataString['type'] = currentID;
	var jsonString = JSON.stringify(dataString);
	link = link_server + "edit_component.php";	
	$.ajax({
		type: "GET",
		url: link,
		data: {data:jsonString},
		success: function(data) {						
				$('.mainloading').hide();
				$('#left').show();
				$('#right').show();
				$('.edit_icon').removeClass("checked");
				$(".column_content").show();
				$(".column_edit").hide();
				if (data.indexOf("<!-- Hosting24 Analytics Code -->")>0)
					data = data.substring(0, data.indexOf("<!-- Hosting24 Analytics Code -->"));
				data = JSON.parse(data);
				if (data['r'] == 1){ 
					thongbao('Thao tác thành công.'); 
					$("#"+currentID).click();
				}
				else 
					thongbao('Thao tác thất bại.\n Vui lòng kiểm tra thông tin đã nhập.');							
			},
		error: function (xhr, ajaxOptions, thrownError) {
			$('.mainloading').hide();
			$('#left').show();
			$('#right').show();
			thongbao('Mạng có vấn đề, vui lòng thử lại!');
		} 
	});
}

function Xoa(){
	$('.mainloading').show();
	$('#left').hide();
	$('#right').hide();	
	dismissDialog($('#container'));
	var dataString = 'ms='+currentMS+'&type='+currentID;
		link = link_server + "delete_component.php";	
	$.ajax({
		type: "GET",
		url: link,
		data: dataString,
		success: function(data) {
				$('.mainloading').hide();
				$('#left').show();
				$('#right').show();
				$('#'+currentID).click();					
				if (data.indexOf("<!-- Hosting24 Analytics Code -->")>0)
					data = data.substring(0, data.indexOf("<!-- Hosting24 Analytics Code -->"));
				data = JSON.parse(data);
				if (data['r'] == 1) 
					thongbao('Thao tác thành công.'); 
				else 
					thongbao('Thao tác thất bại.');		
					
			},
		error: function (xhr, ajaxOptions, thrownError) {
			$('.mainloading').hide();
			$('#left').show();
			$('#right').show();
			thongbao('Mạng có vấn đề, vui lòng thử lại!');
		} 
	});
}