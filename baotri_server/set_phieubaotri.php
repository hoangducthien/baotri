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
			 	require_once('sendmail.php');
				$res2 = $mysqli->query("SELECT QuyenHan, Email FROM tableaccount");
				$res2->data_seek(0);						
				while ($row = $res2->fetch_assoc()) {
					if (strpos($row['QuyenHan'],'9,') !== false && $row['Email'] != ''){
						$mail->AddAddress($row['Email']);
					}				
				}
				$mail->Subject = "[Biên bản sửa chữa] Duyệt phương án";
				$mail->Body = 'Hệ thống MAMAssitant vừa cập nhật biên bản sửa chữa. '."\r\n".' Các nhân viên có nhiệm vụ liên quan mời đăng nhập vào hệ thống để xem thông tin chi tiết';
				mysqli_free_result($res2);
				$mail->Send();	
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
			 	require_once('sendmail.php');
				$res2 = $mysqli->query("SELECT QuyenHan, Email FROM tableaccount");
				$res2->data_seek(0);						
				while ($row = $res2->fetch_assoc()) {
					if ((strpos($row['QuyenHan'],'9,') !== false || strpos($row['QuyenHan'],'1,') !== false) && $row['Email'] != ''){
						$mail->AddAddress($row['Email']);
					}				
				}
				$mail->Subject = "[Biên bản sửa chữa] Xác nhận kết quả";
				$mail->Body = 'Hệ thống MAMAssitant vừa cập nhật biên bản sửa chữa. '."\r\n".' Các nhân viên có nhiệm vụ liên quan mời đăng nhập vào hệ thống để xem thông tin chi tiết';
				mysqli_free_result($res2);
				$mail->Send();	
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
			 	require_once('sendmail.php');
				$res2 = $mysqli->query("SELECT QuyenHan, Email FROM tableaccount");
				$res2->data_seek(0);						
				while ($row = $res2->fetch_assoc()) {
					if ((strpos($row['QuyenHan'],'10,') !== false) && $row['Email'] != ''){
						$mail->AddAddress($row['Email']);
					}				
				}
				$mail->Subject = "[Biên bản sửa chữa] Người giám sát";
				$mail->Body = 'Hệ thống MAMAssitant vừa cập nhật biên bản sửa chữa. '."\r\n".' Các nhân viên có nhiệm vụ liên quan mời đăng nhập vào hệ thống để xem thông tin chi tiết';
				mysqli_free_result($res2);
				$mail->Send();	
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
			 	require_once('sendmail.php');
				$res2 = $mysqli->query("SELECT QuyenHan, Email FROM tableaccount");
				$res2->data_seek(0);						
				while ($row = $res2->fetch_assoc()) {
					if ((strpos($row['QuyenHan'],'6,') !== false) && $row['Email'] != ''){
						$mail->AddAddress($row['Email']);
					}				
				}
				$mail->Subject = "[Biên bản sửa chữa] Người duyệt";
				$mail->Body = 'Hệ thống MAMAssitant vừa cập nhật biên bản sửa chữa. '."\r\n".' Các nhân viên có nhiệm vụ liên quan mời đăng nhập vào hệ thống để xem thông tin chi tiết';
				mysqli_free_result($res2);
				$mail->Send();	
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
?>