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
