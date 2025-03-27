// Dados dos veículos (futuramente virá de uma API)
const dadosVeiculos = {
    'etron-2022': {
        id: 'etron-2022',
        nome: 'AUDI E-TRON',
        marca: 'Audi',
        modelo: 'E-Tron',
        versao: 'Performance Black Quattro',
        ano: 2021,
        anoModelo: '2021/2022',
        cor: 'Preto',
        combustivel: 'Elétrico',
        cambio: 'Automático',
        km: 15900,
        localizacao: 'São Paulo (SP)',
        preco: 459990,
        desconto: 12,
        descricaoDetalhada: `O Audi e-tron é um SUV 100% elétrico que combina luxo e tecnologia de ponta com uma condução silenciosa e potente. Com seus 408cv e tração integral quattro, oferece uma experiência de direção dinâmica e segura.

Este exemplar está em excelente estado de conservação, com apenas 15.900 km rodados. Possui interior premium com acabamento em couro, teto solar panorâmico, sistema de navegação GPS de última geração, e uma autonomia de aproximadamente 436 km com carga completa.

Carregamento rápido: atinge 80% da bateria em apenas 30 minutos em estações de recarga rápida DC.

Veículo com garantia de fábrica até 2025, todas as revisões em dia realizadas em concessionária autorizada Audi. Excelente oportunidade para quem busca um veículo elétrico de alta performance aliado ao conforto e tecnologia que só a Audi proporciona.

Entre em contato agora e agende seu test drive!`,
        fotos: [
            'https://image.webmotors.com.br/_fotos/anunciousados/gigante/2025/202502/20250226/audi-etron-eletrico-sportback-performance-black-quattro-wmimagem16411974193.jpg?s=fill&w=1920&h=1440&q=75',
            'https://image.webmotors.com.br/_fotos/anunciousados/gigante/2025/202502/20250226/audi-etron-eletrico-sportback-performance-black-quattro-wmimagem16412573253.jpg?s=fill&w=1920&h=1440&q=75',
            'https://image.webmotors.com.br/_fotos/anunciousados/gigante/2025/202502/20250226/audi-etron-eletrico-sportback-performance-black-quattro-wmimagem16413162045.jpg?s=fill&w=1920&h=1440&q=75',
            'https://image.webmotors.com.br/_fotos/anunciousados/gigante/2025/202502/20250226/audi-etron-eletrico-sportback-performance-black-quattro-wmimagem1641373666.jpg?s=fill&w=1920&h=1440&q=75',
            'https://image.webmotors.com.br/_fotos/anunciousados/gigante/2025/202502/20250226/audi-etron-eletrico-sportback-performance-black-quattro-wmimagem16414308772.jpg?s=fill&w=1920&h=1440&q=75',
            'https://image.webmotors.com.br/_fotos/anunciousados/gigante/2025/202502/20250226/audi-etron-eletrico-sportback-performance-black-quattro-wmimagem16414907918.jpg?s=fill&w=1920&h=1440&q=75',
            'https://image.webmotors.com.br/_fotos/anunciousados/gigante/2025/202502/20250226/audi-etron-eletrico-sportback-performance-black-quattro-wmimagem16415484750.jpg?s=fill&w=1920&h=1440&q=75',
            'https://image.webmotors.com.br/_fotos/anunciousados/gigante/2025/202502/20250226/audi-etron-eletrico-sportback-performance-black-quattro-wmimagem1642007375.jpg?s=fill&w=1920&h=1440&q=75',
            'https://image.webmotors.com.br/_fotos/anunciousados/gigante/2025/202502/20250226/audi-etron-eletrico-sportback-performance-black-quattro-wmimagem16420650983.jpg?s=fill&w=1920&h=1440&q=75',
            'https://image.webmotors.com.br/_fotos/anunciousados/gigante/2025/202502/20250226/audi-etron-eletrico-sportback-performance-black-quattro-wmimagem1642122944.jpg?s=fill&w=1920&h=1440&q=75',
            'https://image.webmotors.com.br/_fotos/anunciousados/gigante/2025/202502/20250226/audi-etron-eletrico-sportback-performance-black-quattro-wmimagem16421850531.jpg?s=fill&w=1920&h=1440&q=75',
            'https://image.webmotors.com.br/_fotos/anunciousados/gigante/2025/202502/20250226/audi-etron-eletrico-sportback-performance-black-quattro-wmimagem1642241039.jpg?s=fill&w=1920&h=1440&q=75',
            'https://image.webmotors.com.br/_fotos/anunciousados/gigante/2025/202502/20250226/audi-etron-eletrico-sportback-performance-black-quattro-wmimagem16422977145.jpg?s=fill&w=1920&h=1440&q=75',
            'https://image.webmotors.com.br/_fotos/anunciousados/gigante/2025/202502/20250226/audi-etron-eletrico-sportback-performance-black-quattro-wmimagem16423568574.jpg?s=fill&w=1920&h=1440&q=75',
            'https://image.webmotors.com.br/_fotos/anunciousados/gigante/2025/202502/20250226/audi-etron-eletrico-sportback-performance-black-quattro-wmimagem16424144048.jpg?s=fill&w=1920&h=1440&q=75'
        ],
        opcionais: [
            'Airbag',
            'Alarme',
            'Ar condicionado',
            'Bancos em couro',
            'Teto solar',
            'GPS',
            'Câmbio automático',
            'Freio ABS',
            'Sensor de estacionamento',
            'Câmera de ré',
            'Direção elétrica',
            'Central multimídia',
            'Start/Stop automático',
            'Faróis em LED',
            'Rodas de liga leve',
            'Assistente de partida em rampa',
            'Controle de tração',
            'Controle de estabilidade',
            'Frenagem autônoma',
            'Teto panorâmico'
        ],
        informacoesAdicionais: {
            unicoDono: true,
            revisoes: 'Todas em dia na concessionária',
            ipva: 'Pago',
            seguro: 'Vigente',
            carroceria: 'SUV',
            aceitaTroca: true,
            potencia: '408 cv',
            autonomia: '436 km'
        }
    },
    'compass-2023': {
        id: 'compass-2023',
        nome: 'JEEP COMPASS 1.3 T270 TURBO FLEX S AT6',
        marca: 'Jeep',
        modelo: 'Compass',
        versao: 'S AT6',
        ano: 2023,
        anoModelo: '2023/2023',
        cor: 'Branco',
        combustivel: 'Flex',
        cambio: 'Automático',
        km: 40000,
        localizacao: 'São Paulo (SP)',
        preco: 166990,
        desconto: 15,
        descricaoDetalhada: `
            O Jeep Compass 2023 S AT6 é a escolha perfeita para quem busca conforto, 
            segurança e estilo em um único veículo. Com design moderno e tecnologia 
            de ponta, este SUV compacto oferece uma experiência de direção excepcional.

            Destaques:
            - Motor 1.3 T270 Turbo Flex de alta performance
            - Transmissão automática de 6 velocidades
            - Interior premium com acabamento em couro
            - Multimídia com tela sensível ao toque e conectividade
            - Sistemas avançados de segurança
            - Direção elétrica e suspensão adaptativa

            Condição: Semi-novo, único dono, revisões em dia na concessionária.
            Perfeito para quem busca um veículo moderno e versátil.
        `,
        fotos: [
            'https://image.webmotors.com.br/_fotos/anunciousados/gigante/2025/202503/20250320/jeep-compass-1-3-t270-turbo-flex-s-at6-wmimagem11110914342.webp?s=fill&w=552&h=414&q=60',
            'https://image.webmotors.com.br/_fotos/anunciousados/gigante/2025/202503/20250320/jeep-compass-1-3-t270-turbo-flex-s-at6-wmimagem11110941841.webp?s=fill&w=1920&h=1440&q=75',
            'https://image.webmotors.com.br/_fotos/anunciousados/gigante/2025/202503/20250320/jeep-compass-1-3-t270-turbo-flex-s-at6-wmimagem11110975232.webp?s=fill&w=1920&h=1440&q=75',
            'https://image.webmotors.com.br/_fotos/anunciousados/gigante/2025/202503/20250320/jeep-compass-1-3-t270-turbo-flex-s-at6-wmimagem11111002637.webp?s=fill&w=1920&h=1440&q=75'
        ],
        opcionais: [
            'Airbag',
            'Alarme',
            'Ar quente',
            'Bancos dianteiros com aquecimento',
            'Banco com regulagem de altura',
            'Computador de bordo',
            'Controle de tração',
            'Desembaçador traseiro',
            'Ar condicionado',
            'Encosto de cabeça traseiro',
            'Freio ABS',
            'Limpador traseiro',
            'Controle automático de velocidade',
            'Retrovisores elétricos',
            'Rodas de liga leve',
            'Sensor de chuva',
            'Sensor de estacionamento',
            'Teto solar',
            'Retrovisor fotocrômico',
            'Travas elétricas',
            'Vidros elétricos',
            'Volante com regulagem de altura',
            'Bancos em couro',
            'GPS'
        ],
        informacoesAdicionais: {
            unicoDono: true,
            revisoes: 'Todas em dia na concessionária',
            ipva: 'Pago',
            seguro: 'Vigente'
        }
    },
    'hilux-2025': {
        id: 'hilux-2025',
        nome: 'TOYOTA HILUX 2.8 D-4D TURBO DIESEL CD SRX PLUS 4X4 AUTOMÁTICO',
        marca: 'Toyota',
        modelo: 'Hilux',
        versao: 'SRX Plus 4x4 Automático',
        ano: 2025,
        anoModelo: '2025/2025',
        cor: 'Prata',
        combustivel: 'Diesel',
        cambio: 'Automática',
        km: 0,
        localizacao: 'Jundiaí (SP)',
        preco: 351800,
        desconto: 10,
        descricaoDetalhada: `Concessionária TOYOTA EXPOENTE JUNDIAÍ - condição válida até 31/03/25 ou enquanto durar o estoque. Outros Opcionais: Comando de áudio no volante, Controle de estabilidade, Distribuição eletrônica de frenagem, Farol de neblina, Kit Multimídia, MP3 Player, Pára-choques na cor do veículo.`,
        fotos: [
            'https://image.webmotors.com.br/_fotos/anunciousados/gigante/2025/202503/20250314/toyota-hilux-2-8-d4d-turbo-diesel-cd-srx-plus-4x4-automatico-wmimagem17251698518.webp?s=fill&w=552&h=414&q=60',
            'https://image.webmotors.com.br/_fotos/anunciousados/gigante/2025/202503/20250314/toyota-hilux-2-8-d4d-turbo-diesel-cd-srx-plus-4x4-automatico-wmimagem17251721833.webp?s=fill&w=1920&h=1440&q=75',
            'https://image.webmotors.com.br/_fotos/anunciousados/gigante/2025/202503/20250314/toyota-hilux-2-8-d4d-turbo-diesel-cd-srx-plus-4x4-automatico-wmimagem17251742039.webp?s=fill&w=1920&h=1440&q=75'
        ],
        opcionais: [
            'Airbag',
            'Alarme',
            'Ar quente',
            'Banco com regulagem de altura',
            'Computador de bordo',
            'Controle de tração',
            'Desembaçador traseiro',
            'Ar condicionado',
            'Encosto de cabeça traseiro',
            'Freio ABS',
            'Controle automático de velocidade',
            'Retrovisores elétricos',
            'Rodas de liga leve',
            'Sensor de estacionamento',
            'Retrovisor fotocrômico',
            'Travas elétricas',
            'Vidros elétricos',
            'Volante com regulagem de altura',
            'Bancos em couro',
            'Tração 4x4',
            'Direção hidráulica',
            'GPS'
        ],
        informacoesAdicionais: {
            unicoDono: true,
            revisoes: 'Todas em dia na concessionária',
            ipva: 'Pago',
            seguro: 'Vigente',
            carroceria: 'Picape',
            aceitaTroca: true
        }
    },
    // Adicione outros veículos aqui
};

// Classe para gerenciar detalhes do veículo
class DetalheVeiculo {
    constructor() {
        this.inicializar();
    }

    inicializar() {
        document.addEventListener('DOMContentLoaded', () => {
            this.carregarDadosVeiculo();
            this.configurarGaleria();
            this.configurarFormularioContato();
        });
    }

    obterIdVeiculo() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
    }

    carregarDadosVeiculo() {
        const idVeiculo = this.obterIdVeiculo();
        const veiculo = dadosVeiculos[idVeiculo];

        if (!veiculo) {
            this.exibirErro('Veículo não encontrado');
            return;
        }

        this.preencherInformacoesBasicas(veiculo);
        this.preencherDescricaoDetalhada(veiculo);
        this.preencherOpcionais(veiculo);
        this.preencherInformacoesVendedor(veiculo);
    }

    preencherInformacoesBasicas(veiculo) {
        document.getElementById('nome-veiculo').textContent = veiculo.nome;
        document.getElementById('localizacao-veiculo').textContent = veiculo.localizacao;
        document.getElementById('ano-veiculo').textContent = veiculo.anoModelo;
        document.getElementById('km-veiculo').textContent = `${veiculo.km.toLocaleString('pt-BR')} km`;
        document.getElementById('combustivel-veiculo').textContent = veiculo.combustivel;
        document.getElementById('cambio-veiculo').textContent = veiculo.cambio;
        
        const precoElement = document.getElementById('preco-veiculo');
        precoElement.innerHTML = `
            R$ ${veiculo.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            <span class="desconto-badge">-${veiculo.desconto}% ABAIXO DA FIPE</span>
        `;
    }

    preencherDescricaoDetalhada(veiculo) {
        const descricaoElement = document.getElementById('descricao-detalhada');
        descricaoElement.textContent = veiculo.descricaoDetalhada;
    }

    preencherOpcionais(veiculo) {
        const opcionaisElement = document.getElementById('opcionais-veiculo');
        const tituloOpcionais = document.getElementById('titulo-opcionais');
        
        // Atualizar título
        tituloOpcionais.textContent = 'Itens do Veículo';
        
        const opcionaisHTML = veiculo.opcionais
            .map(opcional => `<li><i class="fas fa-check"></i> ${opcional}</li>`)
            .join('');
        opcionaisElement.innerHTML = opcionaisHTML;
    }

    preencherInformacoesVendedor(veiculo) {
        const vendedorElement = document.getElementById('informacoes-vendedor');
        
        vendedorElement.innerHTML = `
            <div class="detalhes-vendedor">
                <h3>Sobre o Vendedor</h3>
                <div class="vendedor-info">
                    <div class="icone-vendedor">
                        <i class="fas fa-store"></i>
                    </div>
                    <div class="dados-vendedor">
                        <h4>Senhor Automoveis</h4>
                        <p><i class="fas fa-map-marker-alt"></i> São Paulo, SP</p>
                        <p><i class="fas fa-clock"></i> Loja fechada - Abre sexta às 9h00</p>
                    </div>
                </div>
                <div class="contato-vendedor">
                    <h4>Contato</h4>
                    <p><i class="fas fa-phone"></i> (11) 4420-7014</p>
                    <p class="codigo-ligacao">Na ligação informe o código: 9304</p>
                </div>
            </div>
        `;
    }

    configurarGaleria() {
        const idVeiculo = this.obterIdVeiculo();
        const veiculo = dadosVeiculos[idVeiculo];

        if (!veiculo || !veiculo.fotos || veiculo.fotos.length === 0) {
            console.error('Nenhuma foto encontrada');
            return;
        }

        const galeriaElement = document.getElementById('galeria-fotos');
        const miniaturaElement = document.getElementById('miniaturas-fotos');

        veiculo.fotos.forEach((foto, index) => {
            // Foto principal
            const imgPrincipal = document.createElement('div');
            imgPrincipal.classList.add('foto-principal');
            imgPrincipal.innerHTML = `
                <img src="${foto}" alt="Foto ${index + 1} do veículo" 
                     onclick="abrirImagemModal('${foto}')">
            `;
            galeriaElement.appendChild(imgPrincipal);

            // Miniatura
            const imgMiniatura = document.createElement('div');
            imgMiniatura.classList.add('miniatura');
            imgMiniatura.innerHTML = `
                <img src="${foto}" alt="Miniatura ${index + 1}" 
                     onclick="trocarFotoGaleria(${index})">
            `;
            miniaturaElement.appendChild(imgMiniatura);
        });
    }

    configurarFormularioContato() {
        const formulario = document.getElementById('formulario-contato');
        formulario.addEventListener('submit', (evento) => {
            evento.preventDefault();
            
            const nome = document.getElementById('nome-contato').value;
            const email = document.getElementById('email-contato').value;
            const telefone = document.getElementById('telefone-contato').value;
            const mensagem = document.getElementById('mensagem-contato').value;

            // Aqui você pode adicionar validações ou enviar para um backend
            alert(`Mensagem enviada!\n\nNome: ${nome}\nEmail: ${email}\nTelefone: ${telefone}\n\nMensagem: ${mensagem}`);
            
            formulario.reset();
        });
    }

    exibirErro(mensagem) {
        const erroElement = document.getElementById('erro-veiculo');
        erroElement.textContent = mensagem;
        erroElement.style.display = 'block';
    }
}

// Funções globais para interação com a galeria
function trocarFotoGaleria(indice) {
    const galeria = document.getElementById('galeria-fotos');
    const fotos = galeria.querySelectorAll('.foto-principal');
    
    fotos.forEach((foto, index) => {
        foto.style.display = index === indice ? 'block' : 'none';
    });

    const miniaturas = document.getElementById('miniaturas-fotos').children;
    Array.from(miniaturas).forEach((miniatura, index) => {
        miniatura.classList.toggle('selecionada', index === indice);
    });
}

function abrirImagemModal(urlImagem) {
    const modal = document.createElement('div');
    modal.classList.add('modal-imagem');
    modal.innerHTML = `
        <div class="modal-conteudo">
            <span class="fechar" onclick="this.closest('.modal-imagem').remove()">&times;</span>
            <img src="${urlImagem}" alt="Imagem ampliada do veículo">
        </div>
    `;
    document.body.appendChild(modal);
}

// Inicializar a página de detalhes
new DetalheVeiculo();