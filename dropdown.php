<?php
    function renderDropdown(array $opcoes, array $dados = [], string $classe = 'item', string $textoBotao = ''): void {
        $attrs = '';
        foreach ($dados as $chave => $valor){
            $attrs .= 'data-' . $chave . '="' . htmlspecialchars((string)$valor, ENT_QUOTES) . '"';
        }
        $comTexto = $textoBotao !== '';
        ?>
    <div class="item dropdown">
        <button type="button" class="btn-dropdown <?= $comTexto ? 'btn-texto' : 'btn-icon' ?>" <?= $attrs ?>>
            <?php if($comTexto): ?>
                <?= htmlspecialchars($textoBotao)?> <span class="seta">▾</span>
            <?php else: ?>
                <img src="icons/three-dots.svg" alt="Opções">
            <?php endif; ?>    
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