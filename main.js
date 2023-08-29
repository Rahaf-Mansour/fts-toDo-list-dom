"use strict";

// Global array to store the TODO list data
let todoList = [];

// DOM elements
const addText = document.getElementById('add-text');
const searchInput = document.getElementById('search');
const tableBody = document.querySelector('.table-list tbody');
const countElement = document.querySelector('.count');

// Function to fetch TODO data from the API
async function fetchTodoData() {
    try {
      const response = await fetch('https://dummyjson.com/todos');
      const data = await response.json();
      todoList = [...data.todos.slice(0, 5)]; // Get the first 5 tasks from the API
      saveToStorage();
      renderTodoList();
    } catch (error) {
      console.error('Error fetching TODO data:', error);
    }
}

// Event listener to fetch TODO data on page load
window.addEventListener('load', fetchTodoData);

// Function to render the TODO list
function renderTodoList() { // filling the list
    tableBody.innerHTML = '';
    todoList.forEach((task, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${index + 1}</td>
        <td class="${task.completed ? 'completed-task' : ''}" onclick="toggleTaskStatus(${index})">${task.todo}</td>
        <td>${task.userId}</td>
        <td>${task.completed ? 'Completed' : 'Pending'}</td>
        <td>
          <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
          <button class="complete-btn" onclick="toggleTaskStatus(${index})">
            ${task.completed ? 'Pend' : 'Done'}
          </button>
        </td>
      `;
      tableBody.appendChild(row);
    });
    updateCount();
}
  
// Function to update the task count
function updateCount() {
    countElement.textContent = todoList.length;
}

// Function to add a task -when triggering the submit form action-
function addTask(){
    const taskText = addText.value.trim();
    if (taskText === '') {
      return;
    }
    const newTask = {
      todo: taskText,
      userId: parseInt(Math.random() * 100),
      completed: false,
    };
    todoList.push(newTask);
    saveToStorage();
    renderTodoList();
    addText.value = ''; // return the text empty as before (after adding a task) 
}

// To prevent the default action in the form (prevent the refresh when submitting)
document.querySelector('.form-container').addEventListener('submit', (e) => {
    e.preventDefault();
    addTask(); // When submit (click on Add button) will call addTask function
})

// Function to delete a task
function deleteTask(index) {
    todoList.splice(index, 1); // remove one task from the list (the task with the given index)
    saveToStorage();
    renderTodoList();
}

// Function to toggle the task between complete and pend
function toggleTaskStatus(index) {
    todoList[index].completed = !todoList[index].completed;
    saveToStorage();
    renderTodoList();
}

// Event listener for search input
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredTasks = todoList.filter(task =>
      task.todo.toLowerCase().includes(searchTerm)
    );
    renderFilteredTasks(filteredTasks);
});

// Function to render filtered tasks
function renderFilteredTasks(filteredTasks) {
    tableBody.innerHTML = '';
    filteredTasks.forEach((task, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${task.todo}</td>
        <td>${task.userId}</td>
        <td>${task.completed ? 'Completed' : 'Pending'}</td>
        <td>
          <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
          <button class="complete-btn">Done</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
}

// second trial

// // Event listener for search input
// searchInput.addEventListener('input', () => {
//   const searchTerm = searchInput.value.toLowerCase();
//   const filteredTasks = todoList.filter(task => filterTask(task, searchTerm));
//   renderFilteredTasks(filteredTasks);
// });

// // Function to determine if a task matches the search criteria 
// //(firstly check the first char of todo if matches the searched term, if not then check if its included in todo)
// function filterTask(task, searchTerm) {
//   const taskTodo = task.todo.toLowerCase();
  
//   // Check if the task starts with the search term or the task includes the search term
//   if ((taskTodo[0] === searchTerm.charAt(0).toLowerCase()) || taskTodo.includes(searchTerm)) {
//       return true;
//   }

//   return false;
// }

// // Function to render filtered tasks
// function renderFilteredTasks(filteredTasks) {
//   tableBody.innerHTML = '';
//   filteredTasks.forEach((task, index) => {
//       const row = document.createElement('tr');
//       row.innerHTML = `
//         <td>${index + 1}</td>
//         <td>${task.todo}</td>
//         <td>${task.userId}</td>
//         <td>${task.completed ? 'Completed' : 'Pending'}</td>
//         <td>
//           <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
//           <button class="complete-btn">Done</button>
//         </td>
//       `;
//       tableBody.appendChild(row);
//   });
// }

// Save data to browser storage (LocalStorage) whenever the list changes
function saveToStorage() {
    localStorage.setItem('todoList', JSON.stringify(todoList));
}
  
// Call saveToStorage whenever the list is updated
renderTodoList();

