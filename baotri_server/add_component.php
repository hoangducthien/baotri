<?php
	if (isset($_GET['data'])) {
		include('connect_db.php');
		$data = json_decode(stripslashes($_GET['data']),true);
		if ($data['type'] == 1) {
			$res = $mysqli->query("INSERT INTO tablethietbi VALUES ('".$data['ms']."','".$data['loaitb']."','',".$data['trangthai'].",
																'".$data['kieudang']."','".$data['hangsx']."','".$data['nuocsx']."'
															 	,'".$data['losx']."',".$data['namsx'].",".$data['thoigiansd'].",'','','',
																'','','','','','',0,
																'".$data['ten']."','".$data['noidat']."')");
			if ($res) {
				$res_1 = $mysqli->query("SELECT MaSo, Ten, ThoiGianBaoTri FROM tableloaichitiet WHERE MaSo LIKE '".$data["loaitb"].".%'");
				$res_1->data_seek(0);
				$value_query = '';
				while ($row = $res_1->fetch_assoc()) {
					$t = array(0=>86400000,1=>180000000,2=>1800000000,3=>5400000000,4=>9000000000,5=>18000000000
								,6=>21600000000,7=>43200000000,8=>86400000000);
					$job = explode(",",$row["ThoiGianBaoTri"]);
					for ($i=0;$i<9;$i++) {
						if ($job[$i] != '')$t[$i] = $data['thoigiansd']+$t[$i]; else $t[$i] = 0;
					}
					$value_query .="('".$data["ms"].".".$row['MaSo']."','','','1','".$row['MaSo']."'
																				,'".$t[0]."','".$t[1]."','".$t[2]."','".$t[3]."','".$t[4]."','".$t[5]."','".$t[6]."'
																				,'".$t[7]."','".$t[8]."'),";
				}
				$value_query = substr($value_query, 0, -1);
				$r = $mysqli->query("INSERT INTO tablechitietthietbi VALUES ".$value_query);
				echo json_encode(array('r'=>1));
				mysqli_free_result($res_1);
			}else echo json_encode(array('r'=>0));
		} else if ($data['type'] == 2) {
			$res = $mysqli->query("INSERT INTO tableloaithietbi VALUES('','".$data['ms']."','".$data['ten']."','')");
			if ($res) echo json_encode(array('r'=>1)); else echo json_encode(array('r'=>0));
		} else if ($data['type'] == 3) {
			$ms = $data['tb'].".".$data['ms'];
			$res = $mysqli->query("INSERT INTO tableloaichitiet VALUES('','".$ms."','".$data['ten']."',
								'".$data['thoigianbaotri']."','".$data['level']."')");
			if ($res) {
					$t = array(0=>86400000,1=>180000000,2=>1800000000,3=>5400000000,4=>9000000000,5=>18000000000
								,6=>21600000000,7=>43200000000,8=>86400000000);
					$job = explode(",",$data["thoigianbaotri"]);
					$r = $mysqli->query("SELECT MaTB, ThoiGianBatDauSD FROM tableloaichitiet WHERE LoaiTB = '".$data['tb']."'");
					$r->data_seek(0);
					while ($row = $r->fetch_assoc()) {
						for ($i=0;$i<9;$i++) {
							if ($job[$i] != '')$t[$i] = $row['thoigiansd']+$t[$i]; else $t[$i] = 0;
						}
						$r_ = $mysqli->query("INSERT INTO tablechitietthietbi VALUES ('".$row["MaTB"].".".$ms."','','','1','".$ms."'
																					,'".$t[0]."','".$t[1]."','".$t[2]."','".$t[3]."','".$t[4]."','".$t[5]."','".$t[6]."'
																					,'".$t[7]."','".$t[8]."')");
					}
					mysqli_free_result($r);
					echo json_encode(array('r'=>1)); 
			} else echo json_encode(array('r'=>0));
		}
		mysqli_close($mysqli);
	}
?>