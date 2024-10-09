// URL do backend
const backendUrl = 'http://localhost:3000/api';

document.addEventListener('DOMContentLoaded', () => {
    // Verificar se o elemento com id 'map' existe na página
    const mapElement = document.getElementById('map');
    if (mapElement) {
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
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Example form submission handling for Contatos page
    const contactForm = document.getElementById('contactForm');
    console.log('contactForm:', contactForm); // Para depuração
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Sua mensagem foi enviada com sucesso!');
            this.reset();
        });
    }

});

