<?php
session_start();
include('conexao.php');
include('auth.php');

exigirLogin();

$user = $_SESSION['usuario_id'];
$pass = password_hash($_POST['nova_senha'], PASSWORD_DEFAULT);

try{
    $queryUpdatePass = "UPDATE users SET ds_senha = :pass WHERE cd_usuario = :user";
    $stmtUpdatePass = $conn->prepare($queryUpdatePass);
    $stmtUpdatePass->bindParam(":pass", $pass);
    $stmtUpdatePass->bindParam(":user", $user);
    $stmtUpdatePass->execute();
    
    echo"<script>
            alert('Senha alterada com sucesso!');
            window.location.href = 'index.php';
        </script>";  
}catch(PDOException $e){
        echo "<script>
            alert('Erro ao trocar a senha: " . addslashes($e->getMessage()) . "');
            window.location.href = 'index.php';
          </script>";
}

$conn = null;


?>