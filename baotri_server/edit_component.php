<?php
	if (isset($_GET['data'])) {
		include('connect_db.php');
		$data = json_decode(stripslashes($_GET['data']),true);
		if ($data['type'] == 1) {
			$res = $mysqli->query("UPDATE tablethietbi 
								   SET LoaiTB ='".$data['loaitb']."', TrangThai = ".$data['trangthai'].",							
								       KieuDang ='".$data['kieudang']."', HangSX ='".$data['hangsx']."', 
								       NuocSX = '".$data['nuocsx']."', LoSX = '".$data['losx']."',
									   NamSX = ".$data['namsx'].", ThoiGianBatDauSD = ".$data['thoigiansd'].",
									   TenTB = '".$data['ten']."', ViTri = '".$data['noidat']."'
								  WHERE MaTB = '".$data['re_ms']."'");
			if ($res) echo json_encode(array('r'=>1)); else echo json_encode(array('r'=>0));
		} else if ($data['type'] == 2) {
			$res = $mysqli->query("UPDATE tableloaithietbi
			                       SET Ten = '".$data['ten']."'
									WHERE MaSo = '".$data['re_ms']."'");
			if ($res) echo json_encode(array('r'=>1)); else echo json_encode(array('r'=>0));
		} else if ($data['type'] == 3) {

			$res = $mysqli->query("UPDATE tableloaichitiet 
								   SET Ten = '".$data['ten']."',
                                                                       MaSo = '".$data['ms']."',
								       ThoiGianBaoTri = '".$data['thoigianbaotri']."',
								       Level = '".$data['level']."',
                                                                       HasChild = '".$data['hasChild']."',
                                                                       TenChiTietCha = '".$data['tenChiTietCha']."'
								   WHERE MaSo = '".$data['re_ms']."'");
			if ($res) echo json_encode(array('r'=>1)); else echo json_encode(array('r'=>0));
		}
		mysqli_close($mysqli);
	}
?>	