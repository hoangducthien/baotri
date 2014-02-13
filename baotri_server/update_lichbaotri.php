<?php
	if ((isset($_POST['ms'])) && (isset($_POST['chitiet'])) && (isset($_POST['nguoilap']))) {
		include("connect_db.php");
		$res = $mysqli->query("UPDATE tablelichbaotri
								SET ChiTiet = '".$_POST['chitiet']."',
									NguoiLap = '".$_POST['nguoilap']."' 
								WHERE ID = '".$_POST['ms']."'");
					
		if ($res) echo json_encode(array('r'=>1)); else echo json_encode(array('r'=>0));
		mysqli_close($mysqli);
	}
?>