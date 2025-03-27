// Script simplificado para comportamento de dropdown

document.addEventListener('DOMContentLoaded', function() {
    // Garante que os elementos do dropdown funcionem corretamente
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        // Adiciona manipuladores de eventos para clique
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Fecha outros dropdowns quando um é aberto
            dropdownToggles.forEach(otherToggle => {
                if (otherToggle !== toggle && otherToggle.classList.contains('active')) {
                    otherToggle.classList.remove('active');
                    otherToggle.nextElementSibling.classList.remove('show');
                }
            });
            
            // Alterna a classe ativa no toggle atual
            this.classList.toggle('active');
            this.nextElementSibling.classList.toggle('show');
        });

        // Adiciona funcionalidade para teclado (acessibilidade)
        toggle.addEventListener('keydown', function(e) {
            // Enter ou espaço
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Fecha dropdown ao clicar fora dele
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            dropdownToggles.forEach(toggle => {
                toggle.classList.remove('active');
                if (toggle.nextElementSibling) {
                    toggle.nextElementSibling.classList.remove('show');
                }
            });
        }
    });

    // Animar entrada de notícias quando esta seção estiver visível
    const animarNoticias = () => {
        const noticiasSection = document.querySelector('.noticias-portal');
        if (noticiasSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const cards = noticiasSection.querySelectorAll('.noticia-card');
                        cards.forEach((card, index) => {
                            if (card.style.display !== 'none') {
                                setTimeout(() => {
                                    card.style.opacity = '1';
                                    card.style.transform = 'translateY(0)';
                                }, 100 * index);
                            }
                        });
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });
            
            observer.observe(noticiasSection);
        }
    };

    // Chamar função para animar notícias
    animarNoticias();
}); 