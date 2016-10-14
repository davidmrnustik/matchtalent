<?php
session_start("a");
function randomText($length) {
    $pattern = "123456789abcdefghijklmnpqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ";
    $key="";
    for($i=0;$i<$length;$i++) {
      $key .= $pattern{rand(0,9)};
    }
    return $key;
}

$_SESSION['tmptxt'] = randomText(5);
$captcha = imagecreatefromgif("./img/button.gif");
$colText = imagecolorallocate($captcha, 0, 0, 0);
imagestring($captcha, 5, 50, 15, $_SESSION['tmptxt'], $colText);

header("Content-type: image/gif");
imagegif($captcha);
?>