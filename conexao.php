<?php
$host = 'localhost';
$user = 'root';
$pass = 'root';
$bd = 'inventario_shb';
$port = '3306';

try {
    $conn = new PDO("mysql:host=$host;port=$port;dbname=$bd;charset=utf8mb4", $user, $pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die('Erro na conexão: ' . $e->getMessage());
}
//$conn = mysqli_connect($host, $user, $pass, $bd, $port);

//if (!$conn) {
//    die('Erro na conexão' . mysqli_connect_error());
//}

?>