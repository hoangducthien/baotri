<?php
	include('connect_db.php');
	$res = $mysqli->query("SELECT MaSo, Level FROM tableloaichitiet WHERE Level >= 2");
	while ($row = $res->fetch_assoc()) {
		$a = explode('.',$row['MaSo']);
		$ms = '';
		$c = 0;
		foreach($a as $k => $v) {
			$c++;
			if ($c <= $row['Level'])
			$ms = $ms.'.'.$a[$k];
		}
		$ms = substr($ms,1);
		$r_1 = $mysqli->query("SELECT MaSo, Ten FROM tableloaichitiet 
								WHERE MaSo ='".$ms."'");
		while ($r_ = $r_1->fetch_assoc()) {
		$r_2 = $mysqli->query("UPDATE tableloaichitiet 
								SET TenChiTietCha = '".$r_['Ten']."' 
								WHERE MaSo = '".$row['MaSo']."'");
		}
		mysqli_free_result($r_1);
	}
	mysqli_free_result($res);
	mysqli_close($mysqli);
?>