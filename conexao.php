<?php

require_once 'config.php';

try {
    $conn = new PDO("mysql:host=" . DB_HOST . ";port=" . DB_PORT . ";dbname=" . DB_NAME . ";charset=utf8mb4", DB_USER, DB_PASS);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die('Erro na conexão: ' . $e->getMessage());
}
//$conn = mysqli_connect($host, $user, $pass, $bd, $port);

//if (!$conn) {
//    die('Erro na conexão' . mysqli_connect_error());
//}//

?>