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
			 	require_once('sendmail.php');
				$res2 = $mysqli->query("SELECT QuyenHan, Email FROM tableaccount");
				$res2->data_seek(0);						
				while ($row = $res2->fetch_assoc()) {
					if (strpos($row['QuyenHan'],'1,') !== false && $row['Email'] != ''){
						$mail->AddAddress($row['Email']);
					}				
				}
				$mail->Subject = "[Biên bản sửa chữa] [Không duyệt] Tìm phương án";
				$mail->Body = 'Hệ thống MAMAssitant vừa cập nhật biên bản sửa chữa. '."\r\n".' Các nhân viên có nhiệm vụ liên quan mời đăng nhập vào hệ thống để xem thông tin chi tiết';
				mysqli_free_result($res2);
				$mail->Send();	
		}
	} else if ($gd == 4){
		$res = $mysqli->query("UPDATE bienbansuachua
								SET GiaiDoan = 3
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
				$mail->Subject = "[Biên bản sửa chữa] [Không duyệt] Xác nhận kết quả";
				$mail->Body = 'Hệ thống MAMAssitant vừa cập nhật biên bản sửa chữa. '."\r\n".' Các nhân viên có nhiệm vụ liên quan mời đăng nhập vào hệ thống để xem thông tin chi tiết';
				mysqli_free_result($res2);
				$mail->Send();	
		} 
	} else if ($gd == 5){
		$res = $mysqli->query("UPDATE bienbansuachua
								SET GiaiDoan = 4
								WHERE ID = ".$id);
		if ($res){
				$kq = 1;
			 	require_once('sendmail.php');
				$res2 = $mysqli->query("SELECT QuyenHan, Email FROM tableaccount");
				$res2->data_seek(0);						
				while ($row = $res2->fetch_assoc()) {
					if (strpos($row['QuyenHan'],'10,') !== false && $row['Email'] != ''){
						$mail->AddAddress($row['Email']);
					}				
				}
				$mail->Subject = "[Biên bản sửa chữa] [Không duyệt] Người giám sát";
				$mail->Body = 'Hệ thống MAMAssitant vừa cập nhật biên bản sửa chữa. '."\r\n".' Các nhân viên có nhiệm vụ liên quan mời đăng nhập vào hệ thống để xem thông tin chi tiết';
				mysqli_free_result($res2);
				$mail->Send();	
		}
	}
	echo json_encode(array('r'=>$kq));
	mysqli_close($mysqli);
	}
?>