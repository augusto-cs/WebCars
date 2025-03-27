// Script de redirecionamento de URLs de veículos
(function() {
    // Função para redirecionar URLs de veículos
    function redirecionarUrlVeiculo(event) {
        const urlPath = window.location.pathname;
        const pathMatch = urlPath.match(/\/veiculo\/(\d+)/);
        
        if (pathMatch) {
            const idVeiculo = pathMatch[1];
            window.open(`/detalhe-veiculo.html?id=${idVeiculo}`, '_blank');
            
            // Prevenir comportamento padrão se for um evento de clique
            if (event && event.preventDefault) {
                event.preventDefault();
            }
        }
    }

    // Adicionar event listeners para links de veículos
    function configurarLinksVeiculos() {
        const linksVeiculos = document.querySelectorAll('.link-veiculo');
        linksVeiculos.forEach(link => {
            link.addEventListener('click', function(event) {
                const idVeiculo = this.getAttribute('data-id');
                if (idVeiculo) {
                    event.preventDefault();
                    window.open(`/detalhe-veiculo.html?id=${idVeiculo}`, '_blank');
                }
            });
        });
    }

    // Executar configurações quando o DOM estiver carregado
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            redirecionarUrlVeiculo();
            configurarLinksVeiculos();
        });
    } else {
        redirecionarUrlVeiculo();
        configurarLinksVeiculos();
    }

    // Expor função globalmente para uso em outros scripts, se necessário
    window.redirecionarUrlVeiculo = redirecionarUrlVeiculo;
})(); 