<?php
	if ((isset($_POST['ur'])) && (isset($_POST['pw']))) {
		include('connect_db.php');
		$result = $mysqli->query("SELECT MaSo FROM tableaccount 
								  WHERE TaiKhoan = '".$_POST['ur']."' and MatKhau ='".$_POST['pw']."'");
		if ($result->num_rows > 0) 
		{
			
			$result->data_seek(0);
			while ($row = $result->fetch_assoc()) {
				echo json_encode(array('result' => '1','ms' => $row['MaSo']));
			} 
		} else echo json_encode(array('result' => '0'));
		mysqli_free_result($result);
		mysqli_close($mysqli);
	}
?>