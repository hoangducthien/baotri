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
			require_once('sendmail.php');
			$res2 = $mysqli->query("SELECT QuyenHan, Email FROM tableaccount");
			$res2->data_seek(0);	
				
			while ($row = $res2->fetch_assoc()) {
				if (strpos($row['QuyenHan'],'1,') !== false && $row['Email'] != ''){
					$mail->AddAddress($row['Email']);
				}				
			}
			$mail->Subject = "[Báo Hư] ".$_GET['ten'];
			$mail->Body = 'Hệ thống MAMAssitant vừa nhận được thông báo hư thiết bị từ nhân viên '.$_GET['nguoiyeucau'].'. Thiết bị hư là "'.$_GET['ten'].'" có mã số "'.$_GET['ms'].'"';
			mysqli_free_result($res2);
			$mail->Send();							
		} else {
			echo json_encode(array('r'=>'0')); 
		}
	} else echo json_encode(array('r'=>'0')); 
	mysqli_close($mysqli);
	}
?>