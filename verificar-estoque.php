<?php
include('conexao.php');

$query = "SELECT nm_item, qt_itens, qt_minima FROM material_manutencao WHERE qt_itens <= qt_minima AND qt_minima > 0";

try {
    $stmt = $conn->prepare($query);
    $stmt->execute();
    $itensBaixos = $stmt->fetchALL(PDO::FETCH_ASSOC);

    if (count($itensBaixos) > 0) {
        //aqui irá o envio do email
        echo "Itens com estoque baixo encontrados: " . count($itensBaixos);
    } else {
        echo "Nenhum item com estoque baixo";
    }
} catch (PDOException $e) {
    echo "Erro: " . $e->getMessage();
}

$conn = null;
?>