<?php
	if (isset($_GET['ms'])) {
	include('connect_db.php');
	$res = $mysqli->query("SELECT ViTri 
						   FROM tablethietbi
						   WHERE MaTB = '".$_GET['ms']."'");
	$res->data_seek(0);
	$array = array();
	while ($row = $res->fetch_assoc()) {
		echo json_encode(array('vitri'=>$row['ViTri']));
	}
	mysqli_free_result($res);
	mysqli_close($mysqli);
	}
?>