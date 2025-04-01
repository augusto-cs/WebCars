// Dados para as perguntas frequentes
const faqData = [
    {
        pergunta: "Como comprar um veículo no site?",
        resposta: "Para comprar um veículo, navegue pelo catálogo, encontre o modelo desejado, veja os detalhes e clique em 'Tenho Interesse'. Em seguida, preencha o formulário de contato e nossa equipe entrará em contato para dar andamento à negociação."
    },
    {
        pergunta: "Quais são as formas de pagamento aceitas?",
        resposta: "Aceitamos diversas formas de pagamento, incluindo financiamento bancário, consórcio, cartão de crédito (em até 12x), transferência bancária e PIX para entrada. O pagamento completo pode ser feito após a aprovação do crédito."
    },
    {
        pergunta: "Como vender meu veículo na plataforma?",
        resposta: "Para vender seu veículo, acesse a opção 'Vender' no menu principal, preencha o formulário com os dados do seu veículo, envie fotos e aguarde nossa avaliação. Nossa equipe entrará em contato para fazer uma oferta ou agendar uma vistoria presencial."
    },
    {
        pergunta: "Os veículos possuem garantia?",
        resposta: "Sim, todos os veículos possuem garantia mínima de 3 meses para motor e câmbio. Veículos mais novos podem ter a garantia de fábrica ainda vigente. Oferecemos também opções de garantia estendida para maior tranquilidade."
    },
    {
        pergunta: "Como cancelar minha conta no site?",
        resposta: "Para cancelar sua conta, acesse seu perfil, vá em 'Configurações', role até o final da página e clique em 'Cancelar conta'. Você receberá um e-mail de confirmação. Caso tenha algum problema, entre em contato com nosso suporte."
    }
];

// Mapeamento de sugestões relacionadas para cada tipo de consulta
const perguntasRelacionadas = {
    saudacoes: [
        { texto: "Como comprar?", query: "Como comprar um carro?" },
        { texto: "Formas de pagamento", query: "Quais são as formas de pagamento?" },
        { texto: "Posso dar meu carro na troca?", query: "Posso dar meu carro na troca?" }
    ],
    preco: [
        { texto: "Financiamento", query: "Quais as condições de financiamento?" },
        { texto: "Desconto à vista?", query: "Tem desconto para pagamento à vista?" },
        { texto: "Avaliação de usado", query: "Como é feita a avaliação do meu usado?" }
    ],
    garantia: [
        { texto: "Garantia estendida", query: "Quanto custa a garantia estendida?" },
        { texto: "Revisões", query: "As revisões estão incluídas?" },
        { texto: "Suporte pós-venda", query: "Como funciona o suporte pós-venda?" }
    ],
    vender: [
        { texto: "Quanto vale meu carro?", query: "Quanto vale meu carro?" },
        { texto: "Documentos para venda", query: "Quais documentos preciso para vender?" },
        { texto: "Prazo de pagamento", query: "Qual o prazo para receber o pagamento?" }
    ],
    documentacao: [
        { texto: "Transferência", query: "Como funciona a transferência?" },
        { texto: "IPVA", query: "Quem paga o IPVA?" },
        { texto: "Documentos necessários", query: "Quais documentos preciso levar?" }
    ],
    prazoEntrega: [
        { texto: "Status do pedido", query: "Como acompanhar status do pedido?" },
        { texto: "Entrega em outra cidade", query: "Entregam em outra cidade?" },
        { texto: "Agendamento", query: "Como funciona o agendamento da entrega?" }
    ],
    testDrive: [
        { texto: "Agendar test drive", query: "Como agendar um test drive?" },
        { texto: "Documentos", query: "Preciso de quais documentos para test drive?" },
        { texto: "Acompanhante", query: "Posso levar acompanhante no test drive?" }
    ],
    seguro: [
        { texto: "Coberturas", query: "Quais coberturas o seguro oferece?" },
        { texto: "Custo médio", query: "Qual o custo médio do seguro?" },
        { texto: "Franquia", query: "Como funciona a franquia?" }
    ],
    carrosEletricos: [
        { texto: "Pontos de recarga", query: "Onde encontro pontos de recarga?" },
        { texto: "Manutenção", query: "Como é a manutenção de carros elétricos?" },
        { texto: "Autonomia", query: "Qual a autonomia dos modelos?" }
    ],
    trocaCarro: [
        { texto: "Avaliação do usado", query: "Como funciona a avaliação do usado?" },
        { texto: "Documentos necessários", query: "Quais documentos para a troca?" },
        { texto: "Diferença a pagar", query: "Como é calculada a diferença a pagar?" }
    ],
    atendimentoHumano: [
        { texto: "Horário de atendimento", query: "Qual o horário de atendimento?" },
        { texto: "Lojas físicas", query: "Vocês têm lojas físicas?" },
        { texto: "Reclamações", query: "Como fazer uma reclamação?" }
    ],
    padrao: [
        { texto: "Formas de pagamento", query: "Quais são as formas de pagamento?" },
        { texto: "Garantia", query: "Os veículos possuem garantia?" },
        { texto: "Falar com atendente", query: "Falar com atendente humano" }
    ]
};

// Padrões de respostas do chatbot
const chatbotResponses = {
    saudacoes: {
        padroes: ["oi", "olá", "ola", "e aí", "tudo bem", "como vai", "bom dia", "boa tarde", "boa noite", "ei", "alô", "alo"],
        respostas: [
            "Olá! Como posso ajudar você hoje?",
            "Oi! Em que posso ser útil?",
            "Olá! Estou aqui para tirar suas dúvidas sobre nosso site."
        ]
    },
    tudoBem: {
        padroes: ["tudo bem com você", "como vai você", "como você está", "tudo certo", "como vc ta"],
        respostas: [
            "Estou ótimo, obrigado por perguntar! Em que posso ajudar?",
            "Estou muito bem! Como posso te ajudar hoje?",
            "Tudo perfeito! Estou pronto para responder suas perguntas."
        ]
    },
    preco: {
        padroes: ["qual o preço", "quanto custa", "valor do", "preço do", "financiamento", "condições de pagamento", "parcelas", "entrada"],
        respostas: [
            "Os preços variam de acordo com o modelo, ano e condições do veículo. Você pode verificar o valor de cada veículo na página de detalhes. Temos opções de financiamento com parcelas a partir de 60x.",
            "Nossos preços são competitivos no mercado. Recomendo verificar o veículo específico que você tem interesse para ver o valor. Oferecemos condições especiais de financiamento e avaliamos seu usado na troca."
        ]
    },
    estoque: {
        padroes: ["tem disponível", "disponibilidade", "tem em estoque", "quais carros", "veículos disponíveis", "modelos", "marcas"],
        respostas: [
            "Temos diversos veículos disponíveis em nosso estoque. Você pode filtrar por marca, modelo, ano e faixa de preço no nosso site para encontrar o que procura.",
            "Nossa plataforma possui centenas de veículos disponíveis. Você pode usar os filtros de busca para encontrar exatamente o que deseja. Atualizamos nosso estoque diariamente."
        ]
    },
    vender: {
        padroes: ["como vender", "vender meu carro", "avaliar meu carro", "quanto vale meu", "avaliação do meu"],
        respostas: [
            "Para vender seu veículo, acesse a opção 'Vender' no menu principal, preencha o formulário com os dados do seu carro, envie fotos de boa qualidade e aguarde nosso contato para uma avaliação.",
            "Avaliamos seu veículo de forma rápida e oferecemos o melhor valor do mercado. Basta acessar a seção 'Vender', informar os dados do seu carro e enviar algumas fotos. Nossa equipe entrará em contato em até 24 horas."
        ]
    },
    documentacao: {
        padroes: ["documentos", "documentação", "transferência", "ipva", "licenciamento", "multas", "documentos necessários"],
        respostas: [
            "Todos os nossos veículos estão com a documentação regularizada. Nos responsabilizamos pela transferência e garantimos que não há pendências de IPVA, licenciamento ou multas.",
            "A documentação dos veículos está 100% regularizada. O processo de transferência é rápido e seguro, e todos os custos estão inclusos no valor da negociação. Para comprar, você precisará de RG, CPF, CNH, comprovante de residência e, em caso de financiamento, comprovante de renda."
        ]
    },
    garantia: {
        padroes: ["garantia", "problemas", "defeito", "quebrar", "manutenção", "revisão"],
        respostas: [
            "Todos os veículos possuem garantia mínima de 3 meses para motor e câmbio. Veículos mais novos podem ter a garantia de fábrica ainda vigente. Temos também opções de garantia estendida.",
            "Oferecemos garantia para todos os veículos. Além disso, realizamos uma inspeção rigorosa com mais de 100 itens antes da venda, garantindo a qualidade do veículo que você está comprando."
        ]
    },
    prazoEntrega: {
        padroes: ["prazo de entrega", "quando recebo", "tempo de entrega", "quanto tempo leva", "quando chega"],
        respostas: [
            "O prazo de entrega varia conforme a localização e disponibilidade do veículo. Para carros em estoque, a entrega pode ser feita em até 3 dias úteis após a aprovação do financiamento e assinatura do contrato.",
            "Após a confirmação da compra e pagamento, a entrega é agendada em até 3 dias úteis para veículos em estoque. Para veículos sob encomenda, o prazo pode variar entre 30 a 60 dias, dependendo do modelo e personalização."
        ]
    },
    testDrive: {
        padroes: ["test drive", "testar o carro", "experimentar", "posso dirigir", "teste"],
        respostas: [
            "Sim, oferecemos test drive para todos os veículos em nosso estoque. Basta agendar pelo site ou entrar em contato com nossa central de atendimento. Será um prazer proporcionar essa experiência!",
            "Você pode agendar um test drive diretamente pelo nosso site. Na página do veículo de interesse, clique em 'Agendar Test Drive' e escolha a data e horário mais convenientes para você."
        ]
    },
    seguro: {
        padroes: ["seguro", "seguro auto", "preço do seguro", "cobertura", "seguradora"],
        respostas: [
            "Trabalhamos com as melhores seguradoras do mercado e podemos oferecer condições especiais para você proteger seu veículo. Após a escolha do carro, nossa equipe apresentará as opções de seguro disponíveis.",
            "Temos parcerias com seguradoras renomadas que oferecem coberturas completas com valores acessíveis. Na finalização da compra, apresentamos simulações personalizadas de acordo com o perfil do condutor e o modelo do veículo."
        ]
    },
    carrosEletricos: {
        padroes: ["carros elétricos", "veículos elétricos", "carro híbrido", "autonomia", "bateria", "recarga"],
        respostas: [
            "Temos diversos modelos de carros elétricos e híbridos em nosso catálogo. Eles possuem autonomia que varia de 250km a 600km, dependendo do modelo. Nossa equipe pode fornecer todas as informações sobre pontos de recarga e manutenção.",
            "Os veículos elétricos disponíveis possuem tecnologia de ponta, com baterias de longa duração e sistemas de recarga rápida. Oferecemos consultoria especializada para ajudar na adaptação a essa nova tecnologia."
        ]
    },
    trocaCarro: {
        padroes: ["trocar meu carro", "dar de entrada", "avaliar na troca", "quanto vale na troca"],
        respostas: [
            "Aceitamos seu veículo como parte do pagamento! Nossos especialistas farão uma avaliação justa do seu carro atual, considerando modelo, ano, estado de conservação e quilometragem.",
            "A WebCars valoriza seu usado na troca. Fazemos uma avaliação precisa e transparente, garantindo o melhor valor de mercado pelo seu veículo atual. O valor pode ser utilizado como entrada para seu novo carro."
        ]
    },
    atendimentoHumano: {
        padroes: ["falar com atendente", "atendente humano", "falar com pessoa", "atendimento humano"],
        respostas: [
            "Para falar com um atendente humano, ligue para nossa central: (11) 3456-7890, de segunda a sexta, das 8h às 20h, e aos sábados das 9h às 15h.",
            "Posso transferir seu atendimento para um de nossos consultores. Por favor, ligue para (11) 3456-7890 ou envie um e-mail para atendimento@webcars.com.br com seus dados de contato."
        ],
        categorias: {
            escolherCarro: {
                padroes: ["como escolher", "escolher carro", "melhor carro", "necessidades"],
                resposta: "Para escolher o carro ideal, leve em consideração: Uso diário (cidade ou viagens), consumo de combustível, custo de manutenção, espaço interno necessário, itens de segurança e valor de revenda. Carros compactos são melhores para cidade, enquanto modelos maiores oferecem mais conforto para viagens."
            },
            documentosNecessarios: {
                padroes: ["documentos compra", "documentos necessários"],
                resposta: "Para a compra de um veículo usado, você precisará dos seguintes documentos: Documento do veículo (CRV), Certificado de Registro e Licenciamento (CRLV), comprovante de pagamento do IPVA e eventuais multas, laudo de vistoria (quando exigido) e recibo de compra e venda preenchido e reconhecido em cartório."
            },
            diferencaNovoSeminovo: {
                padroes: ["diferença novo seminovo", "novo ou seminovo"],
                resposta: "Carro novo: Maior custo, mas com garantia de fábrica, sem histórico de uso e menor risco de problemas mecânicos iniciais. Carro seminovo: Mais barato, já depreciado (não perde tanto valor como um novo), mas pode ter desgaste e histórico de manutenção a ser verificado."
            },
            formasFinanciamento: {
                padroes: ["formas financiamento", "opções financiamento"],
                resposta: "As formas de financiamento disponíveis são: Financiamento bancário (o banco financia o valor do carro, e você paga em parcelas com juros), Consórcio (grupo de pessoas paga mensalmente e, a cada mês, um integrante recebe o crédito), Leasing (o banco 'aluga' o carro para você, com opção de compra no final) e Compra à vista (melhor opção para evitar juros)."
            },
            negociarPreco: {
                padroes: ["negociar preço", "negociar valor"],
                resposta: "Para negociar o preço na compra de um carro: Pesquise preços de veículos semelhantes no mercado, analise o histórico do carro para identificar possíveis problemas, ofereça pagamento à vista para conseguir desconto e esteja disposto a buscar outras opções se o preço não for negociável."
            },
            cuidadosCompraUsado: {
                padroes: ["cuidados comprar usado"],
                resposta: "Principais cuidados ao comprar um carro usado: Verifique o histórico do veículo (multas, acidentes, financiamentos), leve um mecânico de confiança para avaliar o estado geral, confira a quilometragem real e sinais de desgaste excessivo, faça um test drive para sentir a dirigibilidade e detectar possíveis defeitos."
            },
            verificarMultas: {
                padroes: ["verificar multas", "verificar dívidas"],
                resposta: "Para verificar se um veículo tem multas ou dívidas pendentes, acesse o site do Detran do seu estado e consulte a placa ou o número do Renavam do veículo. Também é possível verificar no site da Receita Federal e em despachantes especializados."
            },
            melhorMomento: {
                padroes: ["melhor momento", "quando comprar"],
                resposta: "Os melhores momentos para comprar um carro novo são: Final de ano (concessionárias fazem promoções para vender modelos do ano corrente), meses de março e setembro (lançamento de novos modelos, reduzindo preços dos antigos) e durante feirões e promoções sazonais de montadoras e concessionárias."
            }
        }
    },
    comprarCarro: {
        padroes: ["como escolher", "escolher carro", "melhor carro", "necessidades", "documentos compra", "documentos necessários", "diferença novo seminovo", "novo ou seminovo", "formas financiamento", "opções financiamento", "negociar preço", "negociar valor", "cuidados comprar usado", "verificar multas", "verificar dívidas", "melhor momento", "quando comprar"],
        categorias: {
            escolherCarro: {
                padroes: ["como escolher", "escolher carro", "melhor carro", "necessidades"],
                resposta: "Para escolher o carro ideal, leve em consideração: Uso diário (cidade ou viagens), consumo de combustível, custo de manutenção, espaço interno necessário, itens de segurança e valor de revenda. Carros compactos são melhores para cidade, enquanto modelos maiores oferecem mais conforto para viagens."
            },
            documentosNecessarios: {
                padroes: ["documentos compra", "documentos necessários"],
                resposta: "Para a compra de um veículo usado, você precisará dos seguintes documentos: Documento do veículo (CRV), Certificado de Registro e Licenciamento (CRLV), comprovante de pagamento do IPVA e eventuais multas, laudo de vistoria (quando exigido) e recibo de compra e venda preenchido e reconhecido em cartório."
            },
            diferencaNovoSeminovo: {
                padroes: ["diferença novo seminovo", "novo ou seminovo"],
                resposta: "Carro novo: Maior custo, mas com garantia de fábrica, sem histórico de uso e menor risco de problemas mecânicos iniciais. Carro seminovo: Mais barato, já depreciado (não perde tanto valor como um novo), mas pode ter desgaste e histórico de manutenção a ser verificado."
            },
            formasFinanciamento: {
                padroes: ["formas financiamento", "opções financiamento"],
                resposta: "As formas de financiamento disponíveis são: Financiamento bancário (o banco financia o valor do carro, e você paga em parcelas com juros), Consórcio (grupo de pessoas paga mensalmente e, a cada mês, um integrante recebe o crédito), Leasing (o banco 'aluga' o carro para você, com opção de compra no final) e Compra à vista (melhor opção para evitar juros)."
            },
            negociarPreco: {
                padroes: ["negociar preço", "negociar valor"],
                resposta: "Para negociar o preço na compra de um carro: Pesquise preços de veículos semelhantes no mercado, analise o histórico do carro para identificar possíveis problemas, ofereça pagamento à vista para conseguir desconto e esteja disposto a buscar outras opções se o preço não for negociável."
            },
            cuidadosCompraUsado: {
                padroes: ["cuidados comprar usado"],
                resposta: "Principais cuidados ao comprar um carro usado: Verifique o histórico do veículo (multas, acidentes, financiamentos), leve um mecânico de confiança para avaliar o estado geral, confira a quilometragem real e sinais de desgaste excessivo, faça um test drive para sentir a dirigibilidade e detectar possíveis defeitos."
            },
            verificarMultas: {
                padroes: ["verificar multas", "verificar dívidas"],
                resposta: "Para verificar se um veículo tem multas ou dívidas pendentes, acesse o site do Detran do seu estado e consulte a placa ou o número do Renavam do veículo. Também é possível verificar no site da Receita Federal e em despachantes especializados."
            },
            melhorMomento: {
                padroes: ["melhor momento", "quando comprar"],
                resposta: "Os melhores momentos para comprar um carro novo são: Final de ano (concessionárias fazem promoções para vender modelos do ano corrente), meses de março e setembro (lançamento de novos modelos, reduzindo preços dos antigos) e durante feirões e promoções sazonais de montadoras e concessionárias."
            }
        }
    },
    naoEntendi: [
        "Desculpe, não entendi sua pergunta. Pode reformular?",
        "Não consegui compreender. Pode tentar perguntar de outra forma?",
        "Hmm, não tenho certeza do que você está perguntando. Pode detalhar mais?"
    ]
};

// Função melhorada para criar interface de ajuda
function criarInterfaceAjuda() {
    console.log("Função criarInterfaceAjuda chamada");

    // Adicionar estilos personalizados
    adicionarEstilosChat();

    // Remover qualquer overlay existente para evitar duplicação
    const overlayExistente = document.querySelector('.ajuda-overlay');
    if (overlayExistente) {
        overlayExistente.remove();
        console.log("Overlay existente removido");
    }

    // Criar a estrutura da interface
    const ajudaOverlay = document.createElement('div');
    ajudaOverlay.className = 'ajuda-overlay';
    
    ajudaOverlay.innerHTML = `
        <div class="ajuda-container">
            <div class="ajuda-header">
                <h2>Central de Ajuda</h2>
                <button class="ajuda-voltar">Voltar para o Início</button>
                <button class="ajuda-fechar">×</button>
            </div>
            <div class="ajuda-content">
                <div class="faq-section">
                    <h3>Perguntas Frequentes</h3>
                    <div class="faq-list"></div>
                </div>
                <div class="chat-section">
                    <h3>Chat</h3>
                    <div class="chat-messages">
                        <div class="message system">
                            Olá! Sou o assistente virtual da WebCars. Como posso ajudar você hoje?
                        </div>
                    </div>
                    <div class="quick-replies">
                        <button class="quick-reply-btn" data-query="Como comprar um carro?">Como comprar?</button>
                        <button class="quick-reply-btn" data-query="Quais são as formas de pagamento?">Pagamento</button>
                        <button class="quick-reply-btn" data-query="Como vender meu carro?">Vender</button>
                        <button class="quick-reply-btn" data-query="Os veículos possuem garantia?">Garantia</button>
                        <button class="quick-reply-btn" data-query="Documentação necessária?">Documentos</button>
                        <button class="quick-reply-btn" data-query="Qual o prazo de entrega?">Prazo</button>
                    </div>
                    <div class="more-options" style="text-align: center; margin: 5px 0;">
                        <button class="show-more-options" style="font-size: 12px; background: transparent; border: none; color: #0056b3; cursor: pointer;">
                            Mais opções <i class="fas fa-chevron-down"></i>
                        </button>
                    </div>
                    <div class="quick-replies-extended" style="display: none;">
                        <button class="quick-reply-btn" data-query="Posso fazer test drive?">Test Drive</button>
                        <button class="quick-reply-btn" data-query="Oferecem seguro para o veículo?">Seguro</button>
                        <button class="quick-reply-btn" data-query="Vocês têm carros elétricos?">Elétricos</button>
                        <button class="quick-reply-btn" data-query="Posso dar meu carro na troca?">Troca</button>
                        <button class="quick-reply-btn" data-query="Como cancelar minha conta?">Cancelar conta</button>
                        <button class="quick-reply-btn" data-query="Falar com atendente humano">Atendente</button>
                    </div>
                    <div class="quick-replies-compra" style="display: none; flex-wrap: wrap; gap: 8px; margin: 10px 0; justify-content: center;">
                        <button class="quick-reply-btn" data-query="Como escolher o melhor carro para minhas necessidades?">Escolher carro ideal</button>
                        <button class="quick-reply-btn" data-query="Quais documentos são necessários para comprar um carro usado?">Documentos necessários</button>
                        <button class="quick-reply-btn" data-query="Qual a diferença entre comprar um carro novo e um seminovo?">Novo x Seminovo</button>
                        <button class="quick-reply-btn" data-query="Quais são as formas de financiamento disponíveis?">Financiamento</button>
                        <button class="quick-reply-btn" data-query="Como negociar o preço na compra de um carro?">Negociação</button>
                        <button class="quick-reply-btn" data-query="Quais são os principais cuidados ao comprar um carro usado?">Cuidados</button>
                        <button class="quick-reply-btn" data-query="Como verificar se um veículo tem multas ou dívidas pendentes?">Verificar multas</button>
                        <button class="quick-reply-btn" data-query="Qual o melhor momento para comprar um carro novo?">Melhor momento</button>
                        <button class="voltar-opcoes-btn" style="background-color: #e6f2ff; border: 1px solid #cce5ff; border-radius: 16px; padding: 6px 12px; font-size: 12px; color: #0056b3; cursor: pointer; margin-top: 10px; width: 100%; max-width: 150px;">← Voltar às opções</button>
                    </div>
                    <div class="chat-input">
                        <input type="text" placeholder="Digite sua mensagem aqui..." id="chat-input-field">
                        <button id="chat-send-btn">Enviar</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Garantir que o body exista
    if (!document.body) {
        console.error("Elemento body não encontrado");
        return;
    }

    // Adicionar o overlay ao body
    document.body.appendChild(ajudaOverlay);
    console.log("Overlay de ajuda adicionado ao body");

    // Forçar um reflow para garantir que a animação seja aplicada
    void ajudaOverlay.offsetWidth;

    // Criar a lista de FAQ
    criarFAQ();

    // Adicionar os event listeners
    document.querySelector('.ajuda-fechar').addEventListener('click', () => {
        ajudaOverlay.classList.add('hidden');
        setTimeout(() => {
            if (document.body.contains(ajudaOverlay)) {
                document.body.removeChild(ajudaOverlay);
            }
        }, 300);
        console.log("Overlay fechado");
    });

    document.querySelector('.ajuda-voltar').addEventListener('click', () => {
        window.location.href = '/';
    });

    // Configurar o botão de envio de mensagens
    const sendButton = document.getElementById('chat-send-btn');
    if (sendButton) {
        sendButton.addEventListener('click', enviarMensagem);
    }

    // Configurar o campo de input para enviar mensagem ao pressionar Enter
    const inputField = document.getElementById('chat-input-field');
    if (inputField) {
        inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                enviarMensagem();
            }
        });
    }

    // Configurar os botões de resposta rápida
    const quickReplyButtons = document.querySelectorAll('.quick-reply-btn');
    quickReplyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const query = button.getAttribute('data-query');
            if (query) {
                // Preencher o campo de input com a pergunta e enviar
                const inputField = document.getElementById('chat-input-field');
                if (inputField) {
                    inputField.value = query;
                    enviarMensagem();
                }
            }
        });
    });

    // Configurar o botão "Mais opções"
    const showMoreButton = document.querySelector('.show-more-options');
    if (showMoreButton) {
        showMoreButton.addEventListener('click', (e) => {
            e.preventDefault();
            const extendedOptions = document.querySelector('.quick-replies-extended');
            if (extendedOptions) {
                // Toggle a exibição das opções estendidas
                const isVisible = extendedOptions.style.display === 'flex';
                extendedOptions.style.display = isVisible ? 'none' : 'flex';
                showMoreButton.innerHTML = isVisible ? 'Mais opções <i class="fas fa-chevron-down"></i>' : 'Menos opções <i class="fas fa-chevron-up"></i>';
            }
        });
    }
    
    // Adicionar um botão para perguntas sobre compra de carros
    const quickReplies = document.querySelector('.quick-replies');
    if (quickReplies) {
        const compraBotao = document.createElement('button');
        compraBotao.className = 'quick-reply-btn';
        compraBotao.setAttribute('data-query', 'Como comprar um carro?');
        compraBotao.textContent = '🚗 Comprar carro';
        
        compraBotao.addEventListener('click', () => {
            // Ocultar os botões normais e mostrar os botões de compra
            quickReplies.style.display = 'none';
            
            // Verificar o elemento de botões estendidos
            const quickRepliesExtended = document.querySelector('.quick-replies-extended');
            if (quickRepliesExtended) {
                quickRepliesExtended.style.display = 'none';
            }
            
            // Mostrar os botões de compra
            const quickRepliesCompra = document.querySelector('.quick-replies-compra');
            if (quickRepliesCompra) {
                quickRepliesCompra.style.display = 'flex';
            }
            
            // Simular a pergunta
            const inputField = document.getElementById('chat-input-field');
            if (inputField) {
                inputField.value = 'Como comprar um carro?';
                enviarMensagem();
            }
        });
        
        // Adicionar no início dos botões
        quickReplies.prepend(compraBotao);
    }

    // Adicionar evento de clique para o botão de voltar às opções principais
    const voltarBtn = document.querySelector('.voltar-opcoes-btn');
    if (voltarBtn) {
        voltarBtn.addEventListener('click', () => {
            // Ocultar os botões de compra de carro
            const quickRepliesCompra = document.querySelector('.quick-replies-compra');
            if (quickRepliesCompra) {
                quickRepliesCompra.style.display = 'none';
            }
            
            // Mostrar os botões principais
            const quickRepliesMain = document.querySelector('.quick-replies');
            if (quickRepliesMain) {
                quickRepliesMain.style.display = 'flex';
            }
            
            // Adicionar mensagem informativa
            adicionarMensagemChat("Como posso ajudar você hoje?", 'system');
        });
    }
}

// Cria a lista de FAQ
function criarFAQ() {
    console.log("Criando lista de FAQ");
    const faqList = document.querySelector('.faq-list');
    
    if (!faqList) {
        console.error("Elemento .faq-list não encontrado");
        return;
    }
    
    faqData.forEach((item, index) => {
        const faqItem = document.createElement('div');
        faqItem.className = 'faq-item';
        
        faqItem.innerHTML = `
            <div class="faq-question" data-index="${index}">
                ${item.pergunta}
                <span class="faq-toggle">+</span>
            </div>
            <div class="faq-answer">
                ${item.resposta}
            </div>
        `;
        
        faqList.appendChild(faqItem);
    });
    
    // Adicionar event listeners para as perguntas
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const toggle = question.querySelector('.faq-toggle');
            
            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
                toggle.textContent = '+';
            } else {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                toggle.textContent = '-';
            }
            console.log("FAQ toggle clicado");
        });
    });
}

// Função para adicionar mensagem ao chat
function adicionarMensagemChat(mensagem, tipo, categoria = null) {
    const chatMessages = document.querySelector('.chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${tipo}`;
    
    // Adicionar classe específica se houver categoria
    if (categoria) {
        messageDiv.classList.add(`${categoria}-message`);
    }
    
    messageDiv.innerHTML = mensagem;
    chatMessages.appendChild(messageDiv);
    
    // Rolar o chat para a mensagem mais recente
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Verificar se a mensagem está relacionada a compra de carros para mostrar opções específicas
    if (tipo === 'system') {
        const mensagemLower = mensagem.toLowerCase();
        if (mensagemLower.includes('comprar') && mensagemLower.includes('carro')) {
            mostrarOpcoesCompraCarro();
        }
    }
}

// Função para mostrar opções de compra de carro
function mostrarOpcoesCompraCarro() {
    // Ocultar outros conjuntos de botões
    const quickReplies = document.querySelector('.quick-replies');
    const quickRepliesExtended = document.querySelector('.quick-replies-extended');
    const quickRepliesCompra = document.querySelector('.quick-replies-compra');
    
    if (quickReplies) quickReplies.style.display = 'none';
    if (quickRepliesExtended) quickRepliesExtended.style.display = 'none';
    if (quickRepliesCompra) quickRepliesCompra.style.display = 'flex';
    
    // Adicionar mensagem de sugestão
    const chatMessages = document.querySelector('.chat-messages');
    const sugestaoDiv = document.createElement('div');
    sugestaoDiv.className = 'sugestoes-relacionadas';
    sugestaoDiv.innerHTML = `
        <div class="sugestoes-titulo">Aqui estão algumas perguntas comuns sobre compra de veículos:</div>
    `;
    chatMessages.appendChild(sugestaoDiv);
    
    // Rolar o chat para a mensagem mais recente
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Função para enviar mensagem
function enviarMensagem() {
    const inputField = document.getElementById('chat-input-field');
    const mensagem = inputField.value.trim();
    
    if (mensagem.length > 0) {
        // Adicionar mensagem do usuário
        adicionarMensagemChat(mensagem, 'user');
        
        // Limpar campo de entrada
        inputField.value = '';
        
        // Remover botões de resposta rápida atuais
        const quickRepliesContainer = document.querySelector('.quick-replies');
        if (quickRepliesContainer) {
            quickRepliesContainer.style.display = 'none';
        }
        
        const quickRepliesExtended = document.querySelector('.quick-replies-extended');
        if (quickRepliesExtended) {
            quickRepliesExtended.style.display = 'none';
        }
        
        const quickRepliesCompra = document.querySelector('.quick-replies-compra');
        if (quickRepliesCompra) {
            quickRepliesCompra.style.display = 'none';
        }
        
        // Mostrar indicador de digitação
        const chatMessages = document.querySelector('.chat-messages');
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'typing-indicator';
        typingIndicator.innerHTML = '<span></span><span></span><span></span>';
        chatMessages.appendChild(typingIndicator);
        
        // Rolar o chat para a mensagem mais recente
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Simular processamento e resposta após um tempo
        setTimeout(() => {
            // Remover indicador de digitação
            const typingIndicator = document.querySelector('.typing-indicator');
            if (typingIndicator) {
                typingIndicator.remove();
            }
            
            // Processar mensagem e obter resposta
            const resposta = processarMensagem(mensagem);
            
            // Verificar se a mensagem está relacionada a compra de carros
            const mensagemLower = mensagem.toLowerCase();
            const isCompraCarro = mensagemLower.includes('comprar') && mensagemLower.includes('carro') || 
                                 mensagemLower.includes('compra') && mensagemLower.includes('veículo') ||
                                 chatbotResponses.comprarCarro && chatbotResponses.comprarCarro.padroes.some(padrao => mensagemLower.includes(padrao));
            
            // Adicionar resposta do sistema
            adicionarMensagemChat(resposta, 'system', isCompraCarro ? 'compra-carro' : null);
            
            // Se for relacionado a compra de carro, mostrar opções específicas
            if (isCompraCarro) {
                mostrarOpcoesCompraCarro();
            } else {
                // Mostrar botões de resposta rápida novamente
                if (quickRepliesContainer) {
                    quickRepliesContainer.style.display = 'flex';
                }
            }
        }, 1000);
    }
}

// Função para processar a mensagem do usuário e retornar uma resposta
function processarMensagem(mensagem) {
    const mensagemLower = mensagem.toLowerCase();
    
    // Verificar se é uma saudação
    if (chatbotResponses.saudacoes.padroes.some(padrao => mensagemLower.includes(padrao))) {
        return obterRespostaAleatoria(chatbotResponses.saudacoes.respostas);
    }
    
    // Verificar se é uma pergunta sobre bem-estar
    if (chatbotResponses.tudoBem.padroes.some(padrao => mensagemLower.includes(padrao))) {
        return obterRespostaAleatoria(chatbotResponses.tudoBem.respostas);
    }
    
    // Verificar se é uma pergunta sobre preço
    if (chatbotResponses.preco.padroes.some(padrao => mensagemLower.includes(padrao))) {
        return obterRespostaAleatoria(chatbotResponses.preco.respostas);
    }
    
    // Verificar se é uma pergunta sobre estoque
    if (chatbotResponses.estoque.padroes.some(padrao => mensagemLower.includes(padrao))) {
        return obterRespostaAleatoria(chatbotResponses.estoque.respostas);
    }
    
    // Verificar se é uma pergunta sobre vender
    if (chatbotResponses.vender.padroes.some(padrao => mensagemLower.includes(padrao))) {
        return obterRespostaAleatoria(chatbotResponses.vender.respostas);
    }
    
    // Verificar se é uma pergunta sobre documentação
    if (chatbotResponses.documentacao.padroes.some(padrao => mensagemLower.includes(padrao))) {
        return obterRespostaAleatoria(chatbotResponses.documentacao.respostas);
    }
    
    // Verificar se é uma pergunta sobre garantia
    if (chatbotResponses.garantia.padroes.some(padrao => mensagemLower.includes(padrao))) {
        return obterRespostaAleatoria(chatbotResponses.garantia.respostas);
    }
    
    // Verificar se é uma pergunta sobre prazo de entrega
    if (chatbotResponses.prazoEntrega.padroes.some(padrao => mensagemLower.includes(padrao))) {
        return obterRespostaAleatoria(chatbotResponses.prazoEntrega.respostas);
    }
    
    // Verificar se é uma pergunta sobre test drive
    if (chatbotResponses.testDrive.padroes.some(padrao => mensagemLower.includes(padrao))) {
        return obterRespostaAleatoria(chatbotResponses.testDrive.respostas);
    }
    
    // Verificar se é uma pergunta sobre seguro
    if (chatbotResponses.seguro.padroes.some(padrao => mensagemLower.includes(padrao))) {
        return obterRespostaAleatoria(chatbotResponses.seguro.respostas);
    }
    
    // Verificar se é uma pergunta sobre carros elétricos
    if (chatbotResponses.carrosEletricos.padroes.some(padrao => mensagemLower.includes(padrao))) {
        return obterRespostaAleatoria(chatbotResponses.carrosEletricos.respostas);
    }
    
    // Verificar se é uma pergunta sobre troca de carro
    if (chatbotResponses.trocaCarro.padroes.some(padrao => mensagemLower.includes(padrao))) {
        return obterRespostaAleatoria(chatbotResponses.trocaCarro.respostas);
    }
    
    // Verificar se é uma pergunta sobre atendimento humano
    if (chatbotResponses.atendimentoHumano.padroes.some(padrao => mensagemLower.includes(padrao))) {
        return obterRespostaAleatoria(chatbotResponses.atendimentoHumano.respostas);
    }
    
    // Verificar se é uma pergunta sobre compra de carros
    if (chatbotResponses.comprarCarro && chatbotResponses.comprarCarro.padroes.some(padrao => mensagemLower.includes(padrao))) {
        // Verificar subcategorias específicas
        for (const categoria in chatbotResponses.comprarCarro.categorias) {
            if (chatbotResponses.comprarCarro.categorias[categoria].padroes.some(padrao => mensagemLower.includes(padrao))) {
                return chatbotResponses.comprarCarro.categorias[categoria].resposta;
            }
        }
    }
    
    // Verificar nas perguntas frequentes
    for (const item of faqData) {
        if (mensagemLower.includes(item.pergunta.toLowerCase())) {
            return item.resposta;
        }
    }
    
    // Se não identificou o padrão, retornar uma resposta genérica
    return obterRespostaAleatoria(chatbotResponses.naoEntendi);
}

// Função para obter uma resposta aleatória de um array
function obterRespostaAleatoria(respostas) {
    const indice = Math.floor(Math.random() * respostas.length);
    return respostas[indice];
}

// Adicionar evento direto aos links quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM carregado, configurando eventos para links de ajuda");
    
    // Adicionar evento diretamente a todos os elementos com a classe ajuda-para-voce
    const ajudaLinks = document.querySelectorAll('.ajuda-para-voce');
    console.log("Links de ajuda encontrados:", ajudaLinks.length);
    
    ajudaLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            console.log("Link de ajuda clicado:", link);
            criarInterfaceAjuda();
        });
    });
    
    // Backup: também adicionar evento a todos os links que apontam para #ajuda
    const todosAjudaLinks = document.querySelectorAll('a[href="#ajuda"]');
    console.log("Todos os links de ajuda encontrados:", todosAjudaLinks.length);
    
    todosAjudaLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const linkText = link.textContent.trim().toLowerCase();
            console.log("Link de ajuda clicado:", linkText);
            
            if (linkText === 'para você' || linkText.includes('para você')) {
                e.preventDefault();
                criarInterfaceAjuda();
            }
        });
    });
    
    // Adicionar evento de clique para abrir o chatbot quando o link de compra de carro for clicado
    const compraLinks = document.querySelectorAll('a[href*="comprar"], a[href*="compra"]');
    compraLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Não impedir o comportamento padrão, apenas abrir o chat após o redirecionamento
            setTimeout(() => {
                criarInterfaceAjuda();
                // Simular uma pergunta sobre compra de carro
                const inputField = document.getElementById('chat-input-field');
                if (inputField) {
                    inputField.value = "Quero informações sobre como comprar um carro";
                    document.getElementById('chat-send-btn').click();
                }
            }, 500);
        });
    });
});

// Adicionando função global para garantir que possa ser chamada de qualquer lugar
window.abrirCentralAjuda = function() {
    console.log("Função global abrirCentralAjuda chamada");
    criarInterfaceAjuda();
};

// Adicionar CSS diretamente ao DOM para melhorar a aparência
function adicionarEstilosChat() {
    const style = document.createElement('style');
    style.textContent = `
        .ajuda-overlay {
            animation: fadeIn 0.3s ease-in-out;
        }
        
        .quick-replies, .quick-replies-extended {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin: 10px 0;
            justify-content: center;
        }
        
        .quick-reply-btn {
            background-color: #f0f2f5;
            border: 1px solid #dde1e7;
            border-radius: 18px;
            padding: 8px 15px;
            font-size: 13px;
            color: #2f2841;
            cursor: pointer;
            transition: all 0.2s ease;
            white-space: nowrap;
        }
        
        .quick-reply-btn:hover {
            background-color: #e4e6eb;
            transform: translateY(-2px);
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        
        .quick-reply-btn:active {
            transform: translateY(0);
        }
        
        .sugestoes-relacionadas {
            background-color: #f8f9fa;
            border-radius: 12px;
            padding: 10px;
            margin: 10px 0;
            animation: fadeIn 0.3s ease-in-out;
        }
        
        .sugestoes-titulo {
            font-size: 12px;
            color: #6c757d;
            margin-bottom: 8px;
        }
        
        .botoes-sugestoes {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
        }
        
        .sugestao-btn {
            background-color: #e6f2ff;
            border: 1px solid #cce5ff;
            border-radius: 16px;
            padding: 6px 12px;
            font-size: 12px;
            color: #0056b3;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        
        .sugestao-btn:hover {
            background-color: #cce5ff;
        }
        
        .message {
            max-width: 80%;
            margin-bottom: 10px;
            border-radius: 18px;
            padding: 12px 15px;
            animation: messageSlide 0.3s ease-in-out;
        }
        
        .message.user {
            background-color: #d7f5f4;
            color: #333;
            border-bottom-right-radius: 5px;
            margin-left: auto;
        }
        
        .message.system {
            background-color: #f0f2f5;
            color: #333;
            border-bottom-left-radius: 5px;
        }
        
        .message.typing {
            color: #6c757d;
            font-style: italic;
        }
        
        @keyframes messageSlide {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
        
        .faq-question {
            transition: all 0.3s ease;
        }
        
        .faq-question:hover {
            background-color: #f0f2f5;
        }
    `;
    
    document.head.appendChild(style);
} 