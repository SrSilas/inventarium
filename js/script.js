const btnAdicionar = document.getElementById('btn-adicionar');
const btnCancelarInsert = document.getElementById('btn-cancelar-inserir');
const btnCancelarRemover = document.getElementById('btn-cancelar-remover');
const btnRemover = document.getElementById('btn-remover');
const formInsert = document.getElementById('form-insert');
const formRemover = document.getElementById('form-remove');
const overlay = document.getElementById('overlay');

btnAdicionar.addEventListener('click', function(){
    formInsert.classList.toggle('visivel');
    overlay.classList.toggle('visivel');
});

btnRemover.addEventListener('click', function(){
    formRemover.classList.toggle('visivel');
    overlay.classList.toggle('visivel');
});

btnCancelarInsert.addEventListener('click', function(){
    formInsert.classList.remove('visivel');
    overlay.classList.remove('visivel');
});

btnCancelarRemover.addEventListener('click', function(){
    formRemover.classList.remove('visivel');
    overlay.classList.remove('visivel');
});

document.addEventListener('click', function(event) {
    const cliqueForaDoFormInsert = !formInsert.contains(event.target);
    const cliqueForaDoFormRemover = !formRemover.contains(event.target);
    const CliqueForaDoBotaoAdicionar = !btnAdicionar.contains(event.target);
    const CliqueForaDoBotaoRemover = !btnRemover.contains(event.target);

    if(cliqueForaDoFormInsert && CliqueForaDoBotaoAdicionar && cliqueForaDoFormRemover && CliqueForaDoBotaoRemover){
        formInsert.classList.remove('visivel');
        formRemover.classList.remove('visivel');
        overlay.classList.remove('visivel');
    }
})