const nombre = document.querySelector('#nombre');
const apellido = document.querySelector('#apellido');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const password2 = document.querySelector('#password2');
const errorNombre = document.querySelectorAll('nombre small#error');
const errorApellido = document.querySelectorAll('apellido small#error');
const errorEmail = document.querySelectorAll('email small#error');
const errorPassword = document.querySelectorAll('password small#error');
const errorPassword2 = document.querySelectorAll('password2 small#error');


const mensajes = {
    required: 'El campo es obligatorio.',
    matches: 'Las contraseñas no coinciden.',
    valid_email: 'El campo debe contener una dirección válida.',
    min_length: 'El campo debe tener al menos 6 caracteres.',
    max_length: 'El campo no debe exceder los 15 caracteres.',
    alpha: 'El campo puede contener solo caracteres alfabeticos.',
    alpha_dash: 'El campo puede contener solo caracteres alfanumericos, "_" y "/".'
};

const errores = [];

const emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
const alphaRegex = /^[a-z]+$/i;
const alphaDashRegex = /^[a-z0-9_\-]+$/i;

function validateName() {
    if (nombre.value.trim() === '') {
        errores.push = ({
            input: nombre,
            error: mensajes.required
        });
    }
    if (!alphaRegex.test(nombre.value)) {
        errores.push = ({
            input: nombre,
            error: mensajes.alpha
        });
    }
    if (nombre.value.length < 3) {
        errores.push = ({
            input: nombre,
            error: mensajes.min_length
        });
    }
    if (nombre.value.length > 15) {
        errores.push = ({
            input: nombre,
            error: mensajes.max_length
        });
    }
}

function validateLastname() {
    if (apellido.value.trim() === '') {
        errores.push = ({
            input: apellido,
            error: mensajes.required
        });
    }
    if (!alphaRegex.test(apellido.value)) {
        errores.push = ({
            input: apellido,
            error: mensajes.alpha
        });
    }
    if (apellido.value.length < 3) {
        errores.push = ({
            input: apellido,
            error: mensajes.min_length
        });
    }
    if (apellido.value.length > 15) {
        errores.push = ({
            input: apellido,
            error: mensajes.max_length
        });
    }
}

function validateEmail() {
    if (email.value.trim() === '') {
        errores.push = ({
            input: email,
            error: mensajes.required
        });
    }
    if (!emailRegex.test(email.value)) {
        errores.push = ({
            input: email,
            error: mensajes.valid_email
        });
    }
}

function validatePassword() {
    if (password.value.trim() === '') {
        errores.push = ({
            input: password,
            error: mensajes.required
        });
    }
    if (!alphaDashRegex.test(password.value)) {
        errores.push = ({
            input: password,
            error: mensajes.alpha_dash
        });
    }
    if (password.value.length < 6) {
        errores.push = ({
            input: password,
            error: mensajes.min_length
        });
    }
    if (password.value.length > 20) {
        errores.push = ({
            input: password,
            error: mensajes.max_length
        });
    }
}

function validatePasswords() {
    if (password.value !== password2.value) {
        errores.push({
            input: password2,
            error: mensajes.matches
        });
    }
}
const form = document.getElementById("form-signup");

form.addEventListener('submit', (e) => {
    e.preventDefault();
    validateName();
    validateLastname();
    validateEmail();
    validatePassword();
    validatePasswords();
    if (errores !== 0) {
        switchErrores();
    } else {
        fetch("https://ctd-fe2-todo-api.herokuapp.com/v1/users", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombre: nombre.value,
                    apellido: apellido.value,
                    email: email.value,
                    password: password.value
                })
            })
            .then(res => res.json())
            .then(token => {
                sessionStorage.setItem('token', token.jwt);
                sessionStorage.setItem('user', email.value);
                window.location.href = './index.js';
            })
            .catch(error => console.error('Error:', error));
    }
});
//e.submit();

function switchErrores() {
    errores.forEach(error => {
        switch (error) {
            case 'required':
                errores.nombre.innerHTML = mensajes.required;
                break;
            case 'alpha':
                errores.nombre.innerHTML = mensajes.alpha;
                break;
            case 'min_length':
                errores.nombre.innerHTML = mensajes.min_length;
                break;
            case 'max_length':
                errores.nombre.innerHTML = mensajes.max_length;
                break;
            case 'valid_email':
                errores.email.innerHTML = mensajes.valid_email;
                break;
            case 'alpha_dash':
                errores.password.innerHTML = mensajes.alpha_dash;
                break;
            case 'min_length':
                errores.password.innerHTML = mensajes.min_length;
                break;
            case 'max_length':
                errores.password.innerHTML = mensajes.max_length;
                break;
            case 'matches':
                errores.password2.innerHTML = mensajes.matches;
                break;

        }
    });
}