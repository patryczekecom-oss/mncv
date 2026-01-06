function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
}

function generateDocumentNumber() {
    // Generowanie serii (3 litery)
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let series = '';
    for (let i = 0; i < 3; i++) {
        series += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    // Generowanie numeru (6 cyfr)
    const number = String(Math.floor(Math.random() * 999999)).padStart(6, '0');
    // Wstaw do pola (readonly <div>)
    var seriesDiv = document.getElementById('seriesAndNumber');
    if (seriesDiv) seriesDiv.textContent = series + number;

    // Generowanie dat
    generateDates();
}

function generateDates() {
    // Data wydania: bieżący rok, losowy miesiąc i dzień
    const today = new Date();
    const year = today.getFullYear();
    const month = Math.floor(Math.random() * 12); // 0-11
    const day = Math.floor(Math.random() * 28) + 1; // 1-28
    const issuedDate = new Date(year, month, day);

    // Data ważności: 10 lat później, ten sam miesiąc i dzień
    const expiryDate = new Date(year + 10, month, day);

    // Formatowanie dat
    var givenDiv = document.getElementById('givenDate');
    var expiryDiv = document.getElementById('expiryDate');
    if (givenDiv) givenDiv.textContent = formatDate(issuedDate);
    if (expiryDiv) expiryDiv.textContent = formatDate(expiryDate);
}

document.addEventListener('DOMContentLoaded', function() {
    var btn = document.getElementById('generateDetailsBtn');
    if (btn) btn.addEventListener('click', generateDocumentNumber);
});
