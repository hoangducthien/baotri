<?php
	include('connect_db.php');
	$res = $mysqli->query("SELECT MaTB, TenTB, TrangThai 
						   FROM tablethietbi
						   ORDER BY TenTB");
	$res->data_seek(0);
	$array = array();
	while ($row = $res->fetch_assoc()) {
		array_push($array,array('ms'=>$row['MaTB'],'ten'=>$row['TenTB'],'tt'=>$row['TrangThai']));
	}
	mysqli_free_result($res);
	echo json_encode($array);
	mysqli_close($mysqli);
?>