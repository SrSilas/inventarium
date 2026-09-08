<?php
session_start();

if (!isset($_SESSION['usuario_id'])) {
    die('Acesso negado. Faça login primeiro.');
}

include('conexao.php');
$cod = $_POST['codigo'];
$qdtRetirar = $_POST['quantidade'];

try {
    $queryBusca = "SELECT qt_itens FROM material_manutencao WHERE cd_codigo = :cod";
    $stmtBusca = $conn->prepare($queryBusca);
    $stmtBusca->bindParam(':cod', $cod);
    $stmtBusca->execute();
    $item = $stmtBusca->fetch(PDO::FETCH_ASSOC);

    if (!$item) {
        echo "<script>
                alert('Produto não encontrado. Verifique o código informado.');
                window.location.href = 'index.php';
            </script>";
        exit;
    }

    if ($qdtRetirar > $item['qt_itens']) {
        echo "<script>
                alert('Quantidade insuficiente em estoque.<br>Disponível: " . $item['qt_itens'] . "');
                window.location.href = 'index.php';
            </script>";
        exit;
    }

    $queryUpdate = "UPDATE material_manutencao SET qt_itens = qt_itens - :qtd WHERE cd_codigo = :cod";
    $stmtUpdate = $conn->prepare($queryUpdate);
    $stmtUpdate->bindParam(":qtd", $qdtRetirar);
    $stmtUpdate->bindParam(":cod", $cod);
    $stmtUpdate->execute();

    $queryMov = "INSERT INTO movimentacao (cd_item, cd_usuario, tp_movimento, qt_movimentada) VALUES (:cd_item, :cd_usuario, 'saida', :qt)";
    $stmtMov = $conn->prepare($queryMov);
    $stmtMov->bindParam(':cd_item', $cod);
    $stmtMov->bindParam(':cd_usuario', $_SESSION['usuario_id']);
    $stmtMov->bindParam(':qt', $qdtRetirar);
    $stmtMov->execute();

    echo "<script>
            alert('Retirado com sucesso!');
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