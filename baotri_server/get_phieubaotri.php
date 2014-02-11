<?php
	if (isset($_GET['giaidoan'])) {
	include('connect_db.php');
	$res = $mysqli->query("SELECT TenTB, ID 
							FROM bienbansuachua
							WHERE GiaiDoan = ".$_GET['giaidoan']);
	$res->data_seek(0);
	$array = array();
	while ($row = $res->fetch_assoc()) {
		array_push($array,array('ms'=>$row['ID'],'ten'=>$row['TenTB']));
	}
	mysqli_free_result($res);
	echo json_encode($array);
	mysqli_close($mysqli);
	}
?>