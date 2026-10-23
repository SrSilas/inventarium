<?php
    function renderDropdown(array $opcoes, array $dados = []): void {
        $attrs = '';
        foreach ($dados as $chave => $valor){
            $attrs .= 'data-' . $chave . '="' . htmlspecialchars((string)$valor, ENT_QUOTES) . '"';
        }
        ?>
    <div class="item dropdown">
        <button type="button" class="btn-icon btn-dropdown"<?= $attrs ?>>
            <img src="icons/three-dots.svg" alt="Opções">
        </button>
        <div class="dropdown-menu">
            <?php foreach ($opcoes as $op): ?>
                <button type="button" class="dropdown-opcao"
                        data-acao="<?= htmlspecialchars($op['acao']) ?>">
                    <?= htmlspecialchars($op['rotulo']) ?>
                </button>
            <?php endforeach; ?>
        </div>
    </div>
    <?php
}