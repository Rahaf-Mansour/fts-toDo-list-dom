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

