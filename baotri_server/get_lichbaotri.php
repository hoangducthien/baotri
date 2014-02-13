<?php
	include('connect_db.php');
	$res = $mysqli->query("SELECT ID
							FROM tablelichbaotri
							ORDER BY ID ASC");
	$res->data_seek(0);
	$array = array();
	while ($row = $res->fetch_assoc()) {
		array_push($array,array('ms'=>$row['ID']));
	}
	mysqli_free_result($res);
	echo json_encode($array);
	mysqli_close($mysqli);
?>