<?php
	if ((isset($_POST['maso'])) && ((isset($_POST['maso'])))) {
		include('connect_db.php');
		$result = $mysqli->query("DELETE FROM tableaccount WHERE MaSo = '".$_POST['maso']."'");
		if ($result) echo json_encode(array('result' => '1')); else echo json_encode(array('result' => '0'));
		mysqli_close($mysqli);
	}
?>