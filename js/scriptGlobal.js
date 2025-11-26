
// Funcionalidade do Menu Hambúrguer
document.addEventListener('DOMContentLoaded', function () {
    const menuHamburguer = document.querySelector('.menu-hamburguer button');
    const navbarMenu = document.querySelector('.navbar-menu');

    if (menuHamburguer && navbarMenu) {
        menuHamburguer.addEventListener('click', function () {
            // Toggle da classe active
            navbarMenu.classList.toggle('active');

            // Muda o ícone do menu
            const icon = menuHamburguer.querySelector('span');
            if (navbarMenu.classList.contains('active')) {
                icon.textContent = 'close';
            } else {
                icon.textContent = 'menu';
            }
        });

        // Fecha o menu quando clicar em um link
        const menuLinks = navbarMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function () {
                navbarMenu.classList.remove('active');
                const icon = menuHamburguer.querySelector('span');
                icon.textContent = 'menu';
            });
        });

        // Fecha o menu ao redimensionar a tela para desktop
        window.addEventListener('resize', function () {
            if (window.innerWidth > 1380) {
                navbarMenu.classList.remove('active');
                const icon = menuHamburguer.querySelector('span');
                icon.textContent = 'menu';
            }
        });
    }

    // Função de Scroll Suave para links âncora
    initSmoothScroll();
});

// Função para implementar scroll suave
function initSmoothScroll() {
    // Seleciona todos os links que apontam para âncoras na mesma página
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    // Seleciona também links que levam para o início (index.html, início, etc.)
    const homeLinks = document.querySelectorAll('a[href="index.html"], a[href="../index.html"], a[href="./index.html"], a[href="/index.html"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Verifica se é um link âncora válido (não apenas #)
            if (href && href !== '#') {
                e.preventDefault();
                
                const targetId = href.substring(1); // Remove o #
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Calcula a posição considerando a altura da navbar fixa
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetElement.offsetTop - navbarHeight - 20; // 20px de margem extra
                    
                    // Executa o scroll suave
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
            // Se for apenas # (link para o topo), faz scroll para o início
            else if (href === '#') {
                e.preventDefault();
                scrollToTop();
            }
        });
    });
    
    // Adiciona scroll suave para links que levam ao início
    homeLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Verifica se estamos na mesma página (index.html)
            const currentPage = window.location.pathname;
            const isIndexPage = currentPage.endsWith('index.html') || currentPage === '/' || currentPage.endsWith('/');
            
            // Se estivermos na página index, faz scroll suave para o topo
            if (isIndexPage) {
                e.preventDefault();
                scrollToTop();
            }
            // Caso contrário, deixa o comportamento padrão (navegar para a página)
        });
    });
    
    // Adiciona scroll suave para o logo da navbar quando estiver na página inicial
    const logoLinks = document.querySelectorAll('.navbar-title a');
    logoLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const currentPage = window.location.pathname;
            const isIndexPage = currentPage.endsWith('index.html') || currentPage === '/' || currentPage.endsWith('/');
            
            // Se estivermos na página index e o link aponta para index, faz scroll para o topo
            if (isIndexPage && (this.getAttribute('href') === 'index.html' || this.getAttribute('href') === '../index.html')) {
                e.preventDefault();
                scrollToTop();
            }
        });
    });
}

// Função adicional para scroll suave programático (pode ser chamada de outros scripts)
function smoothScrollTo(elementId, offset = 0) {
    const targetElement = document.getElementById(elementId);
    if (targetElement) {
        const navbarHeight = document.querySelector('.navbar') ? document.querySelector('.navbar').offsetHeight : 0;
        const targetPosition = targetElement.offsetTop - navbarHeight - offset;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Função para scroll suave até o topo da página
function scrollToTop() {
    // Usa uma animação mais controlada para o topo
    const scrollDuration = 800; // duração em ms
    const scrollHeight = window.scrollY;
    const scrollStep = Math.PI / (scrollDuration / 15);
    const cosParameter = scrollHeight / 2;
    let scrollCount = 0;
    let scrollMargin;
    
    function step() {
        setTimeout(function() {
            if (window.scrollY !== 0) {
                scrollCount = scrollCount + 1;
                scrollMargin = cosParameter - cosParameter * Math.cos(scrollCount * scrollStep);
                window.scrollTo(0, (scrollHeight - scrollMargin));
                step();
            }
        }, 15);
    }
    
    // Fallback para navegadores que suportam scroll suave nativo
    if ('scrollBehavior' in document.documentElement.style) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    } else {
        step();
    }
}

// Função para destacar link ativo durante o scroll (opcional)
function initActiveNavigation() {
    const navLinks = document.querySelectorAll('.navbar-menu a[href^="#"], .footer-nav a[href^="#"]');
    const sections = document.querySelectorAll('section[id]');
    
    if (sections.length === 0) return;
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 100; // Offset para considerar a navbar
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition <= sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        // Remove classe ativa de todos os links
        navLinks.forEach(link => {
            link.classList.remove('active-section');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active-section');
            }
        });
    });
}

// Função para adicionar scroll suave em links com texto "Início"
function initHomePageScroll() {
    // Seleciona todos os links que contenham "Início" no texto
    const inicioLinks = Array.from(document.querySelectorAll('a')).filter(link => {
        return link.textContent.trim().toLowerCase().includes('início');
    });
    
    inicioLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const currentPage = window.location.pathname;
            const isIndexPage = currentPage.endsWith('index.html') || currentPage === '/' || currentPage.endsWith('/');
            
            // Se estivermos na página index, faz scroll suave para o topo
            if (isIndexPage) {
                e.preventDefault();
                scrollToTop();
            }
        });
    });
}

// Chama as funções quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    initActiveNavigation();
    initHomePageScroll();
});
