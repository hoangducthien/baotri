<?php
	if (isset($_GET['ms'])) {
	include('connect_db.php');
	$res = $mysqli->query("SELECT tablethietbi.ViTri, tablethietbi.TenTB, tablethietbi.SoDangKy,
								  tablethietbi.KieuDang, tablethietbi.HangSX, tablethietbi.NuocSX,
								  tablethietbi.LoSX, tablethietbi.NamSX, tablethietbi.ThoiGianBatDauSD,
								  tableloaithietbi.Ten  
						   FROM tablethietbi inner join tableloaithietbi
						   ON tablethietbi.LoaiTB = tableloaithietbi.MaSo
						   WHERE tablethietbi.MaTB = '".$_GET['ms']."'");
	$res->data_seek(0);
	$array = array();
	while ($row = $res->fetch_assoc()) {
		echo json_encode(array('vitri'=>$row['ViTri'],'tentb'=>$row['TenTB'],'sodk'=>$row['SoDangKy'],
								'kieudang'=>$row['KieuDang'],'hangsx'=>$row['HangSX'],'nuocsx'=>$row['NuocSX'],
								'losx'=>$row['LoSX'],'namsx'=>$row['NamSX'],'namsd'=>$row['ThoiGianBatDauSD'],
								'loaitb'=>$row['Ten']));
	}
	mysqli_free_result($res);
	mysqli_close($mysqli);
	}
?>