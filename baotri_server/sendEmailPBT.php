<?php
				include("connect_db.php");
				require_once('sendmail.php');
				$res2 = $mysqli->query("SELECT QuyenHan, Email FROM tableaccount");
				$res2->data_seek(0);						
				while ($row = $res2->fetch_assoc()) {
					if (isset($_POST['qh2'])){
						$b =  (strpos($row['QuyenHan'],$_POST['qh'].",") !== false 
								|| strpos($row['QuyenHan'],$_POST['qh2'].",") !== false) 
								&& $row['Email'] != '';
					} else {
						$b = strpos($row['QuyenHan'],$_POST['qh'].",") !== false && $row['Email'] != '';
					}
					if ($b){
						$mail->AddAddress($row['Email']);
					}				
				}
				$mail->Subject = "[Biên bản sửa chữa] ".$_POST['title'];
				$mail->Body = 'Hệ thống MAMAssitant vừa cập nhật biên bản sửa chữa. '."\r\n".' Các nhân viên có nhiệm vụ liên quan mời đăng nhập vào hệ thống để xem thông tin chi tiết';
				mysqli_free_result($res2);
				$mail->Send();	
?>