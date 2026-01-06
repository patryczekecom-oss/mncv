// Prosty test backendu
const mongoose = require('mongoose');
require('dotenv').config();

async function testBackend() {
    try {
        console.log('🔍 Testowanie backendu...');
        
        // Test 1: Sprawdź zmienne środowiskowe
        console.log('📋 Sprawdzanie zmiennych środowiskowych...');
        const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET'];
        const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
        
        if (missingVars.length > 0) {
            console.log('❌ Brakujące zmienne środowiskowe:', missingVars);
        } else {
            console.log('✅ Wszystkie wymagane zmienne środowiskowe są ustawione');
        }
        
        // Test 2: Sprawdź połączenie z MongoDB
        console.log('🔗 Testowanie połączenia z MongoDB...');
        try {
            await mongoose.connect(process.env.MONGODB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log('✅ Połączenie z MongoDB udane');
            await mongoose.disconnect();
        } catch (error) {
            console.log('❌ Błąd połączenia z MongoDB:', error.message);
        }
        
        // Test 3: Sprawdź importy modeli
        console.log('📦 Testowanie importów modeli...');
        try {
            const User = require('./models/user');
            const Token = require('./models/token');
            const Card = require('./models/Card');
            console.log('✅ Wszystkie modele zostały zaimportowane poprawnie');
        } catch (error) {
            console.log('❌ Błąd importu modeli:', error.message);
        }
        
        // Test 4: Sprawdź importy routes
        console.log('🛣️ Testowanie importów routes...');
        try {
            const authRoutes = require('./routes/auth');
            const tokenRoutes = require('./routes/tokens');
            const userRoutes = require('./routes/users');
            const cardRoutes = require('./routes/card');
            console.log('✅ Wszystkie routes zostały zaimportowane poprawnie');
        } catch (error) {
            console.log('❌ Błąd importu routes:', error.message);
        }
        
        // Test 5: Sprawdź middleware
        console.log('🔒 Testowanie middleware...');
        try {
            const auth = require('./middleware/auth');
            console.log('✅ Middleware auth zaimportowany poprawnie');
        } catch (error) {
            console.log('❌ Błąd importu middleware:', error.message);
        }
        
        // Test 6: Sprawdź utils
        console.log('🛠️ Testowanie utils...');
        try {
            const helpers = require('./utils/helpers');
            const testToken = helpers.generateToken();
            console.log('✅ Utils działają poprawnie, wygenerowany token:', testToken);
        } catch (error) {
            console.log('❌ Błąd utils:', error.message);
        }
        
        console.log('\n🎉 Test backendu zakończony!');
        
    } catch (error) {
        console.log('💥 Ogólny błąd testu:', error.message);
    }
}

// Uruchom test
testBackend().then(() => {
    console.log('Test zakończony');
    process.exit(0);
}).catch(error => {
    console.error('Test nie powiódł się:', error);
    process.exit(1);
});