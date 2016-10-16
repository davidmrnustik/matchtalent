<?php 
session_start("a");
$captcha = $_POST['tmptxt'];
//echo "SESSION -> ".$_SESSION['tmptxt'];
//echo "<br>POST -> ".$_POST['tmptxt'];

if ((isset($_POST['tmptxt'])) and ($_SESSION['tmptxt']==$_POST['tmptxt'])) { ?>
0
<?php } else { ?>
1
<?php } ?>