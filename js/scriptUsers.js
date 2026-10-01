// ==========================================
// Declarações globais
// ==========================================
const formCadUser = document.getElementById('form-cadastro');
const overlay = document.getElementById('overlay');
const btnBuscarUser = document.getElementById('btn-buscar-user');
const btnCadastrarUser = document.getElementById('btn-cadastrar-user');
const corpoTabelaUser = document.getElementById('corpo-tabela-user');
const btnCancelarUser = document.getElementById('btn-cancelar-user');

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
// Fechar Forms
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
    
});