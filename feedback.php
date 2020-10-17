<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception';
require 'phpmailer/src/PHPMailer';

$mail = new PHPMailer(true);
$mail -> CharSet = 'UTF-8';
$mail -> setLanguage('ru', 'phpmailer/language/');
$mail -> IsHTML(true);

$mail -> setFrom('grach@mail.ru', 'grach');
$mail -> addAddress('slagrach@yandex.ru');
$mail -> Submit = 'Hello!';

$hand = 'Right';
if($_POST['hand'] == 'left'){
$hand = 'Left';
}

$body = 'Mail';

if(trim(!empty($_POST['name']))){
$body.='<p>Name: '.$_POST['name'].'</p>';
}
if(trim(!empty($_POST['email']))){
$body.='<p>E-mail: '.$_POST['email'].'</p>';
}
if(trim(!empty($_POST['hand']))){
$body.='<p>Hand: '.$hand.'</p>';
}
if(trim(!empty($_POST['age']))){
$body.='<p>Age: '.$_POST['age'].'</p>';
}
if(trim(!empty($_POST['message']))){
$body.='<p>Message: '.$_POST['message'].'</p>';
}

$mail -> Body = $body;

if(!$mail -> send()) {
$message = 'Error';
} else {
$message = 'Send';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);
?>