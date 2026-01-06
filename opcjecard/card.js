const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
const optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };

// Funkcja inicjalizująca dane
function initializeData() {
    try {
        // Próba pobrania danych z localStorage
        const cardData = localStorage.getItem('formData');
        if (!cardData) {
            console.warn('Brak danych w localStorage');
            return false;
        }

        let formData;
        try {
            formData = JSON.parse(cardData);
        } catch (e) {
            console.error('Błędny JSON w localStorage: formData', e);
            return false;
        }
        if (!formData || typeof formData !== 'object') {
            console.warn('Nieprawidłowe dane w localStorage');
            return false;
        }
        
        // Ustaw zdjęcie
        setImage(formData.image || 'https://i.imgur.com/default.jpg');

        // Ustaw podstawowe dane osobowe
        setData('name', (formData.name || '').toUpperCase());
        setData('surname', (formData.surname || '').toUpperCase());
        setData('nationality', (formData.nationality || 'POLSKIE').toUpperCase());
        setData('familyName', formData.familyName || '');
        setData('fathersName', (formData.fathersName || formData.fatherName || 'BRAK DANYCH').toUpperCase());
        setData('mothersName', (formData.mothersName || formData.motherName || 'BRAK DANYCH').toUpperCase());
        setData('birthPlace', formData.birthPlace || '');
        setData('countryOfBirth', formData.countryOfBirth || 'POLSKA');
        
        // Konwersja płci
        let sexValue = 'Nieznana';
        if (formData.sex === 'M' || formData.sex === 'm') sexValue = 'Mężczyzna';
        else if (formData.sex === 'K' || formData.sex === 'k') sexValue = 'Kobieta';
        setData('sex', sexValue);
        
        // Ustaw adres
        const address = formData.address1 ? 
            `ul. ${formData.address1}<br>${formData.address2 || ''} ${formData.city || ''}` : '';
        setData('adress', address);

        // Ustaw datę urodzenia
        let birthdayDate;
        if (formData.birthDate && /^\d{2}\.\d{2}\.\d{4}$/.test(formData.birthDate)) {
            setData('birthday', formData.birthDate);
            const [day, month, year] = formData.birthDate.split('.');
            birthdayDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        } else if (formData.birthYear && formData.birthMonth && formData.birthDay) {
            birthdayDate = new Date(
                parseInt(formData.birthYear),
                parseInt(formData.birthMonth) - 1,
                parseInt(formData.birthDay)
            );
            setData('birthday', birthdayDate.toLocaleDateString('pl-PL', options));
        } else {
            birthdayDate = new Date();
            setData('birthday', birthdayDate.toLocaleDateString('pl-PL', options));
        }

        // Używamy tej samej daty dla daty zameldowania
        const homeDateStr = birthdayDate.toLocaleDateString("pl-PL", options);
        localStorage.setItem("homeDate", homeDateStr);
        document.querySelectorAll('.home_date').forEach(element => {
            element.innerHTML = homeDateStr;
        });

        // Generuj serię i numer jeśli nie istnieje
        if (!localStorage.getItem('seriesAndNumber')) {
            let seriesNumber = '';
            const chars = 'ABCDEFGHIJKLMNOPQRSTUWXYZ';
            for (let i = 0; i < 3; i++) {
                seriesNumber += chars[Math.floor(Math.random() * chars.length)];
            }
            seriesNumber += ' ';
            for (let i = 0; i < 6; i++) {
                seriesNumber += Math.floor(Math.random() * 10);
            }
            localStorage.setItem('seriesAndNumber', seriesNumber);
        }

        // Ustaw wszystkie dane
        setData('seriesAndNumber', formData.seriesAndNumber || localStorage.getItem('seriesAndNumber'));
        setData('fathersFamilyName', (formData.fathersFamilyName || formData.fatherSurname || 'BRAK DANYCH').toUpperCase());
        setData('mothersFamilyName', (formData.mothersFamilyName || formData.motherSurname || 'BRAK DANYCH').toUpperCase());

        // Ustaw daty
        if (formData.givenDate && formData.expiryDate) {
            setData('givenDate', formData.givenDate);
            setData('expiryDate', formData.expiryDate);
        } else {
            const givenDate = new Date(birthdayDate);
            givenDate.setFullYear(givenDate.getFullYear() + 18);
            setData('givenDate', givenDate.toLocaleDateString('pl-PL', options));

            const expiryDate = new Date(givenDate);
            expiryDate.setFullYear(givenDate.getFullYear() + 10);
            setData('expiryDate', expiryDate.toLocaleDateString('pl-PL', options));
        }

        // Generuj PESEL jeśli nie istnieje
        if (formData.pesel) {
            setData('pesel', formData.pesel);
        } else {
            let month = parseInt(formData.birthMonth || birthdayDate.getMonth() + 1);
            let year = parseInt(formData.birthYear || birthdayDate.getFullYear());
            if (year >= 2000) {
                month = month + 20;
            }
            month = month < 10 ? '0' + month : month;
            let day = parseInt(formData.birthDay || birthdayDate.getDate()) < 10 ? 
                      '0' + (formData.birthDay || birthdayDate.getDate()) : 
                      (formData.birthDay || birthdayDate.getDate());
            let later = (formData.sex === 'M' || formData.sex === 'm') ? '0295' : '0382';
            let pesel = year.toString().substring(2) + month + day + later + '7';
            setData('pesel', pesel);
        }

        return true;
    } catch (error) {
        console.error('Błąd podczas ładowania danych:', error);
        return false;
    }
}

// Pomocnicza funkcja do ustawiania zdjęcia
function setImage(image) {
    const imageElement = document.querySelector('.id_own_image');
    if (imageElement) {
        imageElement.style.backgroundImage = `url(${image})`;
    }
}

// Pomocnicza funkcja do ustawiania danych
function setData(id, value) {
    const element = document.getElementById(id);
    if (element && value !== undefined && value !== null) {
        element.innerHTML = value;
    }
}

// Inicjalizacja przy załadowaniu strony
document.addEventListener('DOMContentLoaded', () => {
    if (!initializeData() && !window.navigator.standalone) {
        window.location.href = 'index.html';
    }

    // Obsługa zegara i innych funkcji
    const time = document.getElementById("time");
    if (localStorage.getItem("update") == null) {
        localStorage.setItem("update", "24.12.2024");
    }
    const date = new Date();
    const updateText = document.querySelector(".bottom_update_value");
    if (updateText) {
        updateText.innerHTML = localStorage.getItem("update");
    }
    const update = document.querySelector(".update");
    if (update) {
        update.addEventListener('click', () => {
            const newDate = date.toLocaleDateString("pl-PL", options);
            localStorage.setItem("update", newDate);
            if (updateText) {
                updateText.innerHTML = newDate;
            }
            scroll(0, 0);
        });
    }
    // Obsługa rozwijania sekcji "Twoje dodatkowe dane"
    const infoHolder = document.querySelector(".info_holder");
    const additionalHolder = document.querySelector(".additional_holder");
    const actionArrow = document.querySelector(".action_arrow");
    if (infoHolder && additionalHolder && actionArrow) {
        additionalHolder.style.display = 'none';
        actionArrow.style.transform = 'rotate(0deg)';
        infoHolder.addEventListener('click', () => {
            const isExpanded = additionalHolder.style.display === 'block';
            additionalHolder.style.display = isExpanded ? 'none' : 'block';
            actionArrow.style.transform = `rotate(${isExpanded ? 0 : 90}deg)`;
            infoHolder.classList.toggle('unfolded');
        });
    }
    // Update clock every second
    function setClock() {
        if (time) {
            const now = new Date();
            time.innerHTML = now.toLocaleTimeString("pl-PL", optionsTime) + " " + now.toLocaleDateString("pl-PL", options);
        }
    }
    setClock();
    setInterval(setClock, 1000);
});
