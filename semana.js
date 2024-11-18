let ultimoDia = null;

function mostrarDiasDaSemana() {
    const diasDaSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    const hoje = new Date();
    const diaAtual = hoje.getDay(); // 0-6 (0 para domingo, 6 para sábado)

    if (ultimoDia !== diaAtual) {
        const diasElement = document.getElementById('dias');
        diasElement.innerHTML = `<p>Hoje é ${diasDaSemana[diaAtual]}.</p>`;
        ultimoDia = diaAtual; // Atualiza o último dia
    }
}

// Chama a função inicialmente
mostrarDiasDaSemana();

// Atualiza a cada minuto (60000 milissegundos)
setInterval(mostrarDiasDaSemana, 60000);
