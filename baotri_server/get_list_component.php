<?php
	if ((isset($_GET['type'])) && (isset($_GET['page']))){
		include('connect_db.php');
		$array = array();
		if ($_GET['type'] == 1) {
			$res = $mysqli -> query("SELECT MaTB, TenTB FROM tablethietbi LIMIT ".(($_GET['page']-1)*30).", 30");
			$res->data_seek(0);
			
			while ($row = $res->fetch_assoc()) {
				array_push($array,array('ms'=>$row['MaTB'],'ten'=>$row['TenTB']));
			}
			mysqli_free_result($res);
		} else if ($_GET['type'] == 2) {
			$res = $mysqli -> query("SELECT MaSo, Ten FROM tableloaithietbi LIMIT ".(($_GET['page']-1)*30).", 30");
			$res->data_seek(0);
			while ($row = $res->fetch_assoc()) {
				array_push($array,array('ms'=>$row['MaSo'],'ten'=>$row['Ten']));
			}
			mysqli_free_result($res);
		} else if ($_GET['type'] == 3) {
			$res = $mysqli -> query("SELECT MaSo, Ten FROM tableloaichitiet LIMIT ".(($_GET['page']-1)*30).", 30");
			$res->data_seek(0);
			while ($row = $res->fetch_assoc()) {
				array_push($array,array('ms'=>$row['MaSo'],'ten'=>$row['Ten']));
			}
			mysqli_free_result($res);
		}
		echo json_encode($array);
		mysqli_close($mysqli);
	}
?>