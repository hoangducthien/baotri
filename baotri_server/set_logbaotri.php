<?php
	if (isset($_POST['data'])) {
		include('connect_db.php');
		$data = json_decode(stripslashes($_POST['data']),true);
		$date = new DateTime(date('d-m-Y h:i:s'));
		$n = $date->format('U')*1000;
		$res = $mysqli->query("INSERT INTO tablelogbaotri
								VALUES('','".$data['ms']."',".$n.",'".$data['macv']."','".$data['nguoithuchien']."'
								,'".$data['ghichu']."')");
		$t = 0;
		function T($i) {
			$date = new DateTime(date('d-m-Y h:i:s'));
			$n = $date->format('U')*1000;
			switch ($i) {
				case 0:
					$t = $n + 86400000;
					return 'T1='.$t;
				case 1:
					$t = $n + 180000000;
					return 'T2='.$t;
				case 2:
					$t = $n + 1800000000;
					return 'T3='.$t;
				case 3:
					$t = $n + 5400000000;
					return 'T4='.$t;
				case 4:
					$t = $n + 9000000000;
					return 'T5='.$t;
				case 5:
					$t = $n + 18000000000;
					return 'T6='.$t;
				case 6:
					$t = $n + 21600000000;
					return 'T7='.$t;
				case 7:
					$t = $n + 43200000000;
					return 'T8='.$t;
				case 8:
					$t = $n + 86400000000;
					return 'T9='.$t;
			}
		}
		if ($res)
		foreach ($data['update'] as $key => $value)
		{	
			$query = "UPDATE tablechitietthietbi
									SET ".T($data['update'][$key]['id'])." WHERE MaSo = '".$data['ms']."'"; 
			$r = $mysqli->query($query);
		}
		if ($r) echo json_encode(array('r'=>1)); else echo json_encode(array('r'=>0)); 
		mysqli_close($mysqli);
	}
?>