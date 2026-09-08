<?php
session_start();

if (!isset($_SESSION['usuario_id'])) {
    die('Acesso negado. Faça login primeiro.');
}

include('conexao.php');

$codigo = $_POST['codigo'];
$nome = $_POST['nome'];
$tipo = $_POST['tipo'];
$quant = $_POST['quantidade'];
$valor = $_POST['valor'];
$qtMin = $_POST['qtMin'];

$query = "UPDATE material_manutencao SET nm_item = :nome, ds_tipo = :tipo, qt_itens = :quant, vl_unitario = :valor, qt_minima = :qtMin WHERE cd_codigo = :codigo";

try {
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':nome', $nome);
    $stmt->bindParam(':tipo', $tipo);
    $stmt->bindParam(':quant', $quant);
    $stmt->bindParam(':valor', $valor);
    $stmt->bindParam(':codigo', $codigo);
    $stmt->bindParam('qtMin', $qtMin);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        echo "<script>
                    alert('Atualizado com sucesso!');
                    window.location.href = 'index.php';
              </script>";
    } else {
        "<script>
                alert('Nenhuma alteração feita ou item não encontrado!');
                window.location.href = 'index.php';
         </script>";
    }
} catch (PDOException $e) {
    "<script>
            alert('Erro ao atualizar: ' " . addslashes($e->getMessage()) . "');
            window.location.href = 'index.php';
     </script>";
}

$conn = null;
?>