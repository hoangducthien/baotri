<?php
	if ((isset($_POST['ms'])) && (isset($_POST['chitiet'])) && (isset($_POST['nguoilap']))) {
		include("connect_db.php");
		$res = $mysqli->query("SELECT ID FROM tablelichbaotri WHERE ID = '".$_POST['ms']."'");
		if ($res->num_rows == 0) {
			mysqli_free_result($res);
			$res = $mysqli->query("INSERT INTO tablelichbaotri
									VALUES ('','".$_POST['ms']."','".$_POST['chitiet']."','".$_POST['nguoilap']."')");
			if ($res) echo json_encode(array('r' => 1));
		} else echo json_encode(array('r' => 0));
		mysqli_close($mysqli);
	}
?>