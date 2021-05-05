const todoInput = document.getElementById('todo-add');
const addTodoButton = document.getElementById('add-button');
const todoText = document.getElementById('text-todo');
const todoList = document.getElementById('todo-list');
const cardList = document.getElementById('card-list');

addTodoButton.addEventListener('click', addTodo);
cardList.addEventListener('click', (e) => {
    if (e.target.className === 'fas fa-trash-alt text-danger') {
        deleteTodoFromStorage(e.target.parentElement.parentElement.innerText);
        e.target.parentElement.parentElement.parentElement.remove();
    }
});
document.addEventListener('DOMContentLoaded', addTodoFromStorage);

function addTodo(e) {
    const newText = todoText.value.trim();
    todoText.value = '';
    if (newText === '') {
        const div = document.createElement('div');
        div.className = 'alert alert-danger'
        div.innerText = 'Lütfen bir todo giriniz!';

        todoInput.appendChild(div);
        setTimeout(() => {
            div.remove();
        }, 3000)
        return;
    }
    todoAddToUI(newText);
    todoAddToStorage(newText);
}

function todoAddToUI(text) {
    cardList.innerHTML += `
    <div class="card my-2">
        <div class="card-body d-flex justify-content-between">
            ${text}
            <a href="#"><i class="fas fa-trash-alt text-danger"></i></a>
        </div>
    </div>`;
}

function todoAddToStorage(text) {
    const storage = getSessionStorage();
    storage.push(text);
    sessionStorage.setItem('todos', JSON.stringify(storage));
}

function getSessionStorage() {
    let data = sessionStorage.getItem('todos');
    if (!data) {
        return [];
    }

    return JSON.parse(data);
}

function addTodoFromStorage() {
    let storage = getSessionStorage();

    storage.forEach(todo => {
        todoAddToUI(todo);
    });
}

function deleteTodoFromStorage(target) {
    const storage = getSessionStorage();
    storage.splice(storage.indexOf(target), 1);
    sessionStorage.setItem('todos', JSON.stringify(storage));

}