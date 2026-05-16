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


// === LÓGICA DE DETECCIÓN DE FECHAS ESPECIALES & EFECTOS ===
function checkSpecialDates() {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1; // En JS Enero es 0, por eso sumamos 1

    const specialCard = document.getElementById('special-card');
    const specialTitle = document.getElementById('special-title');
    const specialMessage = document.getElementById('special-message');

    // 1. CUMPLE DE ELLA: 25 de Enero
    if (day === 25 && month === 1) {
        specialCard.classList.remove('hidden');
        specialTitle.innerText = "¡Feliz Cumpleaños mi Amor! 🎂🎉";
        specialMessage.innerText = "¡Feliz cumpleaños a la mujer más espectacular del mundo! Que este día esté lleno de tantas sonrisas como las que tú me das a mí. Te amo con todo mi corazón. ❤️";
        launchBirthdayConfetti();
    }
    
    // 2. CUMPLE DE ÉL: 5 de Diciembre
    else if (day === 5 && month === 12) {
        specialCard.classList.remove('hidden');
        specialTitle.innerText = "¡Hoy es mi Cumpleaños! 🎈";
        specialMessage.innerText = "Hoy cumplo un año más, pero el regalo más grande y espectacular de mi vida ya lo tengo todos los días, y eres tú. Gracias por hacerme el novio más feliz. ❤️";
        launchBirthdayConfetti();
    }

    // 3. ANIVERSARIO GRANDE: 19 de Junio (1 Año o más)
    else if (day === 19 && month === 6) {
        specialCard.classList.remove('hidden');
        specialTitle.innerText = "¡FELIZ ANIVERSARIO! 🌌✨";
        specialMessage.innerText = "¡Hoy celebramos nuestra fecha principal! Mirar este mapa me recuerda el día exacto en que el cielo se alineó para empezar nuestra hermosa historia. Te amo hoy, mañana y siempre. 🥂❤️";
        launchHugeFireworks();
    }

    // 4. MESARIOS: Todos los días 19 del resto de meses
    else if (day === 19) {
        specialCard.classList.remove('hidden');
        specialTitle.innerText = "¡Feliz Mesario! 💖";
        specialMessage.innerText = "Un mes más sumando momentos, risas y amor a nuestro contador. ¡Feliz día 19! ✨";
        launchNormalFireworks();
    }
}

// --- EFECTOS VISUALES CON CANVAS-CONFETTI ---

// Efecto 1: Explosión clásica de Cumpleaños
function launchBirthdayConfetti() {
    confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
    });
}

// Efecto 2: Fuegos artificiales continuos (Para Mesarios - dura 4 segundos)
function launchNormalFireworks() {
    var duration = 4 * 1000;
    var end = Date.now() + duration;

    (function frame() {
        confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 } });
        confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 } });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

// Efecto 3: Mega espectáculo de Fuegos Artificiales (Aniversario Grande - dura 8 segundos)
function launchHugeFireworks() {
    var duration = 8 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function() {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        var particleCount = 50 * (timeLeft / duration);
        // Disparos aleatorios imitando pirotecnia
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}

// Ejecutar la comprobación al cargar la página
window.onload = function() {
    checkSpecialDates();
};


// === LÓGICA DE LA MÚSICA ===
const music = document.getElementById('background-music');
const musicBtn = document.getElementById('music-btn');

musicBtn.addEventListener('click', () => {
    if (music.paused) {
        music.play();
        musicBtn.innerText = "⏸️ Pausar Música";
    } else {
        music.pause();
        musicBtn.innerText = "🎵 Reproducir Música";
    }
});


// === LÓGICA DEL EASTER EGG (SNOOPY) ===
let clickCount = 0;
const timeBox = document.getElementById('time-box');
const snoopyOverlay = document.getElementById('snoopy-overlay');
const closeSnoopyBtn = document.getElementById('close-snoopy');

timeBox.addEventListener('click', () => {
    clickCount++;
    if (clickCount === 10) {
        snoopyOverlay.classList.remove('hidden');
        clickCount = 0;
    }
});

let clickTimer;
timeBox.addEventListener('click', () => {
    clearTimeout(clickTimer);
    clickTimer = setTimeout(() => {
        clickCount = 0;
    }, 2000);
});

closeSnoopyBtn.addEventListener('click', () => {
    snoopyOverlay.classList.add('hidden');
});