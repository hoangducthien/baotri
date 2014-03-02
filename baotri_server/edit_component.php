<?php
	if (isset($_GET['data'])) {
		include('connect_db.php');
		$data = json_decode(stripslashes($_GET['data']),true);
		if ($data['type'] == 1) {
			$res = $mysqli->query("UPDATE tablethietbi 
								   SET LoaiTB ='".$data['loaitb']."', TrangThai = ".$data['trangthai'].",							
								       KieuDang ='".$data['kieudang']."', HangSX ='".$data['hangsx']."', 
								       NuocSX = '".$data['nuocsx']."', LoSX = '".$data['losx']."',
									   NamSX = ".$data['namsx'].", ThoiGianBatDauSD = ".$data['thoigiansd'].",
									   TenTB = '".$data['ten']."', ViTri = '".$data['noidat']."'
								  WHERE MaTB = '".$data['re_ms']."'");
			if ($res) echo json_encode(array('r'=>1)); else echo json_encode(array('r'=>0));
		} else if ($data['type'] == 2) {
			$res = $mysqli->query("UPDATE tableloaithietbi
			                       SET Ten = '".$data['ten']."', 
								   		MaSo = '".$data['ms']."'
									WHERE MaSo = '".$data['re_ms']."'");
			if ($res) {
				if ($data['ms'] != $data['re_ms']) {
					$query = "UPDATE tablethietbi
			                       			SET LoaiTB = '".$data['ms']."'
											WHERE LoaiTB = '".$data['re_ms']."';";
					$query .= "UPDATE tableloaichitiet
			                       			SET MaSo = replace(MaSo, '".$data['re_ms'].".','".$data['ms'].".') 
											WHERE INSTR(MaSo,'".$data['re_ms'].".')>0;";
					$query .= "UPDATE tablechitietthietbi
			                       SET MaSo = replace(MaSo, '.".$data['re_ms'].".','.".$data['ms'].".'), 
								   		LoaiChiTiet = replace(LoaiChiTiet, '".$data['re_ms'].".','".$data['ms'].".')
									WHERE INSTR(LoaiChiTiet,'".$data['re_ms'].".')>0";
					$res = $mysqli->multi_query($query);
				}
				echo json_encode(array('r'=>1)); 
			}else echo json_encode(array('r'=>0));
		} else if ($data['type'] == 3) {	
				$query .= "DELETE FROM tablechitietthietbi WHERE LoaiChiTiet = '".$_GET['re_ms']."'";
				$query .= "DELETE FROM tablechitietthietbi WHERE LoaiChiTiet LIKE '".$_GET['re_ms'].".%'";
				$query .= "UPDATE tableloaichitiet 
								   SET Ten = '".$data['ten']."',
                                       MaSo = '".$data['ms']."',
								       ThoiGianBaoTri = '".$data['thoigianbaotri']."',
									   Level = '".$data['level']."',
                                       HasChild = '".$data['hasChild']."',
                                       TenChiTietCha = '".$data['tenChiTietCha']."'
								   WHERE MaSo = '".$data['re_ms']."'";
				$query .= "UPDATE tableloaichitiet 
								   SET MaSo = replace(MaSo,'".$data['re_ms'].".','".$data['ms'].".'),
                                       TenChiTietCha = '".$data['ten']."'
								   WHERE MaSo LIKE '".$data['re_ms'].".%'";
			$res = $mysqli->query($query);
			if ($res) {
					$t = array(0=>86400000,1=>180000000,2=>1800000000,3=>5400000000,4=>9000000000,5=>18000000000
								,6=>21600000000,7=>43200000000,8=>86400000000);
					$job = explode(",",$data["thoigianbaotri"]);
					$r = $mysqli->query("SELECT MaTB, ThoiGianBatDauSD FROM tablethietbi WHERE LoaiTB = '".$data['tb']."'");
					$r->data_seek(0);
					while ($row = $r->fetch_assoc()) {
						for ($i=0;$i<9;$i++) {
							if ($job[$i] != '')$t[$i] = $row['thoigiansd']+$t[$i]; else $t[$i] = 0;
						}
						$r_ = $mysqli->query("INSERT INTO tablechitietthietbi VALUES ('".$row["MaTB"].".".$data['ms']."','','','1','".$data['ms']."'
																					,'".$t[0]."','".$t[1]."','".$t[2]."','".$t[3]."','".$t[4]."','".$t[5]."','".$t[6]."'
																					,'".$t[7]."','".$t[8]."')");
					
						$r_1 = $mysqli->query("SELECT MaSo, ThoiGianBaoTri FROM tableloaichitiet WHERE MaSo LIKE '".$data['ms'].".%'");
						$r_1->data_seek(0);
						while ($row_1 = $r_1->fetch_assoc()) {
							$job = explode(",",$row_1["ThoiGianBaoTri"]);
							for ($i=0;$i<9;$i++) {
								if ($job[$i] != '')$t[$i] = $row['thoigiansd']+$t[$i]; else $t[$i] = 0;
							}
							$r_ = $mysqli->query("INSERT INTO tablechitietthietbi VALUES ('".$row["MaTB"].".".$row_1['MaSo']."','','','1','".$row_1['MaSo']."'
																						,'".$t[0]."','".$t[1]."','".$t[2]."','".$t[3]."','".$t[4]."','".$t[5]."','".$t[6]."'
																						,'".$t[7]."','".$t[8]."')");
					}
					mysqli_free_result($r_1);
					}
					mysqli_free_result($r);
					echo json_encode(array('r'=>1));
			} else echo json_encode(array('r'=>0));
		}
		mysqli_close($mysqli);
	}
?>	
