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

// Função para ordenar os veículos por diferentes critérios
document.addEventListener('DOMContentLoaded', function() {
    const ordenarSelect = document.getElementById('ordenar-fipe');
    if (ordenarSelect) {
        ordenarSelect.addEventListener('change', function() {
            ordenarVeiculos(this.value);
        });
    }

    // Inicializar ordenação ao carregar a página
    if (ordenarSelect) {
        ordenarVeiculos(ordenarSelect.value);
    }

    // Adicionar interatividade aos cards de veículos
    const veiculos = document.querySelectorAll('.veiculo');
    veiculos.forEach(veiculo => {
        veiculo.addEventListener('mouseenter', function() {
            animarPrecoFipe(this);
        });
    });

    // Habilitar tooltips para simulação de financiamento
    const financiamentos = document.querySelectorAll('.financiamento-preview');
    if (financiamentos.length > 0) {
        financiamentos.forEach(element => {
            element.setAttribute('title', 'Clique para personalizar sua simulação');
            element.style.cursor = 'pointer';
            
            element.addEventListener('click', function() {
                abrirSimuladorFinanciamento(this.closest('.veiculo'));
            });
        });
    }
});

// Função para ordenar os veículos
function ordenarVeiculos(criterio) {
    const container = document.querySelector('.veiculos-container');
    if (!container) return;
    
    const veiculos = Array.from(container.querySelectorAll('.veiculo'));
    
    veiculos.sort((a, b) => {
        if (criterio === 'maior-desconto') {
            // Extrair percentual de desconto das badges
            const descontoA = parseInt(a.querySelector('.desconto-badge').textContent);
            const descontoB = parseInt(b.querySelector('.desconto-badge').textContent);
            return descontoB - descontoA; // Maior para o menor
        } 
        else if (criterio === 'menor-preco') {
            // Extrair preços
            const precoA = extrairPreco(a.querySelector('.preco-atual .valor').textContent);
            const precoB = extrairPreco(b.querySelector('.preco-atual .valor').textContent);
            return precoA - precoB; // Menor para o maior
        }
        else if (criterio === 'mais-recente') {
            // Ordenar pelo ano do veículo (mais recente primeiro)
            const anoA = extrairAno(a.querySelector('.veiculo-detalhes span:first-child').textContent);
            const anoB = extrairAno(b.querySelector('.veiculo-detalhes span:first-child').textContent);
            return anoB - anoA; // Mais recente primeiro
        }
        
        return 0;
    });
    
    // Remover e reajuntar elementos na nova ordem
    veiculos.forEach(veiculo => {
        container.appendChild(veiculo);
    });
    
    // Exibir suavemente os veículos ordenados
    veiculos.forEach((veiculo, index) => {
        veiculo.style.opacity = '0';
        setTimeout(() => {
            veiculo.style.opacity = '1';
            veiculo.style.transition = 'opacity 0.5s ease';
        }, index * 100);
    });
    
    // Notificar o usuário sobre a ordenação
    criarToast('Ordenação aplicada', `Veículos ordenados por ${getOrdenacaoLabel(criterio)}`, 'success');
}

// Função auxiliar para extrair preço numérico de string
function extrairPreco(precoStr) {
    return parseInt(precoStr.replace(/[^\d]/g, ''));
}

// Função auxiliar para extrair ano do veículo
function extrairAno(anoStr) {
    const match = anoStr.match(/\d{4}/);
    return match ? parseInt(match[0]) : 0;
}

// Função para obter descrição da ordenação
function getOrdenacaoLabel(criterio) {
    switch(criterio) {
        case 'maior-desconto': return 'maior desconto';
        case 'menor-preco': return 'menor preço';
        case 'mais-recente': return 'mais recente';
        default: return criterio;
    }
}

// Animação para destacar a comparação de preço FIPE
function animarPrecoFipe(veiculo) {
    const fipeValor = veiculo.querySelector('.fipe-valor .valor');
    const precoAtual = veiculo.querySelector('.preco-atual .valor');
    const fipeSeta = veiculo.querySelector('.fipe-seta i');
    
    if (!fipeValor || !precoAtual || !fipeSeta) return;
    
    // Animar seta
    fipeSeta.style.transition = 'transform 0.6s ease';
    fipeSeta.style.transform = 'translateY(5px)';
    
    // Destacar valores
    precoAtual.style.transition = 'transform 0.6s ease, color 0.6s ease';
    precoAtual.style.transform = 'scale(1.08)';
    precoAtual.style.color = '#0066cc';
    
    // Resetar após animação
    setTimeout(() => {
        fipeSeta.style.transform = 'translateY(0)';
        precoAtual.style.transform = 'scale(1)';
    }, 800);
}

// Função para abrir simulador de financiamento
function abrirSimuladorFinanciamento(veiculo) {
    if (!veiculo) return;
    
    // Extrair informações do veículo
    const modelo = veiculo.querySelector('.veiculo-header h3').textContent.trim();
    const preco = veiculo.querySelector('.preco-atual .valor').textContent.trim();
    const precoNumerico = extrairPreco(preco);
    
    // Criar modal de simulação
    const modalHTML = `
        <div class="modal-simulador">
            <div class="modal-simulador-content">
                <div class="modal-simulador-header">
                    <h3>Simulação de Financiamento</h3>
                    <button class="modal-simulador-close">&times;</button>
                </div>
                <div class="modal-simulador-body">
                    <div class="veiculo-simulacao">
                        <strong>${modelo}</strong>
                        <span>Valor: ${preco}</span>
                    </div>
                    <div class="simulador-form">
                        <div class="simulador-campo">
                            <label>Entrada (R$)</label>
                            <input type="range" min="${Math.floor(precoNumerico * 0.2)}" max="${Math.floor(precoNumerico * 0.7)}" step="1000" value="${Math.floor(precoNumerico * 0.3)}" id="entrada-range">
                            <input type="text" id="entrada-valor" value="R$ ${Math.floor(precoNumerico * 0.3).toLocaleString('pt-BR')}">
                        </div>
                        <div class="simulador-campo">
                            <label>Prazo (meses)</label>
                            <div class="simulador-prazo-opcoes">
                                <button class="prazo-opcao" data-prazo="36">36×</button>
                                <button class="prazo-opcao active" data-prazo="48">48×</button>
                                <button class="prazo-opcao" data-prazo="60">60×</button>
                                <button class="prazo-opcao" data-prazo="72">72×</button>
                            </div>
                        </div>
                        <div class="simulador-campo">
                            <label>Taxa de juros</label>
                            <select id="taxa-juros">
                                <option value="0.99">0,99% a.m.</option>
                                <option value="1.29" selected>1,29% a.m.</option>
                                <option value="1.49">1,49% a.m.</option>
                                <option value="1.79">1,79% a.m.</option>
                            </select>
                        </div>
                    </div>
                    <div class="simulador-resultado">
                        <div class="resultado-parcela">
                            <span class="label">Valor da parcela</span>
                            <span class="valor" id="resultado-parcela">Calculando...</span>
                        </div>
                        <div class="resultado-total">
                            <span class="label">Custo total</span>
                            <span class="valor" id="resultado-total">Calculando...</span>
                        </div>
                    </div>
                </div>
                <div class="modal-simulador-footer">
                    <button class="btn-contato-simulador">Falar com Consultor</button>
                    <button class="btn-fechar-simulador">Fechar</button>
                </div>
            </div>
        </div>
    `;
    
    // Adicionar modal ao documento
    const modalElement = document.createElement('div');
    modalElement.innerHTML = modalHTML;
    document.body.appendChild(modalElement.firstElementChild);
    
    const modal = document.querySelector('.modal-simulador');
    
    // Adicionar estilos do modal
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .modal-simulador {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
            animation: fadeIn 0.3s forwards;
        }
        
        .modal-simulador-content {
            background: white;
            border-radius: 10px;
            max-width: 500px;
            width: 90%;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            animation: slideUp 0.4s forwards;
        }
        
        .modal-simulador-header {
            padding: 15px 20px;
            background: linear-gradient(to right, #0066cc, #0099ff);
            color: white;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .modal-simulador-header h3 {
            margin: 0;
            font-size: 1.2rem;
        }
        
        .modal-simulador-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
        }
        
        .modal-simulador-body {
            padding: 20px;
        }
        
        .veiculo-simulacao {
            display: flex;
            flex-direction: column;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 1px solid #eee;
        }
        
        .simulador-form {
            display: flex;
            flex-direction: column;
            gap: 20px;
            margin-bottom: 25px;
        }
        
        .simulador-campo {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        
        .simulador-campo label {
            font-size: 0.9rem;
            color: #555;
        }
        
        .simulador-campo input[type="range"] {
            width: 100%;
            accent-color: #0066cc;
        }
        
        .simulador-campo input[type="text"] {
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 5px;
            text-align: center;
            font-weight: 600;
            color: #333;
        }
        
        .simulador-prazo-opcoes {
            display: flex;
            gap: 10px;
        }
        
        .prazo-opcao {
            flex: 1;
            padding: 8px;
            border: 1px solid #ddd;
            background: white;
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.2s ease;
            font-size: 0.9rem;
        }
        
        .prazo-opcao.active {
            background: #0066cc;
            color: white;
            border-color: #0066cc;
        }
        
        .simulador-campo select {
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 5px;
            background: white;
        }
        
        .simulador-resultado {
            background-color: #f8f9fa;
            border-radius: 8px;
            padding: 15px;
            display: flex;
            justify-content: space-between;
        }
        
        .resultado-parcela, .resultado-total {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        .resultado-parcela .label, .resultado-total .label {
            font-size: 0.8rem;
            color: #777;
            margin-bottom: 5px;
        }
        
        .resultado-parcela .valor {
            font-size: 1.5rem;
            font-weight: 700;
            color: #0066cc;
        }
        
        .resultado-total .valor {
            font-size: 1.2rem;
            font-weight: 600;
            color: #444;
        }
        
        .modal-simulador-footer {
            display: flex;
            justify-content: space-between;
            padding: 15px 20px;
            background: #f5f5f5;
            gap: 10px;
        }
        
        .btn-contato-simulador, .btn-fechar-simulador {
            padding: 10px 15px;
            border-radius: 5px;
            border: none;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        
        .btn-contato-simulador {
            background: #0066cc;
            color: white;
            flex-grow: 2;
        }
        
        .btn-fechar-simulador {
            background: #f1f1f1;
            color: #555;
            border: 1px solid #ddd;
            flex-grow: 1;
        }
        
        .btn-contato-simulador:hover {
            background: #0056b3;
        }
        
        .btn-fechar-simulador:hover {
            background: #e5e5e5;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideUp {
            from { transform: translateY(50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        @media (max-width: 576px) {
            .simulador-resultado {
                flex-direction: column;
                gap: 15px;
                align-items: center;
            }
            
            .modal-simulador-footer {
                flex-direction: column;
            }
            
            .simulador-prazo-opcoes {
                flex-wrap: wrap;
            }
            
            .prazo-opcao {
                min-width: 60px;
            }
        }
    `;
    document.head.appendChild(modalStyles);
    
    // Configurar eventos do modal
    const closeBtn = modal.querySelector('.modal-simulador-close');
    const fecharBtn = modal.querySelector('.btn-fechar-simulador');
    const contatoBtn = modal.querySelector('.btn-contato-simulador');
    
    // Slider de entrada
    const entradaRange = modal.querySelector('#entrada-range');
    const entradaValor = modal.querySelector('#entrada-valor');
    
    // Opções de prazo
    const prazoOpcoes = modal.querySelectorAll('.prazo-opcao');
    
    // Taxa de juros
    const taxaSelect = modal.querySelector('#taxa-juros');
    
    // Campos de resultado
    const resultadoParcela = modal.querySelector('#resultado-parcela');
    const resultadoTotal = modal.querySelector('#resultado-total');
    
    // Valor ativo do prazo
    let prazoAtivo = 48;
    
    // Função para formatar valor monetário
    function formatarMoeda(valor) {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }
    
    // Funções para controlar o slider de entrada
    entradaRange.addEventListener('input', function() {
        entradaValor.value = formatarMoeda(parseFloat(this.value));
        calcularFinanciamento();
    });
    
    entradaValor.addEventListener('input', function() {
        const valor = extrairPreco(this.value);
        if (!isNaN(valor)) {
            entradaRange.value = valor;
            calcularFinanciamento();
        }
    });
    
    // Eventos para os botões de prazo
    prazoOpcoes.forEach(opcao => {
        opcao.addEventListener('click', function() {
            prazoOpcoes.forEach(op => op.classList.remove('active'));
            this.classList.add('active');
            prazoAtivo = parseInt(this.dataset.prazo);
            calcularFinanciamento();
        });
    });
    
    // Evento para mudança de taxa
    taxaSelect.addEventListener('change', calcularFinanciamento);
    
    // Funções de fechamento do modal
    function fecharModal() {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.remove();
            modalStyles.remove();
        }, 300);
    }
    
    closeBtn.addEventListener('click', fecharModal);
    fecharBtn.addEventListener('click', fecharModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) fecharModal();
    });
    
    // Evento para botão de contato
    contatoBtn.addEventListener('click', function() {
        fecharModal();
        setTimeout(() => {
            const contatoBtn = veiculo.querySelector('.btn-contato');
            if (contatoBtn) contatoBtn.click();
        }, 300);
    });
    
    // Função para calcular o financiamento
    function calcularFinanciamento() {
        const entrada = parseFloat(entradaRange.value);
        const valorFinanciado = precoNumerico - entrada;
        const taxa = parseFloat(taxaSelect.value) / 100;
        
        // Cálculo do financiamento com juros compostos
        const jurosCompostos = Math.pow(1 + taxa, prazoAtivo);
        const parcela = valorFinanciado * (taxa * jurosCompostos) / (jurosCompostos - 1);
        const totalFinanciado = parcela * prazoAtivo;
        
        // Atualizar resultados
        resultadoParcela.textContent = formatarMoeda(parcela);
        resultadoTotal.textContent = formatarMoeda(totalFinanciado + entrada);
    }
    
    // Calcular o financiamento inicial
    calcularFinanciamento();
}

// Verificar se a função de criação de toast existe, se não, implementá-la
if (typeof window.criarToast !== 'function') {
    window.criarToast = function(titulo, mensagem, tipo = 'success', duracao = 3000) {
        const toastContainer = document.querySelector('.toast-container') || (() => {
            const container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
            return container;
        })();
        
        const toast = document.createElement('div');
        toast.className = `toast ${tipo}`;
        
        const icone = tipo === 'error' ? 'exclamation-circle' : 'check-circle';
        
        toast.innerHTML = `
            <div class="toast-icon">
                <i class="fas fa-${icone}"></i>
            </div>
            <div class="toast-content">
                <div class="toast-title">${titulo}</div>
                <div class="toast-message">${mensagem}</div>
            </div>
            <button class="toast-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        toastContainer.appendChild(toast);
        setTimeout(() => toast.classList.add('show'), 10);
        
        toast.querySelector('.toast-close').addEventListener('click', () => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        });
        
        if (duracao > 0) {
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 300);
            }, duracao);
        }
    };
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