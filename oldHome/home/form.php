<?php

    if (isset($_POST['submit'])) {
        $name = $_POST['name'];
        $mail = $_POST['email'];
        $message = $_POST['message'];

        $mailTo = "peteralbertstuart@hotmail.it";
        $headers = "From: contact@peterepiscopo.co.uk";
        $txt = $message;
        $content= "Message from " . ucfirst($name);

        mail($mailTo, $content, $txt, $headers);
        header("Location: ../index.html#contact-form?mailsend");
        
    }
    
    ?>