const btnAdicionar = document.getElementById('btn-adicionar');
const btnCancelarInsert = document.getElementById('btn-cancelar-inserir');
const btnCancelarRemover = document.getElementById('btn-cancelar-remover');
const btnCancelarUpdate = document.getElementById('btn-cancelar-update');
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

btnCancelarUpdate.addEventListener('click', function(){
    formUpdate.classList.remove('visivel');
    overlay.classList.remove('visivel');
});

document.addEventListener('click', function(event) {
    const cliqueForaDoFormInsert = !formInsert.contains(event.target);
    const cliqueForaDoFormRemover = !formRemover.contains(event.target);
    const cliqueForaDoFormUpdate= !formUpdate.contains(event.target);
    const cliqueForaDoBotaoAdicionar = !btnAdicionar.contains(event.target);
    const cliqueForaDoBotaoRemover = !btnRemover.contains(event.target);
    const cliqueForaDoBotaoUpdate = !event.target.closest('.btn-editar');

    if(cliqueForaDoFormInsert && cliqueForaDoBotaoAdicionar && cliqueForaDoFormRemover && cliqueForaDoBotaoRemover && cliqueForaDoFormUpdate && cliqueForaDoBotaoUpdate){
        formInsert.classList.remove('visivel');
        formRemover.classList.remove('visivel');
        formUpdate.classList.remove('visivel');
        overlay.classList.remove('visivel');
    }
})

const camposNumericos = document.querySelectorAll('input[type="number"]');
const campoValor = document.querySelector('input[name="valor"');

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

//Filtra a lista ~~~~~~~~~~~~~~~

const btnBuscar = document.getElementById('btn-buscar');
const filtroNome = document.getElementById('filtro-nome');
const filtroTipo = document.getElementById('filtro-tipo');
const corpoTabela = document.getElementById('corpo-tabela');
const btnLimparFiltro = document.getElementById('btn-limpar-filtro');

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
                        <button type="button" class="btn-icon btn-editar"
                            data-codigo="${item.cd_codigo}"
                            data-nome="${item.nm_item}"
                            data-tipo="${item.ds_tipo}"
                            data-quantidade="${item.qt_itens}"
                            data-valor="${item.vl_unitario}"
                            data-qtmin="${item.qt_minima}">
                            <img src="icons/pencil.svg" alt="Editar">
                        </button>
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


// Update ~~~~~~~~~~~~~~~~~

const formUpdate = document.getElementById('form-update');

const UpdateCodigo = document.getElementById('update-codigo');
const updateNome = document.getElementById('update-nome');
const updateTipo = document.getElementById('update-tipo');
const updateQuantidade = document.getElementById('update-quantidade');
const updateValor = document.getElementById('update-valor');
const updateQtMinima = document.getElementById('update-qtmin');

corpoTabela.addEventListener('click', function(event) {
    const botao = event.target.closest('.btn-editar');
    if (!botao) return;

    UpdateCodigo.value = botao.dataset.codigo;
    updateNome.value = botao.dataset.nome;
    updateTipo.value = botao.dataset.tipo;
    updateQuantidade.value = botao.dataset.quantidade;
    updateValor.value = botao.dataset.valor;
    updateQtMinima.value = botao.dataset.qtmin;

    formUpdate.classList.toggle('visivel');
    overlay.classList.toggle('visivel');
});

// Excluir ~~~~~~~~~~~~~~~~~ inativo por hora
