<?php
session_start();

if (!isset($_SESSION['usuario_id'])) {
    die('Acesso negado. Faça login primeiro.');
}

include('conexao.php');
$cod = $_POST['codigo'];

$query = "DELETE FROM material_manutencao WHERE cd_codigo = :cod ;";

try {
    $stmt = $conn->prepare($query);
    $stmt->bindParam(":cod", $cod);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        echo "<script>
            alert('Retirado com sucesso!');
            window.location.href = 'index.php';
        </script>";
    } else {
        echo "<script>
            alert('Produto não encontrado. Verifique o código informado. ');
            window.location.href = 'index.php';
        </script>";
    }
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
?>