<?php
	if (isset($_GET['device'])){
		include('connect_db.php');
		$array = array();
			
			$res = $mysqli -> query("SELECT MaSo, Ten FROM tableloaichitiet WHERE MASO LIKE '".$_GET['device'].".%'");
			$res->data_seek(0);
			while ($row = $res->fetch_assoc()) {
				array_push($array,array('ms'=>$row['MaSo'],'ten'=>$row['Ten']));
			}
			mysqli_free_result($res);
		
		echo json_encode($array);
		mysqli_close($mysqli);
	}
?>