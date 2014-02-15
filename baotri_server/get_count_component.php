<?php
	if (isset($_GET['type'])) {
		include('connect_db.php');
		if ($_GET['type'] == 1) {
			$res = $mysqli->query("SELECT Count(MaTB) AS Total
									FROM tablethietbi");
			$res->data_seek(0);
			while ($row = $res->fetch_assoc()) {
				echo json_encode(array('count'=>$row['Total']));
			}
			mysqli_free_result($res);
		} else if ($_GET['type'] == 2) {
			$res = $mysqli->query("SELECT Count(MaSo) AS Total
									FROM tableloaithiebi");
			$res->data_seek(0);
			while ($row = $res->fetch_assoc()) {
				echo json_encode(array('count'=>$row['Total']));
			}
			mysqli_free_result($res);
		} if ($_GET['type'] == 3) {
			$res = $mysqli->query("SELECT Count(MaSo) AS Total
									FROM tableloaichitiet");
			$res->data_seek(0);
			while ($row = $res->fetch_assoc()) {
				echo json_encode(array('count'=>$row['Total']));
			}
			mysqli_free_result($res);
		}
		mysqli_close($mysqli);
	}
?>