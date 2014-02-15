<?php
	if (isset($_GET['ms'])) {
		include('connect_db.php');
		$array = array();
		$res = $mysqli->query("SELECT * FROM tablelogbaotri WHERE MaSo ='".$_GET['ms']."' ORDER BY Ngay DESC");
		$res->data_seek(0);		
		while ($row = $res->fetch_assoc()) {
			array_push($array,array('id'=>$row['ID'],'ngay'=>$row['Ngay'],'nguoithuchien'=>$row['NguoiThucHien']
									,'ghichu'=>$row['GhiChu'],'congviec'=>$row['MaCongViec']));
		}
		mysqli_free_result($res);
		echo json_encode($array);
		mysqli_close($mysqli);
	}
?>