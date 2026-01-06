// Check if running as PWA
function isPWA() {
    return window.matchMedia('(display-mode: standalone)').matches ||
           window.navigator.standalone;
}

// Handle navigation based on saved data and PWA status
function handleNavigation() {
    const savedData = localStorage.getItem('formData');
    const currentPath = window.location.pathname;

    if (isPWA()) {
        // If running as PWA
        if (!savedData && currentPath !== '/index.html') {
            window.location.href = 'index.html';
        } else if (savedData && currentPath === '/index.html') {
            window.location.href = 'id.html';
        }
    }
}

// Handle data persistence
function saveFormData(formData) {
    localStorage.setItem('formData', JSON.stringify(formData));
}

// Load saved data
function loadFormData() {
    const savedData = localStorage.getItem('formData');
    return savedData ? JSON.parse(savedData) : null;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    handleNavigation();
});