<?php 
	header('Access-Control-Allow-Origin: *'); 
	$mysqli = new mysqli("localhost", "root", "", "bao_tri_db"); 
	if ($mysqli->connect_errno) 
	{ 
		echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error; 
	} 
	$mysqli->query("SET NAMES 'utf8'"); 
?>