let nome = document.getElementById("nome");
let sobrenome = document.getElementById("sobrenome");
let endereco = document.getElementById("endereco");
let telefone = document.getElementById("telefone");

let incluir = document.getElementById("incluir");
let editar = document.getElementById("editar");
let salvar = document.getElementById("salvar");
let cancelar = document.getElementById("cancelar");
let excluir = document.getElementById("excluir");

let primeiro = document.getElementById("primeiro");
let anterior = document.getElementById("anterior");
let proximo = document.getElementById("proximo");
let ultimo = document.getElementById("ultimo");

let cadastro = [];
let i = 0;
let modoEdicao = false;

function salvarNoLocalStorage() {
    localStorage.setItem("cadastro", JSON.stringify(cadastro));
}

function carregarDoLocalStorage() {
    const dados = localStorage.getItem("cadastro");
    if (dados) {
        cadastro = JSON.parse(dados);
    } else {
        cadastro = [];
    }
}

function desabilitaTudo() {
    nome.disabled = true;
    sobrenome.disabled = true;
    endereco.disabled = true;
    telefone.disabled = true;
    salvar.disabled = true;
    editar.disabled = true;
    excluir.disabled = true;
    cancelar.disabled = true;
    primeiro.disabled = true;
    anterior.disabled = true;
    proximo.disabled = true;
    ultimo.disabled = true;
}

function exibirCadastro() {
    if (cadastro.length > 0) {
        nome.value = cadastro[i].nome;
        sobrenome.value = cadastro[i].sobrenome;
        endereco.value = cadastro[i].endereco;
        telefone.value = cadastro[i].telefone;

        nome.disabled = true;
        sobrenome.disabled = true;
        endereco.disabled = true;
        telefone.disabled = true;

        editar.disabled = false;
        excluir.disabled = false;
        salvar.disabled = true;
        cancelar.disabled = false;

        primeiro.disabled = (i === 0);
        anterior.disabled = (i === 0);
        proximo.disabled = (i === cadastro.length - 1);
        ultimo.disabled = (i === cadastro.length - 1);
    } else {
        nome.value = "";
        sobrenome.value = "";
        endereco.value = "";
        telefone.value = "";
        desabilitaTudo();
        incluir.disabled = false;
    }
}

incluir.addEventListener("click", () => {
    modoEdicao = false;
    nome.value = "";
    sobrenome.value = "";
    endereco.value = "";
    telefone.value = "";

    nome.disabled = false;
    sobrenome.disabled = false;
    endereco.disabled = false;
    telefone.disabled = false;
    salvar.disabled = false;
    cancelar.disabled = false;
    editar.disabled = true;
    excluir.disabled = true;
});

salvar.addEventListener("click", () => {
    if (!modoEdicao) {
        cadastro.push({
            nome: nome.value,
            sobrenome: sobrenome.value,
            endereco: endereco.value,
            telefone: telefone.value
        });
        i = cadastro.length - 1;
    } else {
        cadastro[i].nome = nome.value;
        cadastro[i].sobrenome = sobrenome.value;
        cadastro[i].endereco = endereco.value;
        cadastro[i].telefone = telefone.value;
    }

    salvarNoLocalStorage();
    atualizarContador();

    nome.disabled = true;
    sobrenome.disabled = true;
    endereco.disabled = true;
    telefone.disabled = true;
    salvar.disabled = true;
    cancelar.disabled = false;

    exibirCadastro();
});

editar.addEventListener("click", () => {
    modoEdicao = true;
    nome.disabled = false;
    sobrenome.disabled = false;
    endereco.disabled = false;
    telefone.disabled = false;
    salvar.disabled = false;
    cancelar.disabled = false;
    editar.disabled = true;
    excluir.disabled = true;
});

cancelar.addEventListener("click", () => {
    exibirCadastro();
});

excluir.addEventListener("click", () => {
    if (cadastro.length > 0) {
        cadastro.splice(i, 1);
        if (i >= cadastro.length) {
            i = cadastro.length - 1;
        }
        salvarNoLocalStorage();
        atualizarContador();
        alert("Cadastro excluído!");
        exibirCadastro();
    }
});

primeiro.addEventListener("click", () => {
    i = 0;
    exibirCadastro();
});

anterior.addEventListener("click", () => {
    if (i > 0) {
        i--;
        exibirCadastro();
    }
});

proximo.addEventListener("click", () => {
    if (i < cadastro.length - 1) {
        i++;
        exibirCadastro();
    }
});

ultimo.addEventListener("click", () => {
    i = cadastro.length - 1;
    exibirCadastro();
});

function atualizarContador() {
    document.getElementById("contador").textContent = `Total de cadastros: ${cadastro.length}`;
}

carregarDoLocalStorage();
atualizarContador();

if (cadastro.length > 0) {
    i = 0;
    exibirCadastro();
} else {
    desabilitaTudo();
    incluir.disabled = false;
}
