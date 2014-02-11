<?php
	if (isset($_GET['ms'])) {
		include('connect_db.php');
		$res = $mysqli->query("SELECT tablechitietthietbi.MaSo, tableloaichitiet.Ten, 
								tablechitietthietbi.T1, tablechitietthietbi.T2, tablechitietthietbi.T3,
								tablechitietthietbi.T4, tablechitietthietbi.T5, tablechitietthietbi.T6,
								tablechitietthietbi.T7, tablechitietthietbi.T8, tablechitietthietbi.T9,
								tableloaichitiet.ThoiGianBaoTri as T,tableloaichitiet.Level 	   
								FROM tablechitietthietbi inner join tableloaichitiet
								ON tablechitietthietbi.LoaiChiTiet = tableloaichitiet.MaSo
								WHERE tablechitietthietbi.MaSo LIKE '".$_GET['ms'].".%'
								ORDER BY tablechitietthietbi.MaSo ASC");
		$res->data_seek(0);
		$array = array();
		function check($T) {
			$date = new DateTime(date('d-m-Y 23:59:59'));
			$n = $date->format('U')*1000;
			if (($T>0) && ($T<$n)) 
			return true;
			return false;
		}
		while ($row = $res->fetch_assoc()) {
			$s = array();
			$job = explode(",",$row["T"]);
			$kt = 0;
			for ($i=0;$i<9;$i++) {
				if ($job[$i] != '')
					if (check($row["T".($i+1)])) {
						array_push($s,array('job' => $job[$i],'id' => $i));
						$kt = 1;
					}
			}
			if  ($kt == 1)
			array_push($array,array('ms'=>$row['MaSo'],'ten'=>$row['Ten'],'level'=>$row['Level'],'T'=>$s)); else 
			if ($row['Level'] == 1) array_push($array,array('ms'=>$row['MaSo'],'ten'=>$row['Ten'],'level'=>$row['Level'],'T'=>array()));
		}
		mysqli_free_result($res);
		echo json_encode($array);
		mysqli_close($mysqli);
	}
?>