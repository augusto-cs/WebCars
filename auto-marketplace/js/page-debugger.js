/**
 * Script para solucionar problemas de página em branco
 */

// Garantir que o corpo da página seja visível
document.body.classList.add('loaded');

// Observar quando o DOM estiver completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado - page-debugger.js');
    document.body.classList.add('loaded');
    
    // Tentar forçar a visibilidade da página a cada 100ms por 5 segundos
    for (let i = 1; i <= 50; i++) {
        setTimeout(function() {
            document.body.style.opacity = '1';
            document.body.style.visibility = 'visible';
            document.body.classList.add('loaded');
            console.log(`Tentativa ${i} para forçar visibilidade da página`);
        }, i * 100);
    }
});

// Observar quando a página estiver completamente carregada, incluindo todos os recursos
window.addEventListener('load', function() {
    console.log('Página totalmente carregada - page-debugger.js');
    document.body.classList.add('loaded');
    document.body.style.opacity = '1';
    document.body.style.visibility = 'visible';
    
    // Log para verificar o estado de visibilidade da página
    const bodyStyles = window.getComputedStyle(document.body);
    console.log(`Estado do body: opacity=${bodyStyles.opacity}, visibility=${bodyStyles.visibility}`);
    
    // Verificar e corrigir estilos de elementos críticos
    const criticalElements = [
        'body', '.main-login', '.left-login', '.right-login', 
        '.card-login', '#loginForm', '#registerForm'
    ];
    
    criticalElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.style.opacity = '1';
            element.style.visibility = 'visible';
            console.log(`Corrigido elemento: ${selector}`);
        });
    });
});

// Tratamento de erros global
window.addEventListener('error', function(event) {
    console.error('Erro global capturado:', event.error);
    document.body.classList.add('loaded');
    document.body.style.opacity = '1';
    document.body.style.visibility = 'visible';
});

// Script de depuração para auxiliar na identificação de problemas
document.addEventListener('DOMContentLoaded', function() {
    // Criar painel de depuração
    const debugPanel = document.createElement('div');
    debugPanel.id = 'debug-panel';
    debugPanel.style.cssText = `
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background: rgba(0, 0, 0, 0.8);
        color: #33ff33;
        font-family: monospace;
        padding: 10px;
        z-index: 10000;
        max-height: 300px;
        overflow-y: auto;
        font-size: 12px;
        border-top: 2px solid #33ff33;
        display: none;
    `;
    
    // Botão para mostrar/ocultar o painel
    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'Debug';
    toggleButton.style.cssText = `
        position: fixed;
        bottom: 10px;
        right: 10px;
        background: #333;
        color: #33ff33;
        border: 1px solid #33ff33;
        border-radius: 4px;
        padding: 5px 10px;
        font-family: monospace;
        cursor: pointer;
        z-index: 10001;
    `;
    
    document.body.appendChild(debugPanel);
    document.body.appendChild(toggleButton);
    
    // Criar conteúdo inicial
    debugPanel.innerHTML = `
        <h3 style="margin: 0 0 10px 0; color: #33ff33;">Painel de Depuração</h3>
        <div id="debug-content"></div>
        <div style="margin-top: 10px; display: flex; gap: 5px;">
            <button id="refresh-debug" style="background: #444; color: #fff; border: none; padding: 5px; border-radius: 3px; cursor: pointer;">Atualizar</button>
            <button id="clear-localstorage" style="background: #a00; color: #fff; border: none; padding: 5px; border-radius: 3px; cursor: pointer;">Limpar LocalStorage</button>
            <button id="test-login" style="background: #060; color: #fff; border: none; padding: 5px; border-radius: 3px; cursor: pointer;">Testar Login</button>
        </div>
    `;
    
    // Função para atualizar informações
    function updateDebugInfo() {
        const debugContent = document.getElementById('debug-content');
        
        // Informações do navegador
        const browserInfo = `
            <div style="margin-bottom: 10px;">
                <strong>Navegador:</strong> ${navigator.userAgent}<br>
                <strong>URL atual:</strong> ${window.location.href}<br>
                <strong>Modo Dev:</strong> ${localStorage.getItem('dev_mode') || 'Não configurado'}<br>
            </div>
        `;
        
        // Informações de localStorage - usuários
        let usersInfo = '<div><strong>Usuários cadastrados:</strong> ';
        try {
            const usersStr = localStorage.getItem('local_users');
            if (usersStr) {
                const users = JSON.parse(usersStr);
                usersInfo += `${users.length} usuários encontrados.`;
                
                if (users.length > 0) {
                    usersInfo += '<div style="margin-left: 15px;">';
                    users.forEach((user, index) => {
                        const maskedPassword = user.senha ? '******' : 'não definida';
                        usersInfo += `
                            <div style="margin-top: 5px; padding: 5px; border-left: 2px solid #33ff33;">
                                <strong>Usuário ${index + 1}:</strong><br>
                                Nome: ${user.nome}<br>
                                Email: ${user.email}<br>
                                Senha: ${maskedPassword}<br>
                                Cadastro: ${new Date(user.dataCadastro).toLocaleString()}<br>
                            </div>
                        `;
                    });
                    usersInfo += '</div>';
                }
            } else {
                usersInfo += 'Nenhum usuário encontrado.';
            }
        } catch (e) {
            usersInfo += `Erro ao processar usuários: ${e.message}`;
        }
        usersInfo += '</div>';
        
        // Informações de localStorage - outros dados
        let localStorageItems = '';
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            // Pular a chave 'local_users' pois já mostramos acima
            if (key === 'local_users') continue;
            
            let value = localStorage.getItem(key);
            
            // Truncar valores longos
            if (value && value.length > 50) {
                value = value.substring(0, 47) + '...';
            }
            
            localStorageItems += `<div><strong>${key}:</strong> ${value}</div>`;
        }
        
        const localStorageInfo = `
            <div style="margin-bottom: 10px;">
                <strong>Dados no LocalStorage:</strong>
                <div style="margin-left: 15px;">${localStorageItems || 'Nenhum outro dado encontrado'}</div>
            </div>
        `;
        
        // Status de login atual
        const loginStatus = `
            <div style="margin-bottom: 10px;">
                <strong>Status de Login:</strong>
                <div style="margin-left: 15px;">
                    <div>Usuário logado: ${localStorage.getItem('userName') ? 'Sim' : 'Não'}</div>
                    ${localStorage.getItem('userName') ? `<div>Nome: ${localStorage.getItem('userName')}</div>` : ''}
                    ${localStorage.getItem('userEmail') ? `<div>Email: ${localStorage.getItem('userEmail')}</div>` : ''}
                    ${localStorage.getItem('currentUserId') ? `<div>ID: ${localStorage.getItem('currentUserId')}</div>` : ''}
                </div>
            </div>
        `;
        
        // Combinando todas as informações
        debugContent.innerHTML = browserInfo + loginStatus + usersInfo + localStorageInfo;
    }
    
    // Eventos
    toggleButton.addEventListener('click', function() {
        debugPanel.style.display = debugPanel.style.display === 'none' ? 'block' : 'none';
        if (debugPanel.style.display === 'block') {
            updateDebugInfo();
        }
    });
    
    document.getElementById('refresh-debug').addEventListener('click', updateDebugInfo);
    
    document.getElementById('clear-localstorage').addEventListener('click', function() {
        if (confirm('Tem certeza que deseja limpar o localStorage? Isso vai deslogar você.')) {
            localStorage.clear();
            updateDebugInfo();
            alert('LocalStorage limpo. Considere recarregar a página.');
        }
    });
    
    document.getElementById('test-login').addEventListener('click', function() {
        // Teste de login usando localStorage (modo de desenvolvimento)
        localStorage.setItem('userName', 'Usuário de Teste');
        localStorage.setItem('userEmail', 'teste@email.com');
        localStorage.setItem('mostrarToastBoasVindas', 'true');
        localStorage.setItem('dev_mode', 'true');
        
        // Adicionar à lista de emails registrados
        const emails = JSON.parse(localStorage.getItem('recentRegisteredEmails') || '[]');
        if (!emails.includes('teste@email.com')) {
            emails.push('teste@email.com');
            localStorage.setItem('recentRegisteredEmails', JSON.stringify(emails));
        }
        
        updateDebugInfo();
        alert('Usuário de teste configurado! Tente fazer login com: teste@email.com e senha: 123456');
    });
    
    // Verificar problemas comuns
    function checkCommonIssues() {
        const issues = [];
        
        // Verificar modo de desenvolvimento
        if (localStorage.getItem('dev_mode') !== 'true') {
            issues.push('Modo de desenvolvimento não está ativo. Isso será corrigido automaticamente.');
            localStorage.setItem('dev_mode', 'true');
        }
        
        // Verificar se há usuários registrados
        const usersStr = localStorage.getItem('local_users');
        if (!usersStr || JSON.parse(usersStr).length === 0) {
            issues.push('Nenhum usuário encontrado. Um usuário padrão será criado automaticamente.');
            
            // Criar usuário padrão
            const defaultUser = {
                id: "default123",
                nome: "Usuário Padrão",
                email: "usuario@example.com",
                senha: btoa("123456"), // senha em base64
                dataCadastro: new Date().toISOString(),
                ultimoLogin: new Date().toISOString()
            };
            
            localStorage.setItem('local_users', JSON.stringify([defaultUser]));
            
            // Adicionar à lista de emails recentes
            localStorage.setItem('recentRegisteredEmails', JSON.stringify([defaultUser.email]));
        }
        
        // Verificar se há emails registrados
        const emails = localStorage.getItem('recentRegisteredEmails');
        if (!emails || JSON.parse(emails).length === 0) {
            issues.push('Nenhum email registrado encontrado. Isso será corrigido automaticamente.');
            
            // Tentar extrair emails da lista de usuários
            if (usersStr) {
                try {
                    const users = JSON.parse(usersStr);
                    const emailsArray = users.map(user => user.email);
                    localStorage.setItem('recentRegisteredEmails', JSON.stringify(emailsArray));
                } catch (e) {
                    console.error("Erro ao processar usuários:", e);
                }
            }
        }
        
        // Exibir problemas encontrados, se houver
        if (issues.length > 0) {
            console.warn('Problemas detectados no debugger:');
            issues.forEach(issue => console.warn(' - ' + issue));
            
            // Adicionar notificação visual na página
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 10px;
                left: 10px;
                background: #ffcc00;
                color: #000;
                padding: 10px;
                border-radius: 5px;
                font-family: sans-serif;
                font-size: 14px;
                z-index: 9999;
                max-width: 300px;
                box-shadow: 0 3px 6px rgba(0,0,0,0.3);
            `;
            
            notification.innerHTML = `
                <strong>⚠️ Problemas detectados e corrigidos:</strong>
                <ul style="margin: 5px 0 0 20px; padding: 0;">
                    ${issues.map(issue => `<li>${issue}</li>`).join('')}
                </ul>
                <p style="margin: 5px 0 0 0; font-size: 12px;">O sistema agora está usando apenas localStorage. Usuário padrão: usuario@example.com / senha: 123456</p>
            `;
            
            document.body.appendChild(notification);
            
            // Auto-remover após 20 segundos
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 20000);
        } else {
            console.log("✅ Nenhum problema detectado. Sistema pronto para uso.");
        }
    }
    
    // Verificar problemas após um pequeno delay
    setTimeout(checkCommonIssues, 2000);
});

// Auto-inicializar (pode ser removido se causar problemas)
console.log('Debug script inicializado'); 