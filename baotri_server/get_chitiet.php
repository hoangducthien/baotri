<?php
	if (isset($_GET['ms'])) {
	include('connect_db.php');
	$res = $mysqli->query("SELECT tablechitietthietbi.MaSo, tableloaichitiet.Ten, tableloaichitiet.Level 	   
								FROM tablechitietthietbi inner join tableloaichitiet
								ON tablechitietthietbi.LoaiChiTiet = tableloaichitiet.MaSo
								WHERE tablechitietthietbi.MaSo LIKE '".$_GET['ms'].".%'
								ORDER BY tablechitietthietbi.MaSo ASC");
	$res->data_seek(0);
	$array = array();
	while ($row = $res->fetch_assoc()) {
		array_push($array,array('ms'=>$row['MaSo'],'ten'=>$row['Ten'],'level'=>$row['Level']));
	}
	mysqli_free_result($res);
	echo json_encode($array);
	mysqli_close($mysqli);
	}
?>