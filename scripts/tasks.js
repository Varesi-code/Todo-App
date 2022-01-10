//window on load o defer
window.onload = function() {
    fetch(this.location.href + 'tasks', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': localStorage.getItem('token')
        }
    }).then(function(response) {
        return response.json();
    }).then(data => {
        let tasks = data.tasks;
        let taskList = document.getElementById('taskList');
        tasks.forEach(task => {
            let taskItem = document.createElement('li');
            taskItem.innerHTML = task.name;
            taskList.appendChild(taskItem);
        });
    });
};

document.getElementById('addTask').addEventListener('click', function() {
    let taskName = document.getElementById('taskName').value;
    let taskDescription = document.getElementById('taskDescription').value;
    let task = {
        name: taskName,
        description: taskDescription
    };
    fetch(this.location.href + 'tasks', {
        method: 'POST',
        body: JSON.stringify(task),
        headers: {
            'Content-Type': 'application/json'
        }
    });
});