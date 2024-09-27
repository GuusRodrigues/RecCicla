// URL do backend
const backendUrl = 'http://localhost:3000/api';

// Função de login
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(`${backendUrl}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (response.ok) {
            // Armazenar o token no localStorage
            localStorage.setItem('token', data.token);
            window.location.href = 'home.html'; // Redirecionar para a home
        } else {
            document.getElementById('errorMessage').innerText = data.message;
        }
    } catch (error) {
        console.error('Erro:', error);
    }
});

// Função para verificar autenticação na home
window.addEventListener('DOMContentLoaded', async () => {
    if (window.location.pathname.includes('home.html')) {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = 'index.html';
        }

        // Carregar Recicalgens
        try {
            const response = await fetch(`${backendUrl}/reciclagens`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const reciclagens = await response.json();
                const reciclagensList = document.getElementById('reciclagensList');
                reciclagensList.innerHTML = reciclagens.map(p => `<div>${p.nome}</div>`).join('');
            } else {
                window.location.href = 'index.html';
            }
        } catch (error) {
            console.error('Erro ao carregar reciclagens:', error);
        }

        // Logout
        document.getElementById('logoutButton').addEventListener('click', () => {
            localStorage.removeItem('token');
            window.location.href = 'index.html';
        });
    }
}); 
