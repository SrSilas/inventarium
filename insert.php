<?php
session_start();

if (!isset($_SESSION['usuario_id'])) {
  die('Acesso negado. Faça login primeiro.');
}

include('conexao.php');
$nome = $_POST['nome'];
$tipo = $_POST['tipo'];
$quant = $_POST['quantidade'];
$valor = $_POST['valor'];

$query = "INSERT INTO material_manutencao (nm_item, ds_tipo, qt_itens, vl_unitario) VALUES (:nome, :tipo, :quant, :valor);";

try {
  $stmt = $conn->prepare($query);
  $stmt->bindParam(':nome', $nome);
  $stmt->bindParam(':tipo', $tipo);
  $stmt->bindParam(':quant', $quant);
  $stmt->bindParam(':valor', $valor);

  $stmt->execute();

  $codigoNovoItem = $conn->lastInsertId();

  $queryMov = "INSERT INTO movimentacao (cd_item, cd_usuario, tp_movimento, qt_movimentada) VALUES (:cd_item, :cd_usuario, 'entrada', :qt)";
  $stmtMov = $conn->prepare($queryMov);
  $stmtMov->bindParam(':cd_item', $codigoNovoItem);
  $stmtMov->bindParam(':cd_usuario', $_SESSION['usuario_id']);
  $stmtMov->bindParam(':qt', $quant);
  $stmtMov->execute();

  echo "<script>
            alert('Inserido com sucesso!');
            window.location.href = 'index.php';
          </script>";
} catch (PDOException $e) {
  echo "<script>
            alert('Erro ao inserir: " . addslashes($e->getMessage()) . "');
            window.location.href = 'index.php';
          </script>";
}

$conn = null;
//if (mysqli_query($conn, $query)) {
//    echo "Inserido com sucesso";
//} else {
//    echo "Erro" . mysqli_error($conn);
//}

//mysqli_close($conn);
?>