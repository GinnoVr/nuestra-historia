// Fecha objetivo: 19 de Junio de 2025 a las 19:00 (7:00 PM)
const startDate = new Date('2025-06-19T19:00:00').getTime();

function updateCounter() {
    const now = new Date().getTime();
    const difference = now - startDate;

    // Conversiones matemáticas de tiempo
    const msPerSecond = 1000;
    const msPerMinute = msPerSecond * 60;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;

    // Cálculo de componentes individuales
    const days = Math.floor(difference / msPerDay);
    const hours = Math.floor((difference % msPerDay) / msPerHour);
    const minutes = Math.floor((difference % msPerHour) / msPerMinute);
    const seconds = Math.floor((difference % msPerMinute) / msPerSecond);

    // Renderizado en el DOM asegurando dos dígitos (ej: 05 en vez de 5)
    document.getElementById('days').innerText = days;
    document.getElementById('hours').innerText = String(hours).padStart(2, '0');
    document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
    document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
}

// Ejecutar inmediatamente y luego actualizar cada 1 segundo
updateCounter();
setInterval(updateCounter, 1000);