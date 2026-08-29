<?php
include('conexao.php');

$nome = $_GET['nome'] ?? '';
$tipo = $_GET['tipo'] ?? '';

$query = "SELECT * FROM material_manutencao WHERE nm_item LIKE :nome AND ds_tipo LIKE :tipo";

try {
    $stmt = $conn->prepare($query);
    $nomeBusca = '%' . $nome . '%';
    $tipoBusca = '%' . $tipo . '%';
    $stmt->bindParam(':nome', $nomeBusca);
    $stmt->bindParam(':tipo', $tipoBusca);
    $stmt->execute();

    $itens = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($itens);
} catch (PDOException $e) {
    echo json_encode(['erro' => $e->getMessage()]);
}

$conn = null;
?>