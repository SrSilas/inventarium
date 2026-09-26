# Invetarium SHB

Sistema de controle de inventário desenvolvido em PHP, com geração automática de relatórios mensais em PDF, envio por e-mail e controle de acesso por sessões de usuário.

## Funcionalidades

- **Listagem de itens** com código, nome, tipo, quantidade em estoque, valor unitário e quantidade mínima de alerta.
- **Filtro/busca dinâmica** por nome e tipo, via AJAX (`fetch`), sem recarregar a página.
- **Cadastro de novo item** (inserção).
- **Edição de item** existente (nome, tipo, quantidade, valor, quantidade mínima).
- **Entrada de estoque** — adiciona uma quantidade informada ao total atual do item.
- **Saída de estoque** — subtrai uma quantidade informada do total atual do item.
- **Alerta de quantidade mínima** — itens com estoque zerado ou abaixo do mínimo são sinalizados visualmente na listagem.
- **Relatório mensal em PDF** (via [FPDF](http://www.fpdf.org/)), detalhado por item e responsável.
- **Envio automático do relatório por e-mail** (via [PHPMailer](https://github.com/PHPMailer/PHPMailer)), com o PDF anexado.
- **Controle de acesso por sessões**, com permissões diferenciadas por usuário (alguns com acesso a certas ações, outros não).

## Tecnologias utilizadas

| Camada | Tecnologia |
|---|---|
| Back-end | PHP |
| Front-end | HTML, CSS, JavaScript (vanilla) |
| Banco de dados | MySQL *(ajustar se for outro)* |
| Geração de PDF | FPDF |
| Envio de e-mail | PHPMailer |
| Sessões/autenticação | Sessões nativas do PHP |

## Estrutura do projeto

```
Invetarium SHB/
├── index.php              # Listagem principal de itens
├── filtro.php             # Endpoint AJAX de busca/filtro
├── update.php             # Processa edição de item
├── adicionar.php          # Processa entrada de estoque
├── delete.php             # Processa saída de estoque
├── relatorio_mensal.php   # Geração do relatório em PDF + envio por e-mail
├── script.js              # Lógica de interface (forms, dropdowns, filtro, validações)
├── style.css              # Estilos da aplicação
└── ...
```

> Ajuste esta árvore conforme os nomes/pastas reais do seu projeto.

## Como funciona (visão técnica)

### Fluxo de edição/entrada/saída

Cada linha da tabela de itens tem um botão de menu (⋮) que abre um dropdown com três ações: **Editar**, **Adicionar** e **Retirar**. Os dados do item ficam armazenados em atributos `data-*` no próprio botão (`data-codigo`, `data-nome`, `data-tipo`, `data-quantidade`, `data-valor`, `data-qtmin`), lidos via `dataset` no JavaScript.

- **Editar** pré-carrega os valores atuais do item no formulário, permitindo sobrescrevê-los.
- **Adicionar/Retirar** abrem formulários próprios, onde o usuário informa apenas a quantidade da operação (não o valor final) — o back-end soma ou subtrai esse valor do estoque atual.

A listagem usa **delegação de eventos**: um único listener de clique no `<tbody>` (`corpoTabela`) trata os cliques em todos os botões de ação, incluindo os itens carregados dinamicamente pelo filtro AJAX.

### Filtro

O filtro busca no `filtro.php` via `fetch`, recebe um JSON com os itens correspondentes e reconstrói as linhas da tabela via `innerHTML`, mantendo os mesmos atributos `data-*` para que as ações (editar/adicionar/retirar) continuem funcionando normalmente nos resultados filtrados.

### Relatório mensal

`relatorio_mensal.php` gera um PDF via FPDF com o detalhamento dos itens e responsáveis, e o envia automaticamente por e-mail (PHPMailer) com o arquivo anexado.

## Instalação

```bash
# Clonar o repositório
git clone <url-do-repositorio>

# Instalar dependências via Composer (FPDF, PHPMailer)
composer install

# Configurar variáveis de ambiente / conexão com banco
# (ajustar conforme o arquivo de config do projeto)

# Importar o schema do banco de dados
mysql -u usuario -p nome_do_banco < schema.sql

# Subir servidor local de desenvolvimento
php -S localhost:8000
```

> Ajuste os comandos conforme a configuração real do projeto (gerenciador de dependências, nome do arquivo de schema, etc).

## Configuração

Antes de rodar o projeto, configure:

- **Conexão com o banco de dados** (host, usuário, senha, nome do banco).
- **Credenciais de SMTP** para o envio de e-mail via PHPMailer (host, porta, usuário, senha).
- **Sessões/permissões** de usuário, conforme a regra de negócio de cada perfil de acesso.

## Roadmap

- [ ] Sistema de perfis de usuário com permissões granulares por ação
- [ ] Refino do CSS/layout
- [ ] *(adicionar próximos passos conforme o projeto evolui)*

## Autor

Israel Silas
