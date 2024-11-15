// Referências aos elementos HTML
const buttons = {
    green: document.getElementById('green'),
    red: document.getElementById('red'),
    yellow: document.getElementById('yellow'),
    blue: document.getElementById('blue'),
};

const sounds = {
    red: new Audio('./src/sound/red.wav'),
    green: new Audio('./src/sound/red.wav'),
    blue: new Audio('./src/sound/red.wav'),
    yellow: new Audio('./src/sound/red.wav'),
    wrong: new Audio('./src/sound/wrong.wav'), // Som de erro
    start: new Audio('./src/sound/start.mp3') // Som de acerto (opcional)    
  };

  const startBtn = document.getElementById('start-btn');
const messageElement = document.getElementById('message');
const scoreElement = document.getElementById('score');

let sequence = [];
let playerSequence = [];
let score = 0;
let gameInProgress = false;

// Cores para cada botão
const colors = ['green', 'red', 'yellow', 'blue'];

// Função para começar um novo jogo
function startGame() {
    sequence = [];
    playerSequence = [];
    score = 0;
    gameInProgress = true;
    nextRound();
}

// Função para iniciar a próxima rodada
function nextRound() {
    playerSequence = [];
    scoreElement.textContent = score;
    messageElement.textContent = `Pontuação: ${score} - Memória`;

    // Adiciona um novo item à sequência
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    sequence.push(randomColor);

    // Exibe a sequência para o jogador
    showSequence(0);
}

// Função para mostrar a sequência para o jogador
function showSequence(index) {
    if (index < sequence.length) {
        const color = sequence[index];
        const button = buttons[color];
        
        button.classList.add('active');
        setTimeout(() => {
            button.classList.remove('active');
            setTimeout(() => showSequence(index + 1), 500);
        }, 500);
    } else {
        // Após exibir toda a sequência, permite que o jogador entre com a sequência
        messageElement.textContent = `Sua vez!`;
    }
}

// Função para processar o clique do jogador
function playerClick(color) {
    if (!gameInProgress) return;

    playerSequence.push(color);
    const button = buttons[color];
    button.classList.add('active');

    // Reproduz o som correspondente ao botão clicado
    const sound = sounds[color];
    sound.src = `./src/sound/${color}.wav`;
    sound.currentTime = 0;
    sound.volume = 0.5;
    sound.play();
    

    setTimeout(() => button.classList.remove('active'), 300);

    // Verifica se o jogador está correto
    if (playerSequence[playerSequence.length - 1] !== sequence[playerSequence.length - 1]) {
        
        // Reproduz o som de erro        
        sounds.wrong.play();

        // Jogador errou, fim de jogo
        messageElement.textContent = `Você errou! Pontuação final: ${score}`;
        gameInProgress = false;        
        return;       
    }

    // Se o jogador completou a sequência corretamente
    if (playerSequence.length === sequence.length) {
        score++;        
        setTimeout(nextRound, 1000);
    }
    
}



// Adiciona os event listeners aos botões
buttons.green.addEventListener('click', () => playerClick('green'));
buttons.red.addEventListener('click', () => playerClick('red'));
buttons.yellow.addEventListener('click', () => playerClick('yellow'));
buttons.blue.addEventListener('click', () => playerClick('blue'));

// Inicia o jogo ao carregar a página

startBtn.addEventListener('click', startGame);

//quanto aperta o botao de inicar toque o som de start
startBtn.addEventListener('click', () => {
    sounds.start.play();
});