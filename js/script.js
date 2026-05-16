// === CONTADOR DE TIEMPO ===
const startDate = new Date('2025-06-19T19:00:00').getTime();

function updateCounter() {
    const now = new Date().getTime();
    const difference = now - startDate;

    const msPerSecond = 1000;
    const msPerMinute = msPerSecond * 60;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;

    const days = Math.floor(difference / msPerDay);
    const hours = Math.floor((difference % msPerDay) / msPerHour);
    const minutes = Math.floor((difference % msPerHour) / msPerMinute);
    const seconds = Math.floor((difference % msPerMinute) / msPerSecond);

    document.getElementById('days').innerText = days;
    document.getElementById('hours').innerText = String(hours).padStart(2, '0');
    document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
    document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
}
updateCounter();
setInterval(updateCounter, 1000);


// === LÓGICA DE DETECCIÓN DE FECHAS ESPECIALES ===
function checkSpecialDates() {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;

    const specialCard = document.getElementById('special-card');
    const specialTitle = document.getElementById('special-title');
    const specialMessage = document.getElementById('special-message');

    if (day === 25 && month === 1) {
        specialCard.classList.remove('hidden');
        specialTitle.innerText = "¡Feliz Cumpleaños mi Amor! 🎂🎉";
        specialMessage.innerText = "¡Feliz cumpleaños a la mujer más espectacular del mundo! Que este día esté lleno de tantas sonrisas como las que tú me das a mí. Te amo con todo mi corazón. ❤️";
        launchBirthdayConfetti();
    } else if (day === 5 && month === 12) {
        specialCard.classList.remove('hidden');
        specialTitle.innerText = "¡Hoy es mi Cumpleaños! 🎈";
        specialMessage.innerText = "Hoy cumplo un año más, pero el regalo más grande y espectacular de mi vida ya lo tengo todos los días, y eres tú. Gracias por hacerme el novio más feliz. ❤️";
        launchBirthdayConfetti();
    } else if (day === 19 && month === 6) {
        specialCard.classList.remove('hidden');
        specialTitle.innerText = "¡FELIZ ANIVERSARIO! 🌌✨";
        specialMessage.innerText = "¡Hoy celebramos nuestra fecha principal! Mirar este mapa me recuerda el día exacto en que el cielo se alineó para empezar nuestra hermosa historia. Te amo hoy, mañana y siempre. 🥂❤️";
        launchHugeFireworks();
    } else if (day === 19) {
        specialCard.classList.remove('hidden');
        specialTitle.innerText = "¡Feliz Mesario! 💖";
        specialMessage.innerText = "Un mes más sumando momentos, risas y amor a nuestro contador. ¡Feliz día 19! ✨";
        launchNormalFireworks();
    }
}

function launchBirthdayConfetti() { confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } }); }
function launchNormalFireworks() {
    var duration = 4 * 1000; var end = Date.now() + duration;
    (function frame() {
        confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 } });
        confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 } });
        if (Date.now() < end) requestAnimationFrame(frame);
    }());
}
function launchHugeFireworks() {
    var duration = 8 * 1000; var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    function randomInRange(min, max) { return Math.random() * (max - min) + min; }
    var interval = setInterval(function() {
        var timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);
        var particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}

window.onload = function() { checkSpecialDates(); };


// === LÓGICA DE LA MÚSICA ===
const music = document.getElementById('background-music');
const musicBtn = document.getElementById('music-btn');
musicBtn.addEventListener('click', () => {
    if (music.paused) { music.play(); musicBtn.innerText = "⏸️ Pausar Música"; }
    else { music.pause(); musicBtn.innerText = "🎵 Reproducir Música"; }
});


// === LÓGICA DEL EASTER EGG (SNOOPY) ===
let snoopyClicks = 0;
const timeBox = document.getElementById('time-box');
const snoopyOverlay = document.getElementById('snoopy-overlay');
const closeSnoopyBtn = document.getElementById('close-snoopy');

timeBox.addEventListener('click', () => {
    snoopyClicks++;
    if (snoopyClicks === 10) { snoopyOverlay.classList.remove('hidden'); snoopyClicks = 0; }
});
let clickTimer;
timeBox.addEventListener('click', () => {
    clearTimeout(clickTimer);
    clickTimer = setTimeout(() => { snoopyClicks = 0; }, 2000);
});
closeSnoopyBtn.addEventListener('click', () => { snoopyOverlay.classList.add('hidden'); });


// =======================================================
// === CONTROLLER PRINCIPAL DEL MINIJUEGO INTERACTIVO ===
// =======================================================
let gameState = { step: 1, q3Clicks: 0 };

const gameBtn = document.getElementById('game-btn');
const gameOverlay = document.getElementById('game-overlay');
const gameCard = document.getElementById('game-card');
const gameQuestion = document.getElementById('game-question');
const btnYes = document.getElementById('btn-yes');
const btnNo = document.getElementById('btn-no');
const heartsBg = document.getElementById('game-hearts-bg');

// Al presionar el botón "Pregunta seria"
gameBtn.addEventListener('click', () => {
    gameState.step = 1;
    gameState.q3Clicks = 0;
    heartsBg.innerHTML = '<div class="growing-heart-center" id="center-heart">❤️</div>';
    resetButtonsStyles();
    renderStep();
    gameOverlay.classList.remove('hidden');
});

function resetButtonsStyles() {
    btnNo.style.position = "static";
    btnNo.style.left = "auto";
    btnNo.style.top = "auto";
    btnYes.style.transform = "scale(1)";
    btnYes.innerText = "Sí";
    btnNo.innerText = "No";
}

function renderStep() {
    const centerHeart = document.getElementById('center-heart');
    
    if (gameState.step === 1) {
        gameQuestion.innerText = "¿Cuánto me amas?";
        btnYes.innerText = "Muchísimo";
        btnNo.innerText = "No";
        if(centerHeart) centerHeart.style.transform = "translate(-50%, -50%) scale(1)";
    } 
    else if (gameState.step === 2) {
        gameQuestion.innerText = "¿Segura? 👀";
        btnYes.innerText = "Sí, mucho";
        btnNo.innerText = "Un poco";
        if(centerHeart) centerHeart.style.transform = "translate(-50%, -50%) scale(2.5)";
    } 
    else if (gameState.step === 3) {
        gameQuestion.innerText = "¿Más que un helado de ron con pasas? 🍦🍨";
        btnYes.innerText = "Sí";
        btnNo.innerText = "No";
        if(centerHeart) centerHeart.style.transform = "translate(-50%, -50%) scale(4)";
    } 
    else if (gameState.step === 4) {
        gameQuestion.innerText = "Última pregunta:\n¿Me dejas ser el hombre que te robe sonrisas para siempre? 🥺❤️";
        btnYes.innerText = "Sí, acepto";
        btnNo.innerText = "No";
    }
}

// MANEJO DEL BOTÓN "SÍ" (AVANZAR)
btnYes.addEventListener('click', () => {
    if (gameState.step === 1 || gameState.step === 2) {
        gameState.step++;
        renderStep();
    } 
    else if (gameState.step === 3) {
        gameState.q3Clicks++;
        const centerHeart = document.getElementById('center-heart');
        
        if (gameState.q3Clicks === 1) {
            btnYes.innerText = "Sí, mucho";
            btnYes.style.transform = "scale(1.2)";
            if(centerHeart) centerHeart.style.transform = "translate(-50%, -50%) scale(5.5)";
        } else if (gameState.q3Clicks === 2) {
            btnYes.innerText = "Sí, muchísimo";
            btnYes.style.transform = "scale(1.4)";
            if(centerHeart) centerHeart.style.transform = "translate(-50%, -50%) scale(7)";
        } else if (gameState.q3Clicks >= 3) {
            gameState.step = 4;
            resetButtonsStyles();
            renderStep();
        }
    } 
    else if (gameState.step === 4) {
        // FINAL COMPLETO FELIZ
        gameQuestion.innerText = "¡Gracias por hacerme feliz todo este tiempo, disfruta de tu regalo! ❤️✨";
        document.getElementById('game-buttons-container').classList.add('hidden');
        
        const centerHeart = document.getElementById('center-heart');
        if(centerHeart) {
            centerHeart.style.transition = "transform 1.5s ease";
            centerHeart.style.transform = "translate(-50%, -50%) scale(35)";
        }

        // Lanzar flores y confeti masivo
        setTimeout(() => {
            launchFlowerConfetti();
            setTimeout(() => {
                gameOverlay.classList.add('hidden');
                document.getElementById('game-buttons-container').classList.remove('hidden');
            }, 3500);
        }, 1000);
    }
});

// MANEJO DEL BOTÓN "NO" (OBSTÁCULOS)
btnNo.addEventListener('click', () => {
    if (gameState.step === 1) {
        // Cae lluvia de corazones rotos
        generateFallingHearts();
        gameQuestion.innerText = "¡Respuesta incorrecta! Una oportunidad más... ❤️‍🩹";
        setTimeout(() => { renderStep(); }, 2000);
    } 
    else if (gameState.step === 2) {
        // Vibrar tarjeta y alerta
        gameCard.classList.add('shake');
        setTimeout(() => { gameCard.classList.remove('shake'); }, 4000);
        alert("¡Respuesta incorrecta! Inténtalo de nuevo con más ganas 😤❤️");
    }
    else if (gameState.step === 4) {
        // Se rompe y sale
        alert("Volviendo al inicio... 💔");
        gameOverlay.classList.add('hidden');
    }
});

// Mecánica del Botón que huye (Pregunta 3) en computadora y celular
function fleeButton() {
    if (gameState.step === 3) {
        // Generar coordenadas aleatorias dentro de la tarjeta
        const containerWidth = gameCard.clientWidth - btnNo.clientWidth - 20;
        const containerHeight = gameCard.clientHeight - btnNo.clientHeight - 60;
        
        const randomX = Math.random() * containerWidth - (containerWidth / 2);
        const randomY = Math.random() * containerHeight - (containerHeight / 2) + 40;

        btnNo.style.position = "absolute";
        btnNo.style.left = `calc(50% + ${randomX}px - ${btnNo.clientWidth / 2}px)`;
        btnNo.style.top = `calc(50% + ${randomY}px)`;
    }
}
btnNo.addEventListener('mouseover', fleeButton);
btnNo.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Evita el clic accidental en cel
    fleeButton();
});

// Generador de lluvia de corazones de fondo
function generateFallingHearts() {
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.classList.add('floating-heart');
            heart.innerText = Math.random() > 0.5 ? "💔" : "❤️";
            heart.style.left = Math.random() * 100 + "vw";
            heart.style.animationDuration = (Math.random() * 2 + 2) + "s";
            heartsBg.appendChild(heart);
            setTimeout(() => { heart.remove(); }, 3000);
        }, i * 100);
    }
}

// Disparador de confeti estilo flores multicolores
function launchFlowerConfetti() {
    var count = 200;
    var defaults = { origin: { y: 0.7 } };

    function fire(particleRatio, opts) {
        confetti(Object.assign({}, defaults, opts, {
            particleCount: Math.floor(count * particleRatio)
        }));
    }

    fire(0.25, { spread: 26, startVelocity: 55, colors: ['#ff69b4', '#ff1493', '#ffc0cb'] });
    fire(0.2, { spread: 60, colors: ['#ff85a2', '#f43f5e', '#ffffff'] });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8, colors: ['#ec4899', '#f43f5e', '#fbcfe8'] });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2, colors: ['#fda4af', '#f43f5e'] });
    fire(0.1, { spread: 120, startVelocity: 45, colors: ['#ff69b4', '#ffffff'] });
}