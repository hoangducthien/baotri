<?php
				include("connect_db.php");
				require_once('sendmail.php');
				$res2 = $mysqli->query("SELECT QuyenHan, Email FROM tableaccount");
				$res2->data_seek(0);	
					
				while ($row = $res2->fetch_assoc()) {
					if (strpos($row['QuyenHan'],'1,') !== false && $row['Email'] != ''){
						$mail->AddAddress($row['Email']);
					}				
				}
				$mail->Subject = "[Báo Hư] ".$_POST['ten'];
				$mail->Body = 'Hệ thống MAMAssitant vừa nhận được thông báo hư thiết bị từ nhân viên '.$_POST['nguoiyeucau'].'. Thiết bị hư là "'.$_POST['ten'].'" có mã số "'.$_POST['ms'].'"';
				mysqli_free_result($res2);
				$mail->Send();	
?>