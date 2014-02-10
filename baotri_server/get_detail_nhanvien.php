<?php
	if (isset($_GET['maso'])) {
		include('connect_db.php');
		$res = $mysqli->query("SELECT tableaccount.TenNV, tableaccount.QuyenHan, tablechucvu.ChucVu, tableaccount.TaiKhoan
								, tableaccount.ChucVu as macv
								FROM tableaccount inner join tablechucvu 
								ON tableaccount.ChucVu = tablechucvu.MaSo
								WHERE tableaccount.MaSo = '".$_GET['maso']."'");
		$res->data_seek(0);
		while ($row = $res->fetch_assoc()) {
			echo json_encode(array('ten'=>$row['TenNV'],'ur'=>$row['TaiKhoan']
								,'quyenhan'=>$row['QuyenHan'],'chucvu'=>$row['ChucVu'],'machucvu'=>$row['macv']));
		}
		mysqli_free_result($res);
		mysqli_close($mysqli);
	}
?>