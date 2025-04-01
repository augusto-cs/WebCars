// Importar autenticação do Firebase
import { auth } from './firebase-config.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

console.log("Login.js carregado");

// Função para criar o container do toast
function criarToastContainer() {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    return container;
}

// Função para criar toast de erro
function criarToastErro(titulo, mensagem) {
    console.log("Criando toast de erro:", titulo, mensagem);
    const container = criarToastContainer();
    const toast = document.createElement('div');
    toast.className = 'toast error';
    
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="fas fa-exclamation-circle"></i>
        </div>
        <div class="toast-content">
            <div class="toast-title">${titulo}</div>
            <div class="toast-message">${mensagem}</div>
        </div>
        <button class="toast-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    container.appendChild(toast);
    toast.offsetHeight; // Forçar reflow
    toast.classList.add('show');
    
    // Configurar o botão de fechar
    const closeButton = toast.querySelector('.toast-close');
    closeButton.addEventListener('click', () => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    });
    
    // Remover após 5 segundos
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 5000);
}

// Esperar o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM carregado");
    
    // Elementos
    const emailInput = document.getElementById('usuario');
    const passwordInput = document.getElementById('senha');
    const loginButton = document.querySelector('.btn-login');
    const togglePasswordButton = document.getElementById('toggle-password');
    
    // Alternancia de visibilidade da senha
    if (togglePasswordButton) {
        togglePasswordButton.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Mudar o ícone
            const icon = togglePasswordButton.querySelector('i');
            if (type === 'password') {
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            } else {
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            }
        });
    }
    
    // Login com Firebase
    if (loginButton) {
        loginButton.addEventListener('click', function(e) {
            e.preventDefault();
            console.log("Botão de login clicado");
            
            // Verificar se os campos estão preenchidos
            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();
            
            if (!email || !password) {
                criarToastErro('Campos obrigatórios', 'Por favor, preencha email e senha');
                return;
            }
            
            // Mostrar loading
            loginButton.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Processando...';
            loginButton.disabled = true;
            
            // Tentar login
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Login bem-sucedido
                    const user = userCredential.user;
                    console.log("Login bem-sucedido:", user.email);
                    
                    // Salvar informações do usuário
                    localStorage.setItem('usuario_logado', email.split('@')[0]);
                    localStorage.setItem('mostrar_toast_boas_vindas', 'true');
                    
                    // Redirecionar para a página principal
                    window.location.href = 'index.html';
                })
                .catch((error) => {
                    console.error("Erro de login:", error.code, error.message);
                    
                    // Restaurar botão
                    loginButton.innerHTML = '<i class="fas fa-sign-in-alt"></i> Entrar';
                    loginButton.disabled = false;
                    
                    // Mensagem de erro
                    criarToastErro('Erro de Login', 'E-mail ou senha inválidos');
                });
        });
    }
});

// Prevenir reenvio de formulário ao atualizar a página
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
} 