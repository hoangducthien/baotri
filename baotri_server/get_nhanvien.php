<?php
	include('connect_db.php');
	$res = $mysqli->query("SELECT MaSo, TenNV FROM tableaccount");
	$res->data_seek(0);
	$array = array();
	while ($row = $res->fetch_assoc()) {
		array_push($array,array('maso'=>$row['MaSo'],'tennv'=>$row['TenNV']));
	}
	mysqli_free_result($res);
	echo json_encode($array);
	mysqli_close($mysqli);
?>