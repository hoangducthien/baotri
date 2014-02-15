<?php
	if ((isset($_POST['id'])) && (isset($_POST['gd']))) {
	include('connect_db.php');
	$gd = $_POST['gd'] - 1;
	$id = $_POST['id'];
	$kq = 0;	
	$res = $mysqli->query("UPDATE bienbansuachua
							SET GiaiDoan = ". $gd ."'
							WHERE ID = ".$id);
	if ($res) $kq = 1;	 
	echo json_encode(array('r'=>$kq));
	mysqli_close($mysqli);
	}
?>