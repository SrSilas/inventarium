<?php
session_start();
include('conexao.php');

$login = $_POST['login'] ?? '';
$senha = $_POST['senha'] ?? '';

$query = "SELECT * FROM users WHERE ds_login = :login";

try {
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':login', $login);
    $stmt->execute();

    $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($usuario && password_verify($senha, $usuario['ds_senha'])) {
        $_SESSION['usuario_id'] = $usuario['cd_usuario'];
        $_SESSION['usuario_nome'] = $usuario['nm_usuario'];

        header('Location: index.php');
        exit;
    } else {
        echo "<script>
                alert('Login ou senha incorretos.');
                window.location.href = 'login.html';
              </script>";
    }

} catch (PDOException $e) {
    echo "<script>
            alert('Erro ao fazer login: " . addslashes($e->getMessage()) . "';
            window.location.href='login.html';
           </script>";
}

$conn = null;
?>