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


// === LÓGICA DE DETECCIÓN DE FECHAS ESPECIALES (Limpios de emojis) ===
function checkSpecialDates() {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;

    const specialCard = document.getElementById('special-card');
    const specialTitle = document.getElementById('special-title');
    const specialMessage = document.getElementById('special-message');

    if (day === 25 && month === 1) {
        specialCard.classList.remove('hidden');
        specialTitle.innerText = "Feliz Cumpleanos mi Amor";
        specialMessage.innerText = "Feliz cumpleaños a la mujer mas espectacular del mundo! Que este dia este lleno de tantas sonrisas como las que tu me das a mi. Te amo con todo mi corazon.";
        launchBirthdayConfetti();
    } else if (day === 5 && month === 12) {
        specialCard.classList.remove('hidden');
        specialTitle.innerText = "Hoy es mi Cumpleanos";
        specialMessage.innerText = "Hoy cumplo un año mas, pero el regalo mas grande y espectacular de mi vida ya lo tengo todos los dias, y eres tu. Gracias por hacerme el novio mas feliz.";
        launchBirthdayConfetti();
    } else if (day === 19 && month === 6) {
        specialCard.classList.remove('hidden');
        specialTitle.innerText = "FELIZ ANIVERSARIO";
        specialMessage.innerText = "Hoy celebramos nuestra fecha principal! Mirar este mapa me recuerda el dia exacto en que el cielo se alineo para empezar nuestra hermosa historia. Te amo hoy, mañana y siempre.";
        launchHugeFireworks();
    } else if (day === 19) {
        specialCard.classList.remove('hidden');
        specialTitle.innerText = "Feliz Mesario";
        specialMessage.innerText = "Un mes mas sumando momentos, risas y amor a nuestro contador. Feliz dia 19!";
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


// === LÓGICA DE LA MÚSICA (Limpios de emojis) ===
const music = document.getElementById('background-music');
const musicBtn = document.getElementById('music-btn');
musicBtn.addEventListener('click', () => {
    if (music.paused) { music.play(); musicBtn.innerText = "⏸️ Pausar Musica"; }
    else { music.pause(); musicBtn.innerText = "🎵 Reproducir Musica"; }
});


// === LÓGICA DEL EASTER EGG (Textos limpios) ===
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


// =========================================================
// === MOTOR PRINCIPAL DEL JUEGO INTERACTIVO (Textos limpios y logica doble no) ===
// =========================================================
// gameState = { etapa, clicks en q3, contador de NOs consecutivos }
let gameState = { step: 1, q3Clicks: 0, consecutiveNoCount: 0 };

const gameBtn = document.getElementById('game-btn');
const gameOverlay = document.getElementById('game-overlay');
const gameCard = document.getElementById('game-card');
const gameQuestion = document.getElementById('game-question');
const btnYes = document.getElementById('btn-yes');
const btnNo = document.getElementById('btn-no');
const heartsBg = document.getElementById('game-hearts-bg');

// Al presionar el botón "Pregunta seria" (Limpios emojis)
gameBtn.addEventListener('click', () => {
    gameState.step = 1;
    gameState.q3Clicks = 0;
    gameState.consecutiveNoCount = 0; // Reiniciar contador de Nos
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
    btnYes.innerText = "Si";
    btnNo.innerText = "No";
}

function renderStep() {
    const centerHeart = document.getElementById('center-heart');
    
    if (gameState.step === 1) {
        gameQuestion.innerText = "¿Cuanto me amas?";
        btnYes.innerText = "Muchisimo";
        btnNo.innerText = "No";
        if(centerHeart) centerHeart.style.transform = "translate(-50%, -50%) scale(1)";
    } 
    else if (gameState.step === 2) {
        gameQuestion.innerText = "¿Segura?";
        btnYes.innerText = "Si, mucho";
        btnNo.innerText = "Un poco";
        if(centerHeart) centerHeart.style.transform = "translate(-50%, -50%) scale(2.5)";
    } 
    else if (gameState.step === 3) {
        gameQuestion.innerText = "¿Mas que un helado de ron con pasas?";
        btnYes.innerText = "Si";
        btnNo.innerText = "No";
        if(centerHeart) centerHeart.style.transform = "translate(-50%, -50%) scale(4)";
    } 
    else if (gameState.step === 4) {
        gameQuestion.innerText = "Ultima pregunta:\n¿Me dejas ser el hombre que te robe sonrisas para siempre?";
        btnYes.innerText = "Si, acepto";
        btnNo.innerText = "No";
    }
}

// MANEJO DEL BOTÓN "SÍ" (AVANZAR + CORAZONES ENTEROS QUE SUBEN)
btnYes.addEventListener('click', () => {
    gameState.consecutiveNoCount = 0; // Se resetea el contador de Nos si dice que si
    
    // Generar corazones enteros que SUBEN
    generateRisingHeartsWhole();
    
    if (gameState.step === 1 || gameState.step === 2) {
        gameState.step++;
        renderStep();
    } 
    else if (gameState.step === 3) {
        gameState.q3Clicks++;
        const centerHeart = document.getElementById('center-heart');
        
        if (gameState.q3Clicks === 1) {
            btnYes.innerText = "Si, mucho";
            btnYes.style.transform = "scale(1.2)";
            if(centerHeart) centerHeart.style.transform = "translate(-50%, -50%) scale(5.5)";
        } else if (gameState.q3Clicks === 2) {
            btnYes.innerText = "Si, muchisimo";
            btnYes.style.transform = "scale(1.4)";
            if(centerHeart) centerHeart.style.transform = "translate(-50%, -50%) scale(7)";
        } else if (gameState.q3Clicks >= 3) {
            gameState.step = 4;
            resetButtonsStyles();
            renderStep();
        }
    } 
    else if (gameState.step === 4) {
        // FINAL COMPLETO FELIZ (Limpios de emojis)
        gameQuestion.innerText = "Gracias por hacerme feliz todo este tiempo, disfruta de tu regalo!";
        document.getElementById('game-buttons-container').classList.add('hidden');
        
        const centerHeart = document.getElementById('center-heart');
        if(centerHeart) {
            centerHeart.style.transition = "transform 1.5s ease";
            centerHeart.style.transform = "translate(-50%, -50%) scale(35)";
        }

        // Lanzar flores y confeti multicolor (Limpios de emojis)
        setTimeout(() => {
            launchFlowerConfetti();
            setTimeout(() => {
                gameOverlay.classList.add('hidden');
                document.getElementById('game-buttons-container').classList.remove('hidden');
            }, 3500);
        }, 1000);
    }
});

// MANEJO DEL BOTÓN "NO" (SOLO CORAZONES ROTOS QUE CAEN + CIERRE AL SEGUNDO NO)
btnNo.addEventListener('click', () => {
    // Generar corazones ROTOS que CAEN
    generateFallingHeartsBroken();
    
    // Incrementar contador de Nos consecutivos
    gameState.consecutiveNoCount++;
    
    // Lógica de Doble No: Cerrar y Volver
    if (gameState.consecutiveNoCount >= 2) {
        gameOverlay.classList.add('hidden');
        gameState.consecutiveNoCount = 0; // Resetear
        return;
    }

    if (gameState.step === 1) {
        // En la primera pregunta, mostrar mensaje interno en vez de alert
        gameQuestion.innerText = "Una oportunidad mas...";
        // Despues de 2s, volver a poner la pregunta original
        setTimeout(() => { 
            if(!gameOverlay.classList.contains('hidden')) {
                renderStep(); 
            }
        }, 2000);
    } 
    else if (gameState.step === 2) {
        // Remplazar alert por mensaje interno y vibración
        gameCard.classList.add('shake');
        setTimeout(() => { gameCard.classList.remove('shake'); }, 400); // Duracion vibracion CSS

        const originalText = gameQuestion.innerText;
        gameQuestion.innerText = "Un poco no es suficiente, intentalo de nuevo!";
        gameQuestion.style.color = "#ef4444"; // Color rojo error

        // Despues de 1s, volver a poner la pregunta original
        setTimeout(() => {
            if(!gameOverlay.classList.contains('hidden')) {
                gameQuestion.innerText = originalText;
                gameQuestion.style.color = "#fff"; // Color normal
                // Asegurar que el estado es el mismo
                gameState.step = 2; 
                renderStep(); 
            }
        }, 1200);
    }
    // Para preguntas 3 y 4, al primer "No" no pasa nada mas (solo caen rotos)
});

// Mecánica del Botón que huye (Pregunta 3) en computadora y celular
function fleeButton() {
    if (gameState.step === 3) {
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
    e.preventDefault(); 
    fleeButton();
});

// NUEVA FUNCIÓN: Generador de lluvia de corazones ROTOS que CAEN (SOLO ROTOS)
function generateFallingHeartsBroken() {
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.classList.add('falling-heart-broken');
            heart.innerText = "💔"; // Solo rotos
            heart.style.left = Math.random() * 100 + "vw";
            heart.style.animationDuration = (Math.random() * 2 + 2) + "s";
            heartsBg.appendChild(heart);
            setTimeout(() => { heart.remove(); }, 3000);
        }, i * 100);
    }
}

// NUEVA FUNCIÓN: Generador de lluvia de corazones ENTEROS que SUBEN
function generateRisingHeartsWhole() {
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.classList.add('rising-heart-whole');
            heart.innerText = "❤️"; // Solo enteros
            heart.style.left = Math.random() * 100 + "vw";
            heart.style.animationDuration = (Math.random() * 2 + 2) + "s";
            heartsBg.appendChild(heart);
            setTimeout(() => { heart.remove(); }, 3000);
        }, i * 150);
    }
}

// Disparador de confeti estilo flores multicolores (Textos limpios en el commit)
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