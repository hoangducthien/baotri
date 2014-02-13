<?php
	if (isset($_GET['ms'])) {
		include('connect_db.php');
		$res = $mysqli->query("SELECT ChiTiet
								FROM tablelichbaotri
								WHERE ID ='".$_GET['ms']."'");
		$res->data_seek(0);
		while ($row = $res->fetch_assoc()) {
			echo json_encode(array('chitiet'=>$row['ChiTiet']));
		}
		mysqli_free_result($res);
		mysqli_close($mysqli);
	}
?>