const addTaskBtn = document.getElementById('addTaskBtn');
const taskInput = document.getElementById('taskInput');
const todoList = document.getElementById('todoList');

// Load saved tasks from localStorage
document.addEventListener('DOMContentLoaded', () => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => createTask(task.content, task.completed));
});

// Save tasks to localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('li').forEach(task => {
        tasks.push({
            content: task.querySelector('span').textContent,
            completed: task.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to create a new task
function createTask(taskContent, completed = false) {
    const li = document.createElement('li');
    if (completed) li.classList.add('completed'); // If task is marked as completed, add the class

    const taskText = document.createElement('span');
    taskText.textContent = taskContent;
    li.appendChild(taskText);

    // Create remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'X';
    removeBtn.classList.add('remove');
    li.appendChild(removeBtn);

    // Create edit button
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit');
    li.appendChild(editBtn);

    // Add event listener for remove button
    removeBtn.addEventListener('click', () => {
        li.classList.add('removed');
        setTimeout(() => {
            li.remove();
            saveTasks(); // Re-save after task removal
        }, 300);
    });

    // Add event listener for marking task as completed
    li.addEventListener('click', () => {
        li.classList.toggle('completed');
        saveTasks(); // Re-save after task completion state change
    });

    // Edit task functionality
    editBtn.addEventListener('click', () => {
        const newTaskContent = prompt('Edit your task:', taskText.textContent);
        if (newTaskContent && newTaskContent.trim() !== "") {
            taskText.textContent = newTaskContent.trim();
            saveTasks(); // Re-save after editing
        }
    });

    // Append the new task to the list
    todoList.appendChild(li);
    saveTasks(); // Re-save after adding a task
}

// Add task to list when the button is clicked
addTaskBtn.addEventListener('click', () => {
    const taskContent = taskInput.value.trim();
    if (taskContent) {
        createTask(taskContent);
        taskInput.value = ''; // Clear input field
    } else {
        alert('Please enter a valid task.');
    }
});

// Add task to list when 'Enter' key is pressed
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const taskContent = taskInput.value.trim();
        if (taskContent) {
            createTask(taskContent);
            taskInput.value = ''; // Clear input field
        } else {
            alert('Please enter a valid task.');
        }
    }
});
