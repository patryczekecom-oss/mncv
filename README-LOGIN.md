# Mobywatel - System Logowania

Kompletny system logowania z nowoczesnym interfejsem i backendem Node.js.

## 🚀 Szybki Start

### Wymagania
- **Node.js** (wersja 16 lub nowsza) - [Pobierz tutaj](https://nodejs.org/)
- **Python** (dla serwera frontend) - [Pobierz tutaj](https://python.org/)
- **MongoDB** (opcjonalnie, dla pełnej funkcjonalności) - [Pobierz tutaj](https://mongodb.com/)

### Instalacja i Uruchomienie

#### 1. Uruchom Backend (serwer API)
```bash
# Kliknij dwukrotnie na plik:
start-server.bat

# LUB uruchom ręcznie:
cd backend
npm install
npm start
```

#### 2. Uruchom Frontend (interfejs użytkownika)
```bash
# Kliknij dwukrotnie na plik:
start-frontend.bat

# LUB uruchom ręcznie:
python -m http.server 8080
```

#### 3. Otwórz w przeglądarce
Przejdź do: **http://localhost:8080/login.html**

## 📋 Funkcjonalności

### ✨ Nowy System Logowania
- **Nowoczesny interfejs** z animacjami i responsywnym designem
- **Dwa tryby logowania**: Użytkownik i Administrator
- **Walidacja w czasie rzeczywistym** z informacjami o błędach
- **Powiadomienia toast** dla lepszego UX
- **Sprawdzanie stanu serwera** przed próbą logowania
- **Zarządzanie sesjami** z automatycznym przekierowaniem

### 🔐 Bezpieczeństwo
- **JWT tokeny** dla autoryzacji
- **Rate limiting** przeciwko atakom brute-force
- **CORS** skonfigurowany dla bezpiecznych połączeń
- **Helmet.js** dla dodatkowych zabezpieczeń
- **Walidacja danych** po stronie serwera

### 🎨 Interfejs Użytkownika
- **Ciemny motyw** z gradientami
- **Animowane tło** z pływającymi kształtami
- **Responsywny design** działający na wszystkich urządzeniach
- **Płynne animacje** i przejścia
- **Intuicyjna nawigacja** z przełączaniem trybów

## 🔧 Konfiguracja

### Zmienne Środowiskowe (backend/.env)
```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/mobywatel
JWT_SECRET=your-super-secret-jwt-key
FRONTEND_URL=http://localhost:8080
ADMIN_PASSWORD=Patrycjusz2134
```

### Konfiguracja API (assets/login-script.js)
```javascript
const CONFIG = {
    API_URL: 'https://backendm-9np8.onrender.com', // Zmień na swój URL
    ADMIN_PASSWORD: 'Patrycjusz2134',
    TOAST_DURATION: 4000
};
```

## 📱 Tryby Logowania

### 👤 Tryb Użytkownika
- Logowanie za pomocą **tokenu dostępu**
- Automatyczne przekierowanie do **dashboard.html**
- Zarządzanie sesjami użytkownika
- Sprawdzanie ważności tokenu

### 👨‍💼 Tryb Administratora
- Logowanie za pomocą **hasła administratora**
- Przekierowanie do **tokens.html** (panel administracyjny)
- Zarządzanie tokenami użytkowników
- Dostęp do statystyk systemu

## 🎯 Skróty Klawiszowe
- **Ctrl + Shift + A**: Przełącz na tryb administratora
- **Escape**: Wyczyść formularz
- **Enter**: Wyślij formularz logowania

## 🌐 Struktura Plików

```
mobywatel/
├── login.html                 # Nowa strona logowania
├── assets/
│   ├── login-styles.css      # Style dla strony logowania
│   └── login-script.js       # Logika logowania
├── backend/
│   ├── server.js            # Główny serwer Express
│   ├── routes/auth.js       # Endpointy autoryzacji
│   ├── models/             # Modele MongoDB
│   └── .env                # Konfiguracja środowiska
├── start-server.bat        # Skrypt uruchamiania backendu
├── start-frontend.bat      # Skrypt uruchamiania frontendu
└── README-LOGIN.md         # Ten plik
```

## 🔄 API Endpoints

### POST /api/login
Logowanie użytkownika
```json
{
  "token": "user-access-token"
}
```

### GET /api/me
Pobieranie danych zalogowanego użytkownika

### GET /api/verify
Sprawdzanie ważności tokenu JWT

### POST /api/logout
Wylogowanie użytkownika

## 🐛 Rozwiązywanie Problemów

### Serwer nie startuje
1. Sprawdź czy Node.js jest zainstalowany: `node --version`
2. Zainstaluj zależności: `cd backend && npm install`
3. Sprawdź czy port 3000 nie jest zajęty

### Frontend nie ładuje się
1. Sprawdź czy Python jest zainstalowany: `python --version`
2. Upewnij się, że port 8080 nie jest zajęty
3. Spróbuj użyć `python3` zamiast `python`

### Błędy CORS
1. Sprawdź konfigurację CORS w `backend/server.js`
2. Upewnij się, że frontend URL jest w `allowedOrigins`
3. Sprawdź czy używasz prawidłowego protokołu (http/https)

### Problemy z bazą danych
1. Zainstaluj MongoDB lokalnie lub użyj MongoDB Atlas
2. Zaktualizuj `MONGODB_URI` w pliku `.env`
3. Sprawdź połączenie z bazą danych

## 📞 Wsparcie

Jeśli napotkasz problemy:
1. Sprawdź logi w konsoli przeglądarki (F12)
2. Sprawdź logi serwera w terminalu
3. Upewnij się, że wszystkie porty są dostępne
4. Sprawdź konfigurację zmiennych środowiskowych

## 🎉 Gotowe!

Twój system logowania jest teraz gotowy do użycia. Otwórz przeglądarkę i przejdź do `http://localhost:8080/login.html` aby rozpocząć!

---

**Autor**: Mobywatel Team  
**Wersja**: 2.0  
**Data**: 2024