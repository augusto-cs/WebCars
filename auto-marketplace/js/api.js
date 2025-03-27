/**
 * API de comunicação com o backend PHP/MySQL
 */
const API = {
    baseUrl: '/api',
    
    /**
     * Obter lista de veículos com filtros e paginação
     * @param {Object} filtros - Objeto com filtros (marca, modelo, etc)
     * @param {Number} pagina - Número da página (padrão: 1)
     * @param {Number} limite - Itens por página (padrão: 10)
     * @returns {Promise} Promise com os resultados
     */
    listarVeiculos: async function(filtros = {}, pagina = 1, limite = 10) {
        // Construir a URL com os parâmetros
        let url = `${this.baseUrl}/veiculos?page=${pagina}&limit=${limite}`;
        
        // Adicionar filtros à URL, se houver
        for (const [key, value] of Object.entries(filtros)) {
            if (value !== undefined && value !== null && value !== '') {
                url += `&${key}=${encodeURIComponent(value)}`;
            }
        }
        
        try {
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`Erro ao buscar veículos: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Erro ao buscar veículos:', error);
            throw error;
        }
    },
    
    /**
     * Obter detalhes de um veículo específico
     * @param {Number} id - ID do veículo
     * @returns {Promise} Promise com os detalhes do veículo
     */
    obterVeiculo: async function(id) {
        try {
            const response = await fetch(`${this.baseUrl}/veiculos/${id}`);
            
            if (!response.ok) {
                throw new Error(`Erro ao buscar veículo: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error(`Erro ao buscar veículo ${id}:`, error);
            throw error;
        }
    },
    
    /**
     * Adicionar um novo veículo
     * @param {Object} dadosVeiculo - Dados do veículo a ser criado
     * @returns {Promise} Promise com o resultado
     */
    adicionarVeiculo: async function(dadosVeiculo) {
        try {
            const response = await fetch(`${this.baseUrl}/veiculos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dadosVeiculo)
            });
            
            if (!response.ok) {
                throw new Error(`Erro ao adicionar veículo: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Erro ao adicionar veículo:', error);
            throw error;
        }
    },
    
    /**
     * Atualizar um veículo existente
     * @param {Number} id - ID do veículo a ser atualizado
     * @param {Object} dadosVeiculo - Dados atualizados do veículo
     * @returns {Promise} Promise com o resultado
     */
    atualizarVeiculo: async function(id, dadosVeiculo) {
        try {
            const response = await fetch(`${this.baseUrl}/veiculos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dadosVeiculo)
            });
            
            if (!response.ok) {
                throw new Error(`Erro ao atualizar veículo: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error(`Erro ao atualizar veículo ${id}:`, error);
            throw error;
        }
    },
    
    /**
     * Excluir um veículo
     * @param {Number} id - ID do veículo a ser excluído
     * @returns {Promise} Promise com o resultado
     */
    excluirVeiculo: async function(id) {
        try {
            const response = await fetch(`${this.baseUrl}/veiculos/${id}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) {
                throw new Error(`Erro ao excluir veículo: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error(`Erro ao excluir veículo ${id}:`, error);
            throw error;
        }
    }
};

/**
 * Funções para exibir os veículos na página
 */
const VeiculosUI = {
    /**
     * Renderiza os veículos na página inicial
     * @param {Array} veiculos - Lista de veículos a serem exibidos
     * @param {String} containerId - ID do container onde os veículos serão exibidos
     */
    renderizarVeiculos: function(veiculos, containerId = 'lista-veiculos') {
        const container = document.getElementById(containerId);
        
        if (!container) {
            console.error(`Container #${containerId} não encontrado!`);
            return;
        }
        
        // Limpar o container
        container.innerHTML = '';
        
        if (!veiculos || veiculos.length === 0) {
            container.innerHTML = '<div class="sem-resultados">Nenhum veículo encontrado com os filtros selecionados.</div>';
            return;
        }
        
        // Criar elementos para cada veículo
        veiculos.forEach(veiculo => {
            const veiculoCard = document.createElement('div');
            veiculoCard.className = 'veiculo-card';
            
            // Formatar o preço
            const precoFormatado = new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }).format(veiculo.preco);
            
            veiculoCard.innerHTML = `
                <div class="veiculo-imagem">
                    <img src="${veiculo.imagem_principal || 'img/no-image.jpg'}" alt="${veiculo.titulo}">
                </div>
                <div class="veiculo-info">
                    <h3>${veiculo.titulo}</h3>
                    <div class="veiculo-detalhes">
                        <span class="veiculo-ano">${veiculo.ano}</span>
                        <span class="veiculo-km">${veiculo.quilometragem.toLocaleString('pt-BR')} km</span>
                        <span class="veiculo-cambio">${this.formatarCambio(veiculo.cambio)}</span>
                    </div>
                    <div class="veiculo-preco">${precoFormatado}</div>
                </div>
                <a href="/veiculo/${veiculo.id}" class="veiculo-link">Ver detalhes</a>
            `;
            
            container.appendChild(veiculoCard);
        });
    },
    
    /**
     * Formata o tipo de câmbio para exibição
     * @param {String} cambio - Tipo de câmbio (manual, automatico, etc)
     * @returns {String} Câmbio formatado para exibição
     */
    formatarCambio: function(cambio) {
        const tipos = {
            'manual': 'Manual',
            'automatico': 'Automático',
            'semi-automatico': 'Semi-Automático',
            'cvt': 'CVT'
        };
        
        return tipos[cambio] || cambio;
    },
    
    /**
     * Renderiza a paginação
     * @param {Object} paginacao - Objeto com informações de paginação
     * @param {Function} callback - Função de callback para mudança de página
     * @param {String} containerId - ID do container onde a paginação será exibida
     */
    renderizarPaginacao: function(paginacao, callback, containerId = 'paginacao') {
        const container = document.getElementById(containerId);
        
        if (!container) {
            console.error(`Container #${containerId} não encontrado!`);
            return;
        }
        
        // Limpar o container
        container.innerHTML = '';
        
        if (!paginacao || paginacao.pages <= 1) {
            return; // Não renderiza paginação se tiver apenas uma página
        }
        
        // Criar elementos de paginação
        const ul = document.createElement('ul');
        ul.className = 'paginas';
        
        // Botão Anterior
        const liAnterior = document.createElement('li');
        const btnAnterior = document.createElement('button');
        btnAnterior.textContent = 'Anterior';
        btnAnterior.disabled = paginacao.page <= 1;
        btnAnterior.addEventListener('click', () => callback(paginacao.page - 1));
        liAnterior.appendChild(btnAnterior);
        ul.appendChild(liAnterior);
        
        // Determinar quais páginas mostrar
        let pagInicio = Math.max(1, paginacao.page - 2);
        let pagFim = Math.min(paginacao.pages, pagInicio + 4);
        
        if (pagFim - pagInicio < 4) {
            pagInicio = Math.max(1, pagFim - 4);
        }
        
        // Páginas numéricas
        for (let i = pagInicio; i <= pagFim; i++) {
            const li = document.createElement('li');
            const btn = document.createElement('button');
            btn.textContent = i;
            btn.className = i === paginacao.page ? 'ativo' : '';
            btn.addEventListener('click', () => callback(i));
            li.appendChild(btn);
            ul.appendChild(li);
        }
        
        // Botão Próximo
        const liProximo = document.createElement('li');
        const btnProximo = document.createElement('button');
        btnProximo.textContent = 'Próximo';
        btnProximo.disabled = paginacao.page >= paginacao.pages;
        btnProximo.addEventListener('click', () => callback(paginacao.page + 1));
        liProximo.appendChild(btnProximo);
        ul.appendChild(liProximo);
        
        container.appendChild(ul);
    }
};

// Exemplo de uso:
document.addEventListener('DOMContentLoaded', async () => {
    // Verificar se estamos na página de listagem de veículos
    const listaVeiculosContainer = document.getElementById('lista-veiculos');
    
    if (listaVeiculosContainer) {
        try {
            // Estado atual dos filtros e paginação
            const estado = {
                filtros: {},
                paginaAtual: 1
            };
            
            // Função para carregar os veículos com base no estado atual
            const carregarVeiculos = async () => {
                const resultado = await API.listarVeiculos(estado.filtros, estado.paginaAtual, 12);
                VeiculosUI.renderizarVeiculos(resultado.veiculos);
                VeiculosUI.renderizarPaginacao(resultado.pagination, (pagina) => {
                    estado.paginaAtual = pagina;
                    carregarVeiculos();
                    window.scrollTo(0, 0);
                });
            };
            
            // Inicializar os filtros
            const formFiltros = document.getElementById('filtros-veiculos');
            
            if (formFiltros) {
                formFiltros.addEventListener('submit', (e) => {
                    e.preventDefault();
                    
                    // Atualizar os filtros com base nos valores do formulário
                    const formData = new FormData(formFiltros);
                    
                    estado.filtros = {
                        marca: formData.get('marca'),
                        modelo: formData.get('modelo'),
                        ano_min: formData.get('ano_min'),
                        ano_max: formData.get('ano_max'),
                        preco_min: formData.get('preco_min'),
                        preco_max: formData.get('preco_max'),
                        ordenar_por: formData.get('ordenar_por')
                    };
                    
                    // Resetar para a primeira página e carregar veículos
                    estado.paginaAtual = 1;
                    carregarVeiculos();
                });
            }
            
            // Carregar veículos iniciais
            await carregarVeiculos();
            
        } catch (error) {
            console.error('Erro ao inicializar a página de veículos:', error);
            listaVeiculosContainer.innerHTML = `<div class="erro-carregamento">
                <h3>Erro ao carregar veículos</h3>
                <p>Ocorreu um erro ao carregar os veículos. Tente novamente mais tarde.</p>
                <p class="erro-detalhe">${error.message}</p>
            </div>`;
        }
    }
    
    // Verificar se estamos na página de detalhes de um veículo
    const detalhesVeiculoContainer = document.getElementById('detalhes-veiculo');
    
    if (detalhesVeiculoContainer) {
        try {
            // Obter o ID do veículo da URL
            const urlParams = new URLSearchParams(window.location.search);
            const id = urlParams.get('id');
            
            if (!id) {
                throw new Error('ID do veículo não fornecido');
            }
            
            // Carregar os detalhes do veículo
            const veiculo = await API.obterVeiculo(id);
            
            // Atualizar o título da página
            document.title = `${veiculo.titulo} - WebCars`;
            
            // Implementação da exibição de detalhes (seria adaptada para o HTML específico da página)
            // ...
            
        } catch (error) {
            console.error('Erro ao inicializar a página de detalhes:', error);
            detalhesVeiculoContainer.innerHTML = `<div class="erro-carregamento">
                <h3>Erro ao carregar detalhes do veículo</h3>
                <p>Ocorreu um erro ao carregar os detalhes deste veículo. Tente novamente mais tarde.</p>
                <p class="erro-detalhe">${error.message}</p>
            </div>`;
        }
    }
}); 