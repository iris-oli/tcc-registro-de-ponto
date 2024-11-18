// Configuração do Firebase
var firebaseConfig = {
    apiKey: "AIzaSyDrxhtmRbMdyrlHfF6ecHBD4RkdaAvRsqE",
    authDomain: "tcc-qrcode-1e936.firebaseapp.com",
    databaseURL: "https://tcc-qrcode-1e936-default-rtdb.firebaseio.com",
    projectId: "tcc-qrcode-1e936",
    storageBucket: "tcc-qrcode-1e936.appspot.com",
    messagingSenderId: "647339303822",
    appId: "1:647339303822:web:718d72a0bfc313b7b3fadf"
};
firebase.initializeApp(firebaseConfig);

const etapasPonto = ["Entrada", "Início Café", "Fim Café", "Início Almoço", "Fim Almoço", "Saída"];
let indiceEtapaAtual = 0; // Inicia na "Entrada"

// Atualizar relógio
function atualizarRelogio() {
    const options = { timeZone: 'America/Sao_Paulo', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    const formatter = new Intl.DateTimeFormat('pt-BR', options);
    document.getElementById('clock').textContent = formatter.format(new Date());
}
setInterval(atualizarRelogio, 1000);
atualizarRelogio();


// Exemplo de uso após registrar a entrada
function marcarPonto() {
    // ... código existente ...

    // Após registrar a entrada, verifique o atraso ou adiantamento
    if (indiceEtapaAtual === 0) {
        const horarioEntrada = document.getElementById('entrada').value; // Obtenha o horário de entrada
        verificarAtrasoOuAdiantamento(horarioEntrada);
    }

    // ... código existente ...
}
// Função para carregar o histórico do dia
function carregarHistoricoDoDia() {
    const dataAtual = new Date().toLocaleDateString('pt-BR'); 
    const uid = firebase.auth().currentUser ? firebase.auth().currentUser.uid : null;

    if (uid) {
        const refUsuario = firebase.database().ref(`pontos/${uid}/${dataAtual}`);
        
        refUsuario.once('value').then(snapshot => {
            const registros = snapshot.val() || {};
            const logs = [];

            // Mostrar os registros já salvos no log
            Object.keys(registros).forEach((etapa) => {
                const horario = registros[etapa];
                logs.push({ etapa, horario });
            });

            // Ordenar os registros pelo horário
            logs.sort((a, b) => {
                const [horaA, minutoA] = a.horario.split(':').map(Number);
                const [horaB, minutoB] = b.horario.split(':').map(Number);
                return horaA * 60 + minutoA - (horaB * 60 + minutoB);
            });

            // Limpar o log existente antes de exibir os novos registros
            document.getElementById('pontoLog').innerHTML = '';

            // Exibir os registros ordenados
            logs.forEach(log => {
                document.getElementById('pontoLog').innerHTML += `<p>${log.etapa}: ${log.horario}</p>`;
            });

            // Atualizar o índice da etapa atual com base nos registros
            let index = 0;
            logs.forEach(log => {
                // Verifica se a etapa atual foi registrada no histórico
                if (etapasPonto[index] === log.etapa) {
                    index++;
                }
            });
            indiceEtapaAtual = index;

            // Exibe o próximo botão para a próxima etapa
            if (indiceEtapaAtual < etapasPonto.length) {
                document.getElementById('statusButton').textContent = `Registrar ${etapasPonto[indiceEtapaAtual]}`;
            } else {
                document.getElementById('statusButton').textContent = "Registro completo!";
            }
        });
    } else {
        alert("Usuário não autenticado. Por favor, faça login.");
    }
}

// Função para marcar ponto
function marcarPonto() {
    const options = { timeZone: 'America/Sao_Paulo', hour: '2-digit', minute: '2-digit', hour12: false };
    const formatter = new Intl.DateTimeFormat('pt-BR', options);
    const horario = formatter.format(new Date());
    const dataAtual = new Date().toLocaleDateString('pt-BR');
    const uid = firebase.auth().currentUser ? firebase.auth().currentUser.uid : null;

    if (uid) {
        const refUsuario = firebase.database().ref(`pontos/${uid}/${dataAtual}`);
        const etapaAtual = etapasPonto[indiceEtapaAtual];

        // Verificar se a etapa já foi registrada
        refUsuario.once('value').then(snapshot => {
            const registros = snapshot.val() || {};

            // Verifica se a etapa anterior foi registrada antes de permitir registrar a próxima etapa
            if (indiceEtapaAtual === 0 || registros[etapasPonto[indiceEtapaAtual - 1]]) {
                if (!registros[etapaAtual]) { // Somente registre se não existir
                    refUsuario.child(etapaAtual).set(horario).then(() => {
                        alert(`${etapaAtual} registrado com sucesso!`);
                        carregarHistoricoDoDia(); // Recarrega o histórico após registrar
                        // Avança para a próxima etapa, garantindo que o índice seja atualizado corretamente
                        indiceEtapaAtual++;  // Incrementa o índice para a próxima etapa
                        document.getElementById('statusButton').textContent = `Registrar ${etapasPonto[indiceEtapaAtual]}`;
                    }).catch(error => {
                        console.error("Erro ao registrar o ponto:", error);
                    });
                } else {
                    alert(`${etapaAtual} já foi registrado!`);
                }
            } else {
                alert(`Você precisa registrar a etapa anterior primeiro: ${etapasPonto[indiceEtapaAtual - 1]}`);
            }
        });
    } else {
        alert("Usuário não autenticado. Por favor, faça login.");
    }
}

// Chama a função de carregamento ao abrir a página
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        carregarHistoricoDoDia();
    } else {
        alert("Usuário não autenticado. Redirecionando para o login.");
        window.location.href = "acessofunc.html";
    }
});
