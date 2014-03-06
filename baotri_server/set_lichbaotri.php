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
				$url = 'http://' . $_SERVER['HTTP_HOST'].dirname($_SERVER['PHP_SELF'])."/sendEmail.php";
				
				$data = array('ms' => $_POST['ms'], 'chitiet' => $_POST['chitiet']);
				
				$ch = curl_init();
				curl_setopt( $ch, CURLOPT_URL, $url );
				curl_setopt($ch, CURLOPT_TIMEOUT_MS, 1);
				curl_setopt($ch, CURLOPT_POST, 1);
				curl_setopt($ch, CURLOPT_NOSIGNAL, 1);
				curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
				curl_exec($ch);
				curl_close($ch);
			}									
		} else echo json_encode(array('r' => 0));
		mysqli_close($mysqli);
	}
?>