document.getElementById('forgotPasswordBtn').addEventListener('click', function() {
    document.getElementById('popup').style.display = 'flex';
});

document.getElementById('closePopupBtn').addEventListener('click', function() {
    document.getElementById('popup').style.display = 'none';
});

document.getElementById('validateBtn').addEventListener('click', function() {

    const protocolCode = document.getElementById('protocolCode').value.trim();
    
    if (protocolCode === '681249') {
        alert('Código válido! Redirecionando para a página de recuperação...');
        window.location.href = 'pagina-de-recuperacao.html'; 
    } else {
        alert('Código inválido! Tente novamente.');
        document.getElementById('protocolCode').value = ''; 
    }
});