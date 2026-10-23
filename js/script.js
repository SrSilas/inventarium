// ==========================================
// Declarações globais
// ==========================================

// Forms e overlay
const formUpdate = document.getElementById('form-update');
const formInsert = document.getElementById('form-insert');
const formRemover = document.getElementById('form-remove');
const formEntrada = document.getElementById('form-increment');
const overlay = document.getElementById('overlay');

// Botões de abrir/cancelar
const btnAdicionar = document.getElementById('btn-adicionar');
const btnExcluir = document.getElementById('btn-excluir');
const btnCancelarInsert = document.getElementById('btn-cancelar-inserir');
const btnCancelarRemover = document.getElementById('btn-cancelar-remover');
const btnCancelarIncrement = document.getElementById('btn-cancelar-increment');
const btnCancelarUpdate = document.getElementById('btn-cancelar-update');
const btnCancelarExcluir = document.getElementById('btn-cancelar-excluir');

// Campos de formulário de edição(update)
const updateCodigo = document.getElementById('update-codigo');
const saidaCodigo = document.getElementById('saida-codigo');
const saidaQuantidade = document.getElementById('saida-quantidade');
const entradaCodigo = document.getElementById('entrada-codigo');
const entradaQuantidade = document.getElementById('entrada-quantidade');
const updateNome = document.getElementById('update-nome');
const updateTipo = document.getElementById('update-tipo');
const updateQuantidade = document.getElementById('update-quantidade');
const updateValor = document.getElementById('update-valor');
const updateQtMinima = document.getElementById('update-qtmin');

//Filtro/busca
const btnBuscar = document.getElementById('btn-buscar');
const filtroNome = document.getElementById('filtro-nome');
const filtroTipo = document.getElementById('filtro-tipo');
const corpoTabela = document.getElementById('corpo-tabela');
const btnLimparFiltro = document.getElementById('btn-limpar-filtro');
const btnBuscarUser = document.getElementById('btn-buscar-user');
const btnCadastrarUser = document.getElementById('btn-cadastrar-user');
const corpoTabelaUser = document.getElementById('corpo-tabela-user');

//Campos Númericos (Validações de digitação)
const camposNumericos = document.querySelectorAll('input[type="number"]');
const campoValor = document.querySelector('input[name="valor"]');

// ==========================================
// Listeners
// ==========================================
if(btnAdicionar){
    btnAdicionar.addEventListener('click', function(){
        formInsert.classList.toggle('visivel');
        overlay.classList.toggle('visivel');
    });    
}
if(btnExcluir){
    btnExcluir.addEventListener('click', function(){
        formExcluir.classList.toggle('visivel');
        overlay.classList.toggle('visivel');
    });
}

btnCancelarInsert.addEventListener('click', function(){
        formInsert.classList.remove('visivel');
         overlay.classList.remove('visivel');
});


btnCancelarRemover.addEventListener('click', function(){
    formRemover.classList.remove('visivel');
    overlay.classList.remove('visivel');
});

btnCancelarUpdate.addEventListener('click', function(){
    formUpdate.classList.remove('visivel');
    overlay.classList.remove('visivel');
});

btnCancelarIncrement.addEventListener('click', function(){
    formEntrada.classList.remove('visivel');
    overlay.classList.remove('visivel');
});

// ==========================================
// Fechar Forms
// ==========================================
document.addEventListener('click', function(event) {

    const cliqueForaDoFormInsert = !formInsert.contains(event.target);
    const cliqueForaDoFormUpdate= !formUpdate.contains(event.target);
    const cliqueForaDoFormEntrada = !formEntrada.contains(event.target);
    const cliqueForaDoFormRemover = !formRemover.contains(event.target);
    const cliqueForaDoBotaoAdicionar = !btnAdicionar.contains(event.target);
    const cliqueForaDoBotaoUpdate = !event.target.closest('.btn-abrir-editar, .btn-abrir-entrada, .btn-abrir-saida');

    if(cliqueForaDoFormInsert && cliqueForaDoBotaoAdicionar && cliqueForaDoFormUpdate && cliqueForaDoBotaoUpdate && cliqueForaDoFormEntrada && cliqueForaDoFormRemover){
        formInsert.classList.remove('visivel');
        formRemover.classList.remove('visivel');
        formUpdate.classList.remove('visivel');
        formEntrada.classList.remove('visivel');
        overlay.classList.remove('visivel'); 
    }
})

// ==========================================
// Validação dos campos númericos
// ==========================================
camposNumericos.forEach(function(campo){
    campo.addEventListener('keypress', function(event){
        const tecla = event.key;
        const permitido = /[0-9.]/.test(tecla);

        if(!permitido){
            event.preventDefault();
        }
    });
});

campoValor.addEventListener('input', function(){
    const partes = this.value.split('.');
    if(partes[1] && partes[1].length > 2){
        this.value = partes[0] + '.' + partes['1'].slice(0,2);
    }
});

// ==========================================
// Filtro da lista
// ==========================================


btnBuscar.addEventListener('click', function(){
    const nome = filtroNome.value;
    const tipo = filtroTipo.value;

    fetch(`filtro.php?nome=${encodeURIComponent(nome)}&tipo=${encodeURIComponent(tipo)}`)
    .then(function(resposta) {
        return resposta.json();
    })
    .then(function(itens) {
        corpoTabela.innerHTML = '';

        itens.forEach(function(item){
            const linha = document.createElement('tr');
            linha.innerHTML = `
                <td>
                    <div class="item"><p>Código</p>${item.cd_codigo}</div>
                    <div class="item"><p>Item</p><span title="${item.nm_item}">${item.nm_item}</span></div>
                    <div class="item"><p>Tipo</p>${item.ds_tipo}</div>
                    <div class="item"><p>Quantidade</p>${item.qt_itens}</div>
                    <div class="item"><p>Valor Unitário</p>${parseFloat(item.vl_unitario).toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                    <div class="item"><p>Quantidade Mínima</p>${item.qt_minima}</div>
                    <div class="item">
                         <div class="item">
                            <button type="button" class="btn-icon btn-menu-item" data-codigo="<?= $item['cd_codigo'] ?>"
                                data-nome="<?= $item['nm_item'] ?>" data-tipo="<?= $item['ds_tipo'] ?>"
                                data-quantidade="<?= $item['qt_itens'] ?>" data-valor="<?= $item['vl_unitario']?>" data-qtmin="<?= $item['qt_minima']?>">
                                <img src="icons/three-dots.svg" alt="Opções">
                            </button>
                         <div class="dropdown-menu">
                                <?php if(ehGestao()): ?>
                                    <button type="button" class="dropdown-opcao btn-abrir-editar">Editar</button>
                                <?php endif; ?>    
                                <button type="button" class="dropdown-opcao btn-abrir-entrada">Adicionar</button>
                                <button type="button" class="dropdown-opcao btn-abrir-saida">Retirar</button>
                        </div>
                    </div>    
                </td>
            `;
            corpoTabela.appendChild(linha);
        });
    })
    .catch(function(erro){
        console.error('Erro ao buscar:', erro);
    });
});

btnLimparFiltro.addEventListener('click', function() {
    filtroNome.value = '';
    filtroTipo.value = '';
    btnBuscar.click();
});


// ==========================================
// mêcanica do dropdown
// ==========================================

const acoesDropdown = {};

function registrarAcoes(mapa){
    Object.assign(acoesDropdown, mapa);
}

document.addEventListener('click', function(event){
    const btn = event.target.closest('.btn-dropdown');
    const opcao = event.target.closest('.dropdown-opcao');
    const menuDoBotao = btn ? btn.nextElementSibling : null;

    // Fechar todos os dropdowns, menos o do botao clicado
    document.querySelectorAll('.dropdown-menu.aberto').forEach(m => {
        if(m !== menuDoBotao) m.classList.remove('aberto');
    });

    if(btn){
        const vaiAbrir = !menuDoBotao.classList.contains('aberto');
        menuDoBotao.classList.toggle('aberto');
        if(vaiAbrir) posicionarMenu(btn, menuDoBotao);
        return;
    }

    if(opcao){
        const dados = opcao.closest('.dropdown').querySelector('.btn-dropdown').dataset;
        const acao = acoesDropdown[opcao.dataset.acao];

        if(acao){
            acao(dados);
        } else {
            console.warn('Ação de dropdwon não registrada:',acao.dataset.acao);
        }
            
        opcao.closest('.dropdown-menu').classList.remove('aberto');
    }

});

function posicionarMenu(btn, menu){
    const r = btn.getBoundingClientRect(); //posicao do botao na janela
    const m = menu.getBoundingClientRect(); //posicao do menu (já visivel)

    let top = r.bottom + 4; //abre embaixo do botao
    let left = r.right - m.width; //alinha a direita do botao

    if(top + m.height > window.innerHeight){
        top = r.top - m.height - 4; // sem espaço embaixo, abre acima do botao
    }

    if(left < 8) left = 8; //nao ultrapassa a esquerda da tela

    menu.style.top = top + 'px';
    menu.style.left = left + 'px';
}

function fecharMenus(){
    document.querySelectorAll('dropdown-menu.aberto').forEach(m => m.classList.remove('aberto'));
}

//com fixed, o menu não acompanha o botão ao rolar a tela, então reposiciona
window.addEventListener('resize', fecharMenus);
window.addEventListener('scroll', fecharMenus, true);

// ==========================================
// ações da tela de itens
// ==========================================

registrarAcoes({
    editar(d){
        updateCodigo.value     = d.codigo;
        updateNome.value       = d.nome;
        updateTipo.value       = d.tipo;
        updateQuantidade.value = d.quantidade;
        updateValor.value      = d.valor;
        updateQtMinima.value   = d.qtmin;
        formUpdate.classList.toggle('visivel');
        overlay.classList.toggle('visivel');
    },
    entrada(d){
        entradaCodigo.value = d.codigo;
        formEntrada.classList.toggle('visivel');
        overlay.classList.toggle('visivel');
    },
    saida(d){
        saidaCodigo.value = d.codigo;
        formRemover.classList.toggle('visivel');
        overlay.classList.toggle('visivel');
    },
});
