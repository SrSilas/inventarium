<?php
session_start();
include('auth.php');
include('conexao.php');

exigirGestao();

$query = "SELECT cd_usuario, nm_usuario, ds_login FROM users";
try {
    $stmt = $conn->prepare($query);
    $stmt->execute();
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    die("Erro ao busca dados: " . $e->getMessage());
}
$conn = null;
?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/svg+xml" href="img/LogoSHB.jpg">
    <link rel="stylesheet" href="css/style.css">
    <script src="js/scriptUsers.js" defer></script>
    <title>Gestão de Usuários</title>
</head>

<body id="painelUser">
    <header>
        <img src="img/logoInvent.png" alt="">
        <a href="logout.php" class="botao" id="btn-logout">Sair</a>
    </header>
    <main>
        <div id="overlay"></div>
        <!-- Form cadastro -->
        <div id="form-cadastro">
            <h2>Novo Usuário</h2>
            <form method="POST" action="cadastro.php">
                <p>Nome do usuário</p>
                <input type="text" placeholder="Colaborador" name="codigo" id="entrada-codigo">
                <p>Login</p>
                <input type="number" placeholder="Login do Usuário" name="quantidade-adc" id="entrada-quantidade">
                <div id="div-btn-form">
                    <input type="submit" value="Criar" class="botao" id="btn-increment">
                    <button type="button" class="botao" id="btn-cancelar-user">Cancelar</button>
                </div>
            </form>
        </div>
        <div id="lista-user">
            <h2>Gestão de Usuários</h2>
            <div id="div-filtro-user">
                <input type="text" id="filtro-nome-user" placeholder="Buscar por nome">
                <div id="div-btn-filtro-user">
                    <button type="button" id="btn-buscar" class="botao">
                        <span class="texto-botao">Buscar</span>
                        <img src="icons/search.svg" alt="Buscar" class="icone-botao">
                    </button>
                    <button type="button" id="btn-cadastrar-user" class="botao">
                        <span class="texto-botao">Cadastrar</span>
                        <img src="icons/search.svg" alt="Buscar" class="icone-botao">
                    </button>
                </div>
            </div>
            <table>
                <tbody id="corpo-tabela-user">
                    <tr>
                        <th>
                            <div class="item-user">
                                <p>Código</p>
                            </div>
                            <div class="item-user">
                                <p>Nome</p>
                            </div>
                            <div class="item-user">
                                <p>Login</p>
                            </div>
                        </th>
                    </tr>
                    <?php foreach ($users as $user): ?>
                        <tr>
                            <td id="td-user">
                                <div class="item">
                                    <span title="<?= $user['cd_usuario'] ?>"><?= $user['cd_usuario'] ?></span>
                                </div>
                                <div class="item">
                                    <span title="<?= $user['nm_usuario'] ?>"><?= $user['nm_usuario'] ?></span>
                                </div>
                                <div class="item">
                                    <span title="<?= $user['ds_login'] ?>"><?= $user['ds_login'] ?></span>
                                </div>
                            </td>
                        </tr>
                    <?php endforeach ?>
                </tbody>
            </table>
    </main>
</body>

</html>