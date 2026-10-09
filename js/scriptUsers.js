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