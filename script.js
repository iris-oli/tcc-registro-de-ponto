// Função para atualizar o horário em tempo real
function updateTime() {
    const timeElement = document.getElementById("time");
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    timeElement.textContent = `${hours}:${minutes}:${seconds}`;
}

// Atualiza o horário a cada segundo
setInterval(updateTime, 1000);

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

function toggleMenu() {
    const menu = document.getElementById("sideMenu");
    const hamburger = document.querySelector(".hamburger");
    
    // Alterna a classe "open" no menu e no hambúrguer
    menu.classList.toggle("open");
    hamburger.classList.toggle("open");
}
