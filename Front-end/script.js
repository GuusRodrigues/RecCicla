document.addEventListener('DOMContentLoaded', function() {
    // Example form submission handling for Contatos page
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Sua mensagem foi enviada com sucesso!');
        this.reset();
    });

    // Example form submission handling for Cadastro page
    document.getElementById('signupForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            alert('As senhas não coincidem.');
        } else {
            alert('Cadastro realizado com sucesso!');
            this.reset();
        }
    });

});

document.addEventListener('DOMContentLoaded', () => {
    // Inicializando o mapa
    const map = L.map('map').setView([-8.0476, -34.8770], 13); // Coordinates for Recife

    // Add a tile layer to the map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Example marker (you can replace with real locations)
    L.marker([-8.0476, -34.8770]).addTo(map)
        .bindPopup('Ponto de Coleta 1')
        .openPopup();
});

//service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then(function(registration) {
        console.log('Service Worker registrado com sucesso:', registration);
      })
      .catch(function(error) {
        console.log('Falha ao registrar o Service Worker:', error);
      });
  }