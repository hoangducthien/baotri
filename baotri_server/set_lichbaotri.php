<?php
	if ((isset($_POST['ms'])) && (isset($_POST['chitiet'])) && (isset($_POST['nguoilap']))) {
		include("connect_db.php");
		$res = $mysqli->query("SELECT ID FROM tablelichbaotri WHERE ID = '".$_POST['ms']."'");
		if ($res->num_rows == 0) {
			mysqli_free_result($res);
			$res = $mysqli->query("INSERT INTO tablelichbaotri
									VALUES ('','".$_POST['ms']."','".$_POST['chitiet']."','".$_POST['nguoilap']."')");
			if ($res){
				 $array = explode(';',$_POST['chitiet']);
				 foreach ($array as $key => $value) {
					$array_1 = explode(':',$array[$key]);
				 	$r = $mysqli->query("UPDATE tablethietbi 
				 					SET ThoiGianBaoTri = CONCAT(ThoiGianBaoTri,';".$_POST['ms'].":".$array_1[1].";')	
				 					WHERE MaTB = '".$array_1[0]."'");
				 }
				 echo json_encode(array('r' => 1));
				 require_once('sendmail.php');
				$res2 = $mysqli->query("SELECT QuyenHan, Email FROM tableaccount");
				$res2->data_seek(0);						
				while ($row = $res2->fetch_assoc()) {
					if (strpos($row['QuyenHan'],'1,') !== false && $row['Email'] != ''){
						$mail->AddAddress($row['Email']);
					}				
				}
				$mail->Subject = "[Lịch bảo trì] Tháng ".$_POST['ms'];
				$arr = explode(";", $_POST['chitiet']);
				$arr2 = explode("/", $_POST['ms']);
				$maxday = cal_days_in_month(CAL_GREGORIAN, $arr2[0], $arr2[1]);
				$mes = '<html><table style="border-collapse:collapse; table-layout:fixed;">
						<tr><td style="border:1px solid #ccc;">Tên thiết bị</td>';
				for ($i = 1; $i <= $maxday; $i++) {
					$mes .= "<td style='border:1px solid #ccc;'>$i</td>"; 
				}
				$mes .= '</tr>';
	
				for ($j = 0, $size = count($arr); $j < $size; $j++){
					$arr3 = explode(":", $arr[$j]);
					
					$mes .= "<tr><td style='border:1px solid #ccc;'>$arr3[0]</td>"; 
					$arr4 = explode(",", $arr3[1]);
					$sss = '';
					for ($k = 0, $size2 = count($arr4); $k < $size2; $k++){
						$sss .= date("d", $arr4[$k]/10) . ",";
					}
					 
					for ($i = 1; $i <= $maxday; $i++) {
						if (strpos($sss,$i.",") !== false){
							$mes .= "<td style='border:1px solid #ccc;'>X</td>";
						}else{
							$mes .= "<td style='border:1px solid #ccc;'></td>";
						}
					}
					$mes .= "</tr>";
				}
				$mes .= "</table>";
				$mail->Body = 'Hệ thống MAMAssitant vừa cập nhật lịch bảo trì tháng '.$_POST['ms'].'. '."</br></br>".$mes;
				mysqli_free_result($res2);
				$mail->Send();	
			}									
		} else echo json_encode(array('r' => 0));
		mysqli_close($mysqli);
	}
?>