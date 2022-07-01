<?php
echo $_SERVER["HTTP_HOST"];
if(isset($_POST)) {
    error_reporting(0);
    $name = "name";
    $email = "email";
    $subject = "subject";
    $comments = "comment";
    $domain = $_SERVER["HTTP_HOST"];
    $to = "martinojano0@gmail.com";
    $subject_mail = "Contacto desde el formulario del sitio $domain: $subject";
    $message = "
    <p>
    Datos enviados desde el formulario del sitio <b>$domain</b>
    </p>
    <ul>
    <li>Nombre: $name</li>
    <li>Email: $email</li>
    <li>Asunto: $subject</li>
    <li>Comentarios: $comments</li>
    </ul>
    ";
    $headers = "MIME-Version: 1.0\r\n"."Content-Type: text/html; charset=utf-8\r\n".
    "From: Envio Automatico No Responder <no-reply@$domain>";

    $send_mail = mail($to,$subject_mail,$message,$headers);
    
    if($send_mail){
        $res = ["err"=> false,
        "message"=> "Tus datos han sido enviados"];
    }else{
        $res = ["err"=> true,
        "message"=> "Error al enviar tus datos, intenta nuevamente"];
    };

// header("Access-Control-Allow-Origin: * ");
header("Content-type: application/json");
echo json_encode($res);
exit;

}
