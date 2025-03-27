// Esperar o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    // Elementos
    const loginForm = document.querySelector('.card-login');
    const emailInput = document.getElementById('usuario');
    const passwordInput = document.getElementById('senha');
    const loginButton = document.querySelector('.btn-login');
    const togglePasswordButton = document.getElementById('toggle-password');
    const socialButtons = document.querySelectorAll('.social-btn');
    
    // Alternancia de visibilidade da senha
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
    
    // Efeito de focus nos inputs
    const inputs = document.querySelectorAll('.textfield input');
    inputs.forEach(input => {
        // Adicionar classe quando o input estiver em foco
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        // Remover classe quando o input perder o foco
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Verificar se o input já tem valor ao carregar a página
        if (input.value !== '') {
            input.parentElement.classList.add('focused');
        }
    });
    
    // Animação ao clicar nos botões sociais
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 300);
        });
    });
    
    // Validação básica de formulário
    loginButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Validação básica
        let isValid = true;
        
        if (!emailInput.value.trim()) {
            showError(emailInput, 'Por favor, insira seu email ou usuário');
            isValid = false;
        } else {
            removeError(emailInput);
        }
        
        if (!passwordInput.value.trim()) {
            showError(passwordInput, 'Por favor, insira sua senha');
            isValid = false;
        } else {
            removeError(passwordInput);
        }
        
        if (isValid) {
            // Adicionar efeito de loading ao botão
            loginButton.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Processando...';
            loginButton.disabled = true;
            
            // Simulação de login (aqui você conectaria à sua API real)
            setTimeout(() => {
                // Redirecionar para a página principal (ou qualquer outra página após o login)
                window.location.href = 'index.html';
            }, 2000);
        }
    });
    
    // Função para mostrar erro
    function showError(input, message) {
        const textfield = input.parentElement;
        let errorElement = textfield.querySelector('.error-message');
        
        if (!errorElement) {
            errorElement = document.createElement('span');
            errorElement.className = 'error-message';
            textfield.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        textfield.classList.add('error');
        input.classList.add('input-error');
    }
    
    // Função para remover erro
    function removeError(input) {
        const textfield = input.parentElement;
        const errorElement = textfield.querySelector('.error-message');
        
        if (errorElement) {
            textfield.removeChild(errorElement);
        }
        
        textfield.classList.remove('error');
        input.classList.remove('input-error');
    }
    
    // Efeito de animação para a imagem do carro
    const carImage = document.querySelector('.car-animation');
    if (carImage) {
        // Tentar pré-carregar a imagem padrão do logo
        const logoImg = new Image();
        logoImg.src = 'img/logosite.png';
        
        // Verificar se a imagem foi carregada
        carImage.addEventListener('load', function() {
            console.log('Animação carregada com sucesso!');
            this.classList.add('loaded');
            
            // Se for SVG, aplicar efeitos especiais
            if (this.src.includes('.svg')) {
                this.classList.add('svg-animation');
            }
        });
        
        // Erro de carregamento
        carImage.addEventListener('error', function() {
            console.error('Erro ao carregar a animação. Verificar caminho do arquivo.');
            // Limpar o cache através da adição de timestamp
            const timestamp = new Date().getTime();
            
            // Tentar carregar com timestamp primeiro (ignorar cache)
            if (!this.src.includes('?v=')) {
                this.src = `img/teladeloginanim.svg?v=${timestamp}`;
            } 
            // Se ainda falhar, tentar alternativas
            else if (this.src.includes('teladeloginanim.svg')) {
                this.src = 'img/logo.svg';
            } else if (this.src.includes('logo.svg')) {
                this.src = 'img/logosite.png';
                // Ajustar o tamanho caso seja o logo maior
                this.style.maxWidth = '200px';
            }
        });
        
        // Efeito de movimento com o mouse (apenas se for SVG)
        window.addEventListener('mousemove', function(e) {
            if (carImage.classList.contains('svg-animation')) {
                const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
                const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
                
                carImage.style.transform = `translateY(-${moveY}px) translateX(${moveX}px) rotate(${moveY/2}deg)`;
            }
        });
    }
    
    // Adicionar classe de loading na página
    document.body.classList.add('loaded');
});

// Prevenir reenvio de formulário ao atualizar a página
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
} 