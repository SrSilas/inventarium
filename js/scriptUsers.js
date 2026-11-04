// ==========================================
// Declarações globais
// ==========================================
const formCadUser = document.getElementById('form-cadastro');
const overlay = document.getElementById('overlay');
const btnBuscarUser = document.getElementById('btn-buscar-user');
const btnCadastrarUser = document.getElementById('btn-cadastrar-user');
const corpoTabelaUser = document.getElementById('corpo-tabela-user');
const btnCancelarUser = document.getElementById('btn-cancelar-user');
const btnBuscar = document.getElementById('btn-buscar-user');
const filtroNomeUser = document.getElementById('filtro-nome-user');
const filtroNome = document.getElementById('filtro-nome-user');
const limparFiltro = document.getElementById('limparFiltro');

// ==========================================
// Listeners
// ==========================================
btnCadastrarUser.addEventListener('click', function(){
    formCadUser.classList.toggle('visivel');
    overlay.classList.toggle('visivel');
});

btnCancelarUser.addEventListener('click', function(){
    formCadUser.classList.remove('visivel');
    overlay.classList.remove('visivel');
})

// ==========================================
// Delegação de eventos na tabela
// ==========================================
document.addEventListener('click', function(event) {

    const cliqueForaDoFormCadastrar = !formCadUser.contains(event.target);
    const cliqueForaDoBotaoCadastrar = !btnCadastrarUser.contains(event.target);

    if(cliqueForaDoFormCadastrar && cliqueForaDoBotaoCadastrar){
        formCadUser.classList.remove('visivel');
        overlay.classList.remove('visivel'); 
    }
})

// ==========================================
// Filtro da lista
// ==========================================
btnBuscarUser.addEventListener('click', function(){
    const nome = filtroNomeUser.value;

    fetch(`filtroUser.php?nome=${encodeURIComponent(nome)}`)
    .then(function(resposta){
        return resposta.json();
    })
    .then(function(itens){
        corpoTabelaUser.innerHTML = ' ';

        itens.forEach(function(item){
            const linha = document.createElement('tr');
            linha.innerHTML = `
             <td id="td-user">
                                <div class="item">
                                    <span title="${item.cd_usuario}">${item.cd_usuario}</span>
                                </div>
                                <div class="item">
                                    <span title="${item.nm_usuario}">${item.nm_usuario}</span>
                                </div>
                                <div class="item">
                                    <span title="${item.ds_login}">${item.ds_login}</span>
                                </div>
                                <div class="item">
                                    <span title="${item.tp_usuario}">${item.tp_usuario}</span>
                                </div>
                                <div class="item">
                                    <span title="${item.ds_email}">${item.ds_email}</span>
                                </div>
                            </td>
            `;
            corpoTabelaUser.appendChild(linha);
        });
    })
    .catch(function(erro){
        console.error('Erro ao buscar:', erro);
    });
});

filtroNome.addEventListener('input', function(){
    limparFiltro.style.display = this.value ? 'block' : 'none';
})

limparFiltro.addEventListener('click', function (){
    filtroNome.value = '';
    btnBuscarUser.click();
})


// ==========================================
// Delegação de eventos na tabela
// ==========================================
document.addEventListener('click', function(event){
    const btnMenu = event.target.closest('.btn-menu-item');
    const menuDoBotao = btnMenu ? btnMenu.nextElementSibling : null;

    //Fecha os menus abertos, menos o do botão que acabou de ser clicado
    document.querySelectorAll('.dropdown-menu.aberto').forEach(m => {
        if(m !== menuDoBotao) m.classList.remove('aberto');
    });

    if(btnMenu){
        menuDoBotao.classList.toggle('aberto');
        return;
    }

    const btnEditar = event.target.closest('.btn-editar-user');
    if(btnEditar){
        const origem = btnEditar.closest('.item-user').querySelector('.btn-menu-item');
        updateCodigo.value = origem.dataset.codigo;
        updateNome.value = origem.dataset.nome;
        updateLogin.value = origem.dataset.login;
        updateTipo.value = origem.dataset.tipo;
        updateEmail.value = origem.dataset.email;
    }
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
    inicio(){window.location.href = 'index.php';},
    resetPass(d){},
    logoff(){window.location.href = 'logout.php';},
});