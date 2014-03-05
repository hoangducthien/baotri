<?php
	if ((isset($_POST['id'])) && (isset($_POST['gd']))) {
	include('connect_db.php');
	$gd = $_POST['gd'];
	$id = $_POST['id'];
	$kq = 0;
	$date = new DateTime(date('d-m-Y h:i:s'));
	$n = $date->format('U')*1000;
	if ($gd == 1){
		$res = $mysqli->query("UPDATE bienbansuachua
								SET GiaiDoan = 2,
									TinhTrangHuHong = '".$_POST['tinhtranghuhong']."',
									NguyenNhanHuHong = '".$_POST['nguyennhanhuhong']."',
									PhuongAnSuaChua = '".$_POST['phuongansuachua']."',
									NgayLapPhuongAn = ".$n.",
									NguoiLapPhuongAn = '".$_POST['nguoilapphuongan']."'
								WHERE ID = ".$id);
		if ($res){
				$kq = 1;
			 	sendMail(array('qh' => "9,", 'title' => "Duyệt phương án"));
		}
	} else if ($gd == 2){
		$res = $mysqli->query("UPDATE bienbansuachua
								SET GiaiDoan = 3,
									NgayDuyet_PA = ".$n.",
									NgayBatDau = ".$n.",
									NguoiDuyet_PA = '".$_POST['nguoiduyetphuongan']."'
								WHERE ID = ".$id);
		if ($res){
				$kq = 1;
				sendMail(array('qh' => "9,", 'qh2' => '1,','title' => "Xác nhận kết quả"));			 	
		}
	}  else if ($gd == 3){
		$res = $mysqli->query("UPDATE bienbansuachua
								SET GiaiDoan = 4,
									KetQuaSuaChua = '".$_POST['ketquasuachua']."',
									NgayKetThuc = ".$n.",
									NguoiSuaChua = '".$_POST['nguoisuachua']."'
								WHERE ID = ".$id);
		if ($res){
				$kq = 1;
			 	sendMail(array('qh' => "10,", 'title' => "Người giám sát"));	
				
		}
	}  else if ($gd == 4){
		$res = $mysqli->query("UPDATE bienbansuachua
								SET GiaiDoan = 5,
									Dat = ".$_POST['dat'].",
									NgayGiamSat = ".$n.",
									NguoiGiamSat = '".$_POST['nguoigiamsat']."'
								WHERE ID = ".$id);
		if ($res){
				$kq = 1;
				sendMail(array('qh' => "6,", 'title' => "Người duyệt"));				 	
		}
	}  else if ($gd == 5){
		$res = $mysqli->query("UPDATE bienbansuachua
								SET GiaiDoan = 6,
									NgayDuyet_BB = ".$n.",
									NguoiDuyet_BB = '".$_POST['nguoiduyet']."'
								WHERE ID = ".$id);
		$res = $mysqli->query("SELECT MaTB FROM bienbansuachua WHERE ID = ".$id);
		$res->data_seek(0);
		while ($row = $res->fetch_assoc()) {
			$r = $mysqli->query("UPDATE tablethietbi SET TrangThai = 1 WHERE MaTB ='".$row['MaTB']."'");
		}
		mysqli_free_result($res);	
		if ($res) $kq = 1;
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