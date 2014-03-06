<?php
	if ((isset($_POST['maso'])) && (isset($_POST['hoten'])) && (isset($_POST['ur']))
	&& (isset($_POST['pw'])) && (isset($_POST['chucvu'])) && (isset($_POST['quyenhan']))) {
		include('connect_db.php');
		$ms = $_POST['maso'];
		$hoten = $_POST['hoten'];
		$ur = $_POST['ur'];
		$pw = $_POST['pw'];
		$chucvu = $_POST['chucvu'];
		$quyenhan = $_POST['quyenhan'];
		$email = $_POST['email'];
		$result = $mysqli->query("UPDATE tableaccount 
								  SET TenNV = '".$hoten."',
									  TaiKhoan = '".$ur."',
									  MatKhau = '".$pw."',
									  ChucVu = '".$chucvu."',
									  QuyenHan = '".$quyenhan."',
									  Email = '".$email."'
								  WHERE MaSo = '".$ms."'");
		if ($result) echo json_encode(array('result' => '1')); else echo json_encode(array('result' => '0'));
		mysqli_close($mysqli);
	}
?>