<?php
require('fpdf/fpdf.php');
require('config.php');
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';
include('conexao.php');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

//Definindo o periodo: mês anterior completo
$inicio = date('Y-m-01', strtotime('first day of last month'));
$fim = date('Y-m-t', strtotime('last day of last month'));

$query = "SELECT m.dt_movimento, mat.nm_item, m.tp_movimento, m.qt_movimentada, u.nm_usuario
    FROM movimentacao m
    JOIN material_manutencao mat ON m.cd_item = mat.cd_codigo
    JOIN users u ON m.cd_usuario = u.cd_usuario
    WHERE m.dt_movimento BETWEEN :inicio AND :fim
    ORDER BY m.dt_movimento ASC";

$stmt = $conn->prepare($query);
$stmt->bindParam(':inicio', $inicio);
$stmt->bindParam(':fim', $fim);
$stmt->execute();
$movimentacoes = $stmt->fetchAll(PDO::FETCH_ASSOC);

$pdf = new FPDF();
$pdf->AddPage();
$pdf->SetFont('Arial', 'B', 16);
$pdf->Cell(0, 10, mb_convert_encoding('Relatorio Mensal - Inventarium SHB', 'Iso-8859-1', 'UTF-8'), 0, 1, 'C');
$pdf->SetFont('Arial', '', 10);
$pdf->Cell(0, 8, "Periodo: $inicio a $fim", 0, 1, 'C');
$pdf->Ln(5);

$pdf->SetFont('Arial', 'B', 9);
$pdf->SetFillColor(220, 220, 220);
$pdf->Cell(25, 7, 'Data', 1, 0, 'C', true);
$pdf->Cell(60, 7, mb_convert_encoding('Item', 'ISO-8859-1', 'UTF-8'), 1, 0, 'C', true);
$pdf->Cell(25, 7, 'Tipo', 1, 0, 'C', true);
$pdf->Cell(25, 7, 'Quantidade', 1, 0, 'C', true);
$pdf->Cell(50, 7, 'Usuario', 1, 0, 'C', true);
$pdf->Ln();

$pdf->SetFont('Arial', '', 9);
foreach ($movimentacoes as $mov) {
    $pdf->Cell(25, 7, date('d/m/Y', strtotime($mov['dt_movimento'])), 1);
    $pdf->Cell(60, 7, mb_convert_encoding($mov['nm_item'], 'ISO-8859-1', 'UTF-8'), 1);
    $pdf->Cell(25, 7, ucfirst($mov['tp_movimento']), 1);
    $pdf->Cell(25, 7, $mov['qt_movimentada'], 1, 0, 'C');
    $pdf->Cell(50, 7, mb_convert_encoding($mov['nm_usuario'], 'ISO-8859-1', 'UTF-8'), 1);
    $pdf->Ln();
}

$pasta = __DIR__ . '/relatorios/';

// garante que a pasta existe antes de salvar
if (!file_exists($pasta)) {
    mkdir($pasta, 0777, true);
}

$caminhoArquivo = $pasta . 'relatorio_' . date('Y_m', strtotime($inicio)) . '.pdf';
$pdf->Output('F', $caminhoArquivo);

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

    $mail->addAttachment($caminhoArquivo);

    $mail->isHTML(true);
    $mail->Subject = 'Relatório Mensal de movimentações - Inventarium SHB';
    $mail->Body = '<p>Segue em anexo o relatório de movimentções do mês.</p>';

    $mail->send();
    echo "Email enviado com sucesso.";
} catch (Exception $e) {
    echo "Erro ao enviar email: {$mail->ErrorInfo}";
}

$conn = null;
// echo "Relatorio gerado: $caminhoArquivo";

?>