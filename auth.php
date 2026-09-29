<?php
function exigirLogin()
{
    if (!isset($_SESSION['usuario_id'])) {
        header('Location: login.html');
        exit;
    }
}

function exigirGestao()
{
    exigirLogin();
    if ($_SESSION['usuario_tipo'] !== 'gestao') {
        http_response_code(403);
        die('Acesso negado: essa ação é restrita ao time de gestão.');
    }
}

function ehGestao()
{
    // sem travar a página como exigirGestao() faz. Apenas retorna true or false
    return isset($_SESSION['usuario_tipo']) && $_SESSION['usuario_tipo'] === 'gestao';
}
?>