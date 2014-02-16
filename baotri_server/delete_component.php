<?php
	if ((isset($_GET['ms'])) && (isset($_GET['type']))) {
		include('connect_db.php');
		if ($_GET['type'] == 1) {
			$res = $mysqli->query("DELETE FROM tablethietbi WHERE MaTB = '".$_GET['ms']."'");
			if ($res) {
				$res_1 = $mysqli->query("DELETE FROM tablechitietthietbi WHERE MaSo LIKE '".$_GET["ms"].".%'");
				echo json_encode(array('r'=>1));
			}else echo json_encode(array('r'=>0));
		} else if ($_GET['type'] == 2) {
			$res = $mysqli->query("DELETE FROM tableloaithietbi WHERE MaSo ='".$_GET['ms']."'");
			if ($res) {
				 $res = $mysqli->query("DELETE FROM tablethietbi WHERE LoaiTB = '".$_GET['ms']."'");
				 $res = $mysqli->query("DELETE FROM tableloaichitiet WHERE MaSo LIKE '".$_GET['ms'].".%'");
				 $res = $mysqli->query("DELETE FROM tablechitietthietbi WHERE LoaiChiTiet LIKE '".$_GET['ms'].".%'");
				 echo json_encode(array('r'=>1)); 
			} else echo json_encode(array('r'=>0));
		} else if ($_GET['type'] == 3) {
			$res = $mysqli->query("DELETE FROM tableloaichitiet WHERE MaSo = '".$_GET['ms']."'");
			if ($res){	
				$res = $mysqli->query("DELETE FROM tableloaichitiet WHERE MaSo LIKE '".$_GET['ms'].".%'");
				$res = $mysqli->query("DELETE FROM tablechitietthietbi WHERE LoaiChiTiet = '".$_GET['ms']."'");
				$res = $mysqli->query("DELETE FROM tablechitietthietbi WHERE LoaiChiTiet LIKE '".$_GET['ms'].".%'");
				echo json_encode(array('r'=>1)); 
			} else echo json_encode(array('r'=>0));
		}
		mysqli_close($mysqli);
	}
?>