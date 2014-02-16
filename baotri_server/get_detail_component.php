<?php
	if ((isset($_GET['type'])) && (isset($_GET['ms']))) {
		include('connect_db.php');
		if ($_GET['type'] == 1) {
			$res = $mysqli->query("SELECT LoaiTB, ViTri, TrangThai, KieuDang,
										 HangSX, NuocSX, LoSX, NamSX, ThoiGianBatDauSD
									FROM tablethietbi
									WHERE MaTB ='".$_GET['ms']."'");
			$res->data_seek(0);
			while ($row = $res->fetch_assoc()) {
				echo json_encode(array('noidat'=>$row['ViTri'],'trangthai'=>$row['TrangThai'],'loaitb'=>$row['LoaiTB'],
									'kieudang'=>$row['KieuDang'],'hangsx'=>$row['HangSX'],'nuocsx'=>$row['NuocSX'],
									'losx'=>$row['LoSX'],
									'namsx'=>$row['NamSX'],'thoigiansd'=>$row['ThoiGianBatDauSD']));					
			}
			mysqli_free_result($res);
		} else if ($_GET['type'] == 3) {
			$res = $mysqli->query("SELECT ThoiGianBaoTri, Level
									FROM tableloaichitiet
									WHERE MaSo = '".$_GET['ms']."'");
			$res->data_seek(0);
			while ($row = $res->fetch_assoc()) {
				echo json_encode(array('thoigianbaotri'=>$row['ThoiGianBaoTri'],'level'=>$row['Level']));
			}
			mysqli_free_result($res);
		}
		mysqli_close($mysqli);
	}
?>