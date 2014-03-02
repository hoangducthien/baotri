<?php
	if ((isset($_POST['ms'])) && (isset($_POST['chitiet'])) && (isset($_POST['nguoilap']))) {
		include("connect_db.php");
		$res = $mysqli->query("UPDATE tablelichbaotri
								SET ChiTiet = '".$_POST['chitiet']."',
									NguoiLap = '".$_POST['nguoilap']."' 
								WHERE ID = '".$_POST['ms']."'");
					
		if ($res) {
			$array = explode(';',$_POST['chitiet']);
			foreach ($array as $key => $value) {
				$array_1 = explode(':',$array[$key]);
				$r = $mysqli->query("SELECT ThoiGianBaoTri 
									FROM tablethietbi	
				 					WHERE MaTB = '".$array_1[0]."'");
				$r->data_seek(0);
				$a = '';
				$kt = 0;
				while ($row = $r->fetch_assoc()) {
					$array_2 = explode(';',$row['ThoiGianBaoTri']);
					foreach ($array_2 as $k_2 => $v_2) {
						if ($array_2[$k_2] != '') {
							$array_3 = explode(':',$array_2[$k_2]);
							if ($array_3[0] == $_POST['ms']) {
							 	if ($array_3[1] != $array_1[1]){
									$kt = 1;
									$a = $a.';'.$_POST['ms'].':'.$array_1[1].';';
								}
							} else $a = $a.';'.$array_2[$k_2].';';
						}
					}
				} 
				mysqli_free_result($r);	
				if ($kt == 1) $r_1 = $mysqli->query("UPDATE tablethietbi
													SET	ThoiGianBaoTri = '".$a."'
				 									WHERE MaTB = '".$array_1[0]."'");									
			}
			echo json_encode(array('r'=>1));
			require_once('sendmail.php');
			$res2 = $mysqli->query("SELECT QuyenHan, Email FROM tableaccount");
			$res2->data_seek(0);						
			while ($row = $res2->fetch_assoc()) {
				if (strpos($row['QuyenHan'],'1,') !== false && $row['Email'] != ''){
					$mail->AddAddress($row['Email']);
				}				
			}
			$mail->Subject = "[Lịch bảo trì] Tháng ".$_POST['ms'];
			$mail->Body = 'Hệ thống MAMAssitant vừa cập nhật lịch bảo trì tháng '.$_POST['ms'].'. '."\r\n".' Các nhân viên có nhiệm vụ liên quan mời đăng nhập vào hệ thống để xem thông tin chi tiết';
			mysqli_free_result($res2);
			$mail->Send();			 
		} else echo json_encode(array('r'=>0));
		mysqli_close($mysqli);
	}
?>