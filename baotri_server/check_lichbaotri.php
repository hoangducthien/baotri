<?php
	if ((isset($_GET['ID']))&&(isset($_GET['T']))) {
		include('connect_db.php');
		$result = $mysqli->query("SELECT ID 
								  FROM tablelichbaotri 
								  WHERE ID ='".$_GET['ID']."'");
		$T = $_GET['T'];	
		function pre_month($D){
			$pm_D = '';
			$py_D = '';
			$a_D = explode('/',$D);
			$py_D = $a_D[1];
			switch ($a_D[0]) {
				case '01':
					$pm_D = '12';
					$py_D = (int) $py_D - 1;
					break;
				case '02':
					$pm_D = '01';
					break;
				case '03':
					$pm_D = '02';
					break;
				case '04':
					$pm_D = '03';
					break;
				case '05':
					$pm_D = '04';
					break;
				case '06':
					$pm_D = '05';
					break;
				case '07':
					$pm_D = '06';
					break;
				case '08':
					$pm_D = '07';
					break;
				case '09':
					$pm_D = '08';
					break;
				case '10':
					$pm_D = '09';
					break;
				case '11':
					$pm_D = '10';
					break;
				case '12':
					$pm_D = '11';
					break;
			}
			return $pm_D.'/'.$py_D;
		}
		if ($result->num_rows > 0) {
			echo json_encode(array('r' => 0));
		} else {
			if ($T == '0') {
				$re = $mysqli->query("SELECT ID 
								  FROM tablelichbaotri 
								  WHERE ID ='".pre_month($_GET['ID'])."'");
				if ($re->num_rows > 0) {
					echo json_encode(array('r' => 1));
				} else echo json_encode(array('r' => -1));
				mysqli_free_result($re);
			} else echo json_encode(array('r' => 1));
		}
		mysqli_free_result($result);
		mysqli_close($mysqli);
	}
?>