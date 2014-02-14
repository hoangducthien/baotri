<?php
	if ((isset($_POST['ms'])) && (isset($_POST['chitiet'])) && (isset($_POST['nguoilap']))) {
		include("connect_db.php");
		$res = $mysqli->query("SELECT ID FROM tablelichbaotri WHERE ID = '".$_POST['ms']."'");
		if ($res->num_rows == 0) {
			mysqli_free_result($res);
			$res = $mysqli->query("INSERT INTO tablelichbaotri
									VALUES ('','".$_POST['ms']."','".$_POST['chitiet']."','".$_POST['nguoilap']."')");
			if ($res){
				 $array = explode(';',$_POST['chitiet']);
				 foreach ($array as $key => $value) {
					$array_1 = explode(':',$array[$key]);
				 	$r = $mysqli->query("UPDATE tablethietbi 
				 					SET ThoiGianBaoTri = CONCAT(ThoiGianBaoTri,';".$_POST['ms'].":".$array_1[1].";')	
				 					WHERE MaTB = '".$array_1[0]."'");
				 }
				 echo json_encode(array('r' => 1));
			}
		} else echo json_encode(array('r' => 0));
		mysqli_close($mysqli);
	}
?>