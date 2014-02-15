<?php
	if ((isset($_GET['ten'])) &&(isset($_GET['id'])) &&(isset($_GET['nguyennhan']))){
		include('connect_db.php');
		$res = $mysqli->query("UPDATE bienbansuachua
								SET GiaiDoan = 7,
									NguoiHuy = '".$_GET['ten']."',
									NguyenNhan ='".$_GET['nguyennhan']."'
								WHERE ID =".$_GET['id']);
		
		if ($res) {
			echo json_encode(array('r'=>1));
			$res = $mysqli->query("SELECT MaTB FROM bienbansuachua WHERE ID=".$_GET['id']);
			$res->data_seek(0);		
			while ($row = $res->fetch_assoc()) {
				$r_1 = $mysqli->query("UPDATE tablethietbi
									   SET TinhTrang = 1
									   WHERE MaTB ='".$row['MaTB']."'");
			}
			mysqli_free_result($res); 
		}else echo json_encode(array('r'=>0));
		mysqli_close($mysqli);
	}
?>