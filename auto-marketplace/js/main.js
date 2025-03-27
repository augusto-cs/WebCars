// Dados de marcas para filtro
const marcas = [
    'Volkswagen', 'Chevrolet', 'Ford', 'Fiat', 'Honda', 
    'Toyota', 'Hyundai', 'Nissan', 'Renault', 'Jeep'
];

// Função para criar filtros dinâmicos
function criarFiltrosMarca() {
    const filtrosMarca = document.createElement('div');
    filtrosMarca.classList.add('filtros-marca');
    
    marcas.forEach(marca => {
        const botaoMarca = document.createElement('button');
        botaoMarca.textContent = marca;
        botaoMarca.classList.add('filtro-marca');
        botaoMarca.addEventListener('click', () => {
            // Remover classe 'selecionado' de todos os botões
            document.querySelectorAll('.filtro-marca').forEach(btn => {
                btn.classList.remove('selecionado');
            });
            
            // Adicionar classe 'selecionado' ao botão clicado
            botaoMarca.classList.add('selecionado');
            
            // Filtrar por marca
            filtrarPorMarca(marca);
        });
        filtrosMarca.appendChild(botaoMarca);
    });

    // Botão para limpar filtro
    const botaoLimparFiltro = document.createElement('button');
    botaoLimparFiltro.textContent = 'Todos os Veículos';
    botaoLimparFiltro.classList.add('filtro-marca');
    botaoLimparFiltro.addEventListener('click', () => {
        // Remover classe 'selecionado' de todos os botões
        document.querySelectorAll('.filtro-marca').forEach(btn => {
            btn.classList.remove('selecionado');
        });
        
        // Recarregar todos os veículos
        carregarVeiculosDestaque();
    });
    filtrosMarca.appendChild(botaoLimparFiltro);

    const secaoDestaques = document.querySelector('#destaques');
    secaoDestaques.insertBefore(filtrosMarca, document.querySelector('.veiculos-grid'));
}

// Função para filtrar veículos por marca
function filtrarPorMarca(marca) {
    const gridVeiculos = document.querySelector('.veiculos-grid');
    const veiculosFiltrados = veiculosDestaque.filter(veiculo => veiculo.marca === marca);
    
    gridVeiculos.innerHTML = ''; // Limpar grid
    
    veiculosFiltrados.forEach(veiculo => {
        const cardVeiculo = document.createElement('div');
        cardVeiculo.classList.add('veiculo-card');
        
        cardVeiculo.innerHTML = `
            <img src="${veiculo.imagem}" alt="${veiculo.marca} ${veiculo.modelo}">
            <div class="veiculo-info">
                <h3>${veiculo.marca} ${veiculo.modelo}</h3>
                <div class="veiculo-detalhes">
                    <p>Ano: ${veiculo.ano}</p>
                    <p>Quilometragem: ${veiculo.km} km</p>
                    <p>Combustível: ${veiculo.combustivel}</p>
                    <p>Localização: ${veiculo.localizacao}</p>
                </div>
                <div class="veiculo-acoes">
                    <span class="preco">R$ ${veiculo.preco.toLocaleString('pt-BR')}</span>
                    <div class="botoes-acao">
                        <button class="btn-detalhes" data-id="${veiculo.id}">Ver Detalhes</button>
                        <button class="btn-favorito" data-id="${veiculo.id}">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        gridVeiculos.appendChild(cardVeiculo);
    });
}

// Função para abrir detalhes do veículo
function abrirDetalhesVeiculo(evento) {
    const veiculoId = evento.currentTarget.dataset.id;
    const veiculo = veiculosDestaque.find(v => v.id === parseInt(veiculoId));
    
    // Criar modal de detalhes
    const modalDetalhes = document.createElement('div');
    modalDetalhes.classList.add('modal-detalhes');
    
    modalDetalhes.innerHTML = `
        <div class="modal-conteudo">
            <span class="fechar-modal">&times;</span>
            <div class="modal-imagem">
                <img src="${veiculo.imagem}" alt="${veiculo.marca} ${veiculo.modelo}">
            </div>
            <div class="modal-info">
                <h2>${veiculo.marca} ${veiculo.modelo}</h2>
                <div class="detalhes-veiculo">
                    <p><strong>Ano:</strong> ${veiculo.ano}</p>
                    <p><strong>Quilometragem:</strong> ${veiculo.km} km</p>
                    <p><strong>Combustível:</strong> ${veiculo.combustivel}</p>
                    <p><strong>Localização:</strong> ${veiculo.localizacao}</p>
                    <p><strong>Preço:</strong> R$ ${veiculo.preco.toLocaleString('pt-BR')}</p>
                </div>
                <div class="acoes-modal">
                    <button class="btn-contato">Entrar em Contato</button>
                    <button class="btn-financiamento">Simular Financiamento</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modalDetalhes);
    
    // Fechar modal
    const botaoFechar = modalDetalhes.querySelector('.fechar-modal');
    botaoFechar.addEventListener('click', () => {
        document.body.removeChild(modalDetalhes);
    });
}

// Função para adicionar/remover dos favoritos
function toggleFavorito(evento) {
    const botao = evento.currentTarget;
    botao.classList.toggle('favorito');
    
    const veiculoId = botao.dataset.id;
    const icone = botao.querySelector('i');
    
    if (botao.classList.contains('favorito')) {
        icone.classList.remove('far');
        icone.classList.add('fas');
        salvarFavorito(veiculoId);
    } else {
        icone.classList.remove('fas');
        icone.classList.add('far');
        removerFavorito(veiculoId);
    }
}

// Função para salvar favoritos no localStorage
function salvarFavorito(veiculoId) {
    let favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
    if (!favoritos.includes(veiculoId)) {
        favoritos.push(veiculoId);
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
        console.log(`Veículo ${veiculoId} adicionado aos favoritos`);
    }
}

// Função para remover favoritos do localStorage
function removerFavorito(veiculoId) {
    let favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
    favoritos = favoritos.filter(id => id !== veiculoId);
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    console.log(`Veículo ${veiculoId} removido dos favoritos`);
}

// Função para busca de veículos
function inicializarBusca() {
    const campoBusca = document.querySelector('.search-container input');
    const botaoBusca = document.querySelector('.search-container button');

    botaoBusca.addEventListener('click', realizarBusca);
    campoBusca.addEventListener('keypress', (evento) => {
        if (evento.key === 'Enter') {
            realizarBusca();
        }
    });
}

// Função para realizar a busca de veículos
function realizarBusca() {
    const campoBusca = document.querySelector('.search-container input');
    const termoBusca = campoBusca.value.toLowerCase();
    
    const resultadosBusca = veiculosDestaque.filter(veiculo => 
        veiculo.marca.toLowerCase().includes(termoBusca) || 
        veiculo.modelo.toLowerCase().includes(termoBusca)
    );

    const gridVeiculos = document.querySelector('.veiculos-grid');
    gridVeiculos.innerHTML = ''; // Limpar grid
    
    if (resultadosBusca.length > 0) {
        resultadosBusca.forEach(veiculo => {
            const cardVeiculo = document.createElement('div');
            cardVeiculo.classList.add('veiculo-card');
            
            cardVeiculo.innerHTML = `
                <img src="${veiculo.imagem}" alt="${veiculo.marca} ${veiculo.modelo}">
                <div class="veiculo-info">
                    <h3>${veiculo.marca} ${veiculo.modelo}</h3>
                    <div class="veiculo-detalhes">
                        <p>Ano: ${veiculo.ano}</p>
                        <p>Quilometragem: ${veiculo.km} km</p>
                        <p>Combustível: ${veiculo.combustivel}</p>
                        <p>Localização: ${veiculo.localizacao}</p>
                    </div>
                    <div class="veiculo-acoes">
                        <span class="preco">R$ ${veiculo.preco.toLocaleString('pt-BR')}</span>
                        <div class="botoes-acao">
                            <button class="btn-detalhes" data-id="${veiculo.id}">Ver Detalhes</button>
                            <button class="btn-favorito" data-id="${veiculo.id}">
                                <i class="fas fa-heart"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
            
            gridVeiculos.appendChild(cardVeiculo);
        });
    } else {
        gridVeiculos.innerHTML = '<p>Nenhum veículo encontrado.</p>';
    }
}

// Função para criar banner rotativo
function criarBannerRotativo() {
    const bannerSlider = document.querySelector('.banner-slider');
    const bannerItems = bannerSlider.querySelectorAll('.banner-item');
    let currentSlide = 0;

    function proximoSlide() {
        bannerItems[currentSlide].style.display = 'none';
        currentSlide = (currentSlide + 1) % bannerItems.length;
        bannerItems[currentSlide].style.display = 'flex';
    }

    // Trocar slide a cada 5 segundos
    setInterval(proximoSlide, 5000);
}

// Lógica do Banner de Cookies
document.addEventListener('DOMContentLoaded', function() {
    const cookieBanner = document.getElementById('cookie-banner');
    const cookieCloseBtn = document.querySelector('.cookie-close');
    const cookieConfigLink = document.querySelector('.cookie-config');

    // Verificar se o banner já foi fechado anteriormente
    function checkCookieBannerStatus() {
        const cookieBannerClosed = localStorage.getItem('cookieBannerClosed');
        if (!cookieBannerClosed) {
            cookieBanner.style.display = 'block';
        }
    }

    // Fechar o banner de cookies
    function closeCookieBanner() {
        cookieBanner.style.display = 'none';
        localStorage.setItem('cookieBannerClosed', 'true');
    }

    // Abrir configurações de cookies (placeholder)
    function openCookieSettings() {
        alert('Funcionalidade de configurações de cookies em desenvolvimento.');
        // TODO: Implementar modal ou página de configurações de cookies
    }

    // Eventos
    cookieCloseBtn.addEventListener('click', closeCookieBanner);
    cookieConfigLink.addEventListener('click', openCookieSettings);

    // Verificar status do banner ao carregar a página
    checkCookieBannerStatus();
});

// Função para lidar com o envio da newsletter
function handleNewsletterSubmit(evento) {
    evento.preventDefault();
    
    const emailInput = evento.target.querySelector('input[type="email"]');
    const email = emailInput.value.trim();
    
    // Validação básica de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
        alert('Por favor, insira um e-mail válido.');
        return;
    }
    
    // Simulação de envio de newsletter (substituir por chamada de API real)
    try {
        // Aqui você normalmente faria uma chamada AJAX para seu backend
        // localStorage será usado apenas para demonstração
        const newsletters = JSON.parse(localStorage.getItem('newsletters') || '[]');
        
        if (newsletters.includes(email)) {
            alert('Este e-mail já está cadastrado em nossa newsletter.');
            return;
        }
        
        newsletters.push(email);
        localStorage.setItem('newsletters', JSON.stringify(newsletters));
        
        alert('Obrigado! Você será o primeiro a receber nossas novidades.');
        emailInput.value = ''; // Limpar campo
    } catch (erro) {
        console.error('Erro ao cadastrar newsletter:', erro);
        alert('Ocorreu um erro. Tente novamente mais tarde.');
    }
}

// Adicionar estilos para a página de detalhes do veículo
function adicionarEstilosPaginaDetalhes() {
    const styles = `
        .pagina-detalhes-veiculo .container-detalhes {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem 1rem;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
        }

        .galeria-veiculo .swiper-slide img {
            width: 100%;
            height: 500px;
            object-fit: cover;
            border-radius: 15px;
        }

        .informacoes-veiculo .info-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
        }

        .informacoes-veiculo .preco-veiculo {
            font-size: 2rem;
            font-weight: bold;
            color: var(--cor-primaria);
        }

        .detalhes-principais {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
            margin-bottom: 2rem;
        }

        .detalhe-item {
            display: flex;
            align-items: center;
            gap: 1rem;
            background-color: var(--cor-secundaria);
            padding: 1rem;
            border-radius: 10px;
        }

        .detalhe-item i {
            font-size: 2rem;
            color: var(--cor-primaria);
        }

        .caracteristicas-veiculo ul {
            list-style: none;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 0.5rem;
        }

        .caracteristicas-veiculo li {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .caracteristicas-veiculo li i {
            color: var(--cor-primaria);
        }

        .btn-whatsapp {
            display: inline-block;
            background-color: #25D366;
            color: white;
            padding: 1rem 2rem;
            text-decoration: none;
            border-radius: 30px;
            font-weight: bold;
            margin-bottom: 1rem;
            transition: background-color 0.3s ease;
        }

        .btn-whatsapp:hover {
            background-color: #128C7E;
        }

        .formulario-contato {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .formulario-contato input,
        .formulario-contato textarea {
            padding: 0.75rem;
            border: 1px solid var(--cor-secundaria);
            border-radius: 5px;
        }

        .formulario-contato button {
            background-color: var(--cor-primaria);
            color: white;
            border: none;
            padding: 1rem;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        .formulario-contato button:hover {
            background-color: #0055a3;
        }

        .localizacao-mapa .mapa-container {
            height: 400px;
            border-radius: 15px;
            overflow: hidden;
        }

        @media (max-width: 768px) {
            .container-detalhes {
                grid-template-columns: 1fr;
            }
        }
    `;

    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
}

// Função para inicializar o menu dropdown
function initializeDropdownMenu() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        
        // Prevenir o comportamento padrão dos links do dropdown
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            dropdown.classList.toggle('active');
        });
        
        // Fechar ao clicar fora
        document.addEventListener('click', function(e) {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
        
        // Mostrar/esconder ao passar o mouse (opcional)
        dropdown.addEventListener('mouseenter', function() {
            dropdown.classList.add('active');
        });
        
        dropdown.addEventListener('mouseleave', function() {
            dropdown.classList.remove('active');
        });
    });
}

// Carregar conteúdo quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    renderizarVeiculosDestaque();
    criarFiltrosMarca();
    inicializarBusca();
    criarBannerRotativo();

    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }

    // Adicionar estilos para a página de detalhes se estiver na página correta
    if (document.body.classList.contains('pagina-detalhes-veiculo')) {
        adicionarEstilosPaginaDetalhes();
    }

    // Adicionar evento de clique para botões "Ver Detalhes"
    const botoesDetalhes = document.querySelectorAll('.btn-detalhes, .link-veiculo');
    botoesDetalhes.forEach(botao => {
        botao.addEventListener('click', function(event) {
            event.preventDefault(); // Prevenir comportamento padrão
            
            // Obter o ID do veículo
            const idVeiculo = this.getAttribute('data-id') || 
                              this.closest('.link-veiculo').getAttribute('data-id');
            
            console.log('ID do veículo:', idVeiculo); // Log de depuração
            
            if (idVeiculo) {
                // Abrir página de detalhes em uma nova aba
                window.open(`detalhe-veiculo.html?id=${idVeiculo}`, '_blank');
            } else {
                console.error('ID do veículo não encontrado');
                alert('Não foi possível abrir os detalhes do veículo.');
            }
        });
    });

    // Inicializar o menu dropdown
    initializeDropdownMenu();
}); 