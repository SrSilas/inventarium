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
        $corpoEmail = "<div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;'>
                        <h2 style='background-color: #aa3434; color: #fff; padding: 15px; border-radius: 8px 8px 0 0; margin: 0;'>⚠️ Itens com estoque baixo</h2>
                        <table style='width: 100%; border-collapse: collapse; margin-top: 10px;'>
                            <tr style='background-color: #f0f0f0;'>
                                <th style='padding: 10px; text-align: left; border-bottom: 2px solid #ddd;'>Item</th>
                                <th style='padding: 10px; text-align: center; border-bottom: 2px solid #ddd;'>Estoque atual</th>
                                <th style='padding: 10px; text-align: center; border-bottom: 2px solid #ddd;'>Mínimo</th>
                            </tr>";

        foreach ($itensBaixos as $item) {
            $corpoEmail .= "
        <tr>
            <td style='padding: 10px; border-bottom: 1px solid #eee;'>{$item['nm_item']}</td>
            <td style='padding: 10px; text-align: center; border-bottom: 1px solid #eee; color: #aa3434; font-weight: bold;'>{$item['qt_itens']}</td>
            <td style='padding: 10px; text-align: center; border-bottom: 1px solid #eee;'>{$item['qt_minima']}</td>
        </tr>";
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

            $mail->setFrom(EMAIL_USER, 'Inventarium SHB');
            $mail->addAddress('tvsshb@gmail.com');

            $mail->isHTML(true);
            $mail->Subject = 'Alerta: Itens com estoque baixo';
            $mail->Body = $corpoEmail;

            $mail->send();
            echo "Email enviado com sucesso.";
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