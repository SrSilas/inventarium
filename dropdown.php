<?php
    function renderDropdown(array $opcoes, array $dados = [], string $classe = 'item', string $icone='icons/three-dots.svg', string $alt= 'Opções'): void {
        $attrs = '';
        foreach ($dados as $chave => $valor){
            $attrs .= 'data-' . $chave . '="' . htmlspecialchars((string)$valor, ENT_QUOTES) . '"';
        }
        ?>
    <div class="<?= htmlspecialchars($classe) ?> dropdown">
        <button type="button" class="btn-dropdown btn-icon" <?= $attrs ?>>
                <img src="<?= htmlspecialchars($icone) ?>" alt="<?= htmlspecialchars($alt) ?>">    
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