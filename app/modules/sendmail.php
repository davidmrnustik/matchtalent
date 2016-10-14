<?php
$basepath = $_SERVER["DOCUMENT_ROOT"];
$headers = "Content-Type: text/html; charset=utf-8". "\r\n";
$headers = "MIME-Version: 1.0\r\n";
$url_field = "http://".$_SERVER['HTTP_HOST']."/";
$datetime = date('l jS \of F Y h:i:s A');

require($basepath.'/class.phpmailer.php');
require($basepath.'/class.smtp.php');

function check_input($data, $problem = ""){
	$data = htmlentities(trim(strip_tags(stripslashes($data))), ENT_NOQUOTES, "UTF-8");

	if ($problem && strlen($data) == 0){
		show_error($problem);
	}

	return $data;
};

$mail = new PHPMailer();

$formName = check_input($_POST["name"]);
$formEmail = check_input($_POST["email"]);
$formCompany = check_input($_POST["company"]);
$formPhoneNumber = check_input($_POST["phoneNumber"]);
$formMessage = check_input($_POST["message"]);

$mailFrom = "no-reply@memorandum.net";
$mailFromName = "MatchTalent.com.es";
$mailSubject = "MatchTalent - Formulario web: ".$formName;
$mailRecipient = "davidm@memorandum.net";
$mailMessage = "";
$mailMessage .= "<p><strong>Nombre:</strong> ".$formName."</p>";
$mailMessage .= "<p><strong>Email: </strong>".$formEmail."</p>";
$mailMessage .= "<p><strong>Empresa: </strong>".$formCompany."</p>";
$mailMessage .= "<p><strong>".utf8_decode("Teléfono: ")."</strong>".$formPhoneNumber."</p>";
$mailMessage .= "<p><strong>Consulta: </strong>".$formMessage."</p>";
$mailMessage .= "<hr/>";
$mailMessage .= "Enviado desde: ".$url_field;
$mailMessage .= "<p><em>MatchTalent Team"." - ".$datetime."</em></p>";

//$mail->isSMTP();
$mail->isSendMail();
$mail->Host = "localhost";
$mail->SMTPAuth = false;
$mail->From = $formEmail;
$mail->FromName = $formName;
$mail->AddAddress($mailRecipient,"");
$mail->Subject = $mailSubject;
$mail->AltBody = "";
$mail->MsgHTML($mailMessage);
$mail->AddCustomHeader($headers);
$mail->isHTML(true);

if(!$mail->send()) {
	echo 'Message could not be sent.';
} else {
	echo 'Message has been sent';
}
?>

<p>Name: <?php echo $formName; ?></p>
<p>Email: <?php echo $formEmail; ?></p>
<p>Company: <?php echo $formCompany; ?></p>
<p>Phone Number: <?php echo $formPhoneNumber; ?></p>
<p>Message: <?php echo $formMessage; ?></p>

<p>Subject: <?php echo $mailSubject ?></p>
<p>Message:<br> <?php echo $mailMessage ?></p>