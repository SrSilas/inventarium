<?php
session_start();
include('conexao.php');
include('auth.php');

exigirGestao();

$cod = $_POST['codigo'];
$qdtAdc = $_POST['quantidade-adc'];

$itens = $_POST['incremento'];

try {

    $queryUpdate = "UPDATE material_manutencao SET qt_itens = qt_itens + :qtd WHERE cd_codigo = :cod";
    $stmtUpdate = $conn->prepare($queryUpdate);
    $stmtUpdate->bindParam(":qtd", $qdtAdc);
    $stmtUpdate->bindParam(":cod", $cod);
    $stmtUpdate->execute();

    $queryMov = "INSERT INTO movimentacao (cd_item, cd_usuario, tp_movimento, qt_movimentada) VALUES (:cd_item, :cd_usuario, 'entrada', :qt)";
    $stmtMov = $conn->prepare($queryMov);
    $stmtMov->bindParam(':cd_item', $cod);
    $stmtMov->bindParam(':cd_usuario', $_SESSION['usuario_id']);
    $stmtMov->bindParam(':qt', $qdtAdc);
    $stmtMov->execute();

    echo "<script>
            alert('Adicionado com sucesso!');
            window.location.href = 'index.php';
        </script>";
} catch (PDOException $e) {
    echo "<script>
            alert('Erro ao inserir: " . addslashes($e->getMessage()) . "');
            window.location.href = 'index.php';
          </script>";
}
//if (mysqli_query($conn, $query)) {
//  echo "Deletado com sucesso";
//} else {
//  echo "Erro" . mysqli_error($conn);
//}
//mysqli_close($conn);

$conn = null;
?>