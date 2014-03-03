<?php
	echo(date("d", "1392397200"));
	$arr2 = explode("/", "");
			$maxday = cal_days_in_month(CAL_GREGORIAN, $arr2[0], $arr2[1]);
?>
$arr3 = explode(":", $ss);
					$mes .= "<td style='border:1px solid #ccc;'>$arr3[0]</td>"; 
                    
                    $mail->Body = 'Hệ thống MAMAssitant vừa cập nhật lịch bảo trì tháng '.$_POST['ms'].'. '."</br></br>".$mes;
			mysqli_free_result($res2);
			$mail->Send();	