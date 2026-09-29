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
    <script src="js/script.js" defer></script>
    <title>Gestão de Usuários</title>
</head>

<body id="painelUser">
    <header>
        <img src="img/logoInvent.png" alt="">
        <a href="logout.php" class="botao" id="btn-logout">Sair</a>
    </header>
    <main>
        <div id="lista">
            <div id="div-filtro">
                <input type="text" id="filtro-nome" placeholder="Buscar por nome">
                <div id="div-btn-filtro">
                    <button type="button" id="btn-buscar" class="botao">
                        <span class="texto-botao">Buscar</span>
                        <img src="icons/search.svg" alt="Buscar" class="icone-botao">
                    </button>
                </div>
            </div>
            <h2>Usuários</h2>
            <table>
                <tbody>
                    <tr>
                        <th>
                            <div class="item">
                                <p>Código</p>
                            </div>
                            <div class="item">
                                <p>Nome</p>
                            </div>
                            <div class="item">
                                <p>Login</p>
                            </div>
                        </th>
                    </tr>
                    <?php foreach ($users as $user): ?>
                        <tr>
                            <td>
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