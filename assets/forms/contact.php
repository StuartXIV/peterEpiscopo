<?php
//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require '../vendor/autoload.php';

$email = $_REQUEST['email'];
$name = $_REQUEST['name'];
$subject = $_REQUEST['subject'];
$message = $_REQUEST['message'];

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

try {
    //Server settings
    //$mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
    $mail->isSMTP();                                            //Send using SMTP
    $mail->Host       = 'smtp.hostinger.com';                     //Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
    $mail->Username   = $_REQUEST['emailPeter'];                     //SMTP username
    $mail->Password   = $_REQUEST['emailPassword'];                               //SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
    $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

    //Recipients
    $mail->setFrom($_REQUEST['emailPeter'], 'Mail from ' . $name);
    $mail->addAddress('peteralbertstuart@hotmail.it', 'Peter Episcopo');  

    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = $subject;
    $mail->Body = $name . '<br>' . $email . '<br>' . '<p style="color: blue">' . $message . '</p>';

    $mail->send();
    $output = json_encode(array('success' => true));
    die($output);
} catch (Exception $e) {
    $output = json_encode(array('success' => false));
    die($output);
}

