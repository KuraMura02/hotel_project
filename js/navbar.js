// Скрипты для навигации и переключения языков
document.addEventListener('DOMContentLoaded', function() {
    // Активная страница в навигации
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (currentPage === linkHref || 
            (currentPage === '' && linkHref === 'index.html') ||
            (currentPage.includes(linkHref.replace('.html', '')) && linkHref !== 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Мобильное меню - дублируем активную страницу
    const mobileNavLinks = document.querySelectorAll('.mobile-navbar a');
    mobileNavLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (currentPage === linkHref || 
            (currentPage === '' && linkHref === 'index.html') ||
            (currentPage.includes(linkHref.replace('.html', '')) && linkHref !== 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Переключение языков в десктопном меню
    const langButtons = document.querySelectorAll('.language-switcher button');
    
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            document.querySelector('.language-switcher button.active').classList.remove('active');
            this.classList.add('active');
            
            // Здесь можно добавить логику смены языка
            // Например, перенаправление на соответствующую версию сайта
            // или подгрузку переведенного контента
        });
    });
});