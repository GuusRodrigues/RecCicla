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


// Carregar os centros de reciclagem quando a página for carregada
document.addEventListener('DOMContentLoaded', () => {
  loadReciclagens();
});

// Adicionar evento de submit ao formulário
const reciclagemForm = document.getElementById('reciclagem-form');
reciclagemForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;
  const localizacao = document.getElementById('localizacao').value;

  const reciclagemData = { name, description, localizacao };

  try {
    await createReciclagem(reciclagemData);
    reciclagemForm.reset();
    loadReciclagens(); // Recarregar a lista após adicionar
  } catch (error) {
    console.error('Erro ao adicionar centro de reciclagem:', error);
  }
});

// Carregar todos os centros de reciclagem
async function loadReciclagens() {
  try {
    const response = await fetch(backendUrl );
    const reciclagens = await response.json();
    displayReciclagens(reciclagens);
  } catch (error) {
    console.error('Erro ao carregar centros de reciclagem:', error);
  }
}

// Exibir os centros de reciclagem na página
function displayReciclagens(reciclagens) {
  const reciclagemList = document.getElementById('ReciclagemList');
  reciclagemList.innerHTML = '';

  reciclagens.forEach((reciclagem) => {
    const reciclagemItem = document.createElement('div');
    reciclagemItem.className = 'card mb-3';
    reciclagemItem.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">${reciclagem.name}</h5>
        <p class="card-text">${reciclagem.description}</p>
        <p class="card-text"><small class="text-muted">Localização: ${reciclagem.localizacao}</small></p>
        <button class="btn btn-primary btn-sm" onclick="editReciclagem('${reciclagem._id}')">Editar</button>
        <button class="btn btn-danger btn-sm" onclick="deleteReciclagem('${reciclagem._id}')">Deletar</button>
      </div>
    `;
    reciclagemList.appendChild(reciclagemItem);
  });
}

// Criar um novo centro de reciclagem
async function createReciclagem(reciclagemData) {
  const response = await fetch(backendUrl , {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reciclagemData),
  });
  if (!response.ok) {
    throw new Error('Erro ao criar centro de reciclagem');
  }
}

// Deletar um centro de reciclagem
async function deleteReciclagem(id) {
  try {
    await fetch(`${backendUrl }/${id}`, {
      method: 'DELETE',
    });
    loadReciclagens(); // Recarregar a lista após deletar
  } catch (error) {
    console.error('Erro ao deletar centro de reciclagem:', error);
  }
}

// Editar um centro de reciclagem
async function editReciclagem(id) {
  const name = prompt('Digite o novo nome do centro de reciclagem:');
  const description = prompt('Digite a nova descrição:');
  const localizacao = prompt('Digite a nova localização:');

  if (!name || !description || !localizacao) {
    alert('Todos os campos são obrigatórios!');
    return;
  }

  const reciclagemData = { name, description, localizacao };

  try {
    await fetch(`${backendUrl }/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reciclagemData),
    });
    loadReciclagens(); // Recarregar a lista após editar
  } catch (error) {
    console.error('Erro ao editar centro de reciclagem:', error);
  }
}


document.getElementById('contactForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const contactData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    try {
        const response = await fetch('/api/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contactData)
        });

        if (response.ok) {
            alert('Mensagem enviada com sucesso!');
            document.getElementById('contactForm').reset();
        } else {
            alert('Erro ao enviar a mensagem.');
        }
    } catch (error) {
        console.error('Erro ao enviar a mensagem:', error);
    }
});
