let todoList = document.getElementById("todo-list");
let todolistContainer = document.getElementById("todolist-container");
let textBox = document.getElementById("textbox");
let submitButton = document.getElementById("submitButton");

getToDos();

submitButton.addEventListener("click", function() {
    axios.post("/api/todos", {todo: textBox.value})
    .then(function(response) {
        console.log(response);
        textBox.value = "";
        getToDos();
    });
});

function getToDos() {
    axios.get("/api/todos")
    .then(function(response){
        let todos = response.data;
        let todosString = todos.map(function(element){
            return `<div class="todo-containers">
                    <li>${element.id}. ${element.todo}</li>
                    <button class="btn btn-danger delete" onclick="deleteToDo('${element.id}')">Delete</button>
                    <button class="btn btn-primary update" onclick="updateToDo('${element.id}')">Update</button>
                    </div>`
        })
        todolistContainer.innerHTML = todosString.join(" ");
    });
}

function deleteToDo(id) {
    axios.delete(`/api/todos/${id}`,)
    .then(function(response) {
        console.log(response);
    });
    getToDos(); 
}

function updateToDo(id) {
    axios.put(`/api/todos/${id}`, {todo: textBox.value})
    .then(function(response) {
        console.log(response);
    });
    getToDos();
    textBox.value = "";
}