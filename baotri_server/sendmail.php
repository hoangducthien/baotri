<?php
require_once('class.phpmailer.php');
$mail = new PHPMailer(); // create a new object
$mail->IsSMTP(); // enable SMTP
$mail->SMTPDebug = 0; // debugging: 1 = errors and messages, 2 = messages only
$mail->SMTPAuth = true; // authentication enabled
$mail->SMTPSecure = 'ssl'; // secure transfer enabled REQUIRED for GMail
$mail->Host = "smtp.gmail.com";
$mail->Port = 465; // or 587
$mail->IsHTML(true);
$mail->Username = "mama.ad.system@gmail.com";
$mail->Password = "mamassitant";
$mail->SetFrom("mama.ad.system@gmail.com");
$mail->CharSet = 'UTF-8';

?>