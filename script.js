const addTaskBtn = document.getElementById('addTaskBtn');
const taskInput = document.getElementById('taskInput');
const todoList = document.getElementById('todoList');

// Load tasks from localStorage
document.addEventListener('DOMContentLoaded', () => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => createTask(task.content, task.completed));
});

// Save tasks
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

// Create task item
function createTask(taskContent, completed = false) {
    const li = document.createElement('li');
    if (completed) li.classList.add('completed');

    const span = document.createElement('span');
    span.textContent = taskContent;
    li.appendChild(span);

    // Edit Button
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit');
    editBtn.onclick = () => {
        const newContent = prompt('Edit your task:', span.textContent);
        if (newContent && newContent.trim()) {
            span.textContent = newContent.trim();
            saveTasks();
        }
    };
    li.appendChild(editBtn);

    // Remove Button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'X';
    removeBtn.classList.add('remove');
    removeBtn.onclick = () => {
        li.style.transform = 'translateX(100%)';
        li.style.opacity = '0';
        setTimeout(() => {
            li.remove();
            saveTasks();
        }, 300);
    };
    li.appendChild(removeBtn);

    // Toggle Complete
    li.onclick = (e) => {
        if (e.target === span) {
            li.classList.toggle('completed');
            saveTasks();
        }
    };

    todoList.appendChild(li);
    saveTasks();
}

// Add task button click
addTaskBtn.addEventListener('click', () => {
    const content = taskInput.value.trim();
    if (content) {
        createTask(content);
        taskInput.value = '';
    } else {
        alert('Please enter a task!');
    }
});

// Press Enter to add
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTaskBtn.click();
    }
});
