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
const btnCancelarInsert = document.getElementById('btn-cancelar-inserir');
const btnCancelarRemover = document.getElementById('btn-cancelar-remover');
const btnCancelarIncrement = document.getElementById('btn-cancelar-increment');
const btnCancelarUpdate = document.getElementById('btn-cancelar-update');

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

//Campos Númericos (Validações de digitação)
const camposNumericos = document.querySelectorAll('input[type="number"]');
const campoValor = document.querySelector('input[name="valor"]');

// ==========================================
// Listeners
// ==========================================
btnAdicionar.addEventListener('click', function(){
    formInsert.classList.toggle('visivel');
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

btnCancelarIncrement.addEventListener('click', function(){
    formEntrada.classList.remove('visivel');
    overlay.classList.remove('visivel');
})

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
                        <button type="button" class="btn-icon btn-menu-item"
                            data-codigo="${item.cd_codigo}"
                            data-nome="${item.nm_item}"
                            data-tipo="${item.ds_tipo}"
                            data-quantidade="${item.qt_itens}"
                            data-valor="${item.vl_unitario}"
                            data-qtmin="${item.qt_minima}">
                            <img src="icons/three-dots.svg" alt="Opções">
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

// ==========================================
// Delegação de eventos na tabela
// ==========================================
corpoTabela.addEventListener('click', function(event) {
    
    //menu dropdown de itens    
    const dropdownAberto = document.querySelector('.dropdown-menu.aberto');
    if(dropdownAberto){
        const clicouNoMenu = event.target.closest('.dropdown-menu');
        const clicouNoBotao = event.target.closest('.btn-menu-item');

        if(!clicouNoMenu && !clicouNoBotao){
            dropdownAberto.classList.remove('aberto');
        }
    }
    
    const btnMenu = event.target.closest('.btn-menu-item');
    if(btnMenu){
        const menu = btnMenu.nextElementSibling;
        document.querySelectorAll('.dropdown-menu.aberto').forEach(m => {
            if (m !== menu) m.classList.remove('aberto');
        });
        menu.classList.toggle('aberto');
        return;
    }

     
    const btnEditar = event.target.closest('.btn-abrir-editar');
    if(btnEditar) {
        const botaoOrigem  = btnEditar.closest('.item').querySelector('.btn-menu-item');
        updateCodigo.value = botaoOrigem.dataset.codigo;
        updateNome.value = botaoOrigem.dataset.nome;
        updateTipo.value = botaoOrigem.dataset.tipo;
        updateQuantidade.value = botaoOrigem.dataset.quantidade;
        updateValor.value = botaoOrigem.dataset.valor;
        updateQtMinima.value = botaoOrigem.dataset.qtmin;
        formUpdate.classList.toggle('visivel');
        overlay.classList.toggle('visivel');
        btnEditar.closest('.dropdown-menu').classList.remove('aberto');
        return;

    }

    const btnEntrada  = event.target.closest('.btn-abrir-entrada');
    if(btnEntrada){
        const botaoOrigem = btnEntrada.closest('.item').querySelector('.btn-menu-item');
        entradaCodigo.value = botaoOrigem.dataset.codigo;
        formEntrada.classList.toggle('visivel');
        overlay.classList.toggle('visivel');
        btnEntrada.closest('.dropdown-menu').classList.remove('aberto');
        return;
    }

    const btnSaida = event.target.closest('.btn-abrir-saida');
    if(btnSaida) {
        const botaoOrigem = btnSaida.closest('.item').querySelector('.btn-menu-item');
        saidaCodigo.value = botaoOrigem.dataset.codigo;
        formRemover.classList.toggle('visivel');
        overlay.classList.toggle('visivel');
        btnSaida.closest('.dropdown-menu').classList.remove('aberto');
        return;
    }

});


