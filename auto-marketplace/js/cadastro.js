// Esperar o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    // Elementos
    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const telefoneInput = document.getElementById('telefone');
    const senhaInput = document.getElementById('senha');
    const confirmarSenhaInput = document.getElementById('confirmar-senha');
    const togglePasswordButton = document.getElementById('toggle-password');
    const togglePasswordConfirmButton = document.getElementById('toggle-password-confirm');
    const termosCheckbox = document.getElementById('termos');
    const cadastroButton = document.querySelector('.btn-cadastro');
    const socialButtons = document.querySelectorAll('.social-btn');
    
    // Inicializar máscara de telefone
    inicializarMascaraTelefone();
    
    // Adicionar validação para o campo de usuário
    inicializarValidacaoUsuario();
    
    // Adicionar indicador de força de senha
    adicionarIndicadorForcaSenha();
    
    // Alternancia de visibilidade da senha
    togglePasswordButton.addEventListener('click', function() {
        togglePasswordVisibility(senhaInput, this);
    });
    
    togglePasswordConfirmButton.addEventListener('click', function() {
        togglePasswordVisibility(confirmarSenhaInput, this);
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
    
    // Validação de senha enquanto digita
    senhaInput.addEventListener('input', function() {
        const forca = verificarForcaSenha(this.value);
        atualizarIndicadorForcaSenha(forca);
    });
    
    // Validação ao digitar confirmar senha
    confirmarSenhaInput.addEventListener('input', function() {
        if (this.value !== senhaInput.value) {
            this.parentElement.classList.add('error');
            let errorElement = this.parentElement.querySelector('.error-message');
            
            if (!errorElement) {
                errorElement = document.createElement('span');
                errorElement.className = 'error-message';
                this.parentElement.appendChild(errorElement);
            }
            
            errorElement.textContent = 'As senhas não coincidem';
        } else {
            this.parentElement.classList.remove('error');
            const errorElement = this.parentElement.querySelector('.error-message');
            if (errorElement) {
                this.parentElement.removeChild(errorElement);
            }
        }
    });
    
    // Validação de formulário ao clicar em Cadastrar
    cadastroButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Validação básica
        let isValid = true;
        
        // Validar nome
        if (!nomeInput.value.trim()) {
            showError(nomeInput, 'Por favor, insira seu nome de usuário');
            isValid = false;
        } else if (/[^a-zA-Z0-9_.]/.test(nomeInput.value)) {
            showError(nomeInput, 'O nome de usuário não pode conter caracteres especiais como #, @ etc.');
            isValid = false;
        } else if (nomeInput.value.trim().length < 3) {
            showError(nomeInput, 'O nome de usuário deve ter pelo menos 3 caracteres');
            isValid = false;
        } else {
            removeError(nomeInput);
        }
        
        // Validar email
        if (!emailInput.value.trim()) {
            showError(emailInput, 'Por favor, insira seu email');
            isValid = false;
        } else if (!validarEmail(emailInput.value)) {
            showError(emailInput, 'Por favor, insira um email válido');
            isValid = false;
        } else {
            removeError(emailInput);
        }
        
        // Validar telefone
        if (!telefoneInput.value.trim()) {
            showError(telefoneInput, 'Por favor, insira seu telefone');
            isValid = false;
        } else if (telefoneInput.value.replace(/\D/g, '').length < 10) {
            showError(telefoneInput, 'Telefone incompleto');
            isValid = false;
        } else {
            removeError(telefoneInput);
        }
        
        // Validar senha
        if (!senhaInput.value) {
            showError(senhaInput, 'Por favor, crie uma senha');
            isValid = false;
        } else if (verificarForcaSenha(senhaInput.value).score < 2) {
            showError(senhaInput, 'Sua senha é muito fraca');
            isValid = false;
        } else {
            removeError(senhaInput);
        }
        
        // Validar confirmação de senha
        if (!confirmarSenhaInput.value) {
            showError(confirmarSenhaInput, 'Por favor, confirme sua senha');
            isValid = false;
        } else if (confirmarSenhaInput.value !== senhaInput.value) {
            showError(confirmarSenhaInput, 'As senhas não coincidem');
            isValid = false;
        } else {
            removeError(confirmarSenhaInput);
        }
        
        // Validar termos de uso
        if (!termosCheckbox.checked) {
            const termosElement = document.querySelector('.termos-uso');
            let errorElement = termosElement.querySelector('.error-message');
            
            if (!errorElement) {
                errorElement = document.createElement('span');
                errorElement.className = 'error-message';
                termosElement.appendChild(errorElement);
            }
            
            errorElement.textContent = 'Você precisa aceitar os termos de uso';
            isValid = false;
        } else {
            const termosElement = document.querySelector('.termos-uso');
            const errorElement = termosElement.querySelector('.error-message');
            if (errorElement) {
                termosElement.removeChild(errorElement);
            }
        }
        
        if (isValid) {
            // Adicionar efeito de loading ao botão
            cadastroButton.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Processando...';
            cadastroButton.disabled = true;
            
            // Simulação de cadastro (aqui você conectaria à sua API real)
            setTimeout(() => {
                // Redirecionar para a página de sucesso ou login
                window.location.href = 'cadastro-sucesso.html';
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
    
    // Função para validar email
    function validarEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Função para alternar visibilidade da senha
    function togglePasswordVisibility(input, button) {
        const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', type);
        
        // Mudar o ícone
        const icon = button.querySelector('i');
        if (type === 'password') {
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        } else {
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        }
    }
    
    // Função para inicializar a máscara de telefone
    function inicializarMascaraTelefone() {
        telefoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                // Formato: (XX) XXXXX-XXXX
                value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
                value = value.replace(/(\d)(\d{4})$/, '$1-$2');
                e.target.value = value;
            }
        });
    }
    
    // Função para adicionar indicador de força de senha
    function adicionarIndicadorForcaSenha() {
        const senhaField = senhaInput.parentElement;
        
        // Criar container de força de senha
        const forcaSenhaContainer = document.createElement('div');
        forcaSenhaContainer.className = 'forca-senha';
        
        // Criar barra de força
        const forcaSenhaBarra = document.createElement('div');
        forcaSenhaBarra.className = 'forca-senha-barra';
        forcaSenhaContainer.appendChild(forcaSenhaBarra);
        
        // Criar texto de força
        const forcaSenhaTexto = document.createElement('div');
        forcaSenhaTexto.className = 'forca-senha-texto';
        
        // Adicionar ao DOM
        senhaField.appendChild(forcaSenhaContainer);
        senhaField.appendChild(forcaSenhaTexto);
    }
    
    // Função para verificar força da senha
    function verificarForcaSenha(senha) {
        let score = 0;
        let feedback = '';
        
        // Critérios de força
        if (senha.length > 6) score++;
        if (senha.length > 10) score++;
        if (/[A-Z]/.test(senha)) score++;
        if (/[a-z]/.test(senha)) score++;
        if (/[0-9]/.test(senha)) score++;
        if (/[^A-Za-z0-9]/.test(senha)) score++;
        
        // Feedback baseado no score
        if (score <= 2) {
            feedback = 'Fraca';
        } else if (score <= 4) {
            feedback = 'Média';
        } else if (score <= 5) {
            feedback = 'Forte';
        } else {
            feedback = 'Excelente';
        }
        
        return {
            score: score,
            feedback: feedback
        };
    }
    
    // Função para atualizar o indicador de força da senha - modificando as cores
    function atualizarIndicadorForcaSenha(forcaSenha) {
        const barra = document.querySelector('.forca-senha-barra');
        const texto = document.querySelector('.forca-senha-texto');
        
        // Remover classes existentes
        barra.className = 'forca-senha-barra';
        
        // Adicionar classe baseada na força
        if (forcaSenha.score <= 2) {
            barra.classList.add('forca-fraca');
            texto.textContent = 'Senha fraca';
            texto.style.color = '#ff5a5a';
        } else if (forcaSenha.score <= 4) {
            barra.classList.add('forca-media');
            texto.textContent = 'Senha média';
            texto.style.color = '#ffcc00';
        } else if (forcaSenha.score <= 5) {
            barra.classList.add('forca-forte');
            texto.textContent = 'Senha forte';
            texto.style.color = '#4F94CD'; // Azul claro 
        } else {
            barra.classList.add('forca-excelente');
            texto.textContent = 'Senha excelente';
            texto.style.color = '#1E90FF'; // Azul mais brilhante
        }
    }
    
    // Efeito de animação para a imagem do carro
    const carImage = document.querySelector('.car-animation');
    if (carImage) {
        // Verificar se a imagem foi carregada
        carImage.addEventListener('load', function() {
            console.log('Animação carregada com sucesso!');
            // Adicionar classe para indicar que a imagem foi carregada
            this.classList.add('loaded');
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
            if (carImage.src.includes('.svg')) {
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

// Função para inicializar a validação do campo de usuário
function inicializarValidacaoUsuario() {
    const nomeInput = document.getElementById('nome');
    if (!nomeInput) return;
    
    nomeInput.addEventListener('input', function(e) {
        const valorAtual = e.target.value;
        // Substitui qualquer caractere que não seja letra, número, underscore ou ponto
        const valorFiltrado = valorAtual.replace(/[^a-zA-Z0-9_.]/g, '');
        
        // Se o valor foi alterado, atualiza o campo e mostra uma mensagem
        if (valorFiltrado !== valorAtual) {
            e.target.value = valorFiltrado;
            
            // Mostra a mensagem temporária
            let errorElement = this.parentElement.querySelector('.char-not-allowed');
            
            if (!errorElement) {
                errorElement = document.createElement('span');
                errorElement.className = 'error-message char-not-allowed';
                errorElement.textContent = 'Caracteres especiais não são permitidos';
                this.parentElement.appendChild(errorElement);
                
                // Remove a mensagem após 2 segundos
                setTimeout(() => {
                    if (errorElement.parentElement) {
                        errorElement.parentElement.removeChild(errorElement);
                    }
                }, 2000);
            }
        }
    });
} 