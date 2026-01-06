// Funkcje do zarządzania tokenami
function getActiveToken() {
  // Sprawdź URL params
  const params = new URLSearchParams(window.location.search);
  if (params.has('token')) {
    const token = params.get('token');
    localStorage.setItem('activeToken', token);
    return Promise.resolve(token);
  }
  
  // Sprawdź localStorage
  const stored = localStorage.getItem('activeToken');
  if (stored) {
    return Promise.resolve(stored);
  }
  
  return Promise.resolve(null);
}

function setActiveToken(token) {
  localStorage.setItem('activeToken', token);
}

function clearActiveToken() {
  localStorage.removeItem('activeToken');
}