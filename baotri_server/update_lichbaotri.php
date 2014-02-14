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
		} else echo json_encode(array('r'=>0));
		mysqli_close($mysqli);
	}
?>