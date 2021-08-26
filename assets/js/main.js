const novaTarefa = document.querySelector('.input');
const botaoEnviar = document.querySelector('.button');
const tarefas = document.querySelector('.tarefas');

//Configurações básicas do código
novaTarefa.setAttribute('placeholder', 'Digite uma tarefa');

function criaLi(){ //Função para criar o elemento li (lists).
    const li = document.createElement('li');
    return li;
}

function criaBtn(li){ //função para criar botões de "tarefa feita"
    const btn = document.createElement('button');
    btn.innerHTML = 'Feito';
    li.appendChild(btn);
    btn.className = `btnApagar`;
    return btn;
}

function limpaInput(){
    novaTarefa.value = '';
    novaTarefa.focus();
    novaTarefa.setAttribute('placeholder', 'Digite uma tarefa');
}

function criaTarefa(tarefa){
    const li = criaLi();
    li.innerText = tarefa + '     ';
    tarefas.appendChild(li);
    li.className = `item`;
    criaBtn(li);
    limpaInput();
    salvarTarefas();
};

novaTarefa.addEventListener('keypress', function(event){
    if (event.keyCode == 13){
        if (!novaTarefa.value) return;
        criaTarefa(novaTarefa.value);
    }
});

botaoEnviar.addEventListener('click', function(){
    if (!novaTarefa.value) return;
    criaTarefa(novaTarefa.value);

});

document.addEventListener('click', function(event){
    const botaoApagar = event.target;
    if (botaoApagar.classList.contains('btnApagar')){
        botaoApagar.parentElement.remove();
        salvarTarefas();
    };
});

function salvarTarefas(){
    const liTarefas = tarefas.querySelectorAll('li');
    const listaTarefas = [];

    for (let tarefa of liTarefas){
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Feito', '').trim();
        listaTarefas.push(tarefaTexto);
    };

    const tarefasJSON = JSON.stringify(listaTarefas);

    localStorage.setItem('tarefas', tarefasJSON);
};

function carregaTarefas(){
    const tarefasSalvas = localStorage.getItem('tarefas');
    const listadeTarefas = JSON.parse(tarefasSalvas);
    console.log(listadeTarefas.length);
    for (let tarefaC of listadeTarefas){
        criaTarefa(tarefaC);
    }
    return listadeTarefas;
}

carregaTarefas();