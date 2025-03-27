function handleQuickReply(text, query) {
    // Adiciona a mensagem do usuÃ¡rio ao chat como se ele tivesse digitado
    addMessage(text, 'user');
    
    // Remove botÃµes de resposta rÃ¡pida existentes
    const quickRepliesContainer = document.querySelector('.quick-replies');
    if (quickRepliesContainer) {
        quickRepliesContainer.remove();
    }
    
    // Mostrar indicador de digitaÃ§Ã£o
    showTypingIndicator();
    
    // Processa a mensagem de resposta rÃ¡pida
    setTimeout(() => {
        removeTypingIndicator();
        
        // Verifica se Ã© uma consulta relacionada a SUVs
        if (query === 'suv') {
            const response = getResponseForIntent('suv');
            addMessage(response.text, 'bot');
            addQuickReplies(response.quickReplies);
        } 
        else if (query === 'compacto') {
            const response = getResponseForIntent('suv_compacto');
            addMessage(response.text, 'bot');
            addQuickReplies(response.quickReplies);
        }
        else if (query === 'medio') {
            const response = getResponseForIntent('suv_medio');
            addMessage(response.text, 'bot');
            addQuickReplies(response.quickReplies);
        }
        else if (query === 'grande') {
            const response = getResponseForIntent('suv_grande');
            addMessage(response.text, 'bot');
            addQuickReplies(response.quickReplies);
        }
        else if (query === 'luxo') {
            const response = getResponseForIntent('suv_luxo');
            addMessage(response.text, 'bot');
            addQuickReplies(response.quickReplies);
        }
        else {
            // Processa outras mensagens
            const intent = analyzeIntent(query);
            const response = getResponseForIntent(intent);
            
            if (typeof response === 'string') {
                addMessage(response, 'bot');
            } else {
                addMessage(response.text, 'bot');
                if (response.quickReplies) {
                    addQuickReplies(response.quickReplies);
                }
            }
        }
    }, 1500);
}

function analyzeIntent(message) {
    message = message.toLowerCase();
    
    if (message.includes('atendente vendas')) {
        connectToAgent('Vendas');
        return 'agent';
    } else if (message.includes('atendente financiamento')) {
        connectToAgent('Financiamento');
        return 'agent';
    } else if (message.includes('atendente pos-venda')) {
        connectToAgent('PÃ³s-venda');
        return 'agent';
    } else if (message.includes('cancelar atendente')) {
        return 'cancel_agent';
    } else if (message.includes('usar chat')) {
        return 'chat_help';
    } else if (message.includes('faq')) {
        return 'faq';
    } else if (message.includes('suv')) {
        return 'suv';
    } else if (message.includes('compacto')) {
        return 'suv_compacto';
    } else if (message.includes('mÃ©dio') || message.includes('medio')) {
        return 'suv_medio';
    } else if (message.includes('grande')) {
        return 'suv_grande';
    } else if (message.includes('luxo')) {
        return 'suv_luxo';
    } else if (message.includes('comprar') || message.includes('buscar')) {
        return 'comprar';
    } else if (message.includes('financiamento') || message.includes('financiar')) {
        return 'financiamento';
    } else if (message.includes('vender')) {
        return 'vender';
    } else if (message.includes('ajuda')) {
        return 'ajuda';
    } else {
        return 'outros';
    }
}

function getResponseForIntent(intent) {
    const responses = {
        comprar: {
            text: 'Que Ã³timo que vocÃª estÃ¡ interessado em comprar um carro! Qual categoria de veÃ­culo vocÃª procura?',
            quickReplies: [
                { text: 'ðŸš™ SUVs', query: 'suv' },
                { text: 'ðŸš— Sedans', query: 'sedan' },
                { text: 'ðŸ›» Picapes', query: 'picape' },
                { text: 'âš¡ ElÃ©tricos', query: 'eletrico' }
            ]
        },
        suv: {
            text: 'Ã“tima escolha! SUVs sÃ£o espaÃ§osos, confortÃ¡veis e perfeitos para viagens em famÃ­lia ou terrenos mais desafiadores. VocÃª prefere um modelo compacto, mÃ©dio, grande ou luxo?',
            quickReplies: [
                { text: 'Modelo compacto', query: 'compacto' },
                { text: 'MÃ©dio', query: 'medio' },
                { text: 'Grande', query: 'grande' },
                { text: 'Luxo', query: 'luxo' }
            ]
        },
        suv_compacto: {
            text: 'Ã“tima escolha! Os SUVs compactos oferecem praticidade, economia e um Ã³timo custo-benefÃ­cio. Prefere um modelo com maior eficiÃªncia de combustÃ­vel ou um com mais tecnologia e conforto?',
            quickReplies: [
                { text: 'Maior eficiÃªncia', query: 'suv compacto eficiente' },
                { text: 'Mais tecnologia', query: 'suv compacto tecnologico' },
                { text: 'ðŸ”™ Voltar para SUVs', query: 'suv' }
            ]
        },
        suv_medio: {
            text: 'Perfeito! SUVs mÃ©dios combinam espaÃ§o, potÃªncia e tecnologia. VocÃª busca um modelo com traÃ§Ã£o 4x4 para aventuras ou um mais urbano e sofisticado?',
            quickReplies: [
                { text: 'TraÃ§Ã£o 4x4', query: 'suv medio 4x4' },
                { text: 'Urbano', query: 'suv medio urbano' },
                { text: 'ðŸ”™ Voltar para SUVs', query: 'suv' }
            ]
        },
        suv_grande: {
            text: 'Excelente escolha! SUVs grandes sÃ£o ideais para famÃ­lias e longas viagens. VocÃª precisa de um modelo com 7 lugares ou estÃ¡ buscando algo mais focado em desempenho?',
            quickReplies: [
                { text: '7 lugares', query: 'suv grande 7lugares' },
                { text: 'Desempenho', query: 'suv grande desempenho' },
                { text: 'ðŸ”™ Voltar para SUVs', query: 'suv' }
            ]
        },
        suv_luxo: {
            text: 'Ã“tima opÃ§Ã£o! SUVs de luxo oferecem o melhor em conforto, tecnologia e potÃªncia. VocÃª prefere um modelo focado em esportividade ou um mais voltado para sofisticaÃ§Ã£o e conforto?',
            quickReplies: [
                { text: 'Esportividade', query: 'suv luxo esportivo' },
                { text: 'SofisticaÃ§Ã£o', query: 'suv luxo sofisticado' },
                { text: 'ðŸ”™ Voltar para SUVs', query: 'suv' }
            ]
        },
        financiamento: {
            text: 'Posso te ajudar com simulaÃ§Ãµes de financiamento. Qual Ã© o valor aproximado que vocÃª pretende financiar?',
            quickReplies: [
                { text: 'AtÃ© R$50mil', query: 'financiamento 50' },
                { text: 'R$50mil a R$100mil', query: 'financiamento 100' },
                { text: 'Acima de R$100mil', query: 'financiamento mais' }
            ]
        },
        vender: {
            text: 'Ã“timo! Posso te ajudar a avaliar seu veÃ­culo. VocÃª jÃ¡ tem uma ideia do valor que espera receber?',
            quickReplies: [
                { text: 'Sim, tenho um valor', query: 'valor definido' },
                { text: 'NÃ£o, preciso avaliar', query: 'avaliar' }
            ]
        },
        ajuda: {
            text: 'Como posso ajudar? Aqui estÃ£o algumas opÃ§Ãµes:',
            quickReplies: [
                { text: 'ðŸ” Buscar veÃ­culos', query: 'buscar' },
                { text: 'ðŸ’° Financiamento', query: 'financiamento' },
                { text: 'ðŸ“± Falar com atendente', query: 'atendente' }
            ]
        },
        outros: {
            text: 'Desculpe, nÃ£o entendi completamente. Posso ajudar com:',
            quickReplies: [
                { text: 'ðŸš— Comprar carro', query: 'comprar' },
                { text: 'ðŸ’° Financiamento', query: 'financiamento' },
                { text: 'ðŸ’¼ Vender carro', query: 'vender' }
            ]
        }
    };
    
    return responses[intent] || responses.outros;
}
