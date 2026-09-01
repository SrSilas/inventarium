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
    const CliqueForaDoBotaoAdicionar = !btnAdicionar.contains(event.target);
    const CliqueForaDoBotaoRemover = !btnRemover.contains(event.target);

    if(cliqueForaDoFormInsert && CliqueForaDoBotaoAdicionar && cliqueForaDoFormRemover && CliqueForaDoBotaoRemover){
        formInsert.classList.remove('visivel');
        formRemover.classList.remove('visivel');
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
                    <div class="item"><p>Item</p>${item.nm_item}</div>
                    <div class="item"><p>Tipo</p>${item.ds_tipo}</div>
                    <div class="item"><p>Quantidade</p>${item.qt_itens}</div>
                    <div class="item"><p>Valor Unitário</p>${parseFloat(item.vl_unitario).toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                    <div class="item">
                        <button type="button" class="btn-icon">
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

const botoesEditar = document.querySelectorAll('.btn-editar');
const formUpdate = document.getElementById('form-update');

const UpdateCodigo = document.getElementById('update-codigo');
const updateNome = document.getElementById('update-nome');
const updateTipo = document.getElementById('update-tipo');
const updateQuantidade = document.getElementById('update-quantidade');
const updateValor = document.getElementById('update-valor');

botoesEditar.forEach(function(botao) {
    botao.addEventListener('click', function(){
        UpdateCodigo.value = this.dataset.codigo;
        updateNome.value = this.dataset.nome;
        updateTipo.value = this.dataset.tipo;
        updateQuantidade.value = this.dataset.quantidade;
        updateValor.value = this.dataset.valor;

        formUpdate.classList.toggle('visivel');
        overlay.classList.toggle('visivel');
    });
});
