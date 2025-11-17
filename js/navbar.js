

const openBtn = document.querySelector('.menu-open');
if (openBtn) {
    openBtn.addEventListener('click', () => {


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

    // При загрузке страницы восстанавливаем выбранный язык
    document.addEventListener('DOMContentLoaded', function() {
        const savedLang = localStorage.getItem('language') || 'ru';
        applyLanguage(savedLang);

        // Обновляем активную кнопку
        langButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === savedLang);
        });
    });

    // При клике сохраняем язык и применяем
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedLang = this.dataset.lang;

            // Меняем активную кнопку
            document.querySelector('.language-switcher button.active').classList.remove('active');
            this.classList.add('active');

            // Сохраняем язык
            localStorage.setItem('language', selectedLang);

            // Применяем язык
            applyLanguage(selectedLang);
        });
    });

    // Функция перевода
    function applyLanguage(lang) {
        document.querySelectorAll('[data-translate]').forEach(el => {
            const translations = JSON.parse(el.dataset.translate);
            if (translations[lang]) el.textContent = translations[lang];
        });
    }

});

const scrollBtn = document.querySelector('.js-scroll-top-button');
const progressCircle = document.querySelector('.progress-bar');

window.addEventListener('scroll', () => {
    // Показываем кнопку
    if (window.scrollY > 300) {
        scrollBtn.parentElement.style.display = 'block';
    } else {
        scrollBtn.parentElement.style.display = 'none';
    }

    // Вычисляем прогресс прокрутки
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = scrollTop / docHeight;
    const dashOffset = 138 * (1 - scrollPercent); // 138 = длина круга
    progressCircle.style.strokeDashoffset = dashOffset;
});

// Скролл вверх
scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

 });
}
