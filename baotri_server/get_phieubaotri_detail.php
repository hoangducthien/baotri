<?php
	if (isset($_GET['ms'])) {
		include('connect_db.php');
		
		$res = $mysqli->query("SELECT * FROM bienbansuachua WHERE ID =".$_GET['ms']);
		$res->data_seek(0);		
		while ($row = $res->fetch_assoc()) {
			echo json_encode(array('nguoiyeucau'=>$row['NguoiYeuCau'],'ngayyeucau'=>$row['NgayYeuCau']
			,'tentb'=>$row['TenTB'],'matb'=>$row['MaTB'],'tinhtranghuhong'=>$row['TinhTrangHuHong'],
			'dattai'=>$row['DatTai'],'nguyennhanhuhong'=>$row['NguyenNhanHuHong'],'phuongansuachua'=>$row['PhuongAnSuaChua'],
			'nguoilapphuongan'=>$row['NguoiLapPhuongAn'],'ngaylapphuongan'=>$row['NgayLapPhuongAn'],
			'nguoiduyetphuongan'=>$row['NguoiDuyet_PA'],'ketquasuachua'=>$row['KetQuaSuaChua'],'nguoisuachua'=>$row['NguoiSuaChua'],
			'ngaybatdau'=>$row['NgayBatDau'],'ngayketthuc'=>$row['NgayKetThuc'],'nguoigiamsat'=>$row['NguoiGiamSat'],
			'ngaygiamsat'=>$row['NgayGiamSat'],'dat'=>$row['Dat'],'nguoiduyetbb'=>$row['NguoiDuyet_BB'],
			'ngayduyetphuongan'=>$row['NgayDuyet_PA'],'ngayduyetbb'=>$row['NgayDuyet_BB'],
			'giaidoan'=>$row['GiaiDoan'],'nguoihuy'=>$row['NguoiHuy'],'nguyennhan'=>$row['NguyenNhan']));
		}
		mysqli_free_result($res);
		
		mysqli_close($mysqli);
	}
?>