<?php
	if ((isset($_GET['ms'])) && (isset($_GET['ten'])) && (isset($_GET['vitri'])) && (isset($_GET['nguoiyeucau']))){
	include('connect_db.php');
	$date = new DateTime(date('d-m-Y h:i:s'));
	$n = $date->format('U')*1000;
	$res = $mysqli->query("INSERT INTO bienbansuachua
							VALUES ('','".$_GET['nguoiyeucau']."',".$n.",'".$_GET['ten']."','".$_GET['ms']."',
									'','".$_GET['vitri']."','','','',
									'','','','','',
									'','','','','',
									'','',1,'','')");
	
	if ($res) {		
		$r = $mysqli->query("UPDATE tablethietbi
							SET TrangThai = 0
							WHERE MaTB = '".$_GET['ms']."'");
		if ($r){
			echo json_encode(array('r'=>'1')); 
			$url = 'http://' . $_SERVER['HTTP_HOST'].dirname($_SERVER['PHP_SELF'])."/sendEmailBH.php";
				
				$data = array('ms' => $_GET['ms'], 'ten' => $_GET['ten'], 'nguoiyeucau' => $_GET['nguoiyeucau']);
				
				$ch = curl_init();
				curl_setopt( $ch, CURLOPT_URL, $url );
				curl_setopt($ch, CURLOPT_TIMEOUT_MS, 1);
				curl_setopt($ch, CURLOPT_POST, 1);
				curl_setopt($ch, CURLOPT_NOSIGNAL, 1);
				curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
				curl_exec($ch);
				curl_close($ch);							
		} else {
			echo json_encode(array('r'=>'0')); 
		}
	} else echo json_encode(array('r'=>'0')); 
	mysqli_close($mysqli);
	}
?>