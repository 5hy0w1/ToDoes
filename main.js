var box = document.getElementsByClassName('todoes')[0];
var tabs = document.querySelector('.tabs').children;
try{
    tasks = JSON.parse(localStorage['tasks']);
}
catch{
    tasks = [];
}
var input = document.querySelector("input[type=text]");
input.onkeydown = keyboard_handler;

document.addEventListener('DOMContentLoaded', function(){
    if (localStorage.getItem('tasks')){
        for (var i = 0; i < tasks.length; i++){
            showTask(tasks[i], i);
        }
    }
});

window.onbeforeunload = function(){
    localStorage['tasks'] = JSON.stringify(tasks);
}


function makeTask(text, state, index){
    let div = document.createElement("div");
    div.setAttribute("data-index", index);
    div.classList.add("todo");
    checkbox = document.createElement("input");
    del = document.createElement("button");
    del.classList.add("del-button");
    del.innerText = 'x';
    del.setAttribute("onclick", "removeTask("+index+")");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("onchange", "toggleState("+index+")");
    checkbox.checked = !state;
    checkbox.classList.add("make-done");
    checkbox.classList.add(state); 
    div.append(checkbox);
    label = document.createElement("label");
    label.innerText = text;
    div.append(label, del);
    return div;
}

function toggleState(index){
    console.log(index);
    tasks[index].state = !tasks[index].state;
}

function removeTask(index){
    tasks.pop(index);
    box.children[index].remove();
    if(tasks.length == 0){
        box.append(document.createTextNode("No tasks yet..."));
    }
}

function appendTask(text){
    
    if(text){
        tasks.push({text: text, state: true});
        showTask(tasks[tasks.length - 1], tasks.length - 1);
    }
}

function keyboard_handler(e){
    console.log(e.key);
    if (e.key == "Enter"){
        appendTask(input.value);
        input.value = '';
    }
}

function showTask(task, index){
    if(box.innerText == 'No tasks yet...') box.innerText = '';
    box.append(makeTask(task.text, task.state, index));
}

function showOnlyState(state){
    for(var i = 0; i < box.children.length; i++){
        element = box.children[i].children[0];
        console.log(element.checked,state)
        if (!element.checked == state || state == 'all'){
            box.children[i].classList.remove('hidden');
        }else{
            box.children[i].classList.add('hidden');
        }
    }
}


function setActive(el){
    for(var i = 0; i < tabs.length; i++){
        tabs[i].classList.remove('active-tab');
    }
    el.classList.add('active-tab');
}