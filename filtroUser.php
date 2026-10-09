<?php
session_start();

include('conexao.php');
include('auth.php');

exigirGestao();

$nome = $_GET['nome'] ?? '';

$query = "SELECT * FROM users WHERE nm_usuario LIKE :nome";

try {
    $stmt = $conn->prepare($query);
    $nomeBusca = '%' . $nome . '%';
    $stmt->bindParam(':nome', $nomeBusca);
    $stmt->execute();

    $itens = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($itens);
} catch (PDOException $e) {
    echo json_encode(['erro' => $e->getMessage()]);
}

$conn = null;
?>