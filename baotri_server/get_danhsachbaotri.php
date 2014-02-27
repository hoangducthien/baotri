<?php
	include('connect_db.php');
	$res = $mysqli->query("SELECT MaTB, TenTB, ThoiGianBaoTri
						   FROM tablethietbi
                                                   WHERE TrangThai = '1'
						   ORDER BY TenTB");
	$res->data_seek(0);
	$array = array();
	$date = new DateTime(date('d-m-Y 23:59:59'));
	$n = $date->format('U')*1000;
	while ($row = $res->fetch_assoc()) {
		$a = explode(';',$row['ThoiGianBaoTri']);
		$kt = 0;
		foreach($a as $k => $v) {
			if ($a[$k] != '') {
				$a_1 = explode(':',$a[$k]);
				foreach($a_1 as $k_1 => $v_1) {
					if ($k_1 != 0){
						if (((float)$a_1[$k_1]) < $n ) {
						 array_push($array,array('ms'=>$row['MaTB'],'ten'=>$row['TenTB']));
						 $kt = 1;
						 break;
						}
					}
				}
			}
			if ($kt == 1) break;
		}
	}
	mysqli_free_result($res);
	echo json_encode($array);
	mysqli_close($mysqli);
?>		