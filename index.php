<?php
include('conexao.php');

$query = "SELECT * FROM material_manutencao";

try {
    $stmt = $conn->prepare($query);
    $stmt->execute();
    $itens = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    die("Erro ao buscar dados: " . $e->getMessage());
}
$conn = null;
?>
<!DOCTYPE html>
<html lang="pt-br   ">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <title>Inventarium SHB</title>
</head>

<body>
    <h2>Inserir material</h2>
    <form method="POST" action="insert.php">
        <p>Nome do item</p>
        <input type="text" placeholder="Preencha o item" name="nome">
        <p>Tipo do item</p>
        <input type="text" placeholder="Tipo do item" name="tipo">
        <p>Quantidade</p>
        <input type="text" placeholder="Quantidade" name="quantidade">
        <p>Valor Unitário</p>
        <input type="text" placeholder="Valor" name="valor">
        <input type="submit" value="Guardar" class="botao">
    </form>

    <h2>Saída de material</h2>
    <form method="POST" action="delete.php">
        <p>Código do item</p>
        <input type="text" placeholder="Código do item..." name="codigo">
        <input type="submit" value="Retirada" class="botao">
    </form>
    <div id="lista">
        <h1>Materiais em estoque</h1>
        <table>
            <tbody>
                <?php foreach ($itens as $item): ?>
                    <tr>
                        <td>
                            <div class="item">
                                <p>Código</p>
                                <?= $item['cd_codigo'] ?>
                            </div>
                            <div class="item">
                                <p>Item</p>
                                <?= $item['nm_item'] ?>
                            </div>
                            <div class="item">
                                <p>Tipo</p>
                                <?= $item['ds_tipo'] ?>
                            </div>
                            <div class="item">
                                <p>Quantidade</p>
                                <?= $item['qt_itens'] ?>
                            </div>
                            <div class="item">
                                <p>Valor Unitário</p>
                                <?= number_format($item['vl_unitario'], 2, ',', '.') ?>
                            </div>
                        </td>
                    </tr>
                <?php endforeach ?>
            </tbody>
        </table>
    </div>
</body>

</html>