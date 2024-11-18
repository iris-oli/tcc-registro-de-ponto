document.getElementById('loginBtn').addEventListener('click', function() {
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();
    let hasError = false;
    document.getElementById('emailError').style.display = 'none';
    document.getElementById('senhaError').style.display = 'none';
    if (email === '') {
        document.getElementById('emailError').style.display = 'block';
        hasError = true;
    }
    if (senha === '') {
        document.getElementById('senhaError').style.display = 'block';
        hasError = true;
    }
    if (hasError) {
        document.getElementById('login-form').classList.add('shake');
        setTimeout(() => {
            document.getElementById('login-form').classList.remove('shake');
        }, 500);
        return;
    }
    if (email !== 'exemplo@dominio.com' || senha !== '123456') {
        document.getElementById('login-form').classList.add('shake');
        setTimeout(() => {
            document.getElementById('login-form').classList.remove('shake');
            document.getElementById('email').value = '';
            document.getElementById('senha').value = '';
        }, 500);
    } else {
        alert('Login bem-sucedido!');
        window.location.href = "pag1.html";
    }
});
