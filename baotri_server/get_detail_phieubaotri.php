<?php
	if ((isset($_GET['id'])) && (isset($_GET['gd']))) {
	include('connect_db.php');
	$gd = $_GET['gd'];
	$id = $_GET['id'];
	if ($gd == 1){
		$res = $mysqli->query("SELECT MaTB, NguoiYeuCau, NgayYeuCau, DatTai 
								FROM bienbansuachua
								WHERE ID = ".$_GET['id']);
		$res->data_seek(0);
		while ($row = $res->fetch_assoc()) {
			echo json_encode(array('matb'=>$row['MaTB'],'nguoiyeucau'=>$row['NguoiYeuCau'],'ngayyeucau'=>$row['NgayYeuCau']
									,'dattai'=>$row['DatTai']));
		}
		mysqli_free_result($res);
	} else if ($gd == 2){
		$res = $mysqli->query("SELECT MaTB, NguoiYeuCau, NgayYeuCau, DatTai,
									TinhTrangHuHong,NguyenNhanHuHong,PhuongAnSuaChua,
									NguoiLapPhuongAn, NgayLapPhuongAn 
								FROM bienbansuachua
								WHERE ID = ".$_GET['id']);
		$res->data_seek(0);
		while ($row = $res->fetch_assoc()) {
			echo json_encode(array('matb'=>$row['MaTB'],'nguoiyeucau'=>$row['NguoiYeuCau'],'ngayyeucau'=>$row['NgayYeuCau']
									,'dattai'=>$row['DatTai'],'tinhtranghuhong'=>$row['TinhTrangHuHong']
									,'nguyennhanhuhong'=>$row['NguyenNhanHuHong'],'phuongansuachua'=>$row['PhuongAnSuaChua']
									,'nguoilapphuongan'=>$row['NguoiLapPhuongAn'],'ngaylapphuongan'=>$row['NgayLapPhuongAn']));
		}
		mysqli_free_result($res);
	}  else if ($gd == 3){
		$res = $mysqli->query("SELECT MaTB, NguoiYeuCau, NgayYeuCau, DatTai,
									TinhTrangHuHong,NguyenNhanHuHong,PhuongAnSuaChua,
									NguoiLapPhuongAn, NgayLapPhuongAn, NguoiDuyet_PA, NgayDuyet_PA, NgayBatDau  
								FROM bienbansuachua
								WHERE ID = ".$_GET['id']);
		$res->data_seek(0);
		while ($row = $res->fetch_assoc()) {
			echo json_encode(array('matb'=>$row['MaTB'],'nguoiyeucau'=>$row['NguoiYeuCau'],'ngayyeucau'=>$row['NgayYeuCau']
									,'dattai'=>$row['DatTai'],'tinhtranghuhong'=>$row['TinhTrangHuHong']
									,'nguyennhanhuhong'=>$row['NguyenNhanHuHong'],'phuongansuachua'=>$row['PhuongAnSuaChua']
									,'nguoilapphuongan'=>$row['NguoiLapPhuongAn'],'ngaylapphuongan'=>$row['NgayLapPhuongAn']
									,'nguoiduyetphuongan'=>$row['NguoiDuyet_PA'],'ngayduyetphuongan'=>$row['NgayDuyet_PA']
									,'ngaybatdau'=>$row['NgayBatDau']));
		}
		mysqli_free_result($res);
	}  else if ($gd == 4){
		$res = $mysqli->query("SELECT MaTB, NguoiYeuCau, NgayYeuCau, DatTai,
									TinhTrangHuHong,NguyenNhanHuHong,PhuongAnSuaChua, KetQuaSuaChua,
									NguoiLapPhuongAn, NgayLapPhuongAn, NguoiDuyet_PA, NgayDuyet_PA, NgayBatDau,
									NgayKetThuc, NguoiSuaChua  
								FROM bienbansuachua
								WHERE ID = ".$_GET['id']);
		$res->data_seek(0);
		while ($row = $res->fetch_assoc()) {
			echo json_encode(array('matb'=>$row['MaTB'],'nguoiyeucau'=>$row['NguoiYeuCau'],'ngayyeucau'=>$row['NgayYeuCau']
									,'dattai'=>$row['DatTai'],'tinhtranghuhong'=>$row['TinhTrangHuHong']
									,'nguyennhanhuhong'=>$row['NguyenNhanHuHong'],'phuongansuachua'=>$row['PhuongAnSuaChua']
									,'nguoilapphuongan'=>$row['NguoiLapPhuongAn'],'ngaylapphuongan'=>$row['NgayLapPhuongAn']
									,'nguoiduyetphuongan'=>$row['NguoiDuyet_PA'],'ngayduyetphuongan'=>$row['NgayDuyet_PA']
									,'ngaybatdau'=>$row['NgayBatDau'],'ngayketthuc'=>$row['NgayKetThuc']
									,'nguoisuachua'=>$row['NguoiSuaChua'],'ketquasuachua'=>$row['KetQuaSuaChua']));
		}
		mysqli_free_result($res);
	}  else if ($gd == 5){
		$res = $mysqli->query("SELECT MaTB, NguoiYeuCau, NgayYeuCau, DatTai,
									TinhTrangHuHong,NguyenNhanHuHong,PhuongAnSuaChua,
									NguoiLapPhuongAn, NgayLapPhuongAn, NguoiDuyet_PA, NgayDuyet_PA, NgayBatDau,
									NgayKetThuc, NguoiSuaChua, Dat, NguoiGiamSat, NgayGiamSat  
								FROM bienbansuachua
								WHERE ID = ".$_GET['id']);
		$res->data_seek(0);
		while ($row = $res->fetch_assoc()) {
			echo json_encode(array('matb'=>$row['MaTB'],'nguoiyeucau'=>$row['NguoiYeuCau'],'ngayyeucau'=>$row['NgayYeuCau']
									,'dattai'=>$row['DatTai'],'tinhtranghuhong'=>$row['TinhTrangHuHong']
									,'nguyennhanhuhong'=>$row['NguyenNhanHuHong'],'phuongansuachua'=>$row['PhuongAnSuaChua']
									,'nguoilapphuongan'=>$row['NguoiLapPhuongAn'],'ngaylapphuongan'=>$row['NgayLapPhuongAn']
									,'nguoiduyetphuongan'=>$row['NguoiDuyet_PA'],'ngayduyetphuongan'=>$row['NgayDuyet_PA']
									,'ngaybatdau'=>$row['NgayBatDau'],'ngayketthuc'=>$row['NgayKetThuc']
									,'nguoisuachua'=>$row['NguoiSuaChua'],'dat'=>$row['Dat']
									,'nguoigiamsat'=>$row['NguoiGiamSat'],'ngaygiamsat'=>$row['NgayGiamSat']));
		}
		mysqli_free_result($res);
	}
	mysqli_close($mysqli);
	}
?>