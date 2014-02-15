<?php
	include('connect_db.php');
	$array = array();
	$res = $mysqli -> query("SELECT ID, TenTB FROM bienbansuachua WHERE GiaiDoan>5");
	$res->data_seek(0);		
	while ($row = $res->fetch_assoc()) {
		array_push($array,array('ms'=>$row['ID'],'ten'=>$row['TenTB']));
	}
	mysqli_free_result($res);
	echo json_encode($array);
	mysqli_close($mysqli);
?>