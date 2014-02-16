<?php
	if ((isset($_POST['id'])) && (isset($_POST['gd']))) {
	include('connect_db.php');
	$gd = $_POST['gd'];
	$id = $_POST['id'];
	$kq = 0;
	if ($gd == 2){
		$res = $mysqli->query("UPDATE bienbansuachua
								SET GiaiDoan = 1
								WHERE ID = ".$id);
		if ($res) $kq = 1;
	} else if ($gd == 4){
		$res = $mysqli->query("UPDATE bienbansuachua
								SET GiaiDoan = 3
								WHERE ID = ".$id);
		if ($res) $kq = 1;
	}
	echo json_encode(array('r'=>$kq));
	mysqli_close($mysqli);
	}
?>