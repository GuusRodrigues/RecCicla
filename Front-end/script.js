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

//service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/Front-end/service-worker.js')
      .then(function(registration) {
        console.log('Service Worker registrado com sucesso:', registration);
      })
      .catch(function(error) {
        console.log('Falha ao registrar o Service Worker:', error);
      });
  }