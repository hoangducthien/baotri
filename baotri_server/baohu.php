<?php
	if ((isset($_GET['ms'])) && (isset($_GET['ten'])) && (isset($_GET['vitri'])) && (isset($_GET['nguoiyeucau']))){
	include('connect_db.php');
	$date = new DateTime(date('d-m-Y h:i:s'));
	$n = $date->format('U')*1000;
	$res = $mysqli->query("INSERT INTO bienbansuachua
							VALUES ('','".$_GET['nguoiyeucau']."',".$n.",'".$_GET['ten']."','".$_GET['ms']."',
									'','".$_GET['vitri']."','','','',
									'','','','','',
									'','','','','',
									'','',1,'','')");
	
	if ($res) {
		echo json_encode(array('r'=>'1')); 
		$r = $mysqli->query("UPDATE tablethietbi
							SET TrangThai = 0
							WHERE MaTB = '".$_GET['ms']."'");
	} else echo json_encode(array('r'=>'0')); 
	mysqli_close($mysqli);
	}
?>