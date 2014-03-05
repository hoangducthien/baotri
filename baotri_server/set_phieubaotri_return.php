<?php
	if ((isset($_POST['id'])) && (isset($_POST['gd']))) {
	include('connect_db.php');
	$gd = $_POST['gd'];
	$id = $_POST['id'];
	$kq = 0;
	if ($gd == 2){
		$res = $mysqli->query("UPDATE bienbansuachua
								SET GiaiDoan = 1
								WHERE ID = ".$id);
		if ($res){
				$kq = 1;
			 	sendMail(array('qh' => "1,", 'title' => "[Không duyệt] Tìm phương án"));				
		}
	} else if ($gd == 4){
		$res = $mysqli->query("UPDATE bienbansuachua
								SET GiaiDoan = 3
								WHERE ID = ".$id);
		if ($res){
				$kq = 1;
			 	sendMail(array('qh' => "9,", 'title' => "[Không duyệt] Xác nhận kết quả"));					
		} 
	} else if ($gd == 5){
		$res = $mysqli->query("UPDATE bienbansuachua
								SET GiaiDoan = 4
								WHERE ID = ".$id);
		if ($res){
				$kq = 1;
			 	sendMail(array('qh' => "10,", 'title' => "[Không duyệt] Người giám sát"));
		}
	}
	echo json_encode(array('r'=>$kq));
	mysqli_close($mysqli);
	}
	
	function sendMail($data){
			$url = 'http://' . $_SERVER['HTTP_HOST'].dirname($_SERVER['PHP_SELF'])."/sendEmailPBT.php";
			
			$ch = curl_init();
			curl_setopt( $ch, CURLOPT_URL, $url );
			curl_setopt($ch, CURLOPT_TIMEOUT_MS, 1);
			curl_setopt($ch, CURLOPT_POST, 1);
 			curl_setopt($ch, CURLOPT_NOSIGNAL, 1);
			curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
			curl_exec($ch);
			curl_close($ch);
	}
	
?>