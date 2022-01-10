if (!sessionStorage.getItem('user')) {
    window.addEventListener('load', function() {
        //validar login;
        var form = document.getElementById('form-login');
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            var user = document.getElementById('user').value;
            var pass = document.getElementById('pass').value;
            var data = {
                user: user,
                pass: pass
            };
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'https://ctd-fe2-todo-api.herokuapp.com/v1/users/login', true);
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.onload = function() {
                if (xhr.status === 200) {
                    var data = JSON.parse(xhr.responseText);
                    sessionStorage.setItem('user', data.user);
                    sessionStorage.setItem('token', data.token);
                    window.location.href = 'http://localhost:3000/';
                } else {
                    alert('Usuario o contraseña incorrectos');
                }
            };
            xhr.send(JSON.stringify(data));
        });
    });
} else {
    window.location.href = 'mis-tareas.html';
}