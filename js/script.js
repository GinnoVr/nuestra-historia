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


// === LÓGICA DEL EASTER EGG (SNOOPY EN LA CAJA DE TIEMPO) ===
let clickCount = 0;
const timeBox = document.getElementById('time-box'); // Ahora apuntamos al contador
const snoopyOverlay = document.getElementById('snoopy-overlay');
const closeSnoopyBtn = document.getElementById('close-snoopy');

// Al hacer clic en la caja de tiempo
timeBox.addEventListener('click', () => {
    clickCount++;
    
    // Si llega a 10 clics rápidos, muestra a Snoopy
    if (clickCount === 10) {
        snoopyOverlay.classList.remove('hidden');
        clickCount = 0; // Reinicia el contador
    }
});

// Opcional: Reiniciar el contador si se tarda mucho entre clics
let clickTimer;
timeBox.addEventListener('click', () => {
    clearTimeout(clickTimer);
    clickTimer = setTimeout(() => {
        clickCount = 0; // Si pasan más de 2 segundos sin hacer clic, vuelve a cero
    }, 2000);
});

// Al hacer clic en cerrar en la ventana de Snoopy
closeSnoopyBtn.addEventListener('click', () => {
    snoopyOverlay.classList.add('hidden');
});