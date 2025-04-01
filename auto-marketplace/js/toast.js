/**
 * Sistema de Notificações Toast para WebCars
 * Este arquivo contém funções para exibir notificações estilizadas
 */

// Criar container para toasts se não existir
function garantirContainerToast() {
    if (!document.querySelector('.toast-container')) {
        const container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
        return container;
    }
    return document.querySelector('.toast-container');
}

/**
 * Criar e exibir uma notificação toast
 * @param {string} titulo - Título da notificação
 * @param {string} mensagem - Mensagem principal da notificação
 * @param {string} tipo - Tipo de notificação: 'success', 'error', 'info', 'warning'
 * @param {number} duracao - Duração em ms antes de desaparecer automaticamente (0 = não desaparece)
 */
function criarToast(titulo, mensagem, tipo = 'success', duracao = 5000) {
    // Garantir que o container existe
    const container = garantirContainerToast();
    
    // Criar elemento toast
    const toast = document.createElement('div');
    toast.className = 'toast ' + tipo;
    
    // Definir ícone com base no tipo
    let icone = 'fa-check-circle';
    if (tipo === 'error') icone = 'fa-exclamation-circle';
    if (tipo === 'warning') icone = 'fa-exclamation-triangle';
    if (tipo === 'info') icone = 'fa-info-circle';
    
    // Montar o HTML do toast
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="fas ${icone}"></i>
        </div>
        <div class="toast-content">
            <div class="toast-title">${titulo}</div>
            <div class="toast-message">${mensagem}</div>
        </div>
        <button class="toast-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Adicionar ao container
    container.appendChild(toast);
    
    // Mostrar com animação
    setTimeout(() => toast.classList.add('show'), 10);
    
    // Configurar botão de fechar
    const closeButton = toast.querySelector('.toast-close');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            fecharToast(toast);
        });
    }
    
    // Auto-fechar após duração (se não for 0)
    if (duracao > 0) {
        setTimeout(() => {
            fecharToast(toast);
        }, duracao);
    }
    
    // Retornar referência para possível manipulação posterior
    return toast;
}

/**
 * Fecha uma notificação toast com animação
 * @param {HTMLElement} toast - Elemento toast a ser fechado
 */
function fecharToast(toast) {
    if (!toast) return;
    
    toast.classList.remove('show');
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 300); // Tempo da animação de saída
}

// Exportar funções para uso global
window.criarToast = criarToast;
window.fecharToast = fecharToast;
