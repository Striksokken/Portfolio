<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/PHPMailer-master/src/PHPMailer.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
    $message = htmlspecialchars($_POST['message']);

    if (!$name || !$email || !$message) {
        echo "Alle felter skal udfyldes korrekt!";
        exit;
    }

    // Konfiguration af PHPMailer
    $mail = new PHPMailer(true);

    try {
        // Serverindstillinger
        $mail->isSMTP();
        $mail->Host       = 'smtp.simply.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'DIN_EMAIL_BRUGERNAVN';
        $mail->Password = 'DIN_EMAIL_ADGANGSKODE';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // Modtager og afsender
        $mail->setFrom('DIN_EMAIL_BRUGERNAVN', 'Jakob');
        $mail->addAddress('DIN_EMAIL_BRUGERNAVN', 'Jakob');
        $mail->addReplyTo($email, $name);

        // Indhold af e-mail
        $mail->isHTML(false);
        $mail->Subject = 'Ny besked fra din kontaktformular';
        $mail->Body    = "Du har modtaget en ny besked fra din portfolio:\n\n"
                       . "Navn: $name\n"
                       . "Email: $email\n"
                       . "Besked:\n$message";

        // Send e-mail
        $mail->send();
        echo "Din besked er sendt! Jeg vender tilbage snarest muligt.";
    } catch (Exception $e) {
        echo "Der opstod en fejl: {$mail->ErrorInfo}";
    }
} else {
    echo "Ugyldig anmodning!";
}
?>
