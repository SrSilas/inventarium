<?php
session_start();

header('Cache-Control: no-cache, no-store, must-revalidate');
header('Pragma: no-cache');
header('Expires: 0');

if (!isset($_SESSION['usuario_id'])) {
    header('Location: login.html');
    exit;
}

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
    <link rel="icon" type="image/svg+xml" href="img/LogoSHB.jpg">
    <link rel="stylesheet" href="css/style.css">
    <script src="js/script.js" defer></script>
    <title>Inventarium SHB</title>
</head>

<body>
    <header>
        <img src="img/logoInvent.png" alt="">
        <a href="logout.php" class="botao" id="btn-logout">Sair</a>
    </header>
    <main>
    <!------------------ Forms -------------------->
    <div id="form-insert">
        <h2>Inserir material</h2>
        <form method="POST" action="insert.php">
            <p>Nome do item</p>
            <input type="text" placeholder="Preencha o item" name="nome" required>
            <p>Tipo do item</p>
            <select name="tipo" required>
                <option value="">Selecione o tipo</option>
                <option value="Elétrico">Elétrico</option>
                <option value="Hidráulico">Hidráulico</option>
                <option value="Insumos">Insumos</option>
            </select>
            <p>Quantidade</p>
            <input type="number" placeholder="Quantidade" name="quantidade" min="0" step="1" required>
            <p>Valor Unitário</p>
            <input type="number" placeholder="Valor" name="valor" min="0" step="0.01" required>
            <p>Quantidade Mínima (alerta)</p>
            <input type="number" name="qt_minima" min="0" step="1" required>
            <div id="div-btn-form">
                <input type="submit" value="Guardar" class="botao">
                <button type="button" class="botao" id="btn-cancelar-inserir">Cancelar</button>
            </div>
        </form>
    </div>
    <div id="overlay"></div>
    <div id="form-remove">
        <h2>Saída de material</h2>
        <form method="POST" action="delete.php">
            <p>Código do item</p>
            <input type="number" placeholder="Código do item..." name="codigo" min="0" step="1" required>
            <p>Quantidade a retirar</p>
            <input type="number" placeholder="Quantidade..." name="quantidade" min="1" step="1" required>
            <div id="div-btn-form">
                <input type="submit" value="Retirada" class="botao" id="btn-delete">
                <button type="button" class="botao" id="btn-cancelar-remover">Cancelar</button>
            </div>
        </form>
    </div>
    <div id="form-update">
        <h2>Editar material</h2>
        <form method="POST" action="update.php">
            <input type="hidden" name="codigo" id="update-codigo">
            <p>Nome do item</p>
            <input type="text" name="nome" id="update-nome" required>
            <p>Tipo do item</p>
            <select name="tipo" id="update-tipo" required>
                <option value="">Selecione o tipo</option>
                <option value="Elétrico">Elétrico</option>
                <option value="Hidráulico">Hidráulico</option>
                <option value="Insumos">Insumos</option>
            </select>
            <p>Quantidade</p>
            <input type="number" name="quantidade" id="update-quantidade" min="0" step="1" required>
            <p>Valor Unitário</p>
            <input type="number" name="valor" id="update-valor" min="0" step="0.01" required>
            <p>Quantidade Mínima (alerta)</p>
            <input type="number" name="qtMin" id="update-qtmin" min="0" step="1" required>
            <div id="div-btn-form">
                <input type="submit" value="Salvar" class="botao">
                <button type="button" class="botao" id="btn-cancelar-update">Cancelar</button>
            </div>
        </form>
    </div>
    <!---------------------------- Lista de materiais do banco --------------------------->
    <div id="lista">
        <div id="div-filtro">
            <input type="text" id="filtro-nome" placeholder="Buscar por nome">
            <select id="filtro-tipo">
                <option value="">Todos</option>
                <option value="Elétrico">Elétrico</option>
                <option value="Hidráulico">Hidráulico</option>
                <option value="Insumos">Insumos</option>
            </select>
            <div id="div-btn-filtro">
                <button type="button" id="btn-buscar" class="botao">
                    <span class="texto-botao">Buscar</span>
                    <img src="icons/search.svg" alt="Buscar" class="icone-botao">
                </button>
                <button type="button" id="btn-limpar-filtro" class="botao">
                    <span class="texto-botao">Limpar</span>
                    <img src="icons/clear.svg" alt="Limpar" class="icone-botao">
                </button>
            </div>
        </div>
        <h2>Materiais em estoque</h2>
        <div id="div-btn-funcao">
            <button class="botao" id="btn-adicionar">Adicionar</button>
            <button class="botao" id="btn-remover">Retirar</button>
        </div>
        <table>
            <tbody id="corpo-tabela">
                <?php foreach ($itens as $item): ?>
                <tr>
                    <td>
                        <div class="item">
                            <p>Código</p>
                            <?= $item['cd_codigo'] ?>
                        </div>
                        <div class="item">
                            <p>Item</p>
                            <span title="<?= $item['nm_item'] ?>"><?= $item['nm_item'] ?></span>
                        </div>
                        <div class="item">
                            <p>Tipo</p>
                            <?= $item['ds_tipo'] ?>
                        </div>
                        <div class="item <?= $item['qt_itens'] == 0 ? 'item-zerado' : '' ?>">
                            <p>Quantidade</p>
                            <?= $item['qt_itens'] ?>
                        </div>
                        <div class="item">
                            <p>Valor Unitário</p>
                            <?= number_format($item['vl_unitario'], 2, ',', '.') ?>
                        </div>
                        <div class="item">
                            <button type="button" class="btn-icon btn-editar" data-codigo="<?= $item['cd_codigo'] ?>"
                                data-nome="<?= $item['nm_item'] ?>" data-tipo="<?= $item['ds_tipo'] ?>"
                                data-quantidade="<?= $item['qt_itens'] ?>" data-valor="<?= $item['vl_unitario']?>" data-qtmin="<?= $item['qt_minima']?>">
                                <img src="icons/pencil.svg" alt="Editar">
                            </button>
                            <!-- <button type="button" class="btn-icon btn-excluir" data-codigo="<?= $item['cd_codigo'] ?>">
                                <img src="icons/trash.svg" alt="Editar">
                            </button> -->
                            </div>
                        </td>
                    </tr>
                <?php endforeach ?>
            </tbody>
        </table>
    </div>
    </main>
    <footer>
        <p>Created by <a>Israel Silas</a></p>
    </footer>
</body>

</html>