<?php
session_start();
include('auth.php');
include('conexao.php');

exigirGestao();

$nomeUser = $_POST['nome-usuario'];
$loginUser = $_POST['login-usuario'];
$emailUser = $_POST['email-usuario'];
$tipoUser = $_POST['tipo-usuario'];
$senha = password_hash($loginUser . "SHB", PASSWORD_DEFAULT);

$query = "INSERT INTO users (nm_usuario, ds_login, ds_senha, tp_usuario, ds_email) VALUES (:nomeUser, :loginUser, :senhaUser, :tipoUser, :emailUser); ";

try {
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':nomeUser', $nomeUser);
    $stmt->bindParam(':loginUser', $loginUser);
    $stmt->bindParam(':senhaUser', $senha);
    $stmt->bindParam(':tipoUser', $tipoUser);
    $stmt->bindParam(':emailUser', $emailUser);
    $stmt->execute();

    echo "<script>
            alert('Usuário criado com sucesso!');
            window.location.href = 'painelUsuarios.php';
        </script>";
} catch (PDOException $e) {
    echo "<script>
            alert('Erro ao cadastrar: " . addslashes($e->getMessage()) . "');
            window.location.href = 'painelUsuarios.php';
        </script>";
}
$conn = null;
?>