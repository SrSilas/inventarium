<?php
require_once 'config.php';
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

include('conexao.php');

$query = "SELECT nm_item, qt_itens, qt_minima FROM material_manutencao WHERE qt_itens <= qt_minima AND qt_minima > 0";

try {
    $stmt = $conn->prepare($query);
    $stmt->execute();
    $itensBaixos = $stmt->fetchALL(PDO::FETCH_ASSOC);

    if (count($itensBaixos) > 0) {
        $corpoEmail = "<h2>Itens com estoque baixo</h2><ul>";
        foreach ($itensBaixos as $item) {
            $corpoEmail .= "<li>{$item['nm_item']}: {$item['qt_itens']} (mínimo: {$item['qt_minima']})</li>";
        }
        $corpoEmail .= "</ul>";

        $mail = new PHPMailer(true);

        try {
            $mail->isSMTP();
            $mail->Host = EMAIL_HOST;
            $mail->SMTPAuth = true;
            $mail->Username = EMAIL_USER;
            $mail->Password = EMAIL_PASS;
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = EMAIL_PORT;
            $mail->CharSet = 'UTF-8';

            $mail->setFrom('tvsshb@gmail.com', 'Inventarium SHB');
            $mail->addAddress('tvsshb@gmail.com');

            $mail->isHTML(true);
            $mail->Subject = 'Alerta: Itens com estoque baixo';
            $mail->Body = $corpoEmail;

            $mail->send();
            echo "Email enviado com suceso.";
        } catch (PDOException $e) {
            echo "Erro ao enviar email: {$mail->ErrorInfo}";
        }
    } else {
        echo "Nenhum item com estoque baixo. ";
    }
} catch (PDOException $e) {
    echo "Erro: " . $e->getMessage();
}

$conn = null;
?>