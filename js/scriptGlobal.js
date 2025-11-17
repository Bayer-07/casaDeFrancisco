
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
});
