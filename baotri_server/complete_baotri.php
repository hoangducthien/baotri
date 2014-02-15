<?php
	if (isset($_GET['ms'])) {
		include('connect_db.php');
		$res = $mysqli->query("SELECT ThoiGianBaoTri FROM tablethietbi WHERE MaTB ='".$_GET['ms']."'");
		$res->data_seek(0);
		function check($T) {
			$date = new DateTime(date('d-m-Y 23:59:59'));
			$n = $date->format('U')*1000;
			if (($T>0) && ($T<$n)) 
			return true;
			return false;
		}
		while ($row = $res->fetch_assoc()) {
			$str = $row['ThoiGianBaoTri'];
			$a = explode(';',$str);
			$time = '';
			foreach ($a as $k => $v) {
				if ($a[$k] != '') {
					$a_1 = explode(':',$a[$k]);
					$count = 0;
					$str_tmp = ';'.$a_1[0];
					$a_2 = explode(',',$a_1[1]);
					foreach($a_2 as $k_2 => $v_2) {
						if (!check($a_2[$k_2])) {
							$str_tmp = $str_tmp.':'.$a_2[$k_2];
							$count++;
						}
					}
					if ($count > 0) $time = $time.$str_tmp.';';
				}
			}
			$r = $mysqli->query("UPDATE tablethietbi SET ThoiGianBaoTri = '".$time."' WHERE MaTB ='".$_GET['ms']."'");
			if ($r) echo json_encode(array('r'=>1)); else json_encode(array('r'=>0)); 
		}
		
		mysqli_free_result($res);
		mysqli_close($mysqli);
	}
?>