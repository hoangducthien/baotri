<?php
	if ((isset($_POST['ur']))&&(isset($_POST['ms']))&&(isset($_POST['newpw']))&&(isset($_POST['oldpw']))) {
		include('connect_db.php');
		$result = $mysqli->query("SELECT MaSo 
								  FROM tableaccount 
								  WHERE TaiKhoan = '".$_POST['ur']."' and MatKhau ='".$_POST['oldpw']."' 
								  and MaSo='".$_POST['ms']."'");
		if ($result->num_rows == 0)  {echo json_encode(array('result' => '0')); mysqli_free_result($result);} else{
		mysqli_free_result($result);	
		$result = $mysqli->query("UPDATE tableaccount 
								  SET MatKhau='".$_POST['newpw']."'
								  WHERE TaiKhoan = '".$_POST['ur']."' and MatKhau ='".$_POST['oldpw']."' 
								  and MaSo='".$_POST['ms']."'");
			echo json_encode(array('result' => '1'));
		}
		mysqli_close($mysqli);
	}
?>